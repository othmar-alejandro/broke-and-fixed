import json, re, requests
from bs4 import BeautifulSoup
S=requests.Session(); S.headers.update({'User-Agent':'HermesAgent-BF-SEO-Audit/1.0'})
urls=['https://brokeandfixed.com/en','https://brokeandfixed.com/es','https://brokeandfixed.com/en/services/interior-painting','https://brokeandfixed.com/en/blog/florida-hb-803-no-permit-needed-2026']

def walk(obj):
    if isinstance(obj, dict):
        yield obj
        for v in obj.values(): yield from walk(v)
    elif isinstance(obj, list):
        for v in obj: yield from walk(v)
for u in urls:
    soup=BeautifulSoup(S.get(u,timeout=20).text,'lxml')
    print('\nURL',u)
    for s in soup.find_all('script', attrs={'type':re.compile(r'ld\+json',re.I)}):
        try: data=json.loads(s.string or s.get_text() or '{}')
        except Exception as e: print('json err',e); continue
        for obj in walk(data):
            if isinstance(obj,dict) and (obj.get('@type') in ['LocalBusiness','Organization'] or obj.get('aggregateRating') or obj.get('review')):
                keep={k:obj.get(k) for k in ['@type','name','description','telephone','address','areaServed','aggregateRating','review','priceRange','url'] if k in obj}
                print(json.dumps(keep, ensure_ascii=False)[:1000])
