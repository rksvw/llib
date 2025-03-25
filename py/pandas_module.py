import pandas as pd

# A table of data is stored as a pandas [DataFrame]
# Each column in a [DataFrame] is a [Series]
df = pd.DataFrame(
    {
        "Name": [
            "Braund, Mr. Owen Harris",
            "Allen, Mr. William Henry",
            "Bonnell, Miss. Elizabeth",
        ],
        "Age": [22, 23, 58],
        "Sex": ["male", "male", "female"],
        "Profession": ["Software Engineer", "Software Programmer", "Game Developer"],
    }
)


print(df)

print(df["Age"])

ages = pd.Series([22, 35, 58], name="Age")

print(ages)

print(ages.max())

print(df["Age"].max())

print(df.describe(), "\n\n")


# Reading Tabular data
titanic = pd.read_csv("./titanic.csv")

# Read the first 8 rows of titanic data
print(titanic.head(3))

# Read the last 8 rows of titanic data
print(titanic.tail(3))

# Check column data types
print(titanic.dtypes)

# Convert in spreadsheet form
titanic.to_excel("titanic.xlsx", sheet_name="passengers", index=False)

# Reading excel file
titanic_excel = pd.read_excel("titanic.xlsx", sheet_name="passengers")
print(titanic_excel.head())
print(titanic_excel.info())
