// NextGen Education - Structured Learning Curriculum Dataset
// Contains 15 comprehensive engineering learning modules across 10 engineering disciplines

export const learningCategories = [
  "ELECTRONICS FUNDAMENTALS",
  "ANALOG ELECTRONICS",
  "DIGITAL ELECTRONICS",
  "MICROCONTROLLERS",
  "EMBEDDED SYSTEMS",
  "IoT & CLOUD",
  "COMMUNICATION & RF",
  "VLSI DESIGN",
  "PCB DESIGN & FABRICATION",
  "EMBEDDED PROGRAMMING"
];

export const learningTopics = [
  {
    id: "learn-ohms-kirchhoff",
    title: "Ohm's Law & Kirchhoff's Circuit Laws (KCL & KVL)",
    category: "ELECTRONICS FUNDAMENTALS",
    readingTime: "12 Mins",
    summary: "The bedrock mathematical foundations of electrical network analysis: Ohm's Law, Kirchhoff's Current Law (junction rule), and Kirchhoff's Voltage Law (loop rule).",
    overview: "Every electronic circuit, from a simple LED flasher to a multi-billion transistor microprocessor, obeys the conservation laws formalized by Georg Ohm and Gustav Kirchhoff in the 19th century. Mastering these fundamentals allows engineers to calculate branch currents, nodal potentials, and power balances effortlessly.",
    corePrinciples: [
      "Ohm's Law states that current I is directly proportional to potential difference V and inversely proportional to resistance R: V = I * R.",
      "Kirchhoff's Current Law (KCL): The algebraic sum of all currents entering and exiting any electrical node must equal zero (conservation of electrical charge). Σ I_in = Σ I_out.",
      "Kirchhoff's Voltage Law (KVL): The algebraic sum of all electrical potential differences around any closed circuit loop must equal zero (conservation of energy). Σ V_drops = Σ V_sources."
    ],
    keyFormulas: [
      "V = I × R (Volts = Amperes × Ohms)",
      "P = V × I = I² × R = V² / R (Watts)",
      "KCL: I₁ + I₂ + ... + In = 0",
      "KVL: V_source - V_R1 - V_R2 - ... - V_Rn = 0"
    ],
    circuitExample: "A 12V automotive battery feeds two series resistors R1 = 4Ω and R2 = 8Ω. Total resistance R = 12Ω. Loop current I = 12V / 12Ω = 1.0A. Voltage drop across R1 = 1A * 4Ω = 4V. Drop across R2 = 1A * 8Ω = 8V. Total drops = 4V + 8V = 12V, satisfying KVL perfectly.",
    commonPitfalls: [
      "Forgetting reference sign conventions when assigning branch current arrows in KCL.",
      "Treating non-linear components (like diodes or transistors) as constant resistors in Ohm's Law."
    ],
    practicalApplications: ["Power distribution analysis", "Battery management systems", "Sensor voltage divider conditioning"],
    related: {
      componentId: "resistor",
      experimentId: "ohms-law",
      projectId: "energy-monitor",
      quizId: "quiz-fundamentals"
    }
  },
  {
    id: "learn-capacitors-inductors",
    title: "Capacitors, Inductors & Transient Response",
    category: "ELECTRONICS FUNDAMENTALS",
    readingTime: "15 Mins",
    summary: "Energy storage in electrostatic and magnetic fields: differential equations, RC/RL time constants, reactance, and impedance.",
    overview: "Unlike resistors that dissipate energy permanently as thermal heat, capacitors and inductors store energy temporarily in electrostatic fields (between conducting plates) and magnetic flux fields (around coils). They are the fundamental building blocks of frequency-selective filters, oscillators, and switching power supplies.",
    corePrinciples: [
      "Capacitor fundamental relation: Q = C * V and i(t) = C * (dv/dt). Voltage across a capacitor cannot change instantaneously.",
      "Inductor fundamental relation: V(t) = L * (di/dt). Current through an inductor cannot change instantaneously.",
      "Time constant τ (tau): For RC circuits, τ = R * C. For RL circuits, τ = L / R. At 5τ, a circuit reaches >99% steady-state equilibrium.",
      "Capacitive reactance Xc = 1 / (2πfC). Inductive reactance XL = 2πfL."
    ],
    keyFormulas: [
      "Charging Vc(t) = V₀ × (1 - e^(-t / RC))",
      "Discharging Vc(t) = V₀ × e^(-t / RC)",
      "Stored Energy (Capacitor) E = 0.5 × C × V² (Joules)",
      "Stored Energy (Inductor) E = 0.5 × L × I² (Joules)"
    ],
    circuitExample: "Power Supply Filter: 50Hz full-wave rectified DC has 100Hz ripple. Placing a 1000µF capacitor across the output smooths ripple by charging during wave peaks and sustaining load current during valleys.",
    commonPitfalls: [
      "Exceeding capacitor maximum DC voltage ratings, which causes dielectric breakdown.",
      "Switching an inductive coil without a flyback clamp diode, causing destructive high-voltage arcing."
    ],
    practicalApplications: ["DC-DC buck converters", "Audio crossover equalizer networks", "Microcontroller decoupling bypass"],
    related: {
      componentId: "capacitor",
      experimentId: "rc-charging",
      projectId: "touch-based-light",
      quizId: "quiz-fundamentals"
    }
  },
  {
    id: "learn-diodes-rectifiers",
    title: "Semiconductor Diodes & AC Rectification",
    category: "ANALOG ELECTRONICS",
    readingTime: "14 Mins",
    summary: "P-N junction barrier physics, Shockley equation, half-wave & full-wave bridge rectifiers, and Zener voltage references.",
    overview: "Semiconductors are materials whose conductivity can be precisely modulated by doping with donor or acceptor impurities. Joining P-type and N-type silicon creates a depletion region that allows current to flow freely in the forward direction while blocking reverse current.",
    corePrinciples: [
      "Forward bias reduces the depletion barrier; conduction begins above cut-in voltage Vγ (~0.7V for Silicon, ~0.3V for Germanium).",
      "Reverse bias widens the depletion zone until reverse breakdown voltage (Vbr) is reached.",
      "Full-wave bridge rectifiers use 4 diodes arranged in a ring to convert alternating current (AC) into unidirectional pulsating DC."
    ],
    keyFormulas: [
      "Shockley Diode Equation: I = Is × (e^(V / ηVt) - 1)",
      "Thermal Voltage Vt = kT / q ≈ 26 mV at 300K",
      "V_dc (Bridge Rectifier) = (2 × V_peak / π) - 2 × Vf"
    ],
    circuitExample: "Bridge Rectifier: 230VAC stepped down to 12VAC RMS (16.9V peak). Passing through 4 diodes drops 1.4V, delivering 15.5V peak DC to a smoothing capacitor.",
    commonPitfalls: [
      "Confusing Peak Inverse Voltage (PIV) ratings and operating diodes close to breakdown.",
      "Connecting an LED directly to a voltage supply without calculating a series current-limiting resistor."
    ],
    practicalApplications: ["AC-to-DC laptop adapters", "Solar panel anti-reverse discharge diodes", "Relay back-EMF snubbers"],
    related: {
      componentId: "diode-1n4007",
      experimentId: "diode-characteristics",
      projectId: "energy-monitor",
      quizId: "quiz-semiconductors"
    }
  },
  {
    id: "learn-bjt-mosfet",
    title: "Bipolar Junction Transistors (BJT) & Power MOSFETs",
    category: "ANALOG ELECTRONICS",
    readingTime: "16 Mins",
    summary: "Current-controlled vs voltage-controlled solid-state switching, biasing networks, and thermal management.",
    overview: "Transistors are the building blocks of modern computing and power electronics. This module covers using BJTs and MOSFETs as solid-state digital switches and linear amplifiers.",
    corePrinciples: [
      "BJT is current-controlled: Small base current Ib controls larger collector current Ic (Ic = β * Ib).",
      "MOSFET is voltage-controlled: Gate voltage relative to Source (Vgs) induces a conductive channel with zero DC gate current.",
      "Switching saturation: In cutoff, switch is OPEN; in saturation, switch is CLOSED with minimum Vce(sat) or Rds(on)."
    ],
    keyFormulas: [
      "BJT: Ic = β × Ib | Ie = Ib + Ic",
      "MOSFET Conduction Loss: P_loss = I_drain² × Rds(on)",
      "Base Overdrive (Switching): Ib ≥ Ic / 10"
    ],
    circuitExample: "Driving a 12V 2A DC motor from an Arduino 5V pin using an N-channel MOSFET: 100Ω gate series resistor, 10kΩ pull-down from gate to ground, motor connected between +12V and Drain.",
    commonPitfalls: [
      "Driving standard high-threshold MOSFETs directly from 3.3V logic (requires logic-level gate).",
      "Leaving MOSFET gates floating, resulting in catastrophic shoot-through."
    ],
    practicalApplications: ["H-bridge motor drivers", "Solid-state relays", "Class D audio amplifiers"],
    related: {
      componentId: "bjt-bc547",
      experimentId: "transistor-switch",
      projectId: "auto-street-light",
      quizId: "quiz-transistor-circuits"
    }
  },
  {
    id: "learn-opamps",
    title: "Operational Amplifiers & Signal Conditioning",
    category: "ANALOG ELECTRONICS",
    readingTime: "15 Mins",
    summary: "Differential amplifiers, negative feedback topologies, active filters, summing amplifiers, and precision comparators.",
    overview: "Operational amplifiers (Op-Amps) are high-gain direct-coupled differential voltage amplifiers. With negative feedback, op-amps perform linear mathematical operations: addition, subtraction, differentiation, and integration.",
    corePrinciples: [
      "Golden Rule 1: Differential input voltage is forced to zero (V+ = V-).",
      "Golden Rule 2: Op-amp inputs draw zero current (infinite input impedance).",
      "Negative feedback stabilizes gain and widens bandwidth."
    ],
    keyFormulas: [
      "Inverting Gain: Av = - (Rf / Rin)",
      "Non-Inverting Gain: Av = 1 + (Rf / Rin)",
      "Active Low-Pass Cutoff: fc = 1 / (2π × R × C)"
    ],
    circuitExample: "Sensor Preamplifier: A thermocouple outputs 20mV. A non-inverting op-amp with Rin = 1kΩ and Rf = 99kΩ provides a gain of 100, boosting the signal to 2.0V for an Arduino ADC.",
    commonPitfalls: [
      "Assuming single-supply op-amps can swing all the way to 0V and VCC without rail-to-rail architecture.",
      "Leaving unused op-amp sections uncommitted, leading to parasitic oscillation."
    ],
    practicalApplications: ["ECG and medical instrumentation", "Microphone audio preamps", "Active Butterworth filters"],
    related: {
      componentId: "ic-lm358",
      experimentId: "ldr-auto-light",
      projectId: "temperature-monitor",
      quizId: "quiz-analog-circuits"
    }
  },
  {
    id: "learn-digital-logic",
    title: "Digital Logic Gates, Boolean Algebra & Registers",
    category: "DIGITAL ELECTRONICS",
    readingTime: "14 Mins",
    summary: "Combinational and sequential logic design, truth tables, Karnaugh maps, flip-flops, and shift registers.",
    overview: "Digital electronics processes discrete binary information (0 and 1). This module covers combinational logic (AND, OR, NOT, NAND, XOR) and sequential logic (latches, flip-flops, registers) that form the basis of CPU registers and memory.",
    corePrinciples: [
      "De Morgan's Laws: !(A & B) = !A | !B and !(A | B) = !A & !B.",
      "Sequential logic uses feedback to store state (memory); clocked flip-flops update outputs synchronously.",
      "Shift registers convert serial data streams into parallel data and vice-versa."
    ],
    keyFormulas: [
      "NAND Universal Gate: A & B = !(!(A & B))",
      "XOR Gate: Y = A ⊕ B = A·!B + !A·B",
      "Clock Frequency: f = 1 / T_period"
    ],
    circuitExample: "74HC595 Shift Register: 3 Arduino pins stream an 8-bit byte serially to control 8 separate LEDs simultaneously, expanding digital outputs.",
    commonPitfalls: [
      "Metastability caused by violating setup and hold times on flip-flop data inputs.",
      "Unused CMOS inputs floating and drawing excessive current."
    ],
    practicalApplications: ["Microprocessor ALU units", "Hardware debounce circuits", "LED matrix multiplexing"],
    related: {
      componentId: "ic-74hc595",
      experimentId: "led-pwm",
      projectId: "smart-home-automation",
      quizId: "quiz-digital-logic"
    }
  },
  {
    id: "learn-microcontrollers-arch",
    title: "Microcontroller Architecture & Peripheral Interfacing",
    category: "MICROCONTROLLERS",
    readingTime: "15 Mins",
    summary: "Von Neumann vs Harvard architectures, ATmega328P internals, hardware timers, interrupts, and ADC converters.",
    overview: "A microcontroller (MCU) integrates a CPU, flash memory, SRAM, and peripheral interfaces on a single silicon die. Understanding internal hardware registers allows engineers to write deterministic, high-speed embedded firmware.",
    corePrinciples: [
      "Harvard architecture separates instruction bus and data bus for simultaneous single-cycle execution.",
      "Hardware Interrupts halt main execution immediately upon a physical event (e.g. rising edge on a sensor pin) to service an ISR routine.",
      "Hardware timers generate precise PWM waveforms without software CPU overhead."
    ],
    keyFormulas: [
      "Timer Frequency: f_pwm = f_cpu / (Prescaler × 256)",
      "ADC Voltage: V_in = (ADC_Reading / 1024) × V_ref"
    ],
    circuitExample: "Rotary Encoder reading via Pin Change Interrupts (PCINT) on Arduino Uno, tracking motor shaft rotation at 10,000 pulses per second without dropping ticks.",
    commonPitfalls: [
      "Calling `delay()` or heavy serial print commands inside an Interrupt Service Routine (ISR).",
      "Forgetting to declare shared global variables as `volatile`."
    ],
    practicalApplications: ["Robotic motor control", "Industrial PID controllers", "Automotive engine ECUs"],
    related: {
      componentId: "arduino-uno",
      experimentId: "led-blink",
      projectId: "smart-dustbin",
      quizId: "quiz-microcontrollers"
    }
  },
  {
    id: "learn-esp32-embedded",
    title: "ESP32 Dual-Core Architecture & FreeRTOS",
    category: "EMBEDDED SYSTEMS",
    readingTime: "16 Mins",
    summary: "Xtensa 32-bit dual-core computing, FreeRTOS multitasking, memory layout, and real-time task scheduling.",
    overview: "The ESP32 represents a massive leap in embedded computing, featuring dual 240MHz cores, integrated 2.4GHz Wi-Fi, Bluetooth 4.2 BLE, and native FreeRTOS kernel execution. Engineers can dedicate Core 0 to wireless network stacks while Core 1 executes time-critical sensor loops.",
    corePrinciples: [
      "FreeRTOS preemptive multitasking swaps tasks based on assigned priorities.",
      "Inter-task communication uses thread-safe Queues, Mutexes, and Semaphores.",
      "Ultra-Low-Power (ULP) coprocessor monitors sensors while main CPU sleeps in deep-sleep mode (<10µA)."
    ],
    keyFormulas: [
      "Core 0: Protocol Stack (Wi-Fi, Bluetooth, TCP/IP)",
      "Core 1: User Application Loop (`loop()` runs on Core 1)",
      "Tick Period: 1 tick = 1 ms (1000 Hz scheduler)"
    ],
    circuitExample: "Dual-core sensor node: Task 1 reads MPU-6050 accelerometer at 100 Hz on Core 1; Task 2 streams compressed JSON packets to Firebase Cloud on Core 0.",
    commonPitfalls: [
      "Accessing shared variables across two cores without a FreeRTOS Mutex, causing race conditions.",
      "Failing to feed the FreeRTOS Task Watchdog Timer (TWDT)."
    ],
    practicalApplications: ["Edge AI inference devices", "Smart connected appliances", "Industrial telemetry gateways"],
    related: {
      componentId: "esp32-wroom",
      experimentId: "esp32-telemetry",
      projectId: "iot-weather-station",
      quizId: "quiz-iot-embedded"
    }
  },
  {
    id: "learn-serial-buses",
    title: "Embedded Communication Protocols: I2C, SPI & UART",
    category: "EMBEDDED SYSTEMS",
    readingTime: "15 Mins",
    summary: "Hardware communication buses: Open-drain I2C pull-ups, full-duplex SPI clocking, and asynchronous UART framing.",
    overview: "Inter-chip communication is the circulatory system of modern embedded devices. Selecting the right protocol (I2C for low-pin-count sensors, SPI for high-speed displays, UART for terminal telemetry) is a vital engineering skill.",
    corePrinciples: [
      "UART is asynchronous point-to-point (TX/RX) requiring agreed baud rates and start/stop framing bits.",
      "I2C is synchronous half-duplex two-wire (SDA/SCL) using open-drain drivers and 7-bit addressing.",
      "SPI is synchronous full-duplex four-wire (MOSI/MISO/SCK/CS) capable of 50MHz+ speeds."
    ],
    keyFormulas: [
      "UART Bit Time = 1 / Baud Rate (e.g. 1 / 115200 ≈ 8.68 µs)",
      "I2C Pull-Up Minimum: R_min = (Vcc - 0.4V) / 3mA",
      "SPI Throughput = Clock Frequency / 8 bytes per second"
    ],
    circuitExample: "Interfacing an SSD1306 OLED display over I2C (address 0x3C) alongside an MPU-6050 IMU (address 0x68) on the same 2-wire bus using two 4.7kΩ pull-up resistors.",
    commonPitfalls: [
      "Omitting pull-up resistors on an I2C bus (bus will hang indefinitely).",
      "Connecting 5V UART signals directly to 3.3V devices without a level shifter."
    ],
    practicalApplications: ["Sensor bus topologies", "Flash memory reading", "GPS module NMEA data reception"],
    related: {
      componentId: "sensor-mpu6050",
      experimentId: "esp32-telemetry",
      projectId: "esp32-sensor-monitoring",
      quizId: "quiz-digital-logic"
    }
  },
  {
    id: "learn-iot-protocols",
    title: "IoT Architecture, MQTT, HTTP & Cloud Telemetry",
    category: "IoT & CLOUD",
    readingTime: "14 Mins",
    summary: "Cloud IoT topologies, publish/subscribe messaging, REST APIs, TLS encryption, and Google Firebase integration.",
    overview: "The Internet of Things connects edge physical sensors to cloud databases and web dashboards. This module explores MQTT brokers, Quality of Service (QoS), JSON payloads, and real-time database streaming.",
    corePrinciples: [
      "Client-Server HTTP vs Publish-Subscribe MQTT broker architecture.",
      "Payload serialization using lightweight JSON or Protocol Buffers.",
      "TLS/SSL encryption protecting edge data in transit over public internet."
    ],
    keyFormulas: [
      "QoS 0: At most once delivery (Fire and forget)",
      "QoS 1: At least once delivery (Acknowledged)",
      "QoS 2: Exactly once delivery (Four-step handshake)"
    ],
    circuitExample: "Smart Agriculture: An ESP32 deep-sleeps for 15 minutes, wakes up, reads soil moisture, connects to Wi-Fi, publishes to MQTT topic `greenhouse/sensor1`, and returns to deep sleep, running for 1 year on two AA batteries.",
    commonPitfalls: [
      "Sending uncompressed verbose text payloads that waste mobile cellular data.",
      "Hardcoding root SSL certificates that expire in firmware."
    ],
    practicalApplications: ["Fleet GPS vehicle tracking", "Smart grid smart meters", "Automated weather networks"],
    related: {
      componentId: "esp32-wroom",
      experimentId: "iot-cloud-monitoring",
      projectId: "iot-weather-station",
      quizId: "quiz-iot-embedded"
    }
  },
  {
    id: "learn-rf-wireless",
    title: "RF Communications, Modulation & Wireless Protocols",
    category: "COMMUNICATION & RF",
    readingTime: "15 Mins",
    summary: "Electromagnetic spectrum, antennas, AM/FM/FSK modulation, Bluetooth Low Energy (BLE), and Sub-GHz LoRa.",
    overview: "Wireless communication radiates electromagnetic energy through free space. This module examines antenna design, link budgets, frequency bands (433MHz, 2.4GHz), and long-range modulation schemes like LoRa.",
    corePrinciples: [
      "Wavelength λ = c / f, where c is speed of light (3 × 10⁸ m/s).",
      "Quarter-wave whip antenna length L = λ / 4. For 433MHz: L ≈ 17.3 cm.",
      "Friis Transmission Equation calculates received signal power across distance."
    ],
    keyFormulas: [
      "λ = 300 / f_MHz (meters)",
      "Antenna Length L = 75 / f_MHz (meters for quarter-wave)",
      "Free Space Path Loss FSPL = 20·log10(d) + 20·log10(f) + 92.45 dB"
    ],
    circuitExample: "Quarter-wave antenna for 2.4GHz Wi-Fi / Bluetooth: λ = 300 / 2400 = 0.125m (12.5cm). L = 12.5cm / 4 = 3.125cm trace on PCB.",
    commonPitfalls: [
      "Mismatching antenna impedance (standard is 50Ω), causing high Standing Wave Ratio (SWR) and burned RF finals.",
      "Running RF traces near high-speed digital buses without ground shielding."
    ],
    practicalApplications: ["LoRa agricultural telemetry", "Bluetooth smart locks", "Keyless automobile entry"],
    related: {
      componentId: "esp32-wroom",
      experimentId: "esp32-telemetry",
      projectId: "voice-based-smart-light",
      quizId: "quiz-iot-embedded"
    }
  },
  {
    id: "learn-pcb-design",
    title: "PCB Design Fundamentals, Schematic to Fabrication",
    category: "PCB DESIGN & FABRICATION",
    readingTime: "14 Mins",
    summary: "Schematic capture, PCB layer stacks, trace width calculation, ground planes, decoupling placement, and Gerber generation.",
    overview: "Transitioning a breadboard prototype to a rugged printed circuit board is a required engineering milestone. This module covers KiCad/EasyEDA workflows, IPC standard trace clearances, and manufacturing design rules (DRC).",
    corePrinciples: [
      "Solid ground plane on bottom/inner layer provides low-impedance return paths and minimizes EMI radiation.",
      "Keep high-frequency switching loops (SMPS, buck regulators) as small as physically possible.",
      "Decoupling capacitors must be placed right against IC power pins before vias."
    ],
    keyFormulas: [
      "IPC-2152 Trace Width for 1A current (1 oz copper, 10°C rise) ≈ 0.3mm (12 mils)",
      "Characteristic Impedance: Z₀ ≈ 50Ω for controlled RF traces"
    ],
    circuitExample: "Designing a 2-layer Arduino shield: Top layer carries signal routing; entire bottom layer is filled with a solid GND copper pour, stitched with ground vias.",
    commonPitfalls: [
      "Routing traces with sharp 90-degree corners (causes acid traps and impedance discontinuities; use 45-degree angles).",
      "Forgetting teardrops on via pads, leading to drill breakout fractures."
    ],
    practicalApplications: ["Custom sensor breakout boards", "Motor driver shields", "Commercial consumer electronics"],
    related: {
      componentId: "arduino-uno",
      experimentId: "led-blink",
      projectId: "obstacle-robot",
      quizId: "quiz-diagnostics"
    }
  },
  {
    id: "learn-vlsi-digital-design",
    title: "VLSI Design, Verilog HDL & RTL Synthesis",
    category: "VLSI DESIGN",
    readingTime: "16 Mins",
    summary: "Hardware Description Languages (HDL), Register Transfer Level (RTL), FPGA synthesis, and CMOS standard cell layout.",
    overview: "Very Large Scale Integration (VLSI) enables millions to billions of MOS transistors to fit on a single microchip. Unlike software programming where code executes sequentially, Verilog describes physical hardware circuits that operate concurrently in parallel.",
    corePrinciples: [
      "Concurrency: In Verilog, all `assign` statements and `always` blocks execute simultaneously.",
      "Blocking (`=`) vs Non-blocking (`<=`) assignments in combinational vs sequential logic.",
      "Static Timing Analysis (STA) verifies setup and hold times across clock domains."
    ],
    keyFormulas: [
      "Setup Time: T_clk ≥ T_cq + T_comb + T_setup",
      "Clock Skew: T_skew = T_clk2 - T_clk1",
      "Dynamic CMOS Power: P = α × C × Vdd² × f"
    ],
    circuitExample: "4-bit synchronous binary up-counter implemented in Verilog on a Xilinx FPGA, synthesized into D-flip-flops and look-up tables (LUTs).",
    commonPitfalls: [
      "Accidentally inferring unintended transparent latches by failing to specify default values in `case` or `if-else` blocks.",
      "Using blocking assignments inside sequential clocked blocks."
    ],
    practicalApplications: ["ASIC processor cores", "FPGA hardware accelerators", "High-frequency crypto engines"],
    related: {
      componentId: "ic-74hc595",
      experimentId: "led-pwm",
      projectId: "smart-energy-monitoring",
      quizId: "quiz-digital-logic"
    }
  },
  {
    id: "learn-embedded-c",
    title: "Embedded C/C++ Programming & Register Manipulation",
    category: "EMBEDDED PROGRAMMING",
    readingTime: "15 Mins",
    summary: "Direct hardware port manipulation, bitwise masks, pointer memory mapping, and writing efficient C for resource-constrained systems.",
    overview: "While Arduino functions like `digitalWrite()` are beginner-friendly, they execute dozens of CPU cycles per call. Direct register manipulation (e.g. `PORTB |= (1 << PB5)`) executes in a single 62.5ns machine instruction, essential for high-speed protocols.",
    corePrinciples: [
      "Bitwise operators (`|`, `&`, `^`, `~`, `<<`, `>>`) set, clear, and toggle individual hardware bits.",
      "Data Direction Registers (DDRx) configure pin inputs/outputs; PORTx sets outputs; PINx reads physical inputs.",
      "Memory management: Avoiding dynamic heap allocation (`malloc`/`new`) to prevent RAM fragmentation."
    ],
    keyFormulas: [
      "Set Bit n: PORTB |= (1 << n)",
      "Clear Bit n: PORTB &= ~(1 << n)",
      "Toggle Bit n: PORTB ^= (1 << n)",
      "Read Bit n: (PINB & (1 << n)) != 0"
    ],
    circuitExample: "High-speed square wave: Writing `PORTB ^= (1 << PB5)` inside a tight while-loop generates an 8 MHz square wave on Pin 13, compared to just 120 kHz using standard `digitalWrite()`.",
    commonPitfalls: [
      "Stack overflow caused by deep recursive functions on microcontrollers with only 2KB of SRAM.",
      "Modifying port registers without bitwise masks, inadvertently overwriting neighboring pin states."
    ],
    practicalApplications: ["Software bit-banged SPI/I2C buses", "Automotive CAN bus controllers", "Aerospace flight control firmware"],
    related: {
      componentId: "arduino-uno",
      experimentId: "led-blink",
      projectId: "obstacle-robot",
      quizId: "quiz-microcontrollers"
    }
  },
  {
    id: "learn-circuit-troubleshooting",
    title: "Practical Laboratory Troubleshooting & Debugging",
    category: "ELECTRONICS FUNDAMENTALS",
    readingTime: "13 Mins",
    summary: "Scientific fault diagnosis: Multimeter probing, oscilloscope triggering, signal integrity, and debugging methodology.",
    overview: "Debugging a broken circuit requires a systematic, hypothesis-driven engineering mindset. This guide outlines standard diagnostic workflows: dividing the circuit into functional blocks, verifying power rails first, and isolating components.",
    corePrinciples: [
      "Rule 1: Always check power rails first (voltage level, polarity, noise). 80% of circuit faults stem from power supply issues.",
      "Rule 2: Divide and Conquer. Break the system in half to isolate whether the fault is in sensor input, processing logic, or actuator output.",
      "Rule 3: Check common grounds. Disconnected ground references between separate power supplies cause erratic behavior."
    ],
    keyFormulas: [
      "Continuity Test: <50Ω triggers audio buzzer",
      "Diode Test: Forward ~0.6V, Reverse OL (Open Loop)",
      "Voltage Drop Method: I = V_drop / R_known"
    ],
    circuitExample: "A microcontroller system does not turn on. Step 1: Probe 5V regulator output (reads 1.8V). Step 2: Feel regulator (scorching hot). Step 3: Remove ICs one by one until 5V restores; discovers reversed motor driver IC causing dead short.",
    commonPitfalls: [
      "Swapping parts randomly without taking systematic multimeter voltage measurements.",
      "Assuming breadboard power rail strips are continuous across the middle break."
    ],
    practicalApplications: ["Factory PCB quality control", "Field service repair", "Senior capstone project debugging"],
    related: {
      componentId: "regulator-7805",
      experimentId: "ohms-law",
      projectId: "auto-street-light",
      quizId: "quiz-diagnostics"
    }
  }
];
