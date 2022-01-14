#include "DHT.h"
#include <ESP8266WiFi.h>
#include "ThingSpeak.h"

DHT dht(D4, DHT11); // Including library for dht

const char *ssid = "Home network";
const char *password = "Shama@2000";

unsigned long chanelId = 1628835; // Enter Write Channel key from ThingSpeak
unsigned long chanel2Id = 1631910; // Enter Read Channel key from ThingSpeak - Motor val

const char *rightAPIkey = "XCHF4SLL82NHOYC0"; // Enter Write API key from ThingSpeak
const char *readAPIkey = "N3ZWQNZJ7V6QAAFP"; // Enter Read API key from ThingSpeak

const int AirValue = 790;   //need to replace this value with Value_1
const int WaterValue = 300;  //need to replace this value with Value_2
const int SensorPin = A0;
int soilMoistureValue = 0;
int soilmoisturepercent = 0;
int relaypin = D5;
int relay_state = 0;

WiFiClient client;
void setup() {
  Serial.begin(9600);

  dht.begin();

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password); //Connect to wifi

  // Wait for connection
  Serial.println("Connecting to Wifi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    delay(500);
  }
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  ThingSpeak.begin(client);
}

void loop() {

  long readval = ThingSpeak.readLongField(chanel2Id,1,readAPIkey);
  int res = ThingSpeak.getLastReadStatus();

  if(res ==200){
    Serial.print("Motor value - ");
    Serial.println(readval);

    if(readval==1){
      Serial.println("Motor ON");
    }else{
      Serial.println("Motor OFF");
    }
  }else{
    Serial.println("connection faild");
  }


  soilMoistureValue = analogRead(SensorPin);  //put Sensor insert into soil
  
  Serial.print("Soil Moisture value : ");
  Serial.println(soilMoistureValue);

  soilmoisturepercent = map(soilMoistureValue, 790, 300, 0, 100);

  if (soilmoisturepercent > 100)
  {
    soilmoisturepercent = 100;
    Serial.print("Soil Moisture Percent : ");
    Serial.println("100 %");
    delay(250);
  }

  else if (soilmoisturepercent < 0)
  {
    soilmoisturepercent =0;
    Serial.print("Soil Moisture Percent : ");
    Serial.println("0 %");
    delay(250);
  }

  else if (soilmoisturepercent >= 0 && soilmoisturepercent <= 100)
  {
    Serial.print("Soil Moisture Percent : ");
    Serial.print(soilmoisturepercent);
    Serial.println("%");
    delay(250);

  }

  if (soilmoisturepercent >= 0 && soilmoisturepercent <= 30)
  {
    relay_state = 1;
    digitalWrite(relaypin, HIGH);
//    Serial.println("Motor is ON");
  }
  else if (soilmoisturepercent > 30 && soilmoisturepercent <= 100)
  {
    relay_state = 0;
    digitalWrite(relaypin, LOW);
//    Serial.println("Motor is OFF");
  }

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  Serial.print("Temperature : ");
  Serial.println(t);
  Serial.print("Humidity : ");
  Serial.print(h);
  Serial.println();

  ThingSpeak.setField(1,soilmoisturepercent);
  ThingSpeak.setField(2,h);
  ThingSpeak.setField(3,t);

  int respons = ThingSpeak.writeFields(chanelId,rightAPIkey);
 

  if (respons == 200) {
    Serial.println("Data upload sucessful");

  } else {
    Serial.println("Data upload unsucessful");

  }
  Serial.println("======================================");
  delay(15000);
}
