import requests

url = "https://raw.githubusercontent.com/pandas-dev/pandas/main/doc/data/titanic.csv"
response = requests.get(url)

with open("titanic.csv", "wb") as file:
    file.write(response.content)
