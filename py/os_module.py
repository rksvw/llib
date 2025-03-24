from os import path, cpu_count, write
import platform
import shutil

# CONST
FILE_PATH = "hellome.txt"


def write_file(data):
    if path.exists(FILE_PATH):
        try:
            with open(FILE_PATH, "w") as file:
                for key, value in data.items():
                    file.write(f"{key}: {value}\n")
            print("File written successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
    else:
        print("File does not exists.")


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


def sys_info():
    total, used, free = shutil.disk_usage("/")
    sys_data = {
        "system_name": platform.system(),
        "system_host": platform.node(),
        "system_release": platform.release(),
        "system_version": platform.version(),
        "system_machine": platform.machine(),
        "system_processor": platform.processor(),
        "system_total_storage": f"{total // (2 ** 30)} GB",
        "system_used_storage": f"{used // (2 ** 30)} GB",
        "system_free_storage": f"{free // (2 ** 30)} GB",
    }
    write_file(sys_data)
    read_file()


def cpu():
    print(cpu_count())


sys_info()
