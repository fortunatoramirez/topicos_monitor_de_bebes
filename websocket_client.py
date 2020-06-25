from socketIO_client import SocketIO
from random import randint
import time


#import json

#def on_connect():
    #print('connect')

socketIO = SocketIO('http://201.174.122.203', 5001)
#socketIO.on('connect', on_connect)

# Llenando el arreglo llamado payload con tres muestras
i = 0
len = 20
ecg = [None]*len

while True:
	n= randint(0,1023)
	socketIO.emit("temperatura",n)
	time.sleep( 1.5 )
        n= randint(0,1023)
	socketIO.emit("carbono",n)
	time.sleep( 1.5 )


#socketIO.wait()
