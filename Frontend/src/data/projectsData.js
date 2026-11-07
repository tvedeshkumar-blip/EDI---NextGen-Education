// NextGen Education - Project Lab Dataset
// Contains 12 complete, production-grade engineering design & innovation projects with problem statements,
// block diagrams, circuit wiring, full source code, code walkthroughs, testing methodologies, and troubleshooting.

export const projectsData = [
  {
    id: "auto-street-light",
    title: "Autonomous Smart Street Light with Energy Conservation",
    difficulty: "BEGINNER",
    category: "ELECTRONICS & AUTOMATION",
    estimatedCost: "₹250 - ₹350 ($3 - $4)",
    estimatedTime: "2 - 3 Hours",
    problemStatement: "Conventional municipal street lights operate on manual or timer schedules, leading to massive electrical energy waste during daylight hours and delayed activation during overcast stormy conditions. Over 30% of municipal electrical budgets are consumed by inefficient street lighting.",
    objective: "Design an autonomous, solid-state light-activated street lighting system that automatically turns on high-efficiency LED luminaires when ambient darkness falls and shuts them off at daybreak, eliminating human intervention and saving substantial energy.",
    description: "The system uses an LDR (Light Dependent Resistor) positioned in an optical voltage divider network with an adjustable sensitivity potentiometer. The divider output feeds the base of a BC547 NPN transistor acting as a saturation switch. When dusk arrives, LDR resistance surges to over 500kΩ, raising base voltage above 0.7V. The transistor conducts, activating a high-brightness LED luminaire or a 5V relay switching high-power LED floodlights.",
    componentsList: [
      { name: "LDR (Light Dependent Resistor 5mm)", qty: "1", role: "Ambient lux sensor" },
      { name: "BC547 NPN Transistor", qty: "1", role: "Solid-state electronic switch" },
      { name: "10kΩ Preset Potentiometer", qty: "1", role: "Twilight threshold calibration trimmer" },
      { name: "1kΩ 1/4W Resistor", qty: "1", role: "Transistor base current limiter" },
      { name: "220Ω 1/2W Resistor", qty: "1", role: "LED current limiting resistor" },
      { name: "Super-Bright White 10mm LED", qty: "1", role: "Street light luminaire" },
      { name: "5V 1A DC Power Adapter or 9V Battery", qty: "1", role: "System power source" },
      { name: "Enclosure box & Breadboard", qty: "1", role: "Physical assembly" }
    ],
    blockDiagram: "Ambient Light ──> [ LDR Sensor ] ──> [ Voltage Divider ] ──> [ BC547 BJT Driver ] ──> [ High-Power LED Lamp ] ──> Illumination",
    circuitDiagramNotes: "Supply +5V connects to Terminal 1 of the 10k potentiometer. Potentiometer wiper connects to Node A. Node A connects through the LDR to Ground. Node A also connects through a 1kΩ protection resistor to the Base of the BC547 transistor. The BC547 Emitter connects to Ground. The Collector connects to the Cathode of the White LED. The LED Anode connects through a 220Ω resistor to +5V.",
    wiringDetails: [
      "10k Pot Pin 1 ──> +5V DC",
      "10k Pot Wiper (Node A) ──> LDR Pin 1",
      "LDR Pin 2 ──> GND",
      "Node A ──> 1kΩ Resistor ──> BC547 Base (Pin 2)",
      "BC547 Emitter (Pin 3) ──> GND",
      "BC547 Collector (Pin 1) ──> White LED Cathode (-)",
      "White LED Anode (+) ──> 220Ω Resistor ──> +5V DC"
    ],
    procedure: [
      "Mount the BC547 transistor on the breadboard with its flat face toward you.",
      "Connect the Emitter (Pin 3) to the common ground rail.",
      "Insert the LDR between Node A and Ground.",
      "Wire the 10k potentiometer from +5V to Node A.",
      "Connect a 1kΩ resistor from Node A to the BC547 Base (Pin 2).",
      "Wire the White LED with a 220Ω resistor from the +5V rail into the BC547 Collector (Pin 1).",
      "Apply 5V power to the rails.",
      "Calibrate: In normal ambient room light, turn the potentiometer until the LED just extinguishes.",
      "Cover the LDR with an opaque object; verify that the LED turns on instantly.",
      "Uncover the sensor; verify the LED turns off cleanly."
    ],
    codeSnippet: `// Optional Microcontroller-based version with LDR & Relay:
const int LDR_PIN = A0;
const int LIGHT_RELAY = 7;
const int THRESHOLD = 400; // Calibrated twilight value

void setup() {
  pinMode(LIGHT_RELAY, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(LDR_PIN);
  Serial.print("Ambient Light: ");
  Serial.println(lightLevel);

  if (lightLevel < THRESHOLD) {
    digitalWrite(LIGHT_RELAY, LOW); // Turn street lamp ON
  } else {
    digitalWrite(LIGHT_RELAY, HIGH); // Turn street lamp OFF
  }
  delay(500);
}`,
    codeExplanation: "In the microcontroller variant, the analog pin A0 continuously digitizes the light level (0-1023). A software hysteresis loop compares the value against a threshold, activating the relay when darkness falls.",
    expectedOutput: "Smooth, automated streetlight switching that stays OFF during the day and turns ON instantaneously when daylight drops below the calibrated dusk threshold.",
    testingSteps: [
      "Measure base voltage in daylight: Should be below 0.55V (transistor in cutoff).",
      "Measure base voltage in darkness: Should rise above 0.72V (transistor saturated).",
      "Measure Vce across the transistor in darkness: Should measure ~0.15V.",
      "Simulate dawn/dusk transitions with a flashlight to verify rapid response."
    ],
    troubleshooting: [
      {
        issue: "LED oscillates / flickers rapidly when turned on",
        cause: "Optical feedback: Light from the street LED is reflecting back into the LDR, turning it off again.",
        solution: "Physically shield the LDR so it faces outward and cannot see its own lamp light."
      },
      {
        issue: "Light stays on all the time",
        cause: "LDR disconnected or potentiometer tuned too high.",
        solution: "Check LDR wiring and turn potentiometer to lower resistance."
      }
    ],
    applications: ["Highway lighting systems", "Campus and parking lot lamps", "Garden solar landscape lights", "Billboard illumination"],
    safety: "Keep low-voltage DC circuitry physically isolated from any AC mains wiring when using relays.",
    related: {
      componentIds: ["sensor-ldr", "bjt-bc547", "led", "resistor"],
      experimentIds: ["ldr-auto-light", "transistor-switch"],
      videoIds: ["vid-ldr-sensor-tutorial"],
      quizIds: ["quiz-sensors", "quiz-transistor-circuits"]
    }
  },
  {
    id: "smart-dustbin",
    title: "Touchless Smart Dustbin with Servo Lid Actuator",
    difficulty: "BEGINNER",
    category: "ROBOTICS & EMBEDDED",
    estimatedTime: "2 - 3 Hours",
    problemStatement: "Physical contact with contaminated trash can lids in hospitals, colleges, and public facilities is a leading vector for bacterial and viral pathogen transmission. Traditional foot-pedal bins suffer from mechanical fatigue and breakage.",
    objective: "Build an automated, sanitary, hands-free waste bin that utilizes ultrasonic sonar sensing to detect approaching hands, automatically opening the lid via an RC servo motor and closing it after a brief disposal delay.",
    description: "An HC-SR04 ultrasonic distance sensor is mounted flush with the top lip of the dustbin facing forward/upward. An Arduino continuously measures distance. When a user holds trash within 25 cm of the sensor, the Arduino commands an SG90 servo motor to rotate 90°, mechanically lifting the hinged lid via a lightweight linkage arm. After a 4-second delay, the servo gently returns to 0°, sealing the bin and suppressing odors.",
    componentsList: [
      { name: "Arduino Uno or Nano", qty: "1", role: "Control logic" },
      { name: "HC-SR04 Ultrasonic Sensor", qty: "1", role: "Touchless hand proximity detector" },
      { name: "TowerPro SG90 9g Micro Servo", qty: "1", role: "Mechanical lid actuation" },
      { name: "Small trash bin with hinged lid", qty: "1", role: "Physical chassis" },
      { name: "Rigid linkage wire / paperclip", qty: "1", role: "Servo-to-lid pushrod" },
      { name: "4x AA Battery Pack or 5V Power Bank", qty: "1", role: "Power source" }
    ],
    blockDiagram: "Human Hand ──> [ HC-SR04 Sonar ] ──> [ Arduino Microcontroller ] ──> [ SG90 Servo Motor ] ──> Lid Mechanism Opens",
    circuitDiagramNotes: "HC-SR04 VCC connects to Arduino 5V, GND to GND, TRIG to Pin 9, ECHO to Pin 10. Servo Brown/Black to GND, Red to 5V, Orange/Yellow to Pin 6.",
    wiringDetails: [
      "HC-SR04 VCC ──> Arduino 5V Rail",
      "HC-SR04 GND ──> Arduino GND Rail",
      "HC-SR04 TRIG ──> Arduino Pin 9",
      "HC-SR04 ECHO ──> Arduino Pin 10",
      "Servo GND (Brown) ──> Arduino GND",
      "Servo VCC (Red) ──> Arduino 5V (or external 5V)",
      "Servo Signal (Orange) ──> Arduino Pin 6 (PWM)"
    ],
    procedure: [
      "Drill two 16mm holes in the front face of the bin for the ultrasonic transmitter and receiver eyes.",
      "Mount the HC-SR04 securely with hot glue.",
      "Mount the SG90 servo inside the bin rim, aligning the servo arm with the lid hinge.",
      "Connect a rigid wire pushrod between the servo horn and the bin lid.",
      "Complete electrical breadboard wiring to the Arduino.",
      "Upload the Smart Dustbin sketch.",
      "Test hand gestures at 15cm; verify the lid lifts to 90°, stays open for 4 seconds, and closes softly."
    ],
    codeSnippet: `// NextGen Education - Project 02: Touchless Smart Dustbin
#include <Servo.h>

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int SERVO_PIN = 6;
const int OPEN_DIST_CM = 25; // Trigger distance

Servo lidServo;

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  lidServo.attach(SERVO_PIN);
  lidServo.write(0); // Lid closed
  Serial.begin(9600);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 25000);
  float distance = (duration * 0.0343) / 2.0;

  if (distance > 0 && distance <= OPEN_DIST_CM) {
    Serial.println("Hand detected! Opening lid...");
    lidServo.write(90); // Open lid
    delay(4000);        // Hold open for disposal
    lidServo.write(0);  // Close lid
    delay(1000);        // Debounce delay
  }
  delay(100);
}`,
    codeExplanation: "The Arduino continuously triggers an ultrasonic pulse. If an object is detected within 25cm, `lidServo.write(90)` swings the lid open. The non-blocking delay gives the user 4 seconds before `lidServo.write(0)` closes the container.",
    expectedOutput: "Instantaneous, quiet lid opening upon bringing trash within 25 cm of the bin, followed by automatic closure 4 seconds later.",
    testingSteps: [
      "Wave hand at 30cm: Lid should remain closed.",
      "Wave hand at 15cm: Lid should open smoothly to 90 degrees.",
      "Ensure servo arm does not bind against the plastic bin wall.",
      "Verify that repeated triggering does not reset the Arduino."
    ],
    troubleshooting: [
      {
        issue: "Servo twitches violently or Arduino resets when lid opens",
        cause: "Servo peak stall current exceeds the Arduino's on-board 5V regulator capacity.",
        solution: "Add a 470µF electrolytic capacitor across 5V and GND, or power servo from external 4xAA battery pack."
      }
    ],
    applications: ["Hospital sanitation & sterile rooms", "Smart campus cafeterias", "Touchless domestic kitchens", "Public rest areas"],
    safety: "Ensure children's fingers cannot be caught between the lid and rim during automatic closing.",
    related: {
      componentIds: ["sensor-ultrasonic", "arduino-uno", "potentiometer"],
      experimentIds: ["ultrasonic-distance", "servo-control"],
      videoIds: ["vid-ultrasonic-hc-sr04", "vid-servo-motor-arduino"],
      quizIds: ["quiz-sensors", "quiz-microcontrollers"]
    }
  },
  {
    id: "temperature-monitor",
    title: "Real-Time Temperature & Heat-Stroke Alert Station",
    difficulty: "BEGINNER",
    category: "SENSORS & EMBEDDED",
    estimatedTime: "2 - 3 Hours",
    problemStatement: "Heat exhaustion, heat-stroke in factory environments, and cold-chain vaccine spoilage occur because thermal anomalies are discovered only after damage has occurred. Low-cost real-time visual alerts and data readouts are essential for safety.",
    objective: "Construct an ambient thermal monitor that reads temperature and humidity in real-time, displays metrics on an alphanumeric I2C LCD, and triggers progressive multi-color visual and acoustic alarms when safety thresholds are breached.",
    description: "A DHT11 digital sensor captures temperature and humidity. An Arduino calculates Heat Index (perceived temperature taking humidity into account). Data is displayed on an I2C 16x2 LCD. A Green LED indicates safe conditions (<30°C), a Yellow LED warns of elevated temperature (30°C - 38°C), and a Red LED with intermittent piezo buzzer sounds a high-priority hazard alarm (>38°C).",
    componentsList: [
      { name: "Arduino Uno", qty: "1", role: "Data processing" },
      { name: "DHT11 Temperature & Humidity Sensor", qty: "1", role: "Thermal transducer" },
      { name: "16x2 Character LCD with I2C Backpack", qty: "1", role: "Live telemetry display" },
      { name: "Green, Yellow, Red 5mm LEDs", qty: "1 each", role: "Tri-color status tier" },
      { name: "220Ω Resistors", qty: "3", role: "LED current limiting" },
      { name: "5V Active Buzzer", qty: "1", role: "Audible alarm" },
      { name: "Breadboard & Wires", qty: "1 set", role: "Prototyping" }
    ],
    blockDiagram: "[ DHT11 Sensor ] ──> [ Arduino Uno ] ──> [ I2C 16x2 LCD ] + [ Green/Yellow/Red LEDs ] + [ Buzzer Alarm ]",
    circuitDiagramNotes: "DHT11 Pin 2 to Arduino Pin 2 (10k pull-up to 5V). LCD SDA to A4, SCL to A5. Green LED to Pin 5, Yellow to Pin 6, Red to Pin 7. Buzzer to Pin 8.",
    wiringDetails: [
      "DHT11 VCC / GND ──> Arduino 5V / GND",
      "DHT11 DATA ──> Arduino Pin 2",
      "LCD VCC / GND ──> Arduino 5V / GND",
      "LCD SDA ──> Arduino Pin A4",
      "LCD SCL ──> Arduino Pin A5",
      "LEDs: Green -> Pin 5, Yellow -> Pin 6, Red -> Pin 7 (via 220Ω)",
      "Buzzer (+) ──> Arduino Pin 8, Buzzer (-) ──> GND"
    ],
    procedure: [
      "Connect the I2C LCD backpack to Arduino 5V, GND, A4 (SDA), A5 (SCL).",
      "Wire the DHT11 sensor to Pin 2.",
      "Install the Green, Yellow, and Red LEDs on pins 5, 6, and 7 through 220Ω resistors.",
      "Connect the active buzzer to Pin 8.",
      "Upload the sketch, adjust the blue potentiometer on the rear of the LCD until text is sharp.",
      "Expose the sensor to a heat source (hair dryer or warm breath); observe the status transition from Green to Yellow to Red alarm."
    ],
    codeSnippet: `// NextGen Education - Project 03: Thermal Alert Station
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

const int LED_GREEN = 5;
const int LED_YELLOW = 6;
const int LED_RED = 7;
const int BUZZER = 8;

void setup() {
  dht.begin();
  lcd.init();
  lcd.backlight();
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  if (isnan(temp) || isnan(hum)) return;

  lcd.setCursor(0, 0);
  lcd.print("Temp: "); lcd.print(temp, 1); lcd.print(" C   ");
  lcd.setCursor(0, 1);
  lcd.print("Hum : "); lcd.print(hum, 0); lcd.print(" %    ");

  if (temp < 30.0) {
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_RED, LOW);
    digitalWrite(BUZZER, LOW);
  } else if (temp < 38.0) {
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_RED, LOW);
    digitalWrite(BUZZER, LOW);
  } else {
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_RED, HIGH);
    digitalWrite(BUZZER, HIGH); // Alarm sounds!
  }
  delay(1500);
}`,
    codeExplanation: "The program reads calibrated DHT11 metrics and writes them to the I2C screen. A multi-tier decision structure energizes appropriate color indicators and sounds the acoustic buzzer if extreme heat is registered.",
    expectedOutput: "Clean alphanumeric LCD readout with immediate tri-color state transitions and sound alerts when temperatures exceed safe limits.",
    testingSteps: [
      "At ambient room temp (~25°C): Green LED ON, buzzer silent.",
      "Gently warm sensor past 30°C: Green OFF, Yellow ON.",
      "Warm past 38°C: Red LED ON, buzzer sounds loud alarm."
    ],
    troubleshooting: [
      {
        issue: "LCD displays blank blue screen with no text",
        cause: "LCD contrast trimmer potentiometer is misadjusted or I2C address is 0x3F instead of 0x27.",
        solution: "Use a small screwdriver to turn the blue pot on the LCD backpack; run I2C scanner sketch to confirm address."
      }
    ],
    safetyNotes: ["Do not touch the sensor with an open flame or heated soldering iron."],
    applications: ["Industrial furnace perimeter safety", "Server rack thermal monitors", "Pharmaceutical storage monitoring", "Poultry incubator automation"],
    safety: "Ensure buzzer sound pressure does not exceed safe acoustic thresholds in quiet lab environments.",
    related: {
      componentIds: ["sensor-dht11", "display-lcd1602", "arduino-uno", "led"],
      experimentIds: ["temperature-measurement", "led-blink"],
      videoIds: ["vid-dht11-esp32", "vid-lcd-i2c-arduino"],
      quizIds: ["quiz-sensors", "quiz-microcontrollers"]
    }
  },
  {
    id: "obstacle-robot",
    title: "Autonomous Obstacle Avoidance Robotic Rover",
    difficulty: "INTERMEDIATE",
    category: "ROBOTICS & EMBEDDED",
    estimatedTime: "4 - 5 Hours",
    problemStatement: "Unmanned ground vehicles (UGVs), search-and-rescue rovers, and automated warehouse vehicles must navigate unfamiliar cluttered environments without human teleoperation or crashing into walls and obstacles.",
    objective: "Engineer a two-wheel drive autonomous robot rover that navigates forward, detects spatial impediments using a scanning ultrasonic turret, halts, scans left and right, and maneuvers along the clearest corridor.",
    description: "Built on an acrylic 2WD chassis with dual BO DC gearmotors driven by an L293D dual H-bridge motor driver. An HC-SR04 ultrasonic sensor is mounted on a front SG90 micro-servo motor. As the rover travels forward, the sensor continuously monitors ahead. If an obstacle appears within 20cm, the rover stops and reverses briefly. The servo scans 45° to the left, measures distance, scans 45° to the right, measures distance, and directs the wheels to turn toward whichever side offers the greater obstacle clearance.",
    componentsList: [
      { name: "Arduino Uno", qty: "1", role: "Rover brain & PID logic" },
      { name: "L293D Motor Driver Shield or IC", qty: "1", role: "Bidirectional DC motor H-bridge" },
      { name: "HC-SR04 Ultrasonic Sensor", qty: "1", role: "Front spatial radar" },
      { name: "SG90 Micro Servo Motor", qty: "1", role: "Ultrasonic sensor panning turret" },
      { name: "2WD Robot Chassis Kit (Motors + Wheels)", qty: "1", role: "Mechanical mobility" },
      { name: "2x 18650 Li-ion Batteries (7.4V)", qty: "1 set", role: "High-current motor power" },
      { name: "Jumper Wires & Switch", qty: "1 set", role: "Wiring harness" }
    ],
    blockDiagram: "[ Sonar Turret ] ──> [ Arduino Pathfinding ] ──> [ L293D H-Bridge ] ──> [ Left/Right Gearmotors ] ──> Autonomous Navigation",
    circuitDiagramNotes: "L293D IN1/IN2 to Arduino pins 3/4. IN3/IN4 to pins 7/8. ENA/ENB to PWM pins 5/6. Servo signal to Pin 11. Ultrasonic TRIG/ECHO to pins 9/10. 7.4V battery supplies motor shield VCC2 directly.",
    wiringDetails: [
      "Arduino Pin 3, 4 ──> Motor Driver IN1, IN2 (Left Motor)",
      "Arduino Pin 7, 8 ──> Motor Driver IN3, IN4 (Right Motor)",
      "Arduino Pin 5, 6 (PWM) ──> Driver ENA, ENB (Speed)",
      "Arduino Pin 9, 10 ──> HC-SR04 TRIG, ECHO",
      "Arduino Pin 11 ──> SG90 Servo Signal",
      "7.4V Li-ion Battery (+) ──> Driver Motor VCC2",
      "Common GND ──> Battery (-), Driver GND, Arduino GND"
    ],
    procedure: [
      "Assemble the 2WD mechanical chassis, mount the DC gearmotors, and fit the wheels.",
      "Mount the SG90 servo facing forward on the front chassis nose.",
      "Attach the HC-SR04 sensor bracket onto the servo horn.",
      "Mount the Arduino Uno and L293D driver.",
      "Connect motor leads and signal control wires.",
      "Upload the Autonomous Navigation sketch.",
      "Place robot on the floor, power on, and observe it explore the room, navigating around chair legs and walls autonomously."
    ],
    codeSnippet: `// NextGen Education - Project 04: Obstacle Avoidance Rover
#include <Servo.h>

const int TRIG = 9, ECHO = 10, SERVO_PIN = 11;
const int IN1 = 3, IN2 = 4, IN3 = 7, IN4 = 8;
const int ENA = 5, ENB = 6;

Servo neck;

void forward() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, 180);   analogWrite(ENB, 180);
}

void backward() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  delay(300);
}

void stopMotors() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}

void turnLeft() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  delay(400);
}

void turnRight() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  delay(400);
}

int getDistance() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long d = pulseIn(ECHO, HIGH, 25000);
  return (d == 0) ? 250 : (d * 0.0343) / 2;
}

void setup() {
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  neck.attach(SERVO_PIN);
  neck.write(90); // Center
  delay(1000);
}

void loop() {
  int dist = getDistance();
  if (dist > 20) {
    forward();
  } else {
    stopMotors();
    backward();
    stopMotors();

    neck.write(45);  delay(300); int rightDist = getDistance();
    neck.write(135); delay(400); int leftDist = getDistance();
    neck.write(90);  delay(200);

    if (leftDist > rightDist) {
      turnLeft();
    } else {
      turnRight();
    }
  }
}`,
    codeExplanation: "The rover moves forward while front distance exceeds 20cm. When blocked, it halts, reverses slightly, pans the ultrasonic servo to 45° (right) and 135° (left), compares open pathways, and pivots on the spot toward the direction with maximum free space.",
    expectedOutput: "Smooth, continuous autonomous exploration without collisions against static or moving obstacles.",
    testingSteps: [
      "Test wheel directions: Verify both wheels spin forward during forward() command.",
      "Place box in front of moving rover: Rover must brake within 20cm and scan.",
      "Check turning agility on smooth floor versus carpet."
    ],
    troubleshooting: [
      {
        issue: "Robot turns when it should go straight",
        cause: "One DC motor has slightly different internal gearbox friction than the other.",
        solution: "Adjust individual motor PWM speed (ENA vs ENB) to trim tracking."
      }
    ],
    applications: ["Automated floor cleaners (Robo-vacs)", "Search and rescue mapping rovers", "Autonomous factory material movers", "Agricultural scouting robots"],
    safety: "Keep hair and loose cables clear of spinning drive wheel axles.",
    related: {
      componentIds: ["ic-l293d", "sensor-ultrasonic", "arduino-uno", "mosfet-irfz44n"],
      experimentIds: ["dc-motor-control", "servo-control", "ultrasonic-distance"],
      videoIds: ["vid-l293d-motor-driver", "vid-ultrasonic-hc-sr04"],
      quizIds: ["quiz-microcontrollers", "quiz-sensors"]
    }
  },
  {
    id: "iot-weather-station",
    title: "IoT Wireless Weather Station with Cloud Telemetry",
    difficulty: "INTERMEDIATE",
    category: "IoT & WIRELESS",
    estimatedTime: "3 - 4 Hours",
    problemStatement: "Microclimates within agricultural fields, urban heat islands, and university campuses fluctuate dramatically compared to regional airport weather forecasts, causing poor crop irrigation planning and HVAC energy waste.",
    objective: "Construct a compact, Wi-Fi connected wireless meteorological station using an ESP32 that captures atmospheric pressure, ambient temperature, relative humidity, and light intensity, streaming telemetry to Google Firebase Firestore in real-time.",
    description: "The station combines a DHT11/DHT22 temperature and humidity sensor with a GL5528 LDR solar irradiance sensor interfaced with an ESP32 microcontroller. The ESP32 wakes up periodically, reads environmental sensors, packages metrics into a JSON object, connects to the local Wi-Fi router, and streams document updates to Google Firebase. The NextGen Education cloud dashboard renders live gauge charts, historical trends, and precipitation probability.",
    componentsList: [
      { name: "ESP32-WROOM-32 Dev Board", qty: "1", role: "Wi-Fi IoT processor" },
      { name: "DHT11 / DHT22 Sensor", qty: "1", role: "Temperature & Humidity" },
      { name: "5mm LDR + 10kΩ Resistor", qty: "1", role: "Solar lux measurement" },
      { name: "I2C 0.96-inch OLED or 16x2 LCD", qty: "1", role: "Local field display" },
      { name: "3.7V 18650 Li-ion Battery with TP4056 Charger", qty: "1", role: "Solar/battery power" },
      { name: "Weatherproof Enclosure with vents", qty: "1", role: "Outdoor protection" }
    ],
    blockDiagram: "[ DHT11 + LDR ] ──> [ ESP32 Microcontroller ] ──> [ 2.4GHz Wi-Fi ] ──> [ Google Firebase Cloud ] ──> [ NextGen Web Dashboard ]",
    circuitDiagramNotes: "DHT11 DATA connects to ESP32 GPIO 4. LDR divider midpoint connects to ADC GPIO 34. I2C OLED SDA to GPIO 21, SCL to GPIO 22. ESP32 powered via 3.3V LDO regulator.",
    wiringDetails: [
      "DHT11 VCC / GND ──> ESP32 3V3 / GND",
      "DHT11 DATA ──> ESP32 GPIO 4 (10k pull-up to 3V3)",
      "LDR Leg 1 ──> ESP32 3V3",
      "LDR Leg 2 ──> ESP32 GPIO 34 + 10k Resistor to GND",
      "OLED SDA / SCL ──> ESP32 GPIO 21 / 22"
    ],
    procedure: [
      "Mount the ESP32 and sensors on the prototyping board.",
      "Ensure all sensors operate at 3.3V logic (do NOT connect 5V to ESP32 ADC pins).",
      "Configure Firebase project credentials in the ESP32 firmware sketch.",
      "Upload the code to ESP32, verify Wi-Fi connection handshake on Serial Monitor.",
      "Observe initial document push in Firebase Console under collection `weatherStation`.",
      "Open NextGen Education Student Dashboard to watch live telemetry updates in real-time."
    ],
    codeSnippet: `// NextGen Education - Project 05: IoT Cloud Weather Station
#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT11

const char* ssid = "CAMPUS_WIFI";
const char* password = "WIFI_PASSWORD";
const char* firebaseUrl = "https://nextgen-education-68702.firebaseio.com/weather.json";

DHT dht(DHTPIN, DHTTYPE);
const int LDR_PIN = 34;

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\\nConnected to Wi-Fi!");
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int ldrRaw = analogRead(LDR_PIN);
  float luxRatio = map(ldrRaw, 0, 4095, 0, 100);

  if (WiFi.status() == WL_CONNECTED && !isnan(temp)) {
    HTTPClient http;
    http.begin(firebaseUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\\"temp\\":" + String(temp, 1) + 
                  ",\\"hum\\":" + String(hum, 0) + 
                  ",\\"lightPct\\":" + String(luxRatio, 0) + 
                  ",\\"timestamp\\":\\"now\\"}";

    int code = http.PUT(json);
    Serial.println("Firebase Response Code: " + String(code));
    http.end();
  }
  delay(15000); // Upload every 15 seconds
}`,
    codeExplanation: "The ESP32 reads calibrated environmental metrics every 15 seconds, serializes them into a JSON payload, and executes an HTTP PUT command directly to the Firebase Realtime REST endpoint.",
    expectedOutput: "Continuous, global wireless meteorological updates reflecting real-world weather trends accessible on any web browser.",
    testingSteps: [
      "Verify ESP32 reconnects automatically after simulated Wi-Fi router reboot.",
      "Expose station to direct sunshine; verify lightPct rises from ~20% to >90%.",
      "Check that payload timestamp syncs with cloud server time."
    ],
    troubleshooting: [
      {
        issue: "HTTP Response code -1 (Connection failed)",
        cause: "Wi-Fi signal weak or firewall blocking outgoing HTTPS port 443.",
        solution: "Move station closer to Wi-Fi access point and verify credentials."
      }
    ],
    applications: ["Precision smart agriculture irrigation", "Campus environmental tracking", "Renewable solar efficiency monitoring", "Smart city air index"],
    safety: "Ensure lithium-ion battery has a protection circuit module (PCM) preventing overcharge or deep discharge.",
    related: {
      componentIds: ["esp32-wroom", "sensor-dht11", "sensor-ldr", "display-lcd1602"],
      experimentIds: ["esp32-telemetry", "iot-cloud-monitoring", "temperature-measurement"],
      videoIds: ["vid-esp32-firebase-tutorial", "vid-dht11-esp32"],
      quizIds: ["quiz-iot-embedded", "quiz-sensors"]
    }
  },
  {
    id: "smart-energy-monitoring",
    title: "Smart AC Energy & Current Monitoring System",
    difficulty: "ADVANCED",
    category: "ELECTRONICS & POWER",
    estimatedTime: "4 - 5 Hours",
    problemStatement: "Household and laboratory energy wastage goes unnoticed until monthly utility bills arrive. Without appliance-level real-time power metrics, identifying faulty high-consumption loads or power-factor degradation is nearly impossible.",
    objective: "Build a non-invasive AC current and energy monitoring station using a split-core current transformer (CT) sensor to calculate RMS Current, Active Power (Watts), and Total Energy consumed (kWh).",
    description: "Utilizes an SCT-013-000 100A non-invasive split-core Current Transformer clamped around only the Live AC conductor. The secondary coil generates a proportional mA output that develops a small AC voltage across an internal burden resistor. The AC waveform is DC-biased to 2.5V via a voltage divider to allow safe sampling by an Arduino ADC. The OpenEnergyMonitor EmonLib library performs continuous root-mean-square (RMS) mathematical integration over complete 50 Hz AC cycles.",
    componentsList: [
      { name: "SCT-013-000 Split-Core CT Sensor (100A/50mA)", qty: "1", role: "Non-invasive AC current sensing" },
      { name: "Arduino Uno", qty: "1", role: "RMS numerical integration" },
      { name: "Burden Resistor 33Ω 1% Metal Film", qty: "1", role: "Converts CT current to AC voltage" },
      { name: "10kΩ Precision Resistors", qty: "2", role: "2.5V DC mid-rail bias divider" },
      { name: "10µF Electrolytic Capacitor", qty: "1", role: "AC grounding for mid-rail bias" },
      { name: "I2C 16x2 LCD or OLED Display", qty: "1", role: "Power & kWh readout" }
    ],
    blockDiagram: "[ AC Load 230V ] ──> [ SCT-013 CT Clamp ] ──> [ Burden + 2.5V Bias ] ──> [ Arduino ADC ] ──> [ Real-Time Watts & kWh ]",
    circuitDiagramNotes: "33Ω burden resistor connected directly across CT sensor output leads. Two 10k resistors form a voltage divider from 5V to GND with a 10µF capacitor to GND, creating a stable 2.5V DC virtual ground. One CT lead connects to 2.5V; the other connects to Arduino Analog Pin A0.",
    wiringDetails: [
      "10k Resistor 1 ──> 5V to Node Bias",
      "10k Resistor 2 ──> Node Bias to GND",
      "10µF Capacitor ──> Node Bias (+) to GND (-)",
      "CT Lead 1 ──> Node Bias (2.5V)",
      "CT Lead 2 ──> Arduino Analog Pin A0",
      "33Ω Burden Resistor placed between CT Lead 1 and CT Lead 2"
    ],
    procedure: [
      "Assemble the signal conditioning circuit (burden resistor + 2.5V bias divider) on breadboard.",
      "Connect CT 3.5mm audio jack terminals to the burden resistor.",
      "Clamp the SCT-013 around a SINGLE insulated AC wire (Live wire only, NEVER both Live and Neutral!).",
      "Upload sketch with EmonLib library.",
      "Calibrate against a known resistive load (e.g. 100W incandescent bulb or 1000W electric kettle).",
      "Observe accurate Irms and Active Power readings on Serial Monitor."
    ],
    codeSnippet: `// NextGen Education - Project 06: Smart Energy Monitor
#include "EmonLib.h"

EnergyMonitor emon1;
const int VOLTS_MAINS = 230; // Nominal AC grid voltage

void setup() {
  Serial.begin(9600);
  emon1.current(A0, 60.6); // Current input pin, calibration factor
}

void loop() {
  double Irms = emon1.calcIrms(1480); // Sample 1480 points (~30 half-cycles)
  double apparentPower = Irms * VOLTS_MAINS;

  Serial.print("Current: ");
  Serial.print(Irms, 2);
  Serial.print(" A | Power: ");
  Serial.print(apparentPower, 1);
  Serial.println(" W");
  delay(1000);
}`,
    codeExplanation: "EmonLib samples the analog input over multiple full 50Hz cycles, computes the root mean square of instantaneous current samples, removes the 2.5V DC offset, and multiplies by calibration constants to obtain precise AC Amperes.",
    expectedOutput: "Accurate RMS current and power measurement showing 0.00A when appliances are off, and ~4.35A when a 1000W heater is activated.",
    testingSteps: [
      "Test with no load: Reading should stabilize under 0.05A (noise floor).",
      "Clamp around 60W lightbulb: Should register ~0.26A @ 230V (~60W).",
      "Verify that clamping around a two-conductor zip cord reads 0A (opposing magnetic fields cancel)."
    ],
    troubleshooting: [
      {
        issue: "CT sensor shows 0.00A even with heavy microwave running",
        cause: "Clamped around both Live and Neutral wires simultaneously. The equal and opposite magnetic fields cancel each other out.",
        solution: "Separate the outer jacket of the power cord and clamp the sensor around ONLY the Live (Brown/Black) wire."
      }
    ],
    applications: ["Solar PV generation vs home consumption", "Sub-metering student rental apartments", "Factory motor preventative maintenance", "Carbon footprint calculators"],
    safety: "CRITICAL: The split-core CT provides galvanic isolation, but clamping onto high-voltage AC conductors requires caution. NEVER puncture wire insulation.",
    related: {
      componentIds: ["resistor", "capacitor", "arduino-uno", "display-lcd1602"],
      experimentIds: ["ohms-law", "relay-control"],
      videoIds: ["vid-current-sensor-ac"],
      quizIds: ["quiz-power-supplies", "quiz-fundamentals"]
    }
  },
  {
    id: "touch-based-light",
    title: "Capacitive Touch-Controlled Mood Lighting System",
    difficulty: "BEGINNER",
    category: "ELECTRONICS & EMBEDDED",
    estimatedTime: "2 Hours",
    problemStatement: "Mechanical switches suffer from contact bounce, mechanical wear, dust ingress, and lack the sleek aesthetics of modern solid-state glass interfaces.",
    objective: "Design a capacitive touch switch that toggles an LED luminaire with a soft finger tap and cycles color brightness levels without mechanical moving parts.",
    description: "Utilizes a TTP223 capacitive touch sensor module or the ESP32's native built-in hardware capacitive touch pins (T0 - T9). The human body carries natural capacitance. When a finger approaches the conductive copper touch pad, the dielectric constant changes, altering the internal RC charge time. An internal comparator triggers a clean digital latch signal to cycle lighting modes.",
    componentsList: [
      { name: "TTP223 Capacitive Touch Module or ESP32", qty: "1", role: "Touch detector" },
      { name: "RGB LED Module (Common Cathode)", qty: "1", role: "Mood light luminaire" },
      { name: "220Ω Resistors", qty: "3", role: "RGB current limiters" },
      { name: "Breadboard & Wires", qty: "1 set", role: "Assembly" }
    ],
    blockDiagram: "Finger Touch ──> [ Capacitive Sensor ] ──> [ Microcontroller State Machine ] ──> [ RGB Mood LED ]",
    circuitDiagramNotes: "TTP223 VCC to 5V, GND to GND, I/O to Arduino Pin 2. RGB LED Red to Pin 9, Green to Pin 10, Blue to Pin 11 (all PWM pins) through 220Ω resistors. Common Cathode to GND.",
    wiringDetails: [
      "TTP223 VCC / GND ──> Arduino 5V / GND",
      "TTP223 OUT ──> Arduino Digital Pin 2",
      "Arduino Pin 9 ──> 220Ω Resistor ──> RGB Red",
      "Arduino Pin 10 ──> 220Ω Resistor ──> RGB Green",
      "Arduino Pin 11 ──> 220Ω Resistor ──> RGB Blue",
      "RGB Common Pin ──> Arduino GND"
    ],
    procedure: [
      "Assemble the RGB LED and TTP223 module on breadboard.",
      "Upload the state-machine sketch.",
      "Tap touch sensor: Mode 1 (Warm White).",
      "Tap again: Mode 2 (Cool Cyan).",
      "Tap again: Mode 3 (Relaxing Purple).",
      "Tap again: Mode 4 (Smooth Rainbow Fade).",
      "Tap again: Turns OFF completely."
    ],
    codeSnippet: `// NextGen Education - Project 07: Capacitive Touch Lamp
const int TOUCH_PIN = 2;
const int RED_PIN = 9, GREEN_PIN = 10, BLUE_PIN = 11;

int mode = 0;
bool lastTouch = false;

void setColor(int r, int g, int b) {
  analogWrite(RED_PIN, r);
  analogWrite(GREEN_PIN, g);
  analogWrite(BLUE_PIN, b);
}

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  setColor(0, 0, 0); // Off
}

void loop() {
  bool currentTouch = digitalRead(TOUCH_PIN);
  if (currentTouch && !lastTouch) {
    mode = (mode + 1) % 5;
    delay(50); // Debounce
  }
  lastTouch = currentTouch;

  switch(mode) {
    case 0: setColor(0, 0, 0); break;       // OFF
    case 1: setColor(255, 180, 50); break;  // Warm White
    case 2: setColor(0, 255, 200); break;   // Aqua / Cyan
    case 3: setColor(180, 0, 255); break;   // Ambient Purple
    case 4: setColor(255, 50, 50); break;   // Soft Red
  }
  delay(20);
}`,
    codeExplanation: "A software edge-detection detector triggers state transitions on rising touch edges, cycling through pre-programmed RGB color palettes.",
    expectedOutput: "Immediate, responsive color transitions upon the lightest fingertip contact with the sensor pad.",
    testingSteps: [
      "Test touching through 3mm acrylic or glass pane to confirm non-contact touch sensitivity.",
      "Verify rapid double-taps do not cause erratic state skipping."
    ],
    troubleshooting: [
      {
        issue: "Touch sensor stays HIGH permanently",
        cause: "Solder jumper 'A' or 'B' bridged in latching mode instead of momentary mode.",
        solution: "Configure TTP223 solder jumpers for momentary active-HIGH output."
      }
    ],
    applications: ["Modern hotel bedside lamps", "Sterile medical room lighting switches", "Automotive dashboard controls"],
    safety: "Low voltage 5V safe experiment.",
    related: {
      componentIds: ["led", "resistor", "arduino-uno"],
      experimentIds: ["led-pwm", "led-blink"],
      videoIds: ["vid-pwm-explained"],
      quizIds: ["quiz-fundamentals"]
    }
  },
  {
    id: "voice-based-smart-light",
    title: "Voice & Bluetooth Activated Smart Home Appliance Control",
    difficulty: "INTERMEDIATE",
    category: "IoT & WIRELESS",
    estimatedTime: "3 - 4 Hours",
    problemStatement: "Elderly and physically impaired individuals frequently struggle to reach physical wall switches in living spaces, posing significant fall hazards in the dark.",
    objective: "Implement a smartphone voice-controlled appliance automation hub utilizing Bluetooth serial communication to interpret spoken English commands and switch home AC appliances.",
    description: "An HC-05 Bluetooth serial module interfaces with an Arduino Uno or ESP32. A paired smartphone runs Google Voice Recognition. When the user speaks 'Turn on fan' or 'Lights off', the phone's speech-to-text engine sends single-character command tokens ('A', 'a', 'B', 'b') over RFCOMM Bluetooth serial. The microcontroller decodes the character and toggles optoisolated relay channels accordingly.",
    componentsList: [
      { name: "Arduino Uno", qty: "1", role: "Command interpreter" },
      { name: "HC-05 or HC-06 Bluetooth Module", qty: "1", role: "Wireless 2.4GHz serial link" },
      { name: "5V Dual Channel Relay Module", qty: "1", role: "AC load switching" },
      { name: "Smartphone with Bluetooth Terminal App", qty: "1", role: "Voice input console" },
      { name: "Resistors (1kΩ and 2kΩ for level shifter)", qty: "2", role: "3.3V RX protection" }
    ],
    blockDiagram: "User Voice ──> [ Smartphone Speech-to-Text ] ──> [ Bluetooth RF ] ──> [ HC-05 Module ] ──> [ Arduino ] ──> [ Relay ]",
    circuitDiagramNotes: "HC-05 VCC to 5V, GND to GND, TXD to Arduino Pin 2 (SoftRX). HC-05 RXD connects through a voltage divider (1kΩ and 2kΩ) to Arduino Pin 3 (SoftTX) to safely step down 5V logic to 3.3V.",
    wiringDetails: [
      "HC-05 VCC / GND ──> Arduino 5V / GND",
      "HC-05 TXD ──> Arduino Pin 2",
      "Arduino Pin 3 ──> 1kΩ Resistor ──> HC-05 RXD",
      "HC-05 RXD ──> 2kΩ Resistor ──> GND",
      "Arduino Pin 7 ──> Relay IN1",
      "Arduino Pin 8 ──> Relay IN2"
    ],
    procedure: [
      "Connect HC-05 with voltage divider on the RX pin.",
      "Pair HC-05 with smartphone (default PIN: 1234 or 0000).",
      "Upload SoftwareSerial sketch to Arduino.",
      "Open Bluetooth Terminal app on phone and connect to HC-05.",
      "Speak 'Light On' into voice button; verify Relay 1 clicks ON.",
      "Speak 'Light Off'; verify Relay 1 clicks OFF."
    ],
    codeSnippet: `// NextGen Education - Project 08: Bluetooth Voice Controller
#include <SoftwareSerial.h>

SoftwareSerial btSerial(2, 3); // RX, TX
const int RELAY_LIGHT = 7;
const int RELAY_FAN = 8;

void setup() {
  pinMode(RELAY_LIGHT, OUTPUT);
  pinMode(RELAY_FAN, OUTPUT);
  digitalWrite(RELAY_LIGHT, HIGH); // Off (active low)
  digitalWrite(RELAY_FAN, HIGH);
  btSerial.begin(9600);
}

void loop() {
  if (btSerial.available()) {
    char cmd = btSerial.read();
    if (cmd == 'A' || cmd == '1') digitalWrite(RELAY_LIGHT, LOW);  // Light ON
    if (cmd == 'a' || cmd == '0') digitalWrite(RELAY_LIGHT, HIGH); // Light OFF
    if (cmd == 'B' || cmd == '2') digitalWrite(RELAY_FAN, LOW);    // Fan ON
    if (cmd == 'b' || cmd == '3') digitalWrite(RELAY_FAN, HIGH);   // Fan OFF
  }
}`,
    codeExplanation: "Incoming serial characters from the Bluetooth bridge trigger deterministic digital logic states on the relay pins, giving hands-free voice automation.",
    expectedOutput: "Zero-latency appliance toggling responding to voice commands from anywhere within a 10-meter Bluetooth radius.",
    testingSteps: [
      "Verify connection range: Should maintain stable link up to 10 meters through walls.",
      "Test custom voice macros configured in smartphone app."
    ],
    troubleshooting: [
      {
        issue: "HC-05 will not pair with smartphone",
        cause: "HC-05 LED flashing very fast indicates pairing mode; slow 2-second flash indicates AT command mode.",
        solution: "Unplug EN/KEY pin during power-up to ensure normal pairing mode."
      }
    ],
    applications: ["Assistive tech for elderly & disabled", "Smart hotel room automation", "Industrial hands-free tool control"],
    safety: "Follow standard AC mains precautions when wiring high-voltage loads to the relay.",
    related: {
      componentIds: ["relay-module", "arduino-uno", "bjt-bc547"],
      experimentIds: ["relay-control", "transistor-switch"],
      videoIds: ["vid-relay-module-arduino"],
      quizIds: ["quiz-power-supplies", "quiz-microcontrollers"]
    }
  },
  {
    id: "esp32-sensor-monitoring",
    title: "ESP32 Industrial Sensor Telemetry & OLED Dashboard",
    difficulty: "INTERMEDIATE",
    category: "EMBEDDED & IoT",
    estimatedTime: "3 Hours",
    problemStatement: "In high-noise industrial plant environments, engineers need reliable real-time sensor readouts both at the physical machine terminal (via high-contrast OLED) and remotely via a wireless network.",
    objective: "Create a dual-display sensor acquisition node using the ESP32 that samples multi-channel analog and I2C sensors, renders graphical waveforms on a 128x64 OLED display, and transmits metrics over local Wi-Fi.",
    description: "The system interfaces an MPU-6050 6-axis inertial measurement unit (IMU) and an analog gas sensor to an ESP32. An SSD1306 0.96-inch monochrome OLED provides high-speed 30 FPS telemetry screens displaying pitch, roll, and air quality bars. A background FreeRTOS task handles Wi-Fi telemetry broadcasting concurrently.",
    componentsList: [
      { name: "ESP32-WROOM-32", qty: "1", role: "Dual-core processor" },
      { name: "MPU-6050 6-Axis IMU", qty: "1", role: "Motion/tilt transducer" },
      { name: "0.96 inch I2C OLED Display (128x64)", qty: "1", role: "Real-time graphic display" },
      { name: "MQ-2 Gas / Smoke Sensor", qty: "1", role: "Environmental safety" },
      { name: "Breadboard & Wires", qty: "1 set", role: "Wiring" }
    ],
    blockDiagram: "[ MPU6050 + MQ2 ] ──> [ ESP32 Dual-Core (FreeRTOS) ] ──> [ OLED 30 FPS ] + [ Wi-Fi Web Telemetry ]",
    circuitDiagramNotes: "Both MPU-6050 and OLED share the hardware I2C bus: SDA to GPIO 21, SCL to GPIO 22. MQ-2 Analog A0 connects to ADC GPIO 35.",
    wiringDetails: [
      "OLED & MPU6050 VCC / GND ──> ESP32 3V3 / GND",
      "OLED SDA & MPU6050 SDA ──> ESP32 GPIO 21",
      "OLED SCL & MPU6050 SCL ──> ESP32 GPIO 22",
      "MQ-2 A0 ──> ESP32 GPIO 35 (via resistor divider)"
    ],
    procedure: [
      "Wire the shared I2C bus on breadboard.",
      "Install Adafruit SSD1306 and Adafruit MPU6050 libraries.",
      "Upload sketch.",
      "Tilt the breadboard; watch pitch and roll gauges rotate on the OLED in real-time.",
      "Introduce test smoke near MQ-2; observe danger warning banner pop up on the display."
    ],
    codeSnippet: `// NextGen Education - Project 09: ESP32 Multi-Sensor Station
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_MPU6050.h>

Adafruit_SSD1306 display(128, 64, &Wire, -1);
Adafruit_MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  mpu.begin();
  display.clearDisplay();
  display.setTextColor(WHITE);
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("NextGen Telemetry");
  display.drawLine(0, 10, 128, 10, WHITE);

  display.setCursor(0, 16);
  display.print("Accel X: "); display.println(a.acceleration.x, 1);
  display.print("Accel Y: "); display.println(a.acceleration.y, 1);
  display.print("Accel Z: "); display.println(a.acceleration.z, 1);
  display.print("Die Temp: "); display.print(temp.temperature, 1); display.println(" C");

  display.display();
  delay(100);
}`,
    codeExplanation: "Leverages hardware I2C bus multiplexing to poll MEMS accelerometer registers and update frame buffers at 10 Hz without flicker.",
    expectedOutput: "Ultra-crisp, high-contrast dynamic telemetry visualization responding instantaneously to physical orientation changes.",
    testingSteps: [
      "Rotate board 90 degrees: Accel X/Y should reflect 1g (9.8 m/s²) gravitational vector.",
      "Verify OLED updates without tearing or freezing."
    ],
    troubleshooting: [
      {
        issue: "OLED initialization fails (display.begin returns false)",
        cause: "Incorrect I2C address (0x3C vs 0x3D) or loose SDA/SCL pull-ups.",
        solution: "Run I2C scanner sketch to verify 0x3C and 0x68 are visible on bus."
      }
    ],
    applications: ["Drone avionics HUD", "Industrial vibration analyzer", "Crane tilt safety monitoring"],
    safety: "Keep sensor leads short (<15cm) on 400kHz I2C buses to prevent signal reflection glitches.",
    related: {
      componentIds: ["esp32-wroom", "sensor-mpu6050", "sensor-mq2"],
      experimentIds: ["esp32-telemetry", "servo-control"],
      videoIds: ["vid-mpu6050-accelerometer", "vid-esp32-firebase-tutorial"],
      quizIds: ["quiz-iot-embedded", "quiz-sensors"]
    }
  },
  {
    id: "security-alert-system",
    title: "Smart Intruder & Security Alert System with PIR & Buzzer",
    difficulty: "INTERMEDIATE",
    category: "SECURITY & EMBEDDED",
    estimatedTime: "2 - 3 Hours",
    problemStatement: "Unattended laboratory equipment and dormitory rooms are vulnerable to unauthorized intrusions and theft. Traditional security alarms lack user arm/disarm capabilities and silent notification modes.",
    objective: "Construct an intelligent intruder alert system featuring PIR human thermal motion sensing, an arming delay countdown, a loud 95dB piezo siren, and status LEDs.",
    description: "An HC-SR501 PIR sensor monitors an 8-meter room zone. An Arduino implements an armed/disarmed security state machine. When armed via a secret push-button sequence, a 15-second entry/exit delay allows authorized departure. Once active, any detected human thermal motion triggers a flashing red strobe and an escalating warble alarm on a piezo buzzer.",
    componentsList: [
      { name: "HC-SR501 PIR Motion Sensor", qty: "1", role: "Human thermal motion detection" },
      { name: "Arduino Uno or Nano", qty: "1", role: "Security controller" },
      { name: "High-Output Piezo Buzzer", qty: "1", role: "Siren generator" },
      { name: "Red and Green LEDs + 220Ω Resistors", qty: "1 set", role: "Armed/Disarmed status" },
      { name: "Tactile Pushbutton", qty: "1", role: "Arming key switch" },
      { name: "Breadboard & Wires", qty: "1 set", role: "Assembly" }
    ],
    blockDiagram: "[ PIR Motion Sensor ] ──> [ Arduino State Machine ] ──> [ Armed/Alarm Status LEDs ] + [ 95dB Piezo Siren ]",
    circuitDiagramNotes: "PIR OUT to Arduino Pin 2 (external interrupt capable). Arming button to Pin 3 (internal pull-up). Buzzer to Pin 9. Green LED (Armed) to Pin 5. Red LED (Alarm) to Pin 6.",
    wiringDetails: [
      "PIR VCC / GND ──> 5V / GND",
      "PIR OUT ──> Arduino Pin 2",
      "Arming Button ──> Pin 3 to GND",
      "Piezo Buzzer (+) ──> Arduino Pin 9 (PWM for tone generation)",
      "Green LED ──> Pin 5 via 220Ω to GND",
      "Red LED ──> Pin 6 via 220Ω to GND"
    ],
    procedure: [
      "Wire the PIR sensor, button, LEDs, and buzzer.",
      "Allow 60 seconds for the PIR sensor's pyroelectric crystal to stabilize.",
      "Press arming button: Green LED blinks for 15 seconds during exit delay.",
      "Green LED turns solid ON (System Armed).",
      "Walk in front of the PIR sensor; observe Red LED strobe and loud police siren warble sound from buzzer."
    ],
    codeSnippet: `// NextGen Education - Project 10: Security Alert System
const int PIR_PIN = 2, BUTTON_PIN = 3, BUZZER = 9;
const int LED_ARMED = 5, LED_ALARM = 6;

bool isArmed = false;
bool isAlarming = false;

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(BUZZER, OUTPUT);
  pinMode(LED_ARMED, OUTPUT);
  pinMode(LED_ALARM, OUTPUT);
}

void loop() {
  // Toggle arming state with button
  if (digitalRead(BUTTON_PIN) == LOW) {
    isArmed = !isArmed;
    isAlarming = false;
    digitalWrite(LED_ALARM, LOW);
    noTone(BUZZER);
    delay(500); // Debounce
  }

  digitalWrite(LED_ARMED, isArmed ? HIGH : LOW);

  if (isArmed) {
    if (digitalRead(PIR_PIN) == HIGH) {
      isAlarming = true;
    }
  }

  if (isAlarming) {
    digitalWrite(LED_ALARM, HIGH);
    // Warble siren
    for (int hz = 600; hz < 1200; hz += 20) {
      tone(BUZZER, hz);
      delay(10);
    }
    for (int hz = 1200; hz > 600; hz -= 20) {
      tone(BUZZER, hz);
      delay(10);
    }
  } else {
    noTone(BUZZER);
    digitalWrite(LED_ALARM, LOW);
  }
}`,
    codeExplanation: "Implements software state transitions between DISARMED, ARMED, and ALARM states, utilizing algorithmic frequency ramping to synthesize a loud psychoacoustic siren tone.",
    expectedOutput: "Rock-solid intrusion detection that ignores stationary room items but instantly fires alarms upon unauthorized human movement.",
    testingSteps: [
      "Test arming button toggle: Green LED reflects arm state.",
      "Simulate intrusion: Siren sounds within 100ms of motion.",
      "Disarm using button: Siren shuts off immediately."
    ],
    troubleshooting: [
      {
        issue: "Alarm triggers constantly even with room empty",
        cause: "Testing during initial 60-second PIR power stabilization or aiming sensor at sunny window.",
        solution: "Wait 1 full minute after powering on before testing; aim away from heating vents."
      }
    ],
    applications: ["Hostel room anti-theft systems", "Laboratory chemical cabinet security", "Retail shop entry chimes"],
    safety: "Do not hold high-output buzzer directly against ear drums.",
    related: {
      componentIds: ["sensor-pir", "arduino-uno", "bjt-bc547", "led"],
      experimentIds: ["ir-obstacle", "led-blink"],
      videoIds: ["vid-pir-motion-sensor"],
      quizIds: ["quiz-sensors", "quiz-microcontrollers"]
    }
  },
  {
    id: "smart-home-automation",
    title: "Complete Home Automation System via Web App & Cloud",
    difficulty: "ADVANCED",
    category: "IoT & WIRELESS",
    estimatedTime: "5 - 6 Hours",
    problemStatement: "Fragmented smart home devices from different vendors require incompatible mobile apps, cloud subscription fees, and fail when external internet links drop.",
    objective: "Build a centralized 4-channel smart home automation hub that controls lighting, fans, and appliances both locally via a responsive web application and remotely via Google Firebase.",
    description: "An ESP32 microcontroller controls a 4-channel optoisolated relay board. The ESP32 listens to Firebase Firestore real-time document listeners via WebSocket/TLS. When any user toggles a light or fan switch on the NextGen Education web interface, the cloud database updates within 100ms. The ESP32 receives the snapshot change and energizes the corresponding relay contact while providing live feedback.",
    componentsList: [
      { name: "ESP32-WROOM-32", qty: "1", role: "IoT central hub" },
      { name: "4-Channel 5V Relay Board with Optocouplers", qty: "1", role: "Appliance switches" },
      { name: "LM7805 or 5V 2A Power Supply", qty: "1", role: "Dedicated relay/MCU power" },
      { name: "AC Test Lamps with Sockets", qty: "4", role: "Appliance simulators" },
      { name: "Jumper Wires & Terminal Blocks", qty: "1 set", role: "Power distribution" }
    ],
    blockDiagram: "[ NextGen Web Dashboard ] ──> [ Firebase Cloud ] ──> [ ESP32 Hub ] ──> [ 4-Channel Relay ] ──> [ 4 Home Appliances ]",
    circuitDiagramNotes: "ESP32 GPIOs 16, 17, 18, 19 connect to Relay inputs IN1, IN2, IN3, IN4. Common Ground shared between 5V power supply and ESP32.",
    wiringDetails: [
      "ESP32 GPIO 16 ──> Relay IN1 (Living Room Light)",
      "ESP32 GPIO 17 ──> Relay IN2 (Ceiling Fan)",
      "ESP32 GPIO 18 ──> Relay IN3 (Bedside Lamp)",
      "ESP32 GPIO 19 ──> Relay IN4 (Air Conditioner)",
      "Relay VCC / GND ──> 5V 2A Power Supply",
      "ESP32 GND ──> Power Supply GND"
    ],
    procedure: [
      "Wire the 4 relay control inputs to ESP32 GPIOs 16 through 19.",
      "Configure Firebase project credentials in the ESP32 firmware.",
      "Upload code, verify successful Wi-Fi connection and Firebase authentication.",
      "Log into NextGen Education web dashboard.",
      "Click the interactive toggle switches on the Home Automation panel.",
      "Hear relays click and see corresponding lamps toggle in under 200ms."
    ],
    codeSnippet: `// NextGen Education - Project 11: 4-Channel Cloud Home Automation
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

#define WIFI_SSID "HOME_WIFI"
#define WIFI_PASSWORD "PASSWORD"
#define API_KEY "AIzaSyBMlP-wDPpuoonmfXhCU70LDWPyn_FJLOU"
#define DATABASE_URL "nextgen-education-68702.firebaseio.com"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

const int RELAY_PINS[4] = {16, 17, 18, 19};

void setup() {
  Serial.begin(115200);
  for (int i=0; i<4; i++) {
    pinMode(RELAY_PINS[i], OUTPUT);
    digitalWrite(RELAY_PINS[i], HIGH); // Active Low -> Default OFF
  }

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready()) {
    for (int i = 0; i < 4; i++) {
      String path = "/home/relay" + String(i + 1);
      if (Firebase.RTDB.getBool(&fbdo, path)) {
        bool state = fbdo.boolData();
        digitalWrite(RELAY_PINS[i], state ? LOW : HIGH); // Energize if true
      }
    }
  }
  delay(500);
}`,
    codeExplanation: "Periodically synchronizes digital state variables from Firebase Realtime Database and updates physical optoisolated relay outputs accordingly.",
    expectedOutput: "Seamless, responsive multi-channel home control synchronized across mobile phones, laptops, and physical relays globally.",
    testingSteps: [
      "Toggle Relay 1 from smartphone: Observe Lamp 1 switch within 200ms.",
      "Disconnect Wi-Fi: Relays should safely retain their last commanded states.",
      "Reconnect Wi-Fi: Automatic self-healing reconnection occurs without manual reset."
    ],
    troubleshooting: [
      {
        issue: "Relays chatter or reset ESP32 during switching",
        cause: "Relay coil switching current dips the 3.3V power rail of the ESP32.",
        solution: "Use a dedicated 5V 2A external power supply for the relay board instead of powering from ESP32 pins."
      }
    ],
    applications: ["Full-house automation", "Commercial office energy management", "Greenhouse climate scheduling"],
    safety: "Enclose all 230V AC mains terminal connections inside a fire-rated electrical junction box.",
    related: {
      componentIds: ["relay-module", "esp32-wroom", "bjt-bc547"],
      experimentIds: ["relay-control", "esp32-telemetry", "iot-cloud-monitoring"],
      videoIds: ["vid-relay-module-arduino", "vid-esp32-firebase-tutorial"],
      quizIds: ["quiz-power-supplies", "quiz-iot-embedded"]
    }
  },
  {
    id: "line-following-robot",
    title: "High-Precision Dual-Sensor Line Following Robot",
    difficulty: "INTERMEDIATE",
    category: "ROBOTICS & EMBEDDED",
    estimatedTime: "3 - 4 Hours",
    problemStatement: "Automated Guided Vehicles (AGVs) in Amazon fulfillment warehouses and automated factories require high-speed, dependable trajectory tracking along floor guidelines without drifting off course.",
    objective: "Engineer a high-speed differential-drive mobile robot using an array of infrared reflectance sensors to precisely track a 25mm black path on a high-contrast white arena.",
    description: "Features two TCRT5000 infrared reflectance sensors mounted 15mm apart underneath the front bumper. White floor reflects infrared radiation into the phototransistor, keeping output LOW. The black electrical tape line absorbs infrared, pulling output HIGH. An Arduino compares left and right sensors, driving differential PWM speeds to the L293D motor driver to continuously correct steering error.",
    componentsList: [
      { name: "Arduino Uno or Nano", qty: "1", role: "Closed-loop steering controller" },
      { name: "Dual TCRT5000 IR Line Sensor Module", qty: "1 set", role: "Optical ground reflectance sensors" },
      { name: "L293D Motor Driver", qty: "1", role: "Dual DC motor H-bridge" },
      { name: "2WD Robot Chassis with Caster Wheel", qty: "1", role: "Mobile chassis" },
      { name: "2x 18650 Li-ion Batteries (7.4V)", qty: "1 set", role: "Power source" },
      { name: "Black Electrical Tape (25mm)", qty: "1 roll", role: "Guide track" }
    ],
    blockDiagram: "[ Dual IR Line Sensors ] ──> [ Arduino Correction Algorithm ] ──> [ L293D H-Bridge ] ──> [ Differential Steering ]",
    circuitDiagramNotes: "Left sensor digital OUT to Arduino Pin 2, Right sensor OUT to Pin 3. L293D pins 3, 4, 7, 8 for direction; pins 5, 6 for motor PWM speeds.",
    wiringDetails: [
      "Left IR Sensor OUT ──> Arduino Pin 2",
      "Right IR Sensor OUT ──> Arduino Pin 3",
      "Arduino Pin 4, 5 (PWM) ──> L293D Motor Left",
      "Arduino Pin 6, 7 (PWM) ──> L293D Motor Right",
      "Sensors VCC / GND ──> Arduino 5V / GND",
      "Battery (+) ──> L293D Pin 8 (Motor Power)"
    ],
    procedure: [
      "Mount the two IR sensors beneath the front chassis so sensor heads are 5mm - 10mm above the ground.",
      "Tune sensor potentiometers on white background until LEDs are OFF, and verify they turn ON over black tape.",
      "Connect motors to L293D driver.",
      "Upload Line Follower sketch.",
      "Create a smooth closed-loop track with black tape on white tile or chart paper.",
      "Place robot on track, power on, and observe smooth line tracking around curves."
    ],
    codeSnippet: `// NextGen Education - Project 12: Precision Line Follower
const int SENSOR_LEFT = 2;
const int SENSOR_RIGHT = 3;

const int IN1 = 4, IN2 = 5; // Left motor
const int IN3 = 6, IN4 = 7; // Right motor
const int ENA = 9, ENB = 10; // Speed PWM

void setup() {
  pinMode(SENSOR_LEFT, INPUT);
  pinMode(SENSOR_RIGHT, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT);
}

void loop() {
  int left = digitalRead(SENSOR_LEFT);
  int right = digitalRead(SENSOR_RIGHT);

  if (left == LOW && right == LOW) {
    // Both on white -> Move straight forward
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
    analogWrite(ENA, 170);   analogWrite(ENB, 170);
  } else if (left == HIGH && right == LOW) {
    // Left on black line -> Steer Left sharply
    digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH);
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
    analogWrite(ENA, 130);   analogWrite(ENB, 180);
  } else if (left == LOW && right == HIGH) {
    // Right on black line -> Steer Right sharply
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH);
    analogWrite(ENA, 180);   analogWrite(ENB, 130);
  } else {
    // Both on black (T-junction or end of line) -> Stop
    digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);  digitalWrite(IN4, LOW);
  }
}`,
    codeExplanation: "A 4-case differential control logic inspects real-time ground reflectance. When the robot drifts right, the left sensor touches the black line, immediately causing the right motor to speed up and the left motor to reverse, pulling the chassis back onto center.",
    expectedOutput: "Smooth, rapid trajectory tracking along straight stretches and sharp 90-degree curved tracks without losing line orientation.",
    testingSteps: [
      "Test sensor height: 7mm distance from ground is optimal for TCRT5000 optics.",
      "Check reaction on sharp turns: If robot overshoots line, lower base PWM speed."
    ],
    troubleshooting: [
      {
        issue: "Robot spins in circles immediately upon starting",
        cause: "One motor's polarity is inverted (running in reverse).",
        solution: "Swap the two wires of the backwards motor at the L293D terminal block."
      }
    ],
    applications: ["Automated factory AGVs", "Hospital medicine transport carts", "Warehouse logistical parcel couriers"],
    safety: "Ensure battery leads cannot short together when robot undergoes vibration.",
    related: {
      componentIds: ["ic-l293d", "arduino-uno", "sensor-ldr", "bjt-bc547"],
      experimentIds: ["dc-motor-control", "ir-obstacle"],
      videoIds: ["vid-l293d-motor-driver", "vid-ir-obstacle-sensor"],
      quizIds: ["quiz-microcontrollers", "quiz-sensors"]
    }
  }
];
