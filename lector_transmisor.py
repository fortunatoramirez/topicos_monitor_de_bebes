from socketIO_client import SocketIO
import serial
import time
import csv

total=0
len = 20
ecg = [None]*len
i = 0


print("Comenzando...")
socketIO = SocketIO('201.174.122.203', 5001)
print("Conectado al servidor.")

arduino=serial.Serial('/dev/ttyACM0',9600, timeout = 3.0)
arduino.isOpen()

#file1 = open('muestra.csv', 'w+')

while True:
    arduino.write("T")
    sig = arduino.readline()
    if sig[:3] == "TEM":
        print("TEM = " + sig[3:])
        socketIO.emit("temperatura", sig[3:])

    arduino.write("C")
    sig = arduino.readline()
    if sig[:4] == "CARB":
        print("CARB = " + sig[4:])
        socketIO.emit("carbono", sig[4:])
   
    time.sleep(0.5)

arduino.close()
file.close()
