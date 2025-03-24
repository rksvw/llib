from os import path

# CONST
FILE_PATH = "hellome.txt"


def read_file():
    print(f"Type of FILE_PATH: {type(FILE_PATH)}")  # Should be <class 'str'>
    print(f"Value of FILE_PATH: {repr(FILE_PATH)}")  # To detect hidden chars

    print(open)  # Should print <built-in function open>
    print(isinstance(FILE_PATH, str))  # Should print True

    print("\n\n")

    if path.exists(FILE_PATH):
        with open(FILE_PATH, "r") as file:
            print(file.read())  # Reads and prints the entire file content
    else:
        print("File does not exists.")
