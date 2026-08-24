#!/usr/bin/env python3
import json, re, sys, time
from datetime import datetime, timezone
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET

BASE='https://brokeandfixed.com'
UA='HermesAgent-BF-SEO-Audit/1.0 (read-only)'
S=requests.Session()
S.headers.update({'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'})
TIMEOUT=20

def fetch(url, allow_redirects=True):
    try:
        r=S.get(url, timeout=TIMEOUT, allow_redirects=allow_redirects)
        return r
    except Exception as e:
        return e

def ns_strip(tag):
    return tag.split('}',1)[-1] if '}' in tag else tag

def get_text(el):
    return re.sub(r'\s+',' ', el.get_text(' ', strip=True)) if el else ''

def parse_sitemap(url, seen=None):
    if seen is None: seen=set()
    if url in seen: return []
    seen.add(url)
    r=fetch(url)
    if not hasattr(r,'status_code'):
        return [{'sitemap_error':url,'error':str(r)}]
    if r.status_code>=400:
        return [{'sitemap_error':url,'status':r.status_code}]
    try:
        root=ET.fromstring(r.content)
    except Exception as e:
        return [{'sitemap_error':url,'status':r.status_code,'error':'xml parse '+str(e)[:200], 'body_head': r.text[:500]}]
    tag=ns_strip(root.tag)
    out=[]
    if tag=='sitemapindex':
        for sm in root:
            loc=None
            for ch in sm:
                if ns_strip(ch.tag)=='loc': loc=(ch.text or '').strip()
            if loc:
                out += parse_sitemap(loc, seen)
    elif tag=='urlset':
        for u in root:
            item={}
            for ch in u:
                name=ns_strip(ch.tag)
                if name=='loc': item['url']=(ch.text or '').strip()
                elif name in ('lastmod','changefreq','priority'): item[name]=(ch.text or '').strip()
            if item.get('url'): out.append(item)
    return out

# robots and sitemap(s)
robots_url=urljoin(BASE,'/robots.txt')
robots=fetch(robots_url)
robots_text=robots.text if hasattr(robots,'text') else str(robots)
sitemap_directives=re.findall(r'(?im)^\s*Sitemap:\s*(\S+)', robots_text)
if not sitemap_directives:
    sitemap_directives=[urljoin(BASE,'/sitemap.xml')]

sitemap_items=[]
for sm in sitemap_directives:
    sitemap_items += parse_sitemap(sm)
urls=[]
for it in sitemap_items:
    if 'url' in it:
        urls.append(it['url'])
# de-dupe preserving order, only domain
seen=set(); urls=[u for u in urls if not (u in seen or seen.add(u)) and urlparse(u).netloc.endswith('brokeandfixed.com')]

PROHIBITED=[
    r'\blicensed\b', r'\blicense[sd]? contractor\b', r'\bcontractor\b',
    r'\bcontratista\s+licenciad[oa]\b', r'\blicenciad[oa]\b',
]
HARD_CLAIMS=[
    r'\bfully insured\b', r'\binsured\b', r'\b[0-9]+\+?\s*(years|yrs|años)\b',
    r'\b[0-9][0-9,]+\+?\s*(projects|reviews|clientes|proyectos)\b',
    r'\bfree estimate\b', r'\bsame[- ]day\b', r'\b24/?7\b', r'\bwarranty\b', r'\bguarantee[sd]?\b',
]

page_results=[]
link_status_targets=set()
for i,u in enumerate(urls,1):
    r=fetch(u)
    row={'url':u}
    if not hasattr(r,'status_code'):
        row['error']=str(r); page_results.append(row); continue
    row.update({'status':r.status_code, 'final_url':r.url, 'redirect_chain':[x.status_code for x in r.history], 'content_type':r.headers.get('content-type','')})
    if 'text/html' not in row['content_type']:
        page_results.append(row); continue
    soup=BeautifulSoup(r.text,'lxml')
    html=soup.find('html')
    title=get_text(soup.find('title'))
    desc=soup.find('meta', attrs={'name':re.compile('^description$', re.I)})
    robots_meta=soup.find('meta', attrs={'name':re.compile('^robots$', re.I)})
    canonical=soup.find('link', rel=lambda v: v and 'canonical' in (v if isinstance(v,list) else [v]))
    alternates=[]
    for a in soup.find_all('link', rel=lambda v: v and 'alternate' in (v if isinstance(v,list) else [v])):
        if a.get('hreflang') or a.get('href'):
            alternates.append({'hreflang':a.get('hreflang'), 'href':urljoin(u,a.get('href',''))})
    h1s=[get_text(h) for h in soup.find_all('h1')]
    imgs=soup.find_all('img')
    img_missing=[]
    for img in imgs:
        alt=img.get('alt')
        if alt is None or alt.strip()=='' :
            img_missing.append(img.get('src') or img.get('data-src') or '')
    # jsonld types
    schema=[]; schema_errors=[]
    for s in soup.find_all('script', attrs={'type':re.compile('ld\+json', re.I)}):
        txt=s.string or s.get_text() or ''
        try:
            data=json.loads(txt)
            datas=data if isinstance(data,list) else [data]
            for d in datas:
                if isinstance(d,dict):
                    t=d.get('@type') or (d.get('@graph') and [x.get('@type') for x in d.get('@graph',[]) if isinstance(x,dict)])
                    schema.append(t)
        except Exception as e:
            schema_errors.append(str(e)[:120])
    # visible text rough
    for tag in soup(['script','style','noscript','svg']): tag.decompose()
    text=get_text(soup.body or soup)
    internal=[]
    for a in soup.find_all('a', href=True):
        href=urljoin(u,a['href']).split('#')[0]
        if urlparse(href).netloc.endswith('brokeandfixed.com'):
            internal.append(href)
            if len(link_status_targets)<300:
                link_status_targets.add(href)
    row.update({
        'lang': html.get('lang') if html else None,
        'title': title, 'title_len': len(title),
        'description': desc.get('content','').strip() if desc else '',
        'description_len': len(desc.get('content','').strip()) if desc else 0,
        'robots_meta': robots_meta.get('content','').strip() if robots_meta else '',
        'canonical': urljoin(u, canonical.get('href','')) if canonical and canonical.get('href') else '',
        'alternates': alternates,
        'h1s': h1s, 'h1_count': len(h1s),
        'schema_types': schema, 'schema_errors': schema_errors,
        'image_count': len(imgs), 'images_missing_alt_count': len(img_missing), 'images_missing_alt_sample': img_missing[:5],
        'visible_word_count': len(re.findall(r'\w+', text)),
        'internal_link_count': len(set(internal)),
        'prohibited_matches': sorted(set([m.group(0) for pat in PROHIBITED for m in re.finditer(pat, text, re.I)]))[:20],
        'hard_claim_matches': sorted(set([m.group(0) for pat in HARD_CLAIMS for m in re.finditer(pat, text, re.I)]))[:30],
    })
    page_results.append(row)
    time.sleep(0.05)

# sampled internal link checks
link_results=[]
for href in sorted(link_status_targets)[:300]:
    try:
        rr=S.head(href, timeout=10, allow_redirects=True)
        if rr.status_code in (405,403) or rr.status_code>=500:
            rr=S.get(href, timeout=10, allow_redirects=True, stream=True)
        link_results.append({'url':href, 'status':rr.status_code, 'final_url':rr.url, 'redirects':[x.status_code for x in rr.history]})
    except Exception as e:
        link_results.append({'url':href, 'error':str(e)})

# summarize problems
issues=[]
for p in page_results:
    if p.get('status')!=200:
        issues.append(('status',p.get('url'),p.get('status')))
    if p.get('canonical') and p.get('canonical').rstrip('/') != p.get('final_url','').rstrip('/'):
        issues.append(('canonical_not_self',p['url'],p.get('canonical')))
    if not p.get('canonical') and 'text/html' in p.get('content_type',''):
        issues.append(('canonical_missing',p['url'],None))
    if p.get('h1_count')!=1:
        issues.append(('h1_count',p.get('url'),p.get('h1_count')))
    if not p.get('title'):
        issues.append(('title_missing',p.get('url'),None))
    if not p.get('description'):
        issues.append(('description_missing',p.get('url'),None))
    if p.get('url','').startswith(BASE+'/es/') and (p.get('lang') or '').lower().split('-')[0] != 'es':
        issues.append(('es_lang_wrong',p['url'],p.get('lang')))
    if not p.get('url','').startswith(BASE+'/es/') and (p.get('lang') or '').lower().split('-')[0] != 'en':
        issues.append(('en_lang_wrong',p['url'],p.get('lang')))
    if p.get('url','').startswith(BASE+'/es/'):
        alts={a.get('hreflang') for a in p.get('alternates',[])}
        if not {'en','es','x-default'}.issubset(alts):
            issues.append(('es_hreflang_incomplete',p['url'],sorted(alts)))
    if p.get('images_missing_alt_count',0)>0:
        issues.append(('image_alt_missing',p['url'],p.get('images_missing_alt_count')))
    if p.get('prohibited_matches'):
        issues.append(('prohibited_language',p['url'],p.get('prohibited_matches')))
    if p.get('hard_claim_matches'):
        issues.append(('hard_claims_review',p['url'],p.get('hard_claim_matches')))

report={
    'generated_at': datetime.now(timezone.utc).isoformat(),
    'base': BASE,
    'robots': {'url':robots_url, 'status': getattr(robots,'status_code',None), 'text':robots_text, 'sitemaps':sitemap_directives},
    'sitemap': {'directives':sitemap_directives, 'items_count':len(sitemap_items), 'urls_count':len(urls), 'errors':[x for x in sitemap_items if 'sitemap_error' in x], 'urls':urls},
    'pages': page_results,
    'sampled_internal_links': link_results,
    'issue_tuples': issues,
}
path='/Users/othmarcasilla/bf_live_seo_audit_raw.json'
with open(path,'w') as f: json.dump(report,f,indent=2,ensure_ascii=False)
# print concise summary counts
from collections import Counter
cnt=Counter([x[0] for x in issues])
print(json.dumps({
    'raw_report':path,
    'generated_at':report['generated_at'],
    'robots_status':report['robots']['status'],
    'sitemap_url_count':len(urls),
    'pages_crawled':len(page_results),
    'issue_counts':cnt,
    'non_200_pages':[p for p in page_results if p.get('status')!=200][:10],
    'sample_pages':page_results[:3]
}, indent=2, ensure_ascii=False, default=str))
