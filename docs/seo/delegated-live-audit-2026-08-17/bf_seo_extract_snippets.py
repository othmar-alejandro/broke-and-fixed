import re, requests
from bs4 import BeautifulSoup
S=requests.Session(); S.headers.update({'User-Agent':'HermesAgent-BF-SEO-Audit/1.0'})
urls=['https://brokeandfixed.com/en/services/interior-painting','https://brokeandfixed.com/en/blog/tile-installation-doral-condo-guide-2026','https://brokeandfixed.com/en/blog/interior-painting-pinecrest-color-trends-2026','https://brokeandfixed.com/en/blog/florida-hb-803-no-permit-needed-2026','https://brokeandfixed.com/es/blog/miami-hoa-renovation-approval-guide','https://brokeandfixed.com/es/blog/hoa-approval-vs-permit-miami','https://brokeandfixed.com/en/blog/budget-kitchen-update-miami-under-8000','https://brokeandfixed.com/es']
patterns=[r'.{0,100}\b(?:licensed|contractor|licenciado|contratista licenciado)\b.{0,140}', r'.{0,100}\b(?:3 yrs|fully insured|totalmente asegurada|free estimate|under \$?8,000|\$7,500)\b.{0,140}']
for u in urls:
    html=S.get(u,timeout=20).text
    soup=BeautifulSoup(html,'lxml')
    for tag in soup(['script','style','noscript','svg']): tag.decompose()
    text=re.sub(r'\s+',' ', soup.get_text(' ', strip=True))
    print('\nURL',u)
    for pat in patterns:
        hits=[]
        for m in re.finditer(pat,text,re.I):
            s=m.group(0)
            if s not in hits: hits.append(s)
        for h in hits[:8]: print('-',h)
