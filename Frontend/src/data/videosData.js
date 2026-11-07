// NextGen Education - Practical Video Learning Hub Dataset
// Contains 20 curated, high-impact practical engineering video lectures and demonstrations
// from trusted educational channels (e.g. Ben Eater, ElectroBOOM, GreatScott!, Afrotechmods, Andreas Spiess)

export const videosData = [
  {
    id: "vid-resistor-color-code",
    title: "How to Read Resistor Color Codes (4-Band & 5-Band Explained)",
    category: "ELECTRONICS FUNDAMENTALS",
    difficulty: "BEGINNER",
    duration: "8:42",
    youtubeId: "GLhB3GjV1cM",
    channel: "Afrotechmods",
    description: "Master the international electronic resistor color code system. Learn the mnemonic trick, how to differentiate 4-band vs 5-band precision resistors, and how to read tolerance bands.",
    topics: ["Color bands", "Ohm's Law", "Tolerance ratings", "Standard E-series values"],
    related: {
      componentId: "resistor",
      experimentId: "ohms-law",
      projectId: "auto-street-light",
      quizId: "quiz-fundamentals"
    }
  },
  {
    id: "vid-ohms-law",
    title: "Ohm's Law Explained: Voltage, Current, Resistance & Power",
    category: "ELECTRONICS FUNDAMENTALS",
    difficulty: "BEGINNER",
    duration: "11:15",
    youtubeId: "HsLLq6Rm5rg",
    channel: "The Engineering Mindset",
    description: "Visual 3D animation showing how voltage pushes electrons through resistance to create electrical current. Covers V=I*R and P=V*I formula triangles with practical examples.",
    topics: ["Ohm's Law", "Voltage drop", "Electric current", "Thermal power dissipation"],
    related: {
      componentId: "resistor",
      experimentId: "ohms-law",
      projectId: "energy-monitor",
      quizId: "quiz-fundamentals"
    }
  },
  {
    id: "vid-capacitors-explained",
    title: "How Capacitors Work & RC Timing Circuits",
    category: "ELECTRONICS FUNDAMENTALS",
    difficulty: "BEGINNER",
    duration: "14:20",
    youtubeId: "f_MZNsEqyQw",
    channel: "The Engineering Mindset",
    description: "Detailed visualization of electrostatic charge accumulation on parallel plates, dielectric breakdown, ESR, ripple filtering in power supplies, and RC charge curves.",
    topics: ["Capacitance Q=CV", "Dielectric materials", "Decoupling filtering", "Time constant RC"],
    related: {
      componentId: "capacitor",
      experimentId: "rc-charging",
      projectId: "touch-based-light",
      quizId: "quiz-fundamentals"
    }
  },
  {
    id: "vid-inductors-explained",
    title: "Inductors & Magnetic Energy Storage in Switching Power Supplies",
    category: "ELECTRONICS FUNDAMENTALS",
    difficulty: "INTERMEDIATE",
    duration: "12:05",
    youtubeId: "NgwXkUt3ypQ",
    channel: "The Engineering Mindset",
    description: "Learn how magnetic fields induce counter-EMF, why inductors oppose sudden changes in current, and how buck/boost converters use chokes to step voltages efficiently.",
    topics: ["Faraday's Law", "Back-EMF spikes", "Flyback diodes", "SMPS inductors"],
    related: {
      componentId: "inductor",
      experimentId: "dc-motor-control",
      projectId: "smart-energy-monitoring",
      quizId: "quiz-fundamentals"
    }
  },
  {
    id: "vid-diodes-explained",
    title: "How Diodes and Bridge Rectifiers Work",
    category: "ANALOG ELECTRONICS",
    difficulty: "BEGINNER",
    duration: "13:30",
    youtubeId: "Fwj_d3uO5g8",
    channel: "The Engineering Mindset",
    description: "Depletion layer physics of P-N junctions, forward bias conduction threshold (0.7V), reverse breakdown, and constructing full-wave bridge rectifiers with filter capacitors.",
    topics: ["P-N junction", "Barrier potential", "Rectification", "Flyback suppression"],
    related: {
      componentId: "diode-1n4007",
      experimentId: "diode-characteristics",
      projectId: "energy-monitor",
      quizId: "quiz-semiconductors"
    }
  },
  {
    id: "vid-zener-diodes",
    title: "Zener Diodes: Voltage Regulation & Reverse Breakdown",
    category: "ANALOG ELECTRONICS",
    difficulty: "INTERMEDIATE",
    duration: "9:50",
    youtubeId: "Y8Z3s6R5h-Q",
    channel: "ElectroBOOM",
    description: "Practical breakdown of avalanche and Zener tunneling breakdown. Designing a stable shunt regulator, calculating series dropper resistors, and over-voltage protection clamps.",
    topics: ["Zener voltage Vz", "Shunt regulation", "Load line calculation", "Transient suppression"],
    related: {
      componentId: "diode-zener",
      experimentId: "diode-characteristics",
      projectId: "temperature-monitor",
      quizId: "quiz-semiconductors"
    }
  },
  {
    id: "vid-led-basics",
    title: "How LEDs Work & Why You ALWAYS Need a Resistor",
    category: "SEMICONDUCTORS",
    difficulty: "BEGINNER",
    duration: "7:18",
    youtubeId: "Yo6JJ_e_juc",
    channel: "Afrotechmods",
    description: "Electroluminescence and photon generation across bandgaps. Why LEDs have steep exponential I-V curves, how to measure forward voltage Vf, and step-by-step resistor sizing.",
    topics: ["Electroluminescence", "Forward voltage Vf", "Current limiting formula", "LED burnout"],
    related: {
      componentId: "led",
      experimentId: "led-blink",
      projectId: "auto-street-light",
      quizId: "quiz-semiconductors"
    }
  },
  {
    id: "vid-transistor-basics",
    title: "Transistors as Switches (BJT Cutoff vs Saturation)",
    category: "SEMICONDUCTORS",
    difficulty: "INTERMEDIATE",
    duration: "15:45",
    youtubeId: "sTu3LwpF6XI",
    channel: "Ben Eater",
    description: "Legendary educator Ben Eater builds a transistor switch from basic NPN BJTs on a breadboard. Covers base current overdrive, collector saturation, and driving relays safely.",
    topics: ["BJT NPN", "Base resistor calculation", "Cutoff and Saturation", "Relay drive"],
    related: {
      componentId: "bjt-bc547",
      experimentId: "transistor-switch",
      projectId: "auto-street-light",
      quizId: "quiz-transistor-circuits"
    }
  },
  {
    id: "vid-mosfet-tutorial",
    title: "MOSFETs Explained: Gate Threshold, RDS(on) & PWM Driving",
    category: "SEMICONDUCTORS",
    difficulty: "INTERMEDIATE",
    duration: "14:10",
    youtubeId: "GrvvkYTW_0k",
    channel: "GreatScott!",
    description: "Understand the differences between BJTs and MOSFETs. Why gate capacitance requires low impedance drivers, logic-level vs standard gate thresholds, and thermal calculations.",
    topics: ["Gate threshold Vgs(th)", "Rds(on) conduction loss", "Logic-level MOSFETs", "PWM switching"],
    related: {
      componentId: "mosfet-irfz44n",
      experimentId: "dc-motor-control",
      projectId: "smart-energy-monitoring",
      quizId: "quiz-transistor-circuits"
    }
  },
  {
    id: "vid-555-timer-circuits",
    title: "The 555 Timer IC: Internal Architecture & Astable Multivibrator",
    category: "ICs & ANALOG",
    difficulty: "INTERMEDIATE",
    duration: "18:22",
    youtubeId: "kRlSFm519Bo",
    channel: "Ben Eater",
    description: "Deep dive into the 3 internal 5k resistors, two comparators, SR latch, and discharge transistor of the iconic NE555 timer. Step-by-step derivation of astable frequency.",
    topics: ["NE555 architecture", "Comparator thresholds 1/3 and 2/3 Vcc", "Astable oscillator", "Duty cycle"],
    related: {
      componentId: "ic-555",
      experimentId: "led-blink",
      projectId: "auto-street-light",
      quizId: "quiz-analog-circuits"
    }
  },
  {
    id: "vid-opamp-basics",
    title: "Operational Amplifiers (Op-Amps) Explained with Examples",
    category: "ICs & ANALOG",
    difficulty: "INTERMEDIATE",
    duration: "16:04",
    youtubeId: "7FYHt5XviKc",
    channel: "The Engineering Mindset",
    description: "Understand negative feedback, virtual ground, inverting amplifiers, non-inverting amplifiers, voltage followers, and comparator circuits with LM358.",
    topics: ["Golden rules of op-amps", "Inverting amplifier", "Non-inverting gain", "Voltage comparator"],
    related: {
      componentId: "ic-lm358",
      experimentId: "ldr-auto-light",
      projectId: "temperature-monitor",
      quizId: "quiz-analog-circuits"
    }
  },
  {
    id: "vid-voltage-regulators",
    title: "Linear Regulators vs Buck Converters (7805 Efficiency)",
    category: "POWER SUPPLIES",
    difficulty: "INTERMEDIATE",
    duration: "11:40",
    youtubeId: "GSzVs7_aW-8",
    channel: "GreatScott!",
    description: "Why does an LM7805 get boiling hot dropping 12V to 5V? Explore linear voltage drop power loss Pd = (Vin - Vout) * I and compare against modern high-efficiency switching buck converters.",
    topics: ["LM7805 regulation", "Thermal dissipation", "Dropout voltage", "Switching buck efficiency"],
    related: {
      componentId: "regulator-7805",
      experimentId: "ohms-law",
      projectId: "smart-energy-monitoring",
      quizId: "quiz-power-supplies"
    }
  },
  {
    id: "vid-shift-register-74hc595",
    title: "How to Expand Microcontroller GPIO with 74HC595 Shift Registers",
    category: "DIGITAL LOGIC",
    difficulty: "INTERMEDIATE",
    duration: "12:55",
    youtubeId: "6fVbJbNvd4M",
    channel: "Ben Eater",
    description: "Turn 3 digital output pins into 8, 16, or 24 outputs! Comprehensive explanation of serial-in parallel-out shift registers, clocking pulses, and storage latches.",
    topics: ["74HC595", "Serial-in parallel-out", "SPI shifting", "Output latch"],
    related: {
      componentId: "ic-74hc595",
      experimentId: "led-pwm",
      projectId: "smart-home-automation",
      quizId: "quiz-digital-logic"
    }
  },
  {
    id: "vid-l293d-motor-driver",
    title: "Control DC Motors with L293D Dual H-Bridge & Arduino",
    category: "ROBOTICS & EMBEDDED",
    difficulty: "INTERMEDIATE",
    duration: "13:12",
    youtubeId: "Gq4V1wL7eP0",
    channel: "DroneBot Workshop",
    description: "Complete guide to controlling two DC motors bidirectionally with speed control. Explains H-bridge internal switches, flyback diodes, and separate logic/motor power supplies.",
    topics: ["L293D H-bridge", "Direction logic", "PWM speed control", "Ground loops"],
    related: {
      componentId: "ic-l293d",
      experimentId: "dc-motor-control",
      projectId: "obstacle-robot",
      quizId: "quiz-microcontrollers"
    }
  },
  {
    id: "vid-ldr-sensor-tutorial",
    title: "LDR Light Sensor Circuits: Theory, Thresholds & Relay Switching",
    category: "SENSORS & ANALOG",
    difficulty: "BEGINNER",
    duration: "9:25",
    youtubeId: "9o4yN_QzE-A",
    channel: "Afrotechmods",
    description: "Understand photoresistor physics, CdS semiconductor response, building voltage dividers, and implementing automatic night lights with both transistors and op-amps.",
    topics: ["LDR characteristics", "Voltage divider equations", "Day/night threshold", "AnalogRead"],
    related: {
      componentId: "sensor-ldr",
      experimentId: "ldr-auto-light",
      projectId: "auto-street-light",
      quizId: "quiz-sensors"
    }
  },
  {
    id: "vid-ultrasonic-hc-sr04",
    title: "HC-SR04 Ultrasonic Distance Sensor: Principle, Timing & Code",
    category: "SENSORS & EMBEDDED",
    difficulty: "BEGINNER",
    duration: "10:48",
    youtubeId: "ZejQOX69K51",
    channel: "DroneBot Workshop",
    description: "How piezoelectric transducers generate 40kHz ultrasound bursts. Microsecond timing, acoustic reflection physics, and calculating centimeter distance with code.",
    topics: ["Speed of sound", "Echo pulse width", "Time of flight", "pulseIn() function"],
    related: {
      componentId: "sensor-ultrasonic",
      experimentId: "ultrasonic-distance",
      projectId: "smart-dustbin",
      quizId: "quiz-sensors"
    }
  },
  {
    id: "vid-pir-motion-sensor",
    title: "PIR Motion Sensor HC-SR501: Pyroelectric Effect & Fresnel Lenses",
    category: "SENSORS & SECURITY",
    difficulty: "BEGINNER",
    duration: "8:55",
    youtubeId: "6Fws3m_Q9Uo",
    channel: "DroneBot Workshop",
    description: "Discover how dual-element pyroelectric crystals detect moving thermal human body heat through segmented Fresnel lenses. Calibration of time delay and sensitivity pots.",
    topics: ["Pyroelectric effect", "Infrared radiation", "BISS0001 IC", "Repeatable trigger mode"],
    related: {
      componentId: "sensor-pir",
      experimentId: "ir-obstacle",
      projectId: "security-alert-system",
      quizId: "quiz-sensors"
    }
  },
  {
    id: "vid-dht11-esp32",
    title: "DHT11 & DHT22 Temperature and Humidity Sensor with ESP32 / Arduino",
    category: "SENSORS & IoT",
    difficulty: "BEGINNER",
    duration: "11:34",
    youtubeId: "4T8Yn_W6Yd8",
    channel: "DroneBot Workshop",
    description: "Compare DHT11 vs DHT22 accuracy, single-wire custom handshake protocols, 40-bit data packet decoding, and preventing sampling overflow errors.",
    topics: ["Capacitive humidity sensing", "NTC thermistors", "Single-wire digital protocol", "Checksums"],
    related: {
      componentId: "sensor-dht11",
      experimentId: "temperature-measurement",
      projectId: "iot-weather-station",
      quizId: "quiz-sensors"
    }
  },
  {
    id: "vid-mpu6050-accelerometer",
    title: "MPU-6050 Accelerometer & Gyroscope Tutorial with Arduino",
    category: "SENSORS & ROBOTICS",
    difficulty: "INTERMEDIATE",
    duration: "17:15",
    youtubeId: "7L_8q9ZlS54",
    channel: "DroneBot Workshop",
    description: "Interfacing MEMS 6-axis IMUs over I2C. Understanding accelerometer gravitational vector sensing, gyroscope rotational velocity, and complementary sensor fusion filters.",
    topics: ["MEMS accelerometers", "Gyroscopic drift", "I2C protocol", "Sensor fusion"],
    related: {
      componentId: "sensor-mpu6050",
      experimentId: "esp32-telemetry",
      projectId: "obstacle-robot",
      quizId: "quiz-sensors"
    }
  },
  {
    id: "vid-esp32-firebase-tutorial",
    title: "ESP32 IoT Cloud: Real-Time Telemetry with Google Firebase",
    category: "IoT & WIRELESS",
    difficulty: "ADVANCED",
    duration: "21:40",
    youtubeId: "8D_7uXn6V4o",
    channel: "Andreas Spiess",
    description: "The 'Guy with the Swiss Accent' walks through connecting an ESP32 to Google Firebase. Pushing live sensor data over TLS, setting security rules, and building web dashboards.",
    topics: ["ESP32 Wi-Fi", "Google Firebase RTDB", "JSON payloads", "Cloud telemetry"],
    related: {
      componentId: "esp32-wroom",
      experimentId: "iot-cloud-monitoring",
      projectId: "smart-home-automation",
      quizId: "quiz-iot-embedded"
    }
  }
];
