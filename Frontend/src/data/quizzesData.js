// NextGen Education - Practical Engineering Quiz Engine Dataset
// Contains 10 practical engineering quizzes with 5 questions each, comprehensive explanations,
// and realistic diagnostic and troubleshooting scenarios.

export const quizzesData = [
  {
    id: "quiz-fundamentals",
    title: "Quiz 01: Electronics Fundamentals & Ohm's Law",
    category: "ELECTRONICS FUNDAMENTALS",
    difficulty: "BEGINNER",
    timeLimitMin: 10,
    description: "Assess your core understanding of electric potential, current flow, resistance calculations, and power dissipation formulas.",
    questions: [
      {
        id: "qf-1",
        question: "A red LED has a forward voltage drop (Vf) of 2.0V and safe operating current of 15mA. What series resistor is needed when powered from a 5.0V source?",
        type: "mcq",
        options: ["100 Ω", "200 Ω (standard 220 Ω)", "470 Ω", "1 kΩ"],
        correctIndex: 1,
        explanation: "Ohm's Law: R = (Vcc - Vf) / If = (5.0V - 2.0V) / 0.015A = 3.0V / 0.015A = 200 Ω. The closest standard E24 resistor is 220 Ω.",
        hint: "Subtract the diode drop from the supply voltage before applying R = V / I."
      },
      {
        id: "qf-2",
        question: "True or False: If you double the voltage across a constant ohmic resistor, the power dissipated in the resistor quadruples.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Power formula is P = V² / R. If voltage V doubles (2V), power becomes (2V)² / R = 4 * (V² / R), which is 4 times the original power.",
        hint: "Look at the square relationship in P = V² / R."
      },
      {
        id: "qf-3",
        question: "In a series RC circuit powered by a 10V DC step, what is the approximate voltage across the capacitor after ONE time constant (1τ)?",
        type: "mcq",
        options: ["3.68 V", "5.00 V", "6.32 V", "9.93 V"],
        correctIndex: 2,
        explanation: "By the exponential charging equation V(t) = V0 * (1 - e^(-t/RC)), at t = 1τ, (1 - e^-1) ≈ 1 - 0.368 = 0.632 (63.2%). For 10V, 63.2% is 6.32V.",
        hint: "Remember the fundamental RC constant: 63.2% during charging and 36.8% remaining during discharge."
      },
      {
        id: "qf-4",
        question: "Troubleshooting Scenario: You build an Ohm's Law test circuit and notice the 1/4W resistor is smoking and hot to the touch. What is the most likely cause?",
        type: "troubleshoot",
        options: [
          "The resistor is connected in reverse polarity.",
          "The voltage applied caused power dissipation (P = V²/R) to exceed the resistor's 0.25 Watt rating.",
          "The breadboard current rails are inverted.",
          "The multimeter Voltmeter drew too much current."
        ],
        correctIndex: 1,
        explanation: "Resistors are non-polarized and work identically in both directions. If a 1/4W (0.25W) resistor smokes, it is dissipating power greater than 0.25W (e.g. 12V across a 100Ω resistor generates P = 144 / 100 = 1.44 Watts, almost 6x its limit!).",
        hint: "Resistors do not have polarity. Check the power rating P = V * I."
      },
      {
        id: "qf-5",
        question: "What is the equivalent resistance of three 300 Ω resistors connected in PARALLEL?",
        type: "mcq",
        options: ["900 Ω", "150 Ω", "100 Ω", "33.3 Ω"],
        correctIndex: 2,
        explanation: "For N identical resistors R connected in parallel, Requiv = R / N = 300 Ω / 3 = 100 Ω.",
        hint: "Parallel resistance of identical resistors is R divided by the number of resistors."
      }
    ],
    related: {
      componentId: "resistor",
      experimentId: "ohms-law",
      videoId: "vid-ohms-law"
    }
  },
  {
    id: "quiz-semiconductors",
    title: "Quiz 02: Semiconductor Diodes & Rectification",
    category: "ANALOG ELECTRONICS",
    difficulty: "BEGINNER",
    timeLimitMin: 10,
    description: "Test your mastery of P-N junction physics, rectification circuits, Zener voltage regulation, and LED characteristics.",
    questions: [
      {
        id: "qs-1",
        question: "What is the typical forward cut-in (threshold) voltage of a standard silicon P-N junction diode like the 1N4007?",
        type: "mcq",
        options: ["0.2V to 0.3V", "0.6V to 0.7V", "1.2V to 1.5V", "2.0V to 3.0V"],
        correctIndex: 1,
        explanation: "Standard silicon diodes have an internal barrier potential of approximately 0.6V to 0.7V at room temperature. Germanium diodes are ~0.3V, and Schottky diodes are ~0.2V-0.4V.",
        hint: "Silicon P-N junctions have a barrier potential around two-thirds of a volt."
      },
      {
        id: "qs-2",
        question: "Component Identification: On a standard through-hole diode (DO-41 package), which terminal is indicated by the painted silver or white ring?",
        type: "component_id",
        options: ["Anode (+)", "Cathode (-)", "Base", "Gate"],
        correctIndex: 1,
        explanation: "The painted band or silver ring always marks the CATHODE (-) terminal. Current flows into the unmarked Anode (+) and exits through the banded Cathode (-).",
        hint: "The cathode line matches the vertical bar in the schematic symbol: --|>|--"
      },
      {
        id: "qs-3",
        question: "In what operational region is a Zener diode biased when functioning as a stable voltage regulator?",
        type: "mcq",
        options: ["Forward conduction region", "Reverse avalanche / Zener breakdown region", "Cutoff region with zero current", "Saturation region"],
        correctIndex: 1,
        explanation: "Zener diodes are intentionally operated in REVERSE BREAKDOWN. Once reverse voltage reaches Vz, the voltage across the diode stays nearly constant despite fluctuations in supply voltage.",
        hint: "Think about why Zener diodes are connected backwards compared to normal rectifiers."
      },
      {
        id: "qs-4",
        question: "Why is a freewheeling flyback diode placed in reverse-parallel across a DC relay coil?",
        type: "mcq",
        options: [
          "To speed up the mechanical movement of the relay contacts.",
          "To clamp and dissipate the high-voltage inductive kickback spike caused by collapsing magnetic flux.",
          "To convert AC mains to DC for the coil.",
          "To reduce the resistance of the copper winding."
        ],
        correctIndex: 1,
        explanation: "When current to an inductive coil is abruptly shut off, the collapsing magnetic field induces a massive reverse EMF spike (V = L * di/dt) that can exceed 300V, destroying the driver transistor. A flyback diode provides a safe discharge path.",
        hint: "Faraday's Law states inductors oppose changes in current: V = -L(di/dt)."
      },
      {
        id: "qs-5",
        question: "True or False: A bridge rectifier converts AC into pure, smooth DC without requiring any smoothing capacitor.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! A bridge rectifier only inverts negative half-cycles, producing pulsating DC (rippling from 0V to Vpeak at 100/120 Hz). A large electrolytic filter capacitor is mandatory to smooth out the ripple into steady DC.",
        hint: "Think about what the output waveform of 4 diodes looks like on an oscilloscope before filtering."
      }
    ],
    related: {
      componentId: "diode-1n4007",
      experimentId: "diode-characteristics",
      videoId: "vid-diodes-explained"
    }
  },
  {
    id: "quiz-transistor-circuits",
    title: "Quiz 03: Transistors: BJT & MOSFET Switching",
    category: "ANALOG ELECTRONICS",
    difficulty: "INTERMEDIATE",
    timeLimitMin: 12,
    description: "Verify your practical knowledge of BJT switching states, MOSFET gate drive physics, and power switching circuits.",
    questions: [
      {
        id: "qt-1",
        question: "What is the primary difference between a Bipolar Junction Transistor (BJT) and a Field Effect Transistor (MOSFET)?",
        type: "mcq",
        options: [
          "BJTs are current-controlled; MOSFETs are voltage-controlled with an insulated gate.",
          "BJTs can only handle AC signals; MOSFETs only handle DC signals.",
          "MOSFETs require continuous high DC gate current to stay turned on.",
          "BJTs have lower saturation voltage than power MOSFETs at high currents."
        ],
        correctIndex: 0,
        explanation: "BJTs require continuous base current Ib to control collector current Ic (current-controlled: Ic = β * Ib). MOSFETs use an electrostatic field across an insulated gate oxide, drawing virtually zero steady-state DC gate current (voltage-controlled).",
        hint: "Think about whether the control terminal is insulated or a forward-biased P-N junction."
      },
      {
        id: "qt-2",
        question: "When using an NPN transistor (such as BC547) as a saturated switch, what is the expected collector-to-emitter voltage (Vce)?",
        type: "mcq",
        options: ["Approximately 0.1V to 0.2V", "Approximately 0.7V", "Exactly half of Vcc", "Equal to Vcc"],
        correctIndex: 0,
        explanation: "In deep saturation, both junctions are forward-biased, causing Vce(sat) to collapse to a tiny fraction of a volt (~0.1V to 0.2V), behaving as a closed switch.",
        hint: "A closed ideal switch has 0 volts across its terminals."
      },
      {
        id: "qt-3",
        question: "Why is a 10kΩ pull-down resistor placed between the Gate and Source of an N-channel MOSFET?",
        type: "troubleshoot",
        options: [
          "To limit continuous operating current through the gate.",
          "To ensure the gate discharges to 0V and remains fully OFF when the microcontroller pin is floating or in high-impedance reset.",
          "To step down 12V gate signals to 5V.",
          "To act as a damping filter against audio feedback."
        ],
        correctIndex: 1,
        explanation: "Because a MOSFET gate is a tiny capacitor (~1000pF) insulated by silicon dioxide, if left floating, stray charge will keep the MOSFET partially conductive in its linear region, causing rapid thermal destruction.",
        hint: "What happens to an insulated capacitor if there is no discharge path?"
      },
      {
        id: "qt-4",
        question: "Looking at the flat face of a TO-92 packaged BC547 transistor with pins pointing down, what is the standard pinout from left to right?",
        type: "component_id",
        options: ["Emitter - Base - Collector (E-B-C)", "Collector - Base - Emitter (C-B-E)", "Base - Collector - Emitter (B-C-E)", "Gate - Drain - Source (G-D-S)"],
        correctIndex: 1,
        explanation: "For the BC547 in standard TO-92 packaging, holding the flat printed face toward you: Pin 1 (Left) is Collector, Pin 2 (Center) is Base, Pin 3 (Right) is Emitter.",
        hint: "Remember 'C-B-E' (Collector, Base, Emitter)."
      },
      {
        id: "qt-5",
        question: "True or False: An IRFZ44N power MOSFET will achieve its lowest specified ON-resistance (17.5mΩ) when driven directly with 3.3V logic from an ESP32 GPIO pin.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Standard IRFZ44N MOSFETs require Vgs = 10V to reach the rated 17.5mΩ Rds(on). At 3.3V, it operates in the resistive linear region and will overheat under heavy current. Logic-level MOSFETs (e.g. IRLZ44N) are specifically built for 3.3V/5V gate drives.",
        hint: "Check the datasheet: Is IRFZ44N a standard or logic-level gate device?"
      }
    ],
    related: {
      componentId: "bjt-bc547",
      experimentId: "transistor-switch",
      videoId: "vid-transistor-basics"
    }
  },
  {
    id: "quiz-analog-circuits",
    title: "Quiz 04: Operational Amplifiers & Analog Circuits",
    category: "ANALOG ELECTRONICS",
    difficulty: "INTERMEDIATE",
    timeLimitMin: 12,
    description: "Deepen your understanding of op-amp negative feedback, inverting/non-inverting amplifiers, and comparator configurations.",
    questions: [
      {
        id: "qa-1",
        question: "What are the two 'Golden Rules' of an ideal operational amplifier operating in a negative feedback loop?",
        type: "mcq",
        options: [
          "1. Output voltage equals input voltage; 2. Gain is infinite.",
          "1. Differential input voltage (V+ - V-) is zero (virtual short); 2. Input terminals draw zero current.",
          "1. Slew rate is zero; 2. Power consumption is maximum.",
          "1. Inverting input must connect to GND; 2. Feedback is always positive."
        ],
        correctIndex: 1,
        explanation: "Under negative feedback, the op-amp output drives until the differential voltage between V+ and V- is 0V (virtual short). Because of near-infinite input impedance, input bias currents are virtually zero.",
        hint: "Think about the virtual short concept and infinite input impedance."
      },
      {
        id: "qa-2",
        question: "For a Non-Inverting Op-Amp circuit with input resistor R1 = 10kΩ from inverting terminal to ground and feedback resistor Rf = 90kΩ, what is the closed-loop voltage gain?",
        type: "mcq",
        options: ["9", "10", "100", "0.9"],
        correctIndex: 1,
        explanation: "Non-inverting gain formula: Gain = 1 + (Rf / R1) = 1 + (90k / 10k) = 1 + 9 = 10.",
        hint: "Non-inverting gain is 1 + (Rf / R1)."
      },
      {
        id: "qa-3",
        question: "In an NE555 timer IC configured as an astable multivibrator, what sets the upper and lower switching threshold voltages?",
        type: "mcq",
        options: [
          "External Zener diodes.",
          "Three internal 5kΩ precision resistors creating 2/3 Vcc and 1/3 Vcc reference voltages.",
          "The frequency of the external quartz crystal.",
          "The forward voltage of the output stage LEDs."
        ],
        correctIndex: 1,
        explanation: "The 555 gets its name from three internal 5kΩ resistors in series that divide Vcc into 1/3 Vcc (Trigger comparator) and 2/3 Vcc (Threshold comparator).",
        hint: "Why is the chip named '555'?"
      },
      {
        id: "qa-4",
        question: "True or False: The output of a standard LM358 op-amp running on a single +5V supply can swing all the way to +5.0V rail-to-rail.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! LM358 has an NPN darlington pull-up output stage that drops approximately 1.5V from the positive supply rail. On a 5V supply, its maximum output is approximately 3.5V.",
        hint: "Is LM358 a rail-to-rail output op-amp?"
      },
      {
        id: "qa-5",
        question: "What is the primary benefit of adding positive feedback (hysteresis) to a voltage comparator (creating a Schmitt Trigger)?",
        type: "mcq",
        options: [
          "It increases the frequency response beyond 100 MHz.",
          "It prevents erratic output chatter and rapid oscillation caused by input noise when the signal hovers near the threshold.",
          "It eliminates the need for power supply decoupling capacitors.",
          "It allows the comparator to amplify AC audio signals linearly."
        ],
        correctIndex: 1,
        explanation: "A standard comparator will chatter rapidly back and forth if the analog input signal has noise near the threshold. Hysteresis establishes separate upper and lower trip points, ensuring clean, definitive switching.",
        hint: "Think about noisy sensor signals slowly crossing a single voltage threshold."
      }
    ],
    related: {
      componentId: "ic-lm358",
      experimentId: "ldr-auto-light",
      videoId: "vid-opamp-basics"
    }
  },
  {
    id: "quiz-microcontrollers",
    title: "Quiz 05: Microcontroller & Embedded GPIO Concepts",
    category: "EMBEDDED SYSTEMS",
    difficulty: "BEGINNER",
    timeLimitMin: 10,
    description: "Verify your practical mastery of microcontroller I/O registers, internal pull-ups, PWM generation, and hardware timers.",
    questions: [
      {
        id: "qm-1",
        question: "If a pushbutton is wired between an Arduino digital input pin and Ground without an external resistor, what `pinMode` setting should be used?",
        type: "mcq",
        options: ["pinMode(pin, INPUT)", "pinMode(pin, INPUT_PULLUP)", "pinMode(pin, OUTPUT)", "pinMode(pin, ANALOG)"],
        correctIndex: 1,
        explanation: "`INPUT_PULLUP` enables an internal ~20kΩ pull-up resistor inside the ATmega328P, keeping the pin held firmly at 5V (HIGH) when idle, and reading LOW (0V) when the button is pressed to ground.",
        hint: "You need an internal pull-up to prevent the input from floating."
      },
      {
        id: "qm-2",
        question: "What is the consequence of leaving a digital CMOS microcontroller input pin 'floating' (unconnected)?",
        type: "troubleshoot",
        options: [
          "The pin reads guaranteed digital 0V.",
          "The pin reads guaranteed digital 5V.",
          "The pin picks up ambient electromagnetic radio interference, oscillating unpredictably between 0 and 1 while drawing excessive shoot-through current.",
          "The microcontroller will automatically shut down."
        ],
        correctIndex: 2,
        explanation: "CMOS inputs have giga-ohm gate impedances. Without a pull-up or pull-down resistor, stray electrostatic charges make the pin float randomly, causing erratic program behavior.",
        hint: "CMOS gate capacitance easily picks up stray environmental noise."
      },
      {
        id: "qm-3",
        question: "What is the resolution and voltage step size of the 10-bit Analog-to-Digital Converter (ADC) on an Arduino Uno running at 5.0V?",
        type: "mcq",
        options: ["256 steps (19.5 mV / step)", "1024 steps (4.88 mV / step)", "4096 steps (1.22 mV / step)", "65536 steps (0.076 mV / step)"],
        correctIndex: 1,
        explanation: "A 10-bit ADC has 2^10 = 1024 discrete steps (0 to 1023). Step size (LSB voltage) = 5.0V / 1024 = 0.00488V = 4.88 mV.",
        hint: "Calculate 2^10 and divide 5.0 Volts by that number."
      },
      {
        id: "qm-4",
        question: "What frequency does an RC servomotor signal require, and what pulse width corresponds to the 90° center position?",
        type: "mcq",
        options: ["1000 Hz frequency, 0.5 ms pulse", "50 Hz frequency, 1.5 ms pulse", "490 Hz frequency, 2.5 ms pulse", "10 kHz frequency, 5.0 ms pulse"],
        correctIndex: 1,
        explanation: "Standard RC servos use a 50 Hz frame rate (20ms period). A 1.0ms pulse commands 0°, 1.5ms commands 90° (neutral center), and 2.0ms commands 180°.",
        hint: "Servos operate on a 20ms period (50 Hz), with neutral around 1.5 milliseconds."
      },
      {
        id: "qm-5",
        question: "True or False: Arduino's `analogWrite()` function outputs a true, variable DC analog voltage directly from its microcontroller silicon pins.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! ATmega328P has NO digital-to-analog converter (DAC). `analogWrite()` outputs a Pulse Width Modulated (PWM) digital square wave (5V and 0V) whose average duty cycle mimics analog voltage.",
        hint: "Does the ATmega328P have an onboard DAC or does it use PWM timers?"
      }
    ],
    related: {
      componentId: "arduino-uno",
      experimentId: "led-pwm",
      videoId: "vid-arduino-basics"
    }
  },
  {
    id: "quiz-iot-embedded",
    title: "Quiz 06: ESP32 & IoT Telemetry Architecture",
    category: "IoT & WIRELESS",
    difficulty: "ADVANCED",
    timeLimitMin: 15,
    description: "Test your architectural expertise in IoT cloud protocols, FreeRTOS dual-core multitasking, and ESP32 hardware peripherals.",
    questions: [
      {
        id: "qiot-1",
        question: "What is the maximum safe logic voltage level that can be applied to the GPIO pins of an ESP32?",
        type: "mcq",
        options: ["1.8 V", "3.3 V (Not 5V tolerant!)", "5.0 V", "12.0 V"],
        correctIndex: 1,
        explanation: "ESP32 silicon is manufactured on a 40nm CMOS process with a strict 3.3V maximum logic rail. Connecting 5V signals directly to its GPIO pins will permanently degrade or destroy the chip.",
        hint: "ESP32 is a 3.3V chip, unlike 5V classic Arduino boards."
      },
      {
        id: "qiot-2",
        question: "Which lightweight publish-subscribe messaging protocol is industry standard for battery-powered IoT devices communicating over bandwidth-constrained networks?",
        type: "mcq",
        options: ["FTP", "MQTT (Message Queuing Telemetry Transport)", "Telnet", "SNMP"],
        correctIndex: 1,
        explanation: "MQTT is an extremely lightweight, binary publish-subscribe protocol designed for low-bandwidth, high-latency, or unreliable networks with minimal packet header overhead (2 bytes).",
        hint: "Think about the protocol created by IBM for pipeline sensor telemetry."
      },
      {
        id: "qiot-3",
        question: "Why should you avoid using `delay()` inside real-time multitasking ESP32 FreeRTOS firmware?",
        type: "troubleshoot",
        options: [
          "`delay()` consumes 100% CPU cycles spinning a busy-wait loop, starving other background RTOS tasks and triggering the Watchdog Timer (WDT).",
          "`delay()` resets the Wi-Fi modem automatically.",
          "`delay()` is a deprecated C++ keyword.",
          "`delay()` inverts GPIO logic states."
        ],
        correctIndex: 0,
        explanation: "Arduino's `delay()` is a busy-wait loop that wastes core clock cycles. In FreeRTOS, you should use `vTaskDelay()` which yields CPU time to other tasks and network stacks while sleeping.",
        hint: "Busy loops block the scheduler from running background Wi-Fi and Bluetooth stacks."
      },
      {
        id: "qiot-4",
        question: "Which ESP32 GPIO pins are INPUT-ONLY and lack internal software pull-up or pull-down resistors?",
        type: "component_id",
        options: ["GPIO 2, 4, 15", "GPIO 18, 19, 23", "GPIO 34, 35, 36, 39", "GPIO 21, 22"],
        correctIndex: 2,
        explanation: "GPIOs 34, 35, 36 (SENSOR_VP), and 39 (SENSOR_VN) are input-only pins connected directly to the ADC/low-power domain. They cannot output digital signals and do NOT have internal pull-ups.",
        hint: "The pins in the mid-30s on the ESP32 pinout chart."
      },
      {
        id: "qiot-5",
        question: "True or False: In Google Firebase, a Realtime Database or Firestore listener operates via continuous polling requests from the browser every 100ms.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Firebase maintains an active, persistent bi-directional WebSocket / TLS connection. When a document changes on the server, the server pushes the diff immediately to clients with near-zero overhead.",
        hint: "Firebase uses reactive push updates over WebSockets rather than HTTP polling."
      }
    ],
    related: {
      componentId: "esp32-wroom",
      experimentId: "iot-cloud-monitoring",
      videoId: "vid-esp32-firebase-tutorial"
    }
  },
  {
    id: "quiz-sensors",
    title: "Quiz 07: Sensor Interfacing & Signal Conditioning",
    category: "SENSORS",
    difficulty: "INTERMEDIATE",
    timeLimitMin: 12,
    description: "Challenge your diagnostic skills on ultrasonic, infrared, optical, capacitive, and MEMS sensor transducers.",
    questions: [
      {
        id: "qsn-1",
        question: "How does the HC-SR04 ultrasonic sensor measure physical distance?",
        type: "mcq",
        options: [
          "By measuring the frequency shift (Doppler effect) of incoming sound.",
          "By measuring the round-trip travel time of an 8-cycle 40 kHz acoustic burst reflecting off an obstacle: D = (Time * 343 m/s) / 2.",
          "By measuring the amplitude attenuation of sound in air.",
          "By measuring electrostatic capacitance changes."
        ],
        correctIndex: 1,
        explanation: "The sensor utilizes acoustic Time of Flight (ToF). Distance is time multiplied by speed of sound (343 m/s), divided by 2 for the round-trip journey.",
        hint: "Distance = Velocity * Time, divided by 2 for round-trip travel."
      },
      {
        id: "qsn-2",
        question: "Why do PIR motion sensors HC-SR501 fail to detect a person who is sitting completely still in a chair?",
        type: "troubleshoot",
        options: [
          "Human skin stops emitting infrared radiation when stationary.",
          "The pyroelectric sensor generates a voltage only when the thermal infrared gradient changes across its dual differential sensing elements as an object moves across Fresnel lens zones.",
          "The sensor's internal capacitor discharges after 5 seconds.",
          "Ambient room lighting cancels out human body thermal emission."
        ],
        correctIndex: 1,
        explanation: "PIR sensors use dual pyroelectric elements wired in opposition. A stationary body illuminates both elements equally, canceling out. Only movement across optical zones causes a differential thermal voltage spike.",
        hint: "The 'P' in PIR stands for 'Passive' and senses changes across dual differential crystal elements."
      },
      {
        id: "qsn-3",
        question: "What physical sensor technology is integrated into the MPU-6050 to measure rotational angular velocity (deg/sec)?",
        type: "mcq",
        options: ["Hall effect magnetic sensors", "MEMS vibrating ring structures measuring Coriolis acceleration", "Optical encoders", "Liquid electrolyte levels"],
        correctIndex: 1,
        explanation: "MEMS gyroscopes vibrate a microscopic capacitive silicon ring. When rotated around an axis, the Coriolis force deflects the vibrating mass orthogonally, changing capacitance proportionally to angular velocity.",
        hint: "The Coriolis effect acts on vibrating microscopic masses during rotation."
      },
      {
        id: "qsn-4",
        question: "What is the typical sampling limitation of a low-cost DHT11 humidity and temperature sensor?",
        type: "mcq",
        options: [
          "It can sample at 1000 Hz.",
          "It must not be polled faster than once every 1 to 2 seconds, or readings will return stale or checksum errors.",
          "It can only be read at midnight.",
          "It must be submerged in water to operate."
        ],
        correctIndex: 1,
        explanation: "The DHT11's internal capacitive humidity polymer and thermistor require ~1 second to stabilize between conversions. Reading faster than 1 Hz produces NaN errors.",
        hint: "DHT11 is slow; you need at least 1-2 seconds between read calls."
      },
      {
        id: "qsn-5",
        question: "True or False: An active infrared obstacle sensor detects black matte objects at the exact same distance as a glossy white cardboard obstacle.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! Infrared optical sensors rely on photon reflection. Glossy white reflects >80% of IR light, whereas matte black absorbs almost all IR photons, reducing detection range from 15cm down to under 3cm.",
        hint: "Does matte black reflect or absorb light?"
      }
    ],
    related: {
      componentId: "sensor-ultrasonic",
      experimentId: "ultrasonic-distance",
      videoId: "vid-ultrasonic-hc-sr04"
    }
  },
  {
    id: "quiz-power-supplies",
    title: "Quiz 08: Power Supply & Voltage Regulation",
    category: "POWER ELECTRONICS",
    difficulty: "INTERMEDIATE",
    timeLimitMin: 12,
    description: "Examine linear regulators, thermal dissipation, buck converters, decoupling strategies, and battery management.",
    questions: [
      {
        id: "qp-1",
        question: "A circuit uses an LM7805 linear regulator to step down a 12V battery to 5V for an Arduino pulling 500mA (0.5A). How much power is wasted as heat in the regulator?",
        type: "mcq",
        options: ["0.5 Watts", "2.5 Watts", "3.5 Watts", "6.0 Watts"],
        correctIndex: 2,
        explanation: "Linear regulator power dissipation: Pd = (Vin - Vout) * Iload = (12V - 5V) * 0.5A = 7V * 0.5A = 3.5 Watts! Without a large heatsink, the TO-220 package will reach over 120°C and trigger thermal shutdown.",
        hint: "Multiply the voltage drop across the regulator by the current passing through it."
      },
      {
        id: "qp-2",
        question: "What is the primary operational advantage of a switching buck regulator (e.g. LM2596) compared to a linear regulator (LM7805)?",
        type: "mcq",
        options: [
          "Switching regulators are completely noiseless with zero EMI.",
          "High energy efficiency (typically 85% to 95%) because the switching element toggles rapidly between fully ON and fully OFF with minimal heat dissipation.",
          "They do not require any inductors or capacitors.",
          "They can only operate on AC inputs."
        ],
        correctIndex: 1,
        explanation: "Switching converters store energy in inductors and capacitors using PWM switching. Because the switch is either fully ON (near zero voltage) or fully OFF (zero current), very little power is dissipated as heat, yielding >90% efficiency.",
        hint: "Why do modern phone chargers stay cool while supplying 30 Watts?"
      },
      {
        id: "qp-3",
        question: "What is the purpose of placing a 100nF (0.1µF) ceramic capacitor in parallel with a 100µF electrolytic capacitor at a digital IC power pin?",
        type: "troubleshoot",
        options: [
          "The electrolytic capacitor filters slow bulk voltage sags; the 0.1µF ceramic has low parasitic inductance (ESL) to shunt high-frequency nanosecond switching spikes to ground.",
          "To double the breakdown voltage.",
          "To convert DC to AC.",
          "To limit current into the chip."
        ],
        correctIndex: 0,
        explanation: "Large electrolytic capacitors have high Equivalent Series Inductance (ESL) and cannot respond to high-frequency MHz digital logic switching spikes. The low-ESL 0.1µF ceramic handles high-frequency noise right at the IC pins.",
        hint: "Different capacitor types handle different frequency bands of power rail noise."
      },
      {
        id: "qp-4",
        question: "What is the 'Dropout Voltage' of a linear voltage regulator?",
        type: "mcq",
        options: [
          "The voltage at which the regulator explodes.",
          "The minimum headroom difference between input voltage and output voltage required to maintain regulation.",
          "The voltage drop across the ground pin.",
          "The output voltage ripple amplitude."
        ],
        correctIndex: 1,
        explanation: "Dropout voltage is the minimum required (Vin - Vout). For LM7805, dropout is ~2.0V, meaning Vin must be at least 7.0V to deliver a clean 5.0V output. Low-Dropout (LDO) regulators can regulate with dropouts under 200mV.",
        hint: "How much higher must Vin be than Vout for the regulator to function?"
      },
      {
        id: "qp-5",
        question: "True or False: Connecting two 12V 100Ah lead-acid batteries in SERIES yields a 24V battery bank with 200Ah capacity.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False! In series connection, voltages add (12V + 12V = 24V), but capacity remains the same (100Ah). To double capacity to 200Ah at 12V, the batteries must be connected in PARALLEL.",
        hint: "Series adds voltage; parallel adds amp-hour capacity."
      }
    ],
    related: {
      componentId: "regulator-7805",
      experimentId: "ohms-law",
      videoId: "vid-voltage-regulators"
    }
  },
  {
    id: "quiz-diagnostics",
    title: "Quiz 09: Practical Circuit Troubleshooting & Diagnostics",
    category: "LABORATORY & TROUBLESHOOTING",
    difficulty: "ADVANCED",
    timeLimitMin: 15,
    description: "Diagnose real-world laboratory circuit failures, ground loops, floating pins, reverse polarity, and soldering defects.",
    questions: [
      {
        id: "qd-1",
        question: "Troubleshooting Scenario: An Arduino-controlled robot moves its servo motor, and immediately the Arduino resets and re-runs `setup()` in an infinite loop. What is the root cause?",
        type: "troubleshoot",
        options: [
          "The servo motor's initial high inrush stall current drops the Arduino's 5V rail below brown-out detector threshold (BOR ~4.3V), forcing a hardware reset.",
          "The code has an infinite recursive function.",
          "The servo signal wire is picking up 50Hz mains hum.",
          "The Arduino crystal oscillator stopped oscillating."
        ],
        correctIndex: 0,
        explanation: "DC motors and servos pull huge stall currents (>500mA) when starting. Powering motors from the microcontroller's 5V pin causes severe voltage sags that trigger the onboard Brown-Out Reset (BOR).",
        hint: "What happens to the supply rail voltage when a motor suddenly stalls?"
      },
      {
        id: "qd-2",
        question: "You measure a 5V logic line with a digital multimeter and read 2.4V steady state. What does this usually indicate in a digital circuit?",
        type: "troubleshoot",
        options: [
          "A healthy digital HIGH state.",
          "A floating high-impedance (tri-state) line or a bus contention where two outputs are fighting (one driving HIGH, the other driving LOW).",
          "The battery is at 50% capacity.",
          "The multimeter battery is low."
        ],
        correctIndex: 1,
        explanation: "In 5V TTL/CMOS, valid LOW is <0.8V and valid HIGH is >2.7V. A voltage in the invalid intermediate band (~2.4V) indicates a floating input or bus contention where two active outputs are shorting against each other.",
        hint: "In digital logic, voltages between valid LOW and HIGH represent undefined contention."
      },
      {
        id: "qd-3",
        question: "A student assembles an I2C LCD display circuit with an Arduino, but running the sketch only displays a solid row of white blocks. What should they do first?",
        type: "troubleshoot",
        options: [
          "Replace the Arduino microcontroller.",
          "Adjust the blue contrast potentiometer on the back of the I2C backpack with a small screwdriver.",
          "Reinstall the Arduino IDE software.",
          "Desolder the LCD header pins."
        ],
        correctIndex: 1,
        explanation: "Solid rectangles on line 1 of an HD44780 LCD indicate that contrast voltage (V0) is set to an extreme. Turning the potentiometer on the back will bring the characters into crisp focus.",
        hint: "Check the physical contrast adjustment trimmer."
      },
      {
        id: "qd-4",
        question: "What is a 'Cold Solder Joint' and how is it identified visually?",
        type: "mcq",
        options: [
          "A solder joint made in a cold air-conditioned room.",
          "A defective joint where the solder was not heated sufficiently, characterized by a dull, grainy, greyish appearance and high electrical contact resistance.",
          "A joint that has cooled to room temperature safely.",
          "A joint soldered with silver-free alloy."
        ],
        correctIndex: 1,
        explanation: "A good solder joint is shiny, concave, and forms a smooth wetting fillet. A cold solder joint occurs when component leads were not hot enough to melt flux, resulting in a dull, pitted ball with intermittent electrical connectivity.",
        hint: "Good solder joints are shiny fillets; bad ones are dull, lumpy balls."
      },
      {
        id: "qd-5",
        question: "True or False: When connecting an oscilloscope ground clip to a circuit powered by an earth-grounded bench power supply, connecting the clip to anything other than circuit GND can create a catastrophic dead short through mains earth.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! Oscilloscope probe ground clips are bonded directly to mains Earth Ground inside the scope chassis. Attaching the ground clip to a live node (e.g. +12V) creates a dead short through the earth wire that will vaporize the probe lead.",
        hint: "Oscilloscope ground clips are not isolated—they are connected to building mains earth ground."
      }
    ],
    related: {
      componentId: "arduino-uno",
      experimentId: "led-blink",
      videoId: "vid-arduino-basics"
    }
  },
  {
    id: "quiz-digital-logic",
    title: "Quiz 10: Digital Logic & Embedded Communications (I2C, SPI, UART)",
    category: "DIGITAL & EMBEDDED",
    difficulty: "ADVANCED",
    timeLimitMin: 15,
    description: "Compare communication bus topologies, master/slave handshakes, clock polarity, and serial protocols.",
    questions: [
      {
        id: "qdl-1",
        question: "How many physical signal lines does the I2C communication bus require between master and slave devices?",
        type: "mcq",
        options: ["1 line (1-Wire)", "2 lines (SDA for Serial Data, SCL for Serial Clock)", "4 lines (MOSI, MISO, SCK, CS)", "8 lines (Parallel bus)"],
        correctIndex: 1,
        explanation: "I2C (Inter-Integrated Circuit) is a synchronous two-wire bus: SDA (Serial Data) and SCL (Serial Clock), plus a common ground reference. It supports up to 127 devices on a single bus using 7-bit addresses.",
        hint: "I2C is also known as the Two-Wire Interface (TWI)."
      },
      {
        id: "qdl-2",
        question: "Why do I2C bus lines (SDA and SCL) REQUIRE external pull-up resistors (typically 4.7kΩ) to VCC?",
        type: "troubleshoot",
        options: [
          "To speed up the baud rate to 10 Mbps.",
          "Because all I2C devices have open-drain (open-collector) output drivers that can only pull the line LOW, relying on the pull-up resistor to restore HIGH.",
          "To prevent devices from entering sleep mode.",
          "To step down 5V signals to 3.3V."
        ],
        correctIndex: 1,
        explanation: "I2C uses open-drain drivers to allow multi-master arbitration and clock stretching without risk of destructive short-circuit bus contention. No device ever drives HIGH directly; the pull-up resistor pulls the bus HIGH when idle.",
        hint: "Open-drain outputs can sink current to ground, but cannot source current to VCC."
      },
      {
        id: "qdl-3",
        question: "What is the primary speed and throughput advantage of the SPI (Serial Peripheral Interface) bus compared to I2C?",
        type: "mcq",
        options: [
          "SPI requires fewer wires than I2C.",
          "SPI is full-duplex with push-pull drivers capable of clock speeds exceeding 50 MHz without open-drain pull-up RC rise-time limits.",
          "SPI devices have hardware collision arbitration.",
          "SPI does not require a clock line."
        ],
        correctIndex: 1,
        explanation: "SPI uses dedicated Master-Out-Slave-In (MOSI) and Master-In-Slave-Out (MISO) lines with push-pull CMOS drivers. This allows full-duplex simultaneous transmission at 10 MHz to 80 MHz+, whereas I2C is half-duplex and limited by pull-up RC charging curves.",
        hint: "SPI has dedicated transmit and receive lines (MISO and MOSI) and push-pull drivers."
      },
      {
        id: "qdl-4",
        question: "In asynchronous UART serial communication (such as Arduino `Serial.begin(9600)`), how is bit synchronization maintained between transmitter and receiver?",
        type: "mcq",
        options: [
          "Through a shared hardware clock line.",
          "Both devices are pre-configured to identical baud rates, and each byte begins with a LOW Start Bit to synchronize receiver clocks.",
          "Via Wi-Fi packet timing.",
          "Using infrared pulses."
        ],
        correctIndex: 1,
        explanation: "Asynchronous UART has no clock wire. Both devices must agree on the baud rate in advance (e.g. 9600 bps = 104.16µs per bit). The transmission of a LOW Start Bit alerts the receiver to begin sampling bits at precise timed intervals.",
        hint: "Why is UART called 'Asynchronous'?"
      },
      {
        id: "qdl-5",
        question: "True or False: In SPI bus topology, you can communicate with multiple slave devices on the same bus lines by assigning each slave a unique Chip Select (CS / SS) pin.",
        type: "true_false",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "True! In SPI, the SCK, MOSI, and MISO lines are shared in parallel among all slaves, but each slave has a dedicated active-LOW Chip Select (CS) pin. The master pulls only one slave's CS LOW to activate it.",
        hint: "How does an SPI master select which peripheral device to talk to?"
      }
    ],
    related: {
      componentId: "ic-74hc595",
      experimentId: "esp32-telemetry",
      videoId: "vid-shift-register-74hc595"
    }
  }
];
