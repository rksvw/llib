import os
from subprocess import (
    check_call,
    run,
    Popen,
    check_output,
    CalledProcessError,
    PIPE,
    call,
)  # Helps to create new child process

"""
    1. returns all usb list ----- [lsusb]
    2. basic ping cmd ----- [&& ping google.com]
    3. ping specific number of times ----- [&& ping -c 4 google.com ]
    4. ping with time interval ----- [&& ping -i 2 google.com ]
    5. ping with size of packets ----- [&& ping -s 1000 google.com]
    6. flood ping (super-fast, root required) ----- [&& ping -f google.com]
    7. specify TTL (Time ot Live) ----- [ && ping -5 64 google.com]
    8. get only a summary ----- [&& ping -c 4 -q google.com]
"""


def usb_list():
    run(
        [
            "lsusb && lsusb -t && lsusb -v",
        ],
        shell=True,
    )
    print("\n")


def network_list():
    run(
        [
            "ip a && ipconfig && nmcli device wifi && iwconfig && ip route && ip link show && nmcli device"
        ],
        shell=True,
    )


network_list()


def version_is():
    try:
        ans = check_output(["python3", "--version"], text=True)
        print(ans)
    except CalledProcessError as e:
        print(f"Command failed with return code {e.returncode}")


# Searching for the file name "sample" both prefix-suffix
def create_interact():
    lsProcess = Popen(["ls"], stdout=PIPE, text=True)
    touchProcess = Popen(
        ["grep", "sample"], stdin=lsProcess.stdout, stdout=PIPE, text=True
    )
    output, error = touchProcess.communicate()

    print(output)
    print(error)


# Create a seperate child process and return code for true: 0 false: !0
def sep_cmd():
    ans = call(["node", "hello.js"])
    if ans == 0:
        print("Command executed.")
    else:
        print("Command failed.")


def executeC():
    # store the return code of the c program(return 0)
    # and display the output
    s = check_call("gcc hello.c -o out1 && ./out1", shell=True)
    print(", return code", s)


def executeCpp():
    # Create a pipe to a child process
    data, temp = os.pipe()
    # write to STDIN as a byte object(convert string
    # to bytes with coding utf8)
    os.write(temp, bytes("5 10\n", "utf-8"))
    os.close(temp)

    # store output of the program as a byte string in s
    s = check_output("g++ hello.cpp -o out2 && ./out2", stdin=data, shell=True)

    # decode s to a normal string
    print(s.decode("utf-8"))


def executeJava():
    # store the output of
    # the java program
    s = check_output("javac Hello.java && java Hello", shell=True)

    print(s.decode("utf-8"))


# Driver function
if __name__ == "__main__":
    executeC()
    executeCpp()
    executeJava()
