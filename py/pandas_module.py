import pandas as pd


# A table of data is stored as a pandas [DataFrame]
# Each column in a [DataFrame] is a [Series]
def basic_data():
    df = pd.DataFrame(
        {
            "Name": [
                "Braund, Mr. Owen Harris",
                "Allen, Mr. William Henry",
                "Bonnell, Miss. Elizabeth",
            ],
            "Age": [22, 23, 58],
            "Sex": ["male", "male", "female"],
            "Profession": [
                "Software Engineer",
                "Software Programmer",
                "Game Developer",
            ],
        }
    )

    print(df)

    print(df["Age"])

    ages = pd.Series([22, 35, 58], name="Age")

    print(ages)

    print(ages.max())

    print(df["Age"].max())

    print(df.describe(), "\n\n")


def read_csv_():
    # Reading Tabular data
    titanic = pd.read_csv("./titanic.csv")

    # # Read the first 8 rows of titanic data
    # print(titanic.head(3))

    # # Read the last 8 rows of titanic data
    # print(titanic.tail(3))

    # # Check column data types
    # print(titanic.dtypes)

    titanic.to_excel("titanic.xlsx", sheet_name="passengers", index=False)


def read_excel_():
    # Convert in spreadsheet form

    # Reading excel file
    titanic_excel = pd.read_excel("titanic.xlsx", sheet_name="passengers")
    sort_data(titanic_excel)


def create_d_data():
    df = data = ["Name", "Age", "Profession", "College"]
    pd.Series(data)


def create_dd_data():
    df = pd.DataFrame(
        {
            "Name": [
                "Braund, Mr. Owen Harris",
                "Allen, Mr. William Henry",
                "Bonnell, Miss. Elizabeth",
            ],
            "Age": [22, 23, 58],
            "Sex": ["male", "male", "female"],
            "Profession": [
                "Software Engineer",
                "Software Programmer",
                "Game Developer",
            ],
        }
    )

    # Filter via Name
    print(df["Name"])


def head_five(data):
    print(data.head(5))


def tail_five(data):
    print(data.tail(5))


def info_data(data):
    print(data.info())


def describe_data(data):
    print(data.describe())


def get_rows_cols(data):
    print(data.shape)


def get_cols(data):
    print(data.columns)


def get_index(data):
    print(data.index)


# Read Rows wise data [row_1, row_5]
def access_via_label(data):
    print(data.loc[[1, 5]])


def sort_data(data):
    print(head_five(data.sort_values(by="Pclass")))
    print(data.sort_index())
    # head_five(data)


read_excel_()
