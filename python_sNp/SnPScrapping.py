import requests
import pandas as pd
from io import StringIO

#Define URL  for s&p 500 url
url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"

#Define a header dictionary to mimic browser request
headers = {"User-Agent":"Mozilla/5.0"}

#send request to wikipedia and get response
response = requests.get(url=url, headers=headers)

#pandas reading the response and StringIO will parse the response to pandas to read as file
tables = pd.read_html(StringIO(response.text))

sp500_table = None

for table in tables:
    if "Symbol" in table.columns:
        sp500_table = table
        break
    
if sp500_table is None:
    raise ValueError("Could not find a table with correct information")

base_url = "https://en.wikipedia.org/wiki/"


def make_link(symbol):
    return "https://en.wikipedia.org/wiki/"+ str(symbol)

sp500_table["Symbol Link"] = sp500_table["Symbol"].apply(make_link)

print(sp500_table.head(10))

sp500_table.to_csv("SP500_Stocks.csv", index=False)