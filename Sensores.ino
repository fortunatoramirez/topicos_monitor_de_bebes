//int UpperThreshold = 500;
//    int LowerThreshold = 450;
//    int reading = 0;
//    float BPM = 0.0;
//    bool IgnoreReading = false;
//    bool FirstPulseDetected = false;
//    unsigned long FirstPulseTime = 0;
//    unsigned long SecondPulseTime = 0;
//    unsigned long PulseInterval = 0;
//    int c=0;
//    float BPMAVG = 0.0;

#include <MQ135.h>//Air sensor library


int analogPinA0 = A0;
int analogPinA1 = A1;
int val = 0;
char letra;
int tamano=50;
double promCO2[50];
double sum=0;

//MQ135 mqSensor(A0);//mqsensor


    void setup(){
      Serial.begin(9600);
    }

    void loop(){

      if(Serial.available()>0){
          letra=Serial.read();
          if(letra=='T'){
            
            Serial.println("TEM" + String(analogRead(analogPinA1)));
          }
          else if(letra=='C'){
            // leemos tamano muestras 
            for(int i=0; i<tamano; i++)
            {
              //promCO2[i]=mqSensor.getCO2PPM();
              promCO2[i]=analogRead(analogPinA0);
              delay(50);
            }
            // calculamos el promedio de las tamano muestras
            for(int i=0;i<tamano;i++)
            {
              sum=sum+promCO2[i];
            }

            Serial.println("CARB" + String(sum/(double)tamano));
            sum = 0;      
          }
          delay(50);
          
          }

      }
 
