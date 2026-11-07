// NextGen Education - Electronics Component Hub Dataset
// Contains 24 comprehensive components covering PASSIVE, SEMICONDUCTORS, ICs, SENSORS, BOARDS, and MODULES

export const componentsData = [
  {
    id: "resistor",
    name: "Carbon Film & Metal Film Resistor",
    category: "PASSIVE",
    partNumber: "Standard Through-Hole (1/4W, 1/2W)",
    shortDesc: "Fundamental two-terminal passive component that resists electrical current flow and reduces voltage.",
    purpose: "Current limiting, voltage division, pull-up/pull-down bias, and impedance matching in electrical circuits.",
    workingPrinciple: "Operates according to Ohm's Law (V = I * R). When electrical potential is applied across the resistive material, collisions between charge carriers and the atomic lattice generate resistance and dissipate heat.",
    symbol: "Zigzag line (US standard) or rectangular box (IEC standard)",
    pinout: [
      { pin: "Lead 1", name: "Terminal A", desc: "Non-polarized terminal; can be connected in either orientation." },
      { pin: "Lead 2", name: "Terminal B", desc: "Non-polarized terminal; connects to load or ground." }
    ],
    specifications: {
      "Standard Resistance Range": "0.1 Ω to 22 MΩ",
      "Power Ratings": "0.125W (1/8W), 0.25W (1/4W), 0.5W, 1W, 2W",
      "Tolerance": "±1% (Metal Film - Brown), ±5% (Carbon Film - Gold)",
      "Max Operating Voltage": "250V - 500V",
      "Temperature Coefficient": "±50 ppm/°C to ±200 ppm/°C"
    },
    electricalCharacteristics: "Linear V-I relationship obeying Ohm's Law. Power dissipation is governed by P = I²R = V²/R = V*I.",
    howToUse: "Always calculate minimum wattage rating before placing in a circuit. Use 4-band or 5-band color charts to decode resistance values.",
    exampleCircuit: "Placed in series with an LED from a 5V supply: R = (5V - 2.0V) / 0.015A = 200Ω (choose standard 220Ω).",
    applications: ["LED current limiting", "Voltage divider networks", "Transistor base biasing", "RC timing circuits", "Pull-up resistors for I2C and buttons"],
    advantages: ["Extremely low cost", "High reliability", "Bidirectional / non-polarized", "Available in exact standard E12/E24 values"],
    limitations: ["Dissipates power as thermal energy", "Parasitic inductance at very high RF frequencies in wirewound types"],
    commonMistakes: [
      "Exceeding power wattage resulting in scorched/burning resistor.",
      "Misreading 4-band vs 5-band color rings from the wrong direction.",
      "Forgetting pull-up resistors on open-collector digital buses (e.g. I2C)."
    ],
    safety: "Ensure operating power is under 70% of rated wattage to avoid burns and fire hazards.",
    datasheetUrl: "https://www.vishay.com/docs/28724/mfr.pdf",
    tags: ["passive", "basic", "fundamental", "resistor", "current-limit"],
    related: {
      components: ["capacitor", "bjt-bc547", "led"],
      experiments: ["ohms-law", "led-blink", "rc-charging"],
      projects: ["auto-street-light", "temperature-monitor"],
      videos: ["vid-resistor-color-code", "vid-ohms-law"],
      quizzes: ["quiz-fundamentals"]
    }
  },
  {
    id: "capacitor",
    name: "Ceramic & Electrolytic Capacitors",
    category: "PASSIVE",
    partNumber: "Ceramic (104/0.1uF), Electrolytic (100uF/25V)",
    shortDesc: "Passive two-terminal device that stores electrical potential energy in an electrostatic field between conductive plates.",
    purpose: "Power supply filtering, DC blocking, AC signal coupling, ripple smoothing, and RC timing oscillators.",
    workingPrinciple: "Two conducting plates separated by a dielectric insulator. When voltage is applied, positive and negative charges accumulate on opposing plates according to Q = C * V.",
    symbol: "Two parallel lines (non-polarized) or one straight and one curved line (polarized electrolytic)",
    pinout: [
      { pin: "Long Lead / (+)", name: "Anode", desc: "Positive terminal (connect to higher potential)." },
      { pin: "Short Lead / Stripe (-)", name: "Cathode", desc: "Negative terminal marked with stripe on can (connect to ground)." }
    ],
    specifications: {
      "Capacitance Range": "1 pF to 10,000 µF",
      "Voltage Ratings": "6.3V, 16V, 25V, 50V, 400V",
      "Dielectric Types": "Ceramic (MLCC), Aluminum Electrolytic, Tantalum, Film",
      "Equivalent Series Resistance (ESR)": "0.01 Ω to 5 Ω",
      "Tolerance": "±10% to ±20%"
    },
    electricalCharacteristics: "Current leads voltage by 90° in pure AC. Reactance Xc = 1 / (2 * π * f * C). Blocks DC steady state.",
    howToUse: "Place 0.1µF ceramic decoupling capacitors as close as possible to digital IC VCC pins to suppress high-frequency noise spikes. Place 100µF electrolytic capacitors at voltage regulator outputs.",
    exampleCircuit: "RC low-pass filter: Resistor in series with signal, capacitor from output to ground. Cutoff frequency fc = 1 / (2*π*R*C).",
    applications: ["DC power decoupling", "Audio AC coupling", "Switching regulator output smoothing", "555 timer RC oscillator", "Snubber protection circuits"],
    advantages: ["Fast charge/discharge response", "Essential for digital stability", "Wide capacitance options"],
    limitations: ["Electrolytic capacitors will explode if reverse biased or over-voltaged", "ESR causes heat at high ripple currents"],
    commonMistakes: [
      "Connecting electrolytic capacitor backwards, causing rupture.",
      "Using voltage rating too close to circuit voltage (always leave 50% headroom).",
      "Omitting 100nF decoupling capacitors near microcontrollers, causing random resets."
    ],
    safety: "High voltage capacitors retain dangerous charge even after power is disconnected. Discharge with a 1kΩ power resistor.",
    datasheetUrl: "https://content.kemet.com/datasheets/KEM_C1002_X7R_SMD.pdf",
    tags: ["passive", "capacitor", "decoupling", "filter", "storage"],
    related: {
      components: ["resistor", "ic-555", "regulator-7805"],
      experiments: ["rc-charging", "led-blink"],
      projects: ["iot-weather-station", "energy-monitor"],
      videos: ["vid-capacitors-explained"],
      quizzes: ["quiz-fundamentals"]
    }
  },
  {
    id: "inductor",
    name: "Inductor & Choke Coil",
    category: "PASSIVE",
    partNumber: "Radial / Toroidal Inductor (10uH - 10mH)",
    shortDesc: "Passive two-terminal electrical component that stores energy in a magnetic field when electric current flows through it.",
    purpose: "Buck/boost DC-DC converter energy storage, LC filter resonant circuits, RF tuning, and high-frequency noise suppression.",
    workingPrinciple: "Faraday's Law of Induction: Opposes sudden changes in current by inducing a counter-electromotive force (EMF): V = L * (di/dt).",
    symbol: "Series of curved semicircular coils (with parallel lines if magnetic core)",
    pinout: [
      { pin: "Lead 1", name: "Coil Start", desc: "Winding input lead (non-polarized)." },
      { pin: "Lead 2", name: "Coil End", desc: "Winding return lead." }
    ],
    specifications: {
      "Inductance Range": "1 µH to 100 mH",
      "Saturation Current (Isat)": "100 mA to 10 A+",
      "DC Resistance (DCR)": "0.01 Ω to 10 Ω",
      "Quality Factor (Q)": "30 to 100 @ 1 MHz",
      "Core Material": "Ferrite, Iron Powder, Air Core"
    },
    electricalCharacteristics: "Voltage leads current by 90°. Inductive reactance XL = 2 * π * f * L. Passes DC, attenuates high frequency AC.",
    howToUse: "Select inductor with saturation current at least 30% higher than peak switching current in power supplies.",
    exampleCircuit: "Buck Converter: Switch pulses current into inductor; inductor supplies current to load via freewheeling diode during OFF cycle.",
    applications: ["Switching SMPS power supplies", "LC bandpass filters", "EMI noise chokes", "Wireless charging receiver coils"],
    advantages: ["Efficient magnetic energy transfer", "Low power dissipation when DCR is minimal", "Essential for high-efficiency converters"],
    limitations: ["Inductive kickback spike can destroy transistors without flyback diodes", "Large physical footprint compared to capacitors"],
    commonMistakes: [
      "Operating beyond Isat causing core saturation and massive current spikes.",
      "Switching an inductive coil (relay/motor) without a reverse parallel protection diode."
    ],
    safety: "Collapsing magnetic field creates hundreds of volts of back-EMF spike that can shock users or destroy driver semiconductors.",
    datasheetUrl: "https://www.murata.com/products/inductor",
    tags: ["passive", "inductor", "smps", "magnetic", "filter"],
    related: {
      components: ["diode-1n4007", "mosfet-irfz44n", "relay-module"],
      experiments: ["dc-motor-control", "relay-control"],
      projects: ["energy-monitor", "smart-home-automation"],
      videos: ["vid-inductors-explained"],
      quizzes: ["quiz-fundamentals"]
    }
  },
  {
    id: "potentiometer",
    name: "Rotary Potentiometer",
    category: "PASSIVE",
    partNumber: "10kΩ Linear Potentiometer (B10K)",
    shortDesc: "Three-terminal resistor with a rotating contact (wiper) that forms an adjustable voltage divider.",
    purpose: "Manual user input, volume control, sensitivity adjustment, and calibration of analog sensor thresholds.",
    workingPrinciple: "A resistive track (carbon or conductive plastic) is connected between Pin 1 and Pin 3. The center wiper (Pin 2) slides along the track, tapping off a variable fraction of the total voltage.",
    symbol: "Resistor symbol with an arrow pointing to the middle",
    pinout: [
      { pin: "Pin 1", name: "Terminal A", desc: "Connect to 5V or VCC reference." },
      { pin: "Pin 2 (Center)", name: "Wiper Output", desc: "Variable analog voltage output (0V to VCC)." },
      { pin: "Pin 3", name: "Terminal B", desc: "Connect to GND." }
    ],
    specifications: {
      "Nominal Resistance": "10 kΩ (standard B10K)",
      "Taper": "Linear (B) or Logarithmic/Audio (A)",
      "Rotational Angle": "300° ± 5°",
      "Power Rating": "0.2 Watt",
      "Rotational Life": "15,000 cycles"
    },
    electricalCharacteristics: "Vout = Vin * (R2 / (R1 + R2)). Linear taper delivers output voltage directly proportional to mechanical angle.",
    howToUse: "Connect Pin 1 to Arduino 5V, Pin 3 to GND, and Pin 2 to Arduino Analog Pin A0. Use `analogRead(A0)` to read values from 0 to 1023.",
    exampleCircuit: "Arduino Analog Read test circuit controlling servo position from 0° to 180° based on potentiometer knob position.",
    applications: ["User control knobs", "Audio volume control", "Comparator threshold voltage trimmer", "Servo manual positioning"],
    advantages: ["Zero complex software required", "Intuitive tactile input", "Very low cost"],
    limitations: ["Mechanical wear over time", "Contact wiper noise during adjustment"],
    commonMistakes: [
      "Connecting Pin 2 (wiper) directly between 5V and GND, creating a dead short when turned to the end.",
      "Using logarithmic audio taper when linear calculation is expected."
    ],
    safety: "Never connect center wiper to power rail without a current limiting resistor if it could be shorted to ground.",
    datasheetUrl: "https://www.bourns.com/docs/Product-Datasheets/PDB18.pdf",
    tags: ["passive", "potentiometer", "analog-input", "trimmer", "voltage-divider"],
    related: {
      components: ["resistor", "ic-lm358", "arduino-uno"],
      experiments: ["ohms-law", "servo-control", "led-pwm"],
      projects: ["temperature-monitor", "smart-dustbin"],
      videos: ["vid-potentiometer-arduino"],
      quizzes: ["quiz-fundamentals"]
    }
  },
  {
    id: "diode-1n4007",
    name: "1N4007 Silicon Rectifier Diode",
    category: "SEMICONDUCTORS",
    partNumber: "1N4007 (DO-41 package)",
    shortDesc: "Two-terminal semiconductor device that permits electric current to flow in only one forward direction while blocking reverse flow.",
    purpose: "AC to DC rectification, reverse polarity power protection, and inductive flyback suppression across relay coils.",
    workingPrinciple: "A P-N junction creates a depletion region. When forward biased (>0.7V), the barrier collapses allowing current. When reverse biased, the depletion zone widens, blocking current up to 1000V.",
    symbol: "Triangle pointing toward a vertical cathode bar (Anode ->| Cathode)",
    pinout: [
      { pin: "Anode (No band)", name: "Positive Lead", desc: "Current entry terminal (positive potential)." },
      { pin: "Cathode (Silver Band)", name: "Negative Lead", desc: "Current exit terminal marked with silver/white painted ring." }
    ],
    specifications: {
      "Peak Reverse Repetitive Voltage (VRRM)": "1000 V",
      "Average Forward Rectified Current (Io)": "1.0 A",
      "Forward Voltage Drop (Vf)": "0.7V - 1.0V @ 1A",
      "Peak Non-Repetitive Surge Current": "30 A (8.3ms half sine)",
      "Reverse Leakage Current": "5 µA @ 25°C"
    },
    electricalCharacteristics: "Exponential forward current I = Is * (e^(V/Vt) - 1). Reverse breakdown occurs above 1000V.",
    howToUse: "Place in reverse parallel across relay coils (Cathode to +VCC, Anode to GND/Transistor collector) to clamp back-EMF inductive voltage spikes.",
    exampleCircuit: "Full Wave Bridge Rectifier: 4 x 1N4007 diodes converting 12VAC transformer output into pulsing DC, followed by filter capacitor.",
    applications: ["AC/DC power supplies", "Relay flyback freewheeling clamp", "Battery reverse polarity protection", "Logic OR gates"],
    advantages: ["1000V high breakdown voltage", "Very rugged DO-41 package", "Globally ubiquitous & penny cost"],
    limitations: ["Standard recovery speed (~30µs) unsuitable for high frequency SMPS (>20kHz)", "0.7V forward drop causes power loss at high currents"],
    commonMistakes: [
      "Installing backwards due to confusing the silver band (silver band indicates Cathode, negative end).",
      "Using standard 1N4007 in fast switching high-frequency buck converters instead of Schottky diodes (1N5819)."
    ],
    safety: "In high current rectifiers, diodes can become hot enough to burn fingers. Ensure proper ventilation.",
    datasheetUrl: "https://www.vishay.com/docs/88503/1n4001.pdf",
    tags: ["semiconductor", "diode", "rectifier", "flyback", "protection"],
    related: {
      components: ["diode-zener", "relay-module", "mosfet-irfz44n"],
      experiments: ["diode-characteristics", "relay-control"],
      projects: ["energy-monitor", "smart-home-automation"],
      videos: ["vid-diodes-explained"],
      quizzes: ["quiz-semiconductors"]
    }
  },
  {
    id: "diode-zener",
    name: "Zener Diode (BZX55C / 1N4733A)",
    category: "SEMICONDUCTORS",
    partNumber: "BZX55C5V1 / 1N4733A (5.1V Zener)",
    shortDesc: "Specialized silicon diode designed to reliably conduct current in reverse direction when a specific breakdown voltage is reached.",
    purpose: "Voltage regulation, reference voltage generation, over-voltage clamping, and waveform clipping.",
    workingPrinciple: "Heavily doped P-N junction operates in the Zener / avalanche breakdown region. When reverse voltage reaches Vz, quantum mechanical tunneling permits reverse conduction while maintaining nearly constant voltage across its terminals.",
    symbol: "Diode triangle with bent bent-wing cathode bar (Z-shape)",
    pinout: [
      { pin: "Anode", name: "Positive Lead", desc: "Connects to ground in reverse-biased regulator circuits." },
      { pin: "Cathode (Black Ring)", name: "Reference Lead", desc: "Connects to unregulated DC rail through a series dropper resistor." }
    ],
    specifications: {
      "Zener Voltage (Vz)": "5.1 V (typical for 5V reference)",
      "Power Dissipation (Ptot)": "500 mW (DO-35) or 1.0 W (DO-41)",
      "Zener Impedance (Zz)": "7 Ω @ 20mA",
      "Reverse Leakage Current": "5 µA @ 1V"
    },
    electricalCharacteristics: "Maintains stable Vz over wide range of reverse current Iz. Iz(min) ~ 5mA, Iz(max) = Pmax / Vz.",
    howToUse: "Always calculate series resistor: Rs = (Vin(min) - Vz) / (Iload(max) + Iz(min)). Never connect Zener directly across power supply without series resistor.",
    exampleCircuit: "Simple 5.1V shunt regulator: 12V input through 330Ω resistor to 5.1V Zener cathode. Regulated 5.1V tapped across Zener.",
    applications: ["Simple voltage reference", "ADC input overvoltage protection clamp", "MOSFET gate protection", "Waveform level shifters"],
    advantages: ["Stable voltage clamping in single component", "Instantaneous reaction to transient spikes", "Low cost"],
    limitations: ["Low power efficiency as shunt regulator", "Voltage drifts slightly with temperature (positive tempco above 5V)"],
    commonMistakes: [
      "Omitting the series resistor, resulting in catastrophic current draw and blown diode.",
      "Connecting in forward bias by mistake (behaves like standard 0.7V diode in forward direction)."
    ],
    safety: "Verify power rating: Pz = Vz * Iz. If Iz is too high, diode can crack from thermal expansion.",
    datasheetUrl: "https://www.onsemi.com/pdf/datasheet/1n4736at-d.pdf",
    tags: ["semiconductor", "zener", "voltage-regulator", "clamping"],
    related: {
      components: ["diode-1n4007", "regulator-7805", "resistor"],
      experiments: ["diode-characteristics", "ohms-law"],
      projects: ["temperature-monitor", "energy-monitor"],
      videos: ["vid-zener-diodes"],
      quizzes: ["quiz-semiconductors"]
    }
  },
  {
    id: "led",
    name: "Light Emitting Diode (5mm Diffused / SMD)",
    category: "SEMICONDUCTORS",
    partNumber: "5mm Standard LED (Red, Green, Blue, Yellow, White)",
    shortDesc: "Semiconductor light source that emits photons via electroluminescence when forward current passes through its P-N junction.",
    purpose: "Visual status indicators, numeric 7-segment displays, optical communication, and illumination.",
    workingPrinciple: "Electrons recombine with electron holes within the active bandgap material, releasing energy in the form of photons. Color is determined by semiconductor bandgap (e.g. GaAsP for red, GaN for blue/green).",
    symbol: "Standard diode symbol with two outgoing arrows indicating light emission",
    pinout: [
      { pin: "Long Lead", name: "Anode (+)", desc: "Positive terminal; connects through resistor to positive rail." },
      { pin: "Short Lead / Flat Edge", name: "Cathode (-)", desc: "Negative terminal; connects to ground or microcontroller sink pin." }
    ],
    specifications: {
      "Forward Voltage (Vf) Red/Yellow": "1.8V - 2.2V",
      "Forward Voltage (Vf) Green/Blue/White": "3.0V - 3.4V",
      "Standard Operating Current (If)": "10 mA - 20 mA",
      "Max Reverse Voltage (Vr)": "5 V",
      "Luminous Intensity": "50 mcd - 5000 mcd"
    },
    electricalCharacteristics: "Extremely steep I-V curve above Vf. Without series current limiting, current rapidly exceeds max rating, burning the LED in milliseconds.",
    howToUse: "Calculate current limiting resistor: R = (Vcc - Vf) / If. For 5V supply and red LED (Vf=2.0V, If=15mA): R = (5 - 2) / 0.015 = 200Ω (use 220Ω).",
    exampleCircuit: "Blink circuit connected between microcontroller GPIO pin and GND through a 220Ω resistor.",
    applications: ["Status indicator lamps", "Power ON indicators", "Optocoupler light source", "7-segment displays", "Light barrier emitter"],
    advantages: ["Instant on/off switching (<10ns)", "High energy efficiency", "50,000+ hour operational lifespan", "Vibration resistant"],
    limitations: ["Low reverse breakdown voltage (~5V)", "Sensitive to electrostatic discharge (especially Blue/White GaN)"],
    commonMistakes: [
      "Connecting directly to 5V rail without series resistor, resulting in pop and burnout.",
      "Connecting backwards (will not light up, but typically undamaged if voltage <5V)."
    ],
    safety: "Never stare directly into high-brightness blue/UV LEDs or laser diodes without optical eye protection.",
    datasheetUrl: "https://www.kingbright.com/attachments/file/psearch/000/00/00/WP7113ID(Ver.20B).pdf",
    tags: ["semiconductor", "led", "optoelectronics", "indicator", "display"],
    related: {
      components: ["resistor", "bjt-bc547", "arduino-uno"],
      experiments: ["led-blink", "led-pwm"],
      projects: ["auto-street-light", "obstacle-robot"],
      videos: ["vid-led-basics"],
      quizzes: ["quiz-semiconductors"]
    }
  },
  {
    id: "bjt-bc547",
    name: "BC547 NPN Bipolar Junction Transistor",
    category: "SEMICONDUCTORS",
    partNumber: "BC547B (TO-92 package)",
    shortDesc: "Current-controlled three-terminal semiconductor device used for amplifying weak signals or as an electronic switch.",
    purpose: "Switching small loads (relays, buzzers, LEDs), signal amplification, and digital logic gate implementation.",
    workingPrinciple: "A small base current Ib controls a much larger collector current Ic according to current gain β (hFE): Ic = β * Ib. In saturation, Vce drops to ~0.2V, acting as a closed switch.",
    symbol: "Circle with Base lead and Collector/Emitter leads; arrow on Emitter points outward for NPN",
    pinout: [
      { pin: "Pin 1 (Left flat face)", name: "Collector (C)", desc: "Current entry pin connected to low side of load." },
      { pin: "Pin 2 (Center)", name: "Base (B)", desc: "Control terminal connected to microcontroller pin via ~1kΩ-10kΩ resistor." },
      { pin: "Pin 3 (Right)", name: "Emitter (E)", desc: "Connects directly to circuit ground (GND)." }
    ],
    specifications: {
      "Collector-Emitter Voltage (Vceo)": "45 V",
      "Continuous Collector Current (Ic)": "100 mA (max)",
      "DC Current Gain (hFE)": "110 to 800 (BC547B typically ~200-450)",
      "Vce Saturation Voltage": "0.09V to 0.2V @ Ic=10mA, Ib=0.5mA",
      "Transition Frequency (fT)": "300 MHz"
    },
    electricalCharacteristics: "Current-controlled device. Base-emitter junction behaves like forward-biased diode (Vbe ~ 0.7V). Active mode: Ic = hFE * Ib.",
    howToUse: "To use as switch: Ensure saturation by providing overdrive base current: Ib >= (Ic / 10). For 50mA relay: Ib = 5mA -> Rb = (5V - 0.7V) / 0.005 = 860Ω (use 1kΩ).",
    exampleCircuit: "Arduino 5V output pin -> 1kΩ resistor -> BC547 Base. Emitter -> GND. 5V Relay coil -> Collector. 1N4007 diode across relay coil.",
    applications: ["Relay driver", "Buzzer driver", "Logic level inverter", "Microphone preamplifier", "Sensor threshold trigger"],
    advantages: ["Extremely low cost", "High switching speed for audio/digital", "High gain in linear region"],
    limitations: ["Current limited to 100mA (cannot drive high-current DC motors directly)", "Base requires continuous current draw"],
    commonMistakes: [
      "Omitting base resistor, which burns out the transistor base junction and the MCU GPIO pin.",
      "Confusing pinout: Looking at flat face, pinout is Collector, Base, Emitter (C-B-E)."
    ],
    safety: "Do not exceed 100mA collector current; for heavier loads use BD139, TIP122 or MOSFETs.",
    datasheetUrl: "https://www.onsemi.com/pdf/datasheet/bc546-d.pdf",
    tags: ["semiconductor", "transistor", "bjt", "npn", "switch", "amplifier"],
    related: {
      components: ["resistor", "diode-1n4007", "relay-module"],
      experiments: ["transistor-switch", "ldr-auto-light"],
      projects: ["auto-street-light", "security-alert-system"],
      videos: ["vid-transistor-basics"],
      quizzes: ["quiz-transistor-circuits"]
    }
  },
  {
    id: "mosfet-irfz44n",
    name: "IRFZ44N N-Channel Power MOSFET",
    category: "SEMICONDUCTORS",
    partNumber: "IRFZ44N (TO-220 package)",
    shortDesc: "High-current voltage-controlled semiconductor field-effect transistor capable of switching heavy DC loads with ultra-low ON resistance.",
    purpose: "High-power DC motor PWM speed control, solenoid actuation, power inverters, and high-efficiency power switches.",
    workingPrinciple: "An electric field applied to the insulated Gate terminal creates a conductive inversion channel between Drain and Source, permitting heavy current flow with minimal conduction loss.",
    symbol: "Drain and Source connected to channel with insulated Gate bar; substrate arrow points inward for N-channel",
    pinout: [
      { pin: "Pin 1 (Left)", name: "Gate (G)", desc: "Insulated control terminal; voltage applied relative to Source." },
      { pin: "Pin 2 (Center & Tab)", name: "Drain (D)", desc: "Current enters here; connect to negative side of heavy DC load." },
      { pin: "Pin 3 (Right)", name: "Source (S)", desc: "Connect directly to common circuit ground (GND)." }
    ],
    specifications: {
      "Drain-to-Source Breakdown (VDSS)": "55 V",
      "Continuous Drain Current (ID) @ 25°C": "49 A",
      "Static Drain-to-Source On-Resistance (RDS(on))": "17.5 mΩ (0.0175 Ω) @ VGS=10V",
      "Gate Threshold Voltage (VGS(th))": "2.0V to 4.0V",
      "Total Gate Charge (Qg)": "63 nC"
    },
    electricalCharacteristics: "Voltage-controlled. Gate acts like a tiny capacitor (~1470pF). Once charged, steady-state gate current is virtually zero (nanoamps).",
    howToUse: "Add a 10kΩ pull-down resistor from Gate to Source so the MOSFET turns fully off when the microcontroller input floats. Add a 100Ω series resistor between MCU pin and Gate to limit inrush charging current.",
    exampleCircuit: "High-power 12V 5A DC motor PWM driver controlled by Arduino pin 9 via 100Ω gate resistor, 10k pull-down, and flyback diode across motor.",
    applications: ["DC motor H-Bridge and PWM speed control", "High-power LED strip dimmers", "Electric vehicle motor controllers", "DC-DC buck/boost converters"],
    advantages: ["Extremely low Rds(on) ensures cool operation", "High current capacity (49A)", "Zero steady-state gate control current"],
    limitations: ["Standard IRFZ44N requires 10V Vgs to achieve full 17.5mΩ saturation (use IRLZ44N logic-level for direct 3.3V/5V MCU driving)", "ESD sensitive gate oxide"],
    commonMistakes: [
      "Leaving Gate floating, causing erratic switching and transistor burn-out.",
      "Driving directly from 3.3V ESP32 without gate driver, causing linear mode heating."
    ],
    safety: "Mount to an aluminum heatsink when continuous current exceeds 5A.",
    datasheetUrl: "https://www.infineon.com/dgdl/irfz44n.pdf",
    tags: ["semiconductor", "mosfet", "power-switch", "pwm", "high-current"],
    related: {
      components: ["bjt-bc547", "diode-1n4007", "arduino-uno"],
      experiments: ["dc-motor-control", "led-pwm"],
      projects: ["energy-monitor", "smart-home-automation"],
      videos: ["vid-mosfet-tutorial"],
      quizzes: ["quiz-transistor-circuits"]
    }
  },
  {
    id: "ic-555",
    name: "NE555 Precision Timer IC",
    category: "ICs",
    partNumber: "NE555P (DIP-8 package)",
    shortDesc: "Highly stable 8-pin integrated circuit capable of producing accurate timing delays, pulses, and continuous square-wave oscillations.",
    purpose: "Astable multivibrator (square wave generator), monostable timer (one-shot delay), pulse-width modulation (PWM), and clock generation.",
    workingPrinciple: "Contains 2 comparators, a resistive voltage divider (three 5kΩ internal resistors defining 1/3 Vcc and 2/3 Vcc), an RS flip-flop, and a discharge transistor.",
    symbol: "Rectangular 8-pin block with labelled pins: GND, TRIG, OUT, RESET, CTRL, THRESH, DISCH, VCC",
    pinout: [
      { pin: "Pin 1", name: "GND", desc: "Common ground reference (0V)." },
      { pin: "Pin 2", name: "TRIG (Trigger)", desc: "Active low input; initiates timing when voltage falls below 1/3 Vcc." },
      { pin: "Pin 3", name: "OUT (Output)", desc: "High current push-pull output; can source or sink up to 200 mA." },
      { pin: "Pin 4", name: "RESET", desc: "Active low reset; connect to VCC if unused to prevent false resets." },
      { pin: "Pin 5", name: "CTRL (Control Voltage)", desc: "Access to 2/3 Vcc divider; bypass to ground via 10nF capacitor." },
      { pin: "Pin 6", name: "THRESH (Threshold)", desc: "Active high input; resets output when voltage rises above 2/3 Vcc." },
      { pin: "Pin 7", name: "DISCH (Discharge)", desc: "Open-collector output connected to GND during capacitor discharge." },
      { pin: "Pin 8", name: "VCC", desc: "Positive power supply input (+4.5V to +15V)." }
    ],
    specifications: {
      "Supply Voltage Range": "+4.5 V to +16 V",
      "Output Current Capability": "Up to 200 mA (source or sink)",
      "Timing Range": "Microseconds to hours",
      "Temperature Stability": "0.005% per °C",
      "Astable Frequency Formula": "f = 1.44 / ((R1 + 2*R2) * C)"
    },
    electricalCharacteristics: "Output voltage is approximately Vcc - 1.5V (sourcing) and ~0.25V (sinking 10mA). Fast transition times (~100ns).",
    howToUse: "For Astable Square Wave: Connect R1 between VCC and Pin 7; R2 between Pin 7 and Pin 6/2; timing capacitor C between Pin 6/2 and GND. Output is available at Pin 3.",
    exampleCircuit: "Classic LED flasher: R1 = 10kΩ, R2 = 100kΩ, C = 10µF, giving ~0.7 Hz pulse rate (flashes once every 1.4 seconds).",
    applications: ["Precision timing delay relays", "PWM LED dimmers and servo testers", "Tone and melody sound synthesizers", "Clock source for digital logic counters"],
    advantages: ["Ultra-reliable and immortal design since 1972", "Drives 200mA loads directly without extra transistor", "Wide voltage flexibility"],
    limitations: ["Consumes relatively high quiescent current (~10mA in bipolar NE555; use CMOS LMC555 for battery circuits)", "Creates power rail supply spikes during output transition"],
    commonMistakes: [
      "Leaving Pin 4 (RESET) floating, causing intermittent shutdowns.",
      "Omitting 10nF decoupling capacitor on Pin 5 (Control)."
    ],
    safety: "Always add a 100µF bypass capacitor across Pin 8 and Pin 1 to suppress heavy switching transients on the power supply rail.",
    datasheetUrl: "https://www.ti.com/lit/ds/symlink/ne555.pdf",
    tags: ["ic", "timer", "555", "oscillator", "pwm", "clock"],
    related: {
      components: ["resistor", "capacitor", "led", "bjt-bc547"],
      experiments: ["led-blink", "led-pwm"],
      projects: ["auto-street-light", "security-alert-system"],
      videos: ["vid-555-timer-circuits"],
      quizzes: ["quiz-analog-circuits"]
    }
  },
  {
    id: "ic-lm358",
    name: "LM358 Dual Operational Amplifier",
    category: "ICs",
    partNumber: "LM358N (DIP-8 package)",
    shortDesc: "Versatile dual low-power operational amplifier designed to operate from a single DC power supply with rail-to-ground common-mode input range.",
    purpose: "Sensor signal amplification, active filtering, analog voltage comparator, and impedance buffer.",
    workingPrinciple: "High-gain differential amplifier that amplifies the voltage difference between inverting (-) and non-inverting (+) inputs: Vout = Aol * (V+ - V-). With negative feedback, V+ equals V-.",
    symbol: "Two triangle amplifier symbols inside single package with + and - inputs and single output",
    pinout: [
      { pin: "Pin 1", name: "Output 1", desc: "Op-Amp 1 analog output." },
      { pin: "Pin 2", name: "Inverting Input 1 (-)", desc: "Negative feedback/input terminal for Op-Amp 1." },
      { pin: "Pin 3", name: "Non-Inverting Input 1 (+)", desc: "Positive input terminal for Op-Amp 1." },
      { pin: "Pin 4", name: "GND / Vee", desc: "Negative supply pin or ground for single-supply operation." },
      { pin: "Pin 5", name: "Non-Inverting Input 2 (+)", desc: "Positive input terminal for Op-Amp 2." },
      { pin: "Pin 6", name: "Inverting Input 2 (-)", desc: "Negative feedback/input terminal for Op-Amp 2." },
      { pin: "Pin 7", name: "Output 2", desc: "Op-Amp 2 analog output." },
      { pin: "Pin 8", name: "VCC", desc: "Positive supply voltage (+3.0V to +32V)." }
    ],
    specifications: {
      "Supply Voltage Range": "+3.0 V to +32 V (single supply) or ±1.5V to ±16V (dual supply)",
      "Open-Loop DC Voltage Gain": "100 dB (100,000 V/V)",
      "Unity Gain Bandwidth": "1.0 MHz",
      "Input Offset Voltage": "2.0 mV (typical)",
      "Supply Current": "500 µA total for both amplifiers"
    },
    electricalCharacteristics: "Input common mode voltage includes Ground (0V), making it ideal for single +5V microcontroller circuits. Output swings from 0V to Vcc - 1.5V.",
    howToUse: "As a Non-Inverting Amplifier: Input signal to Pin 3; feedback resistor Rf from Pin 1 to Pin 2; resistor Rg from Pin 2 to GND. Gain = 1 + (Rf / Rg).",
    exampleCircuit: "Voltage Comparator for Light Sensor: LDR voltage divider connects to Pin 3 (+); reference threshold pot to Pin 2 (-). Pin 1 output switches digital HIGH when light exceeds threshold.",
    applications: ["Microphone and audio preamplifiers", "Active low-pass and high-pass filters", "Thermocouple / strain gauge signal conditioning", "Comparator with hysteresis (Schmitt trigger)"],
    advantages: ["True single-supply operation (no negative rail needed)", "Low power consumption", "Contains two independent op-amps"],
    limitations: ["Output cannot reach top power rail (maximum ~3.5V on 5V supply)", "Moderate slew rate (0.5 V/µs) unsuitable for high-speed audio or video"],
    commonMistakes: [
      "Leaving unused op-amp inputs floating, causing oscillation and increased supply current draw.",
      "Expecting output to reach full 5V rail (it saturates at ~3.5V without rail-to-rail op-amp like MCP6002)."
    ],
    safety: "Never apply input voltages higher than VCC + 0.3V or below GND - 0.3V to prevent latch-up.",
    datasheetUrl: "https://www.ti.com/lit/ds/symlink/lm358.pdf",
    tags: ["ic", "op-amp", "amplifier", "comparator", "analog"],
    related: {
      components: ["resistor", "potentiometer", "sensor-ldr"],
      experiments: ["ldr-auto-light", "temperature-measurement"],
      projects: ["auto-street-light", "touch-based-light"],
      videos: ["vid-opamp-basics"],
      quizzes: ["quiz-analog-circuits"]
    }
  },
  {
    id: "regulator-7805",
    name: "LM7805 5V Linear Voltage Regulator",
    category: "ICs",
    partNumber: "L7805CV (TO-220 package)",
    shortDesc: "Three-terminal fixed positive voltage regulator IC that converts higher unregulated DC input voltage (7V - 25V) to a clean, stable +5V output.",
    purpose: "Generating rock-solid +5V power rail for microcontrollers, sensors, and digital logic circuits.",
    workingPrinciple: "Employs an internal bandgap reference and series pass power transistor in a closed feedback loop. Any drift in output voltage is instantly corrected by throttling base current to the pass transistor.",
    symbol: "Rectangular block with Input, Ground, and Output pins",
    pinout: [
      { pin: "Pin 1 (Left)", name: "INPUT (Vin)", desc: "Unregulated DC input voltage (+7.5V to +25V)." },
      { pin: "Pin 2 (Center & Tab)", name: "GROUND (GND)", desc: "Common circuit ground reference." },
      { pin: "Pin 3 (Right)", name: "OUTPUT (Vout)", desc: "Regulated +5.0V DC output." }
    ],
    specifications: {
      "Output Voltage": "+5.0 V ± 4%",
      "Output Current Capability": "Up to 1.5 A (with adequate heatsink)",
      "Dropout Voltage": "2.0 V (Vin must be at least 7.0V for proper regulation)",
      "Max Input Voltage": "35 V DC",
      "Ripple Rejection": "62 dB @ 120 Hz"
    },
    electricalCharacteristics: "Linear regulation mechanism. Power dissipated as heat: Pd = (Vin - Vout) * Iout. If Vin=12V and Iout=0.5A, Pd = (12 - 5) * 0.5 = 3.5 Watts!",
    howToUse: "Always place a 0.33µF capacitor on the input pin and a 0.1µF (or 10µF) capacitor on the output pin close to the IC to prevent high-frequency parasitic oscillation.",
    exampleCircuit: "12V lead-acid battery -> 0.33µF capacitor -> 7805 Vin -> 7805 Vout -> 10µF capacitor -> 5V rail powering Arduino Uno and sensors.",
    applications: ["Microcontroller system power supplies", "On-board local regulation", "Benchtop 5V lab power supplies", "Battery step-down"],
    advantages: ["Extremely low output noise and zero EMI compared to switching regulators", "Built-in thermal overload and short-circuit protection", "Requires only two external capacitors"],
    limitations: ["Low efficiency when (Vin - Vout) is large; excessive heat dissipation", "Requires minimum 2V voltage headroom (dropout)"],
    commonMistakes: [
      "Operating with high current without a heatsink, triggering thermal thermal shutdown.",
      "Omitting input/output decoupling capacitors, causing regulator to oscillate at MHz frequencies."
    ],
    safety: "Heatsink tab is electrically connected to Pin 2 (Ground). Heatsink can exceed 100°C without adequate thermal dissipation.",
    datasheetUrl: "https://www.st.com/resource/en/datasheet/l78.pdf",
    tags: ["ic", "voltage-regulator", "power-supply", "7805", "5v"],
    related: {
      components: ["capacitor", "diode-1n4007", "arduino-uno"],
      experiments: ["ohms-law", "esp32-telemetry"],
      projects: ["iot-weather-station", "obstacle-robot"],
      videos: ["vid-voltage-regulators"],
      quizzes: ["quiz-power-supplies"]
    }
  },
  {
    id: "ic-74hc595",
    name: "74HC595 8-Bit Serial-In Parallel-Out Shift Register",
    category: "ICs",
    partNumber: "SN74HC595N (DIP-16 package)",
    shortDesc: "High-speed 8-bit shift register with storage latch and 3-state outputs that expands 3 microcontroller GPIO pins into 8 digital output pins.",
    purpose: "GPIO pin expansion, controlling 7-segment displays, driving 8 LEDs, and multiplexing output relays.",
    workingPrinciple: "Bits are clocked in serially through data pin DS on clock rising edges (SH_CP). When full, latch clock (ST_CP) triggers, transferring internal bits into the output register simultaneously.",
    symbol: "16-pin IC block with serial inputs, latch control, and 8 parallel output pins (Q0 - Q7)",
    pinout: [
      { pin: "Pin 1-7, 15", name: "Q0 - Q7", desc: "8 parallel digital outputs." },
      { pin: "Pin 8", name: "GND", desc: "Ground reference." },
      { pin: "Pin 9", name: "Q7S", desc: "Serial data output (daisy-chain cascade to next shift register)." },
      { pin: "Pin 10", name: "MR / SRCLR", desc: "Master reset (active low); tie to VCC for normal operation." },
      { pin: "Pin 11", name: "SH_CP / SRCLK", desc: "Shift register clock input." },
      { pin: "Pin 12", name: "ST_CP / RCLK", desc: "Storage register latch clock input." },
      { pin: "Pin 13", name: "OE", desc: "Output enable (active low); tie to GND for enabled outputs." },
      { pin: "Pin 14", name: "DS / SER", desc: "Serial data input pin." },
      { pin: "Pin 16", name: "VCC", desc: "Positive power supply (+2V to +6V)." }
    ],
    specifications: {
      "Operating Supply Voltage": "2.0 V to 6.0 V",
      "Propagation Delay": "13 ns @ 5V",
      "Max Clock Frequency": "25 MHz @ 5V",
      "Output Drive Current": "±35 mA per pin (70mA total VCC max)",
      "Logic Compatibility": "TTL and CMOS"
    },
    electricalCharacteristics: "High-speed CMOS logic. High input impedance. When cascading registers, clock and latch lines are shared in parallel.",
    howToUse: "Use Arduino's native `shiftOut(dataPin, clockPin, MSBFIRST, byteValue)` function to push an entire 8-bit byte with 1 line of code.",
    exampleCircuit: "Arduino pins 4 (Data), 5 (Clock), 6 (Latch) connected to 74HC595, driving 8 LEDs through 330Ω resistors.",
    applications: ["8-channel relay boards", "Multi-digit 7-segment LED displays", "LED dot matrix displays", "LCD backpack drivers"],
    advantages: ["Controls unlimited outputs by cascading multiple ICs with only 3 MCU pins", "Fast SPI-like communication", "Extremely economical"],
    limitations: ["Outputs are digital only (cannot generate analog voltages directly)", "Serial transfer takes finite time (~10 microseconds)"],
    commonMistakes: [
      "Leaving Pin 10 (MR) unconnected or floating low, keeping the register stuck in reset.",
      "Leaving Pin 13 (OE) floating high, keeping all outputs in high-impedance (tri-state) OFF mode."
    ],
    safety: "Total package current limit through Pin 16 (VCC) is 70mA. Do not light all 8 LEDs at 20mA simultaneously through the IC directly.",
    datasheetUrl: "https://www.ti.com/lit/ds/symlink/sn74hc595.pdf",
    tags: ["ic", "shift-register", "gpio-expansion", "digital-logic", "74hc595"],
    related: {
      components: ["arduino-uno", "led", "resistor"],
      experiments: ["led-pwm", "led-blink"],
      projects: ["smart-home-automation", "security-alert-system"],
      videos: ["vid-shift-register-74hc595"],
      quizzes: ["quiz-digital-logic"]
    }
  },
  {
    id: "ic-l293d",
    name: "L293D Dual H-Bridge Motor Driver IC",
    category: "ICs",
    partNumber: "L293D (DIP-16 package)",
    shortDesc: "Quadruple high-current half-H driver integrated circuit designed to provide bidirectional drive currents for two DC motors or one stepper motor.",
    purpose: "Controlling forward, reverse, brake, and speed of two DC motors from low-voltage microcontroller logic signals.",
    workingPrinciple: "Contains internal bipolar H-bridges with built-in clamp diodes. By switching opposing diagonal transistor pairs, polarity across motor terminals reverses, reversing shaft rotation.",
    symbol: "16-pin IC block with dual supply pins (VCC1 logic, VCC2 motor) and 4 input/output pairs",
    pinout: [
      { pin: "Pin 1", name: "1,2EN (Enable 1)", desc: "PWM speed control for Motor 1 (Active High)." },
      { pin: "Pin 2", name: "1A (Input 1)", desc: "Direction input 1 for Motor 1 from MCU." },
      { pin: "Pin 3", name: "1Y (Output 1)", desc: "Motor 1 terminal A." },
      { pin: "Pin 4, 5", name: "GND / Heatsink", desc: "Common ground and PCB copper heatsink connections." },
      { pin: "Pin 6", name: "2Y (Output 2)", desc: "Motor 1 terminal B." },
      { pin: "Pin 7", name: "2A (Input 2)", desc: "Direction input 2 for Motor 1 from MCU." },
      { pin: "Pin 8", name: "VCC2 (Motor Power)", desc: "Motor supply voltage (+4.5V to +36V)." },
      { pin: "Pin 9", name: "3,4EN (Enable 2)", desc: "PWM speed control for Motor 2." },
      { pin: "Pin 10", name: "3A (Input 3)", desc: "Direction input 1 for Motor 2." },
      { pin: "Pin 11", name: "3Y (Output 3)", desc: "Motor 2 terminal A." },
      { pin: "Pin 12, 13", name: "GND / Heatsink", desc: "Common ground." },
      { pin: "Pin 14", name: "4Y (Output 4)", desc: "Motor 2 terminal B." },
      { pin: "Pin 15", name: "4A (Input 4)", desc: "Direction input 2 for Motor 2." },
      { pin: "Pin 16", name: "VCC1 (Logic Power)", desc: "+5V logic power supply." }
    ],
    specifications: {
      "Motor Voltage Range (VCC2)": "+4.5 V to +36 V",
      "Logic Voltage (VCC1)": "+4.5 V to +7.0 V",
      "Continuous Output Current per Channel": "600 mA",
      "Peak Output Current (Non-repetitive)": "1.2 A",
      "Internal Clamping Diodes": "Integrated inductive back-EMF protection"
    },
    electricalCharacteristics: "Bipolar darlington output stage introduces a ~1.5V to 2.0V internal voltage drop. For 12V motor supply, motor receives ~10.2V.",
    howToUse: "Set 1A=HIGH, 2A=LOW for Forward; 1A=LOW, 2A=HIGH for Reverse; 1A=LOW, 2A=LOW for Coast. Apply analogWrite(pin, speed) to Enable pin for PWM speed control.",
    exampleCircuit: "Arduino robotics rover: Pin 3 -> 1A, Pin 4 -> 2A, Pin 5 (PWM) -> 1,2EN. Two gearmotors connected to outputs 1Y/2Y and 3Y/4Y.",
    applications: ["Two-wheel robotic rover drives", "Bipolar stepper motor positioning", "High-power solenoid actuators", "Relay array driving"],
    advantages: ["Built-in flyback diodes eliminate need for 8 external protection diodes", "Independent logic and motor supplies protect microcontroller from voltage spikes", "Compact 16-pin package"],
    limitations: ["Relatively high internal voltage drop (~1.8V)", "Current capped at 600mA (overheats on stalled motors)"],
    commonMistakes: [
      "Forgetting to tie Pin 4, 5, 12, 13 GND to microcontroller ground (common ground missing).",
      "Powering motors from Arduino 5V pin instead of external battery rail via Pin 8."
    ],
    safety: "Stalling motors causes massive current surge that can permanently burn the IC. Add heatsink for currents >400mA.",
    datasheetUrl: "https://www.ti.com/lit/ds/symlink/l293.pdf",
    tags: ["ic", "motor-driver", "h-bridge", "robotics", "l293d", "pwm"],
    related: {
      components: ["arduino-uno", "mosfet-irfz44n", "sensor-ultrasonic"],
      experiments: ["dc-motor-control", "servo-control"],
      projects: ["obstacle-robot", "line-following-robot"],
      videos: ["vid-l293d-motor-driver"],
      quizzes: ["quiz-microcontrollers"]
    }
  },
  {
    id: "sensor-ldr",
    name: "Light Dependent Resistor (Photoresistor / LDR)",
    category: "SENSORS",
    partNumber: "GL5528 5mm LDR",
    shortDesc: "Cadmium Sulfide (CdS) photo-conductive cell whose electrical resistance dramatically decreases with increasing incident light intensity.",
    purpose: "Ambient light detection, day/night sensing, optical tracking, and shadow detection.",
    workingPrinciple: "Photons with energy greater than the semiconductor bandgap excite valence electrons into the conduction band, increasing free carrier density and lowering resistance from ~1 MΩ (darkness) to ~1 kΩ (bright light).",
    symbol: "Resistor symbol inside circle with two inward pointing arrows indicating incoming light",
    pinout: [
      { pin: "Lead 1", name: "Terminal A", desc: "Non-polarized lead; connect to 5V rail." },
      { pin: "Lead 2", name: "Terminal B", desc: "Non-polarized lead; connect to analog input and pull-down resistor." }
    ],
    specifications: {
      "Light Resistance (10 Lux)": "10 kΩ to 20 kΩ",
      "Dark Resistance (0 Lux)": "1.0 MΩ to 2.0 MΩ",
      "Spectral Peak Response": "540 nm (matches human eye green-yellow sensitivity)",
      "Max Operating Voltage": "150 V DC",
      "Response Time": "Rise ~20 ms, Fall ~30 ms"
    },
    electricalCharacteristics: "Non-linear logarithmic relationship between lux and resistance: R = A * (Lux)^(-γ), where γ (gamma) is typically 0.6 - 0.8.",
    howToUse: "Form a voltage divider with a 10kΩ fixed resistor: 5V -> LDR -> Analog Pin A0 -> 10kΩ resistor -> GND. In bright light, A0 reads high; in dark, A0 reads low.",
    exampleCircuit: "Automatic twilight switch: LDR voltage divider feeds op-amp LM358 comparator to trigger relay when dark.",
    applications: ["Automatic street light systems", "Solar tracker panels", "Camera ambient light exposure", "Clock display auto-dimming"],
    advantages: ["Extreme simplicity & zero complex communications protocol", "Direct analog output", "Ultra low cost"],
    limitations: ["Relatively sluggish response time (30ms)", "Cadmium content is RoHS restricted in some industrial jurisdictions"],
    commonMistakes: [
      "Connecting without a pull-down/pull-up resistor (analog pin reads random floating noise).",
      "Placing the sensor directly where the streetlight it controls shines on it (creates continuous flicker oscillation)."
    ],
    safety: "Low voltage sensor; avoid mechanical stress on epoxy encapsulation.",
    datasheetUrl: "https://www.token.com.tw/pdf/resistor/cds-resistor-pgm.pdf",
    tags: ["sensor", "ldr", "light-sensor", "photoresistor", "analog"],
    related: {
      components: ["resistor", "bjt-bc547", "ic-lm358", "arduino-uno"],
      experiments: ["ldr-auto-light", "ohms-law"],
      projects: ["auto-street-light", "touch-based-light"],
      videos: ["vid-ldr-sensor-tutorial"],
      quizzes: ["quiz-sensors"]
    }
  },
  {
    id: "sensor-ultrasonic",
    name: "HC-SR04 Ultrasonic Distance Sensor",
    category: "SENSORS",
    partNumber: "HC-SR04",
    shortDesc: "Non-contact ultrasonic ranging module providing 2cm to 400cm distance measurement with 3mm accuracy.",
    purpose: "Distance measuring, obstacle avoidance for robots, water level sensing, and motion detection.",
    workingPrinciple: "Emits 8 pulses of 40 kHz ultrasound via piezoelectric transducer. The wave bounces off an object and is detected by the receiver transducer. Distance = (Echo High Time * Speed of Sound in Air [343 m/s]) / 2.",
    symbol: "Dual cylindrical transducers (Transmitter 'T' and Receiver 'R') on rectangular PCB",
    pinout: [
      { pin: "Pin 1", name: "VCC", desc: "+5V DC power supply input." },
      { pin: "Pin 2", name: "TRIG (Trigger)", desc: "Microcontroller sends a 10µs HIGH pulse here to initiate burst." },
      { pin: "Pin 3", name: "ECHO", desc: "Outputs a HIGH pulse whose duration equals round-trip travel time." },
      { pin: "Pin 4", name: "GND", desc: "Ground reference (0V)." }
    ],
    specifications: {
      "Operating Voltage": "5.0 V DC (quiescent current <2mA)",
      "Working Current": "15 mA",
      "Ultrasonic Frequency": "40 kHz",
      "Measuring Range": "2 cm to 400 cm (0.8 in to 157 in)",
      "Measuring Angle": "15 degrees",
      "Distance Formula": "Distance (cm) = (Duration (µs) * 0.0343) / 2"
    },
    electricalCharacteristics: "ECHO output is a 5V TTL level logic pulse. When connecting to 3.3V microcontrollers (ESP32/Raspberry Pi), a resistor voltage divider is required to protect the 3.3V GPIO.",
    howToUse: "Generate 10µs pulse on Trigger pin using `digitalWrite()`, then measure echo return with `pulseIn(echoPin, HIGH)`. Multiply duration by 0.01715 to get centimeters.",
    exampleCircuit: "Obstacle Avoidance Robot: Ultrasonic sensor mounted on servo sweeps left-right. If distance < 20cm, robot halts and turns away.",
    applications: ["Robotic obstacle navigation", "Touchless automatic trash cans", "Tank liquid level measurement", "Parking assist sensors", "Intruder perimeter alarm"],
    advantages: ["Independent of object color or transparency (unlike optical sensors)", "Excellent 3mm resolution", "Very low price"],
    limitations: ["Cannot detect sound-absorbing fabrics (foam, fur, soft cloth)", "Narrow 15° cone angle; misses thin angled surfaces"],
    commonMistakes: [
      "Connecting ECHO directly to ESP32 3.3V pin without voltage divider (can damage 3.3V input over time).",
      "Calling `pulseIn` without timeout, which can freeze loop execution if echo is never returned."
    ],
    safety: "Keep transducer faces clean and free of water condensation or glue.",
    datasheetUrl: "https://www.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf",
    tags: ["sensor", "ultrasonic", "distance", "robotics", "hc-sr04"],
    related: {
      components: ["arduino-uno", "esp32-wroom", "ic-l293d"],
      experiments: ["ultrasonic-distance", "servo-control"],
      projects: ["smart-dustbin", "obstacle-robot"],
      videos: ["vid-ultrasonic-hc-sr04"],
      quizzes: ["quiz-sensors"]
    }
  },
  {
    id: "sensor-pir",
    name: "HC-SR501 Passive Infrared (PIR) Motion Sensor",
    category: "SENSORS",
    partNumber: "HC-SR501",
    shortDesc: "Pyroelectric infrared motion detection module that senses infrared radiation emitted by warm human bodies.",
    purpose: "Human occupancy sensing, burglar security alarms, and automatic room lighting switches.",
    workingPrinciple: "A dual-element pyroelectric sensor behind a segmented Fresnel lens detects differences in thermal infrared radiation (~10µm wavelength) as a warm body moves past optical zones.",
    symbol: "Hemispherical domed Fresnel lens with 3 connection pins and 2 adjustment potentiometers",
    pinout: [
      { pin: "Pin 1", name: "VCC", desc: "DC Power input (+4.5V to +20V via built-in 3.3V regulator)." },
      { pin: "Pin 2", name: "OUT", desc: "Digital output: 3.3V TTL HIGH when motion detected, 0V LOW when idle." },
      { pin: "Pin 3", name: "GND", desc: "Ground reference." }
    ],
    specifications: {
      "Operating Voltage": "+4.5 V to +20 V",
      "Quiescent Current": "< 50 µA",
      "Output Level": "3.3V High / 0V Low (directly ESP32 and Arduino compatible)",
      "Detection Distance": "3 m to 7 m (adjustable via sensitivity pot)",
      "Delay Time": "5 seconds to 300 seconds (adjustable via time pot)",
      "Detection Angle": "< 120° cone angle"
    },
    electricalCharacteristics: "Built on BISS0001 PIR controller IC. Features onboard jumper for repeatable trigger (H) vs non-repeatable trigger (L) modes.",
    howToUse: "Set jumper to 'H' mode for continuous trigger. Connect OUT directly to any digital input pin. In code, read with `digitalRead(pirPin)`.",
    exampleCircuit: "Burglar alarm: PIR OUT connected to Arduino Pin 2 (interrupt pin). When HIGH, Arduino sounds buzzer and sends notification.",
    applications: ["Home security systems", "Automated corridor lighting", "HVAC smart energy occupancy saving", "Wild animal camera traps"],
    advantages: ["Ultra-low power (<50µA) suitable for battery operation", "3.3V output works safely with Arduino, ESP32 and Raspberry Pi", "Adjustable delay and sensitivity"],
    limitations: ["Cannot detect stationary people (only moving thermal gradients)", "False triggers caused by hot air currents, radiators, or direct sunlight"],
    commonMistakes: [
      "Testing immediately after power on without waiting for the required 60-second sensor warm-up stabilization period.",
      "Placing directly facing an air conditioning duct or blowing curtains."
    ],
    safety: "Fresnel lens is fragile; avoid pressing or puncturing the white polyethylene dome.",
    datasheetUrl: "https://www.mpja.com/download/31227sc.pdf",
    tags: ["sensor", "pir", "motion", "security", "hc-sr501"],
    related: {
      components: ["arduino-uno", "esp32-wroom", "bjt-bc547"],
      experiments: ["ir-obstacle", "relay-control"],
      projects: ["security-alert-system", "smart-home-automation"],
      videos: ["vid-pir-motion-sensor"],
      quizzes: ["quiz-sensors"]
    }
  },
  {
    id: "sensor-dht11",
    name: "DHT11 Digital Temperature & Humidity Sensor",
    category: "SENSORS",
    partNumber: "DHT11 (Blue plastic casing)",
    shortDesc: "Basic, low-cost digital composite sensor for measuring ambient relative humidity and temperature with calibrated single-wire digital output.",
    purpose: "Weather monitoring, environmental telemetry, greenhouse control, and HVAC climate sensing.",
    workingPrinciple: "Contains a resistive humidity sensing component and an NTC thermistor read by an internal 8-bit microcontroller that outputs 40-bit packet over a single bidirectional data wire.",
    symbol: "4-pin perforated blue plastic case (or 3-pin module on PCB with pull-up resistor)",
    pinout: [
      { pin: "Pin 1", name: "VCC", desc: "Power supply (+3.3V to +5.5V DC)." },
      { pin: "Pin 2", name: "DATA", desc: "Single-bus bidirectional digital data line (requires 4.7kΩ-10kΩ pull-up)." },
      { pin: "Pin 3", name: "NC", desc: "No connection (null pin on 4-pin version)." },
      { pin: "Pin 4", name: "GND", desc: "Ground reference." }
    ],
    specifications: {
      "Supply Voltage": "3.3 V to 5.5 V DC",
      "Temperature Range": "0°C to 50°C (±2°C accuracy)",
      "Humidity Range": "20% to 90% RH (±5% RH accuracy)",
      "Sampling Rate": "1 Hz (maximum 1 reading per second)",
      "Data Format": "40 bits: 8-bit integral RH, 8-bit decimal RH, 8-bit integral T, 8-bit decimal T, 8-bit checksum"
    },
    electricalCharacteristics: "Single-wire custom synchronous protocol. Microcontroller pulls line low for 18ms, then DHT11 transmits 40 pulses where pulse width encodes 0 vs 1.",
    howToUse: "Use Adafruit DHT library: `dht.begin()`, `float h = dht.readHumidity()`, `float t = dht.readTemperature()`. Allow minimum 2 seconds between consecutive reads.",
    exampleCircuit: "DHT11 DATA connected to ESP32 GPIO 4 with a 10kΩ pull-up resistor to 3.3V rail. Values sent to Firebase Realtime Database every 10 seconds.",
    applications: ["IoT weather stations", "Indoor greenhouse automation", "Server room thermal alerts", "Home automation thermostats"],
    advantages: ["Pre-calibrated digital output requires zero analog calibration", "Runs on both 3.3V and 5V logic", "Extremely inexpensive"],
    limitations: ["Slow 1-second sampling rate", "Moderate ±2°C accuracy (use DHT22 / BME280 for laboratory-grade precision)"],
    commonMistakes: [
      "Polling sensor faster than once every 2 seconds, which yields repeated or NaN errors.",
      "Omitting the pull-up resistor when using the bare 4-pin sensor package."
    ],
    safety: "Keep sensor away from condensation liquids and volatile chemical solvents (ethanol/acetone) which damage the hygroscopic layer.",
    datasheetUrl: "https://www.mouser.com/datasheet/2/758/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf",
    tags: ["sensor", "dht11", "temperature", "humidity", "weather", "iot"],
    related: {
      components: ["esp32-wroom", "arduino-uno", "display-lcd1602"],
      experiments: ["temperature-measurement", "esp32-telemetry"],
      projects: ["temperature-monitor", "iot-weather-station"],
      videos: ["vid-dht11-esp32"],
      quizzes: ["quiz-sensors"]
    }
  },
  {
    id: "sensor-mpu6050",
    name: "MPU-6050 6-Axis Accelerometer & Gyroscope",
    category: "SENSORS",
    partNumber: "MPU-6050 (GY-521 breakout board)",
    shortDesc: "Micro-electro-mechanical (MEMS) MotionTracking device combining a 3-axis accelerometer and 3-axis gyroscope with an onboard Digital Motion Processor (DMP).",
    purpose: "Self-balancing robots, drone flight controllers, tilt sensing, gesture recognition, and navigation.",
    workingPrinciple: "MEMS capacitive plates measure deflection caused by linear acceleration (gravity and inertia). Vibrating ring structures measure Coriolis force induced by angular rotational velocity.",
    symbol: "Breakout board module with 8 header pins and central QFN-24 chip",
    pinout: [
      { pin: "VCC", name: "Power", desc: "Connect to 3.3V or 5V (board has 3.3V onboard LDO regulator)." },
      { pin: "GND", name: "Ground", desc: "Common ground reference." },
      { pin: "SCL", name: "I2C Clock", desc: "Serial clock line; connect to Arduino A5 or ESP32 GPIO 22." },
      { pin: "SDA", name: "I2C Data", desc: "Serial data line; connect to Arduino A4 or ESP32 GPIO 21." },
      { pin: "XDA / XCL", name: "Aux I2C", desc: "Auxiliary I2C bus for external magnetometer (compass)." },
      { pin: "AD0", name: "I2C Address Select", desc: "Default LOW = 0x68; tie to HIGH = 0x69." },
      { pin: "INT", name: "Interrupt Output", desc: "Programmable interrupt pin triggers on motion or data ready." }
    ],
    specifications: {
      "Operating Voltage": "3.0 V to 5.0 V (GY-521 module)",
      "Accelerometer Full-Scale Ranges": "±2g, ±4g, ±8g, ±16g",
      "Gyroscope Full-Scale Ranges": "±250, ±500, ±1000, ±2000 °/sec",
      "Communication Interface": "Fast I2C (up to 400 kHz)",
      "Analog-to-Digital Resolution": "16-bit ADCs per channel (6 channels simultaneous)"
    },
    electricalCharacteristics: "Standard I2C protocol. GY-521 board contains onboard 4.7kΩ pull-up resistors on SDA and SCL.",
    howToUse: "Include `<Wire.h>` and Adafruit_MPU6050 or MPU6050_6Axis_MotionApps library. Read raw acceleration and angular rates, then apply complementary or Kalman filter to calculate pitch and roll angles.",
    exampleCircuit: "Two-wheeled self-balancing robot: MPU-6050 mounted on chassis center of mass feeding pitch angle to PID controller, driving L293D motors to maintain balance.",
    applications: ["Self-balancing robots", "Quadcopters and drones", "Gaming controllers & air mouse", "Vehicle rollover and crash detection", "Earthquake seismometers"],
    advantages: ["High-speed 16-bit precision", "Onboard DMP handles complex sensor fusion math", "Very compact footprint"],
    limitations: ["Gyroscope suffers from zero-rate drift over time without magnetometer correction", "Sensitive to mechanical vibrations from motors"],
    commonMistakes: [
      "Mounting the sensor loosely, which introduces high frequency motor vibration into the accelerometer.",
      "Forgetting to zero-calibrate offsets while holding the sensor completely still at startup."
    ],
    safety: "Fragile MEMS microstructure can be damaged if subjected to mechanical shocks exceeding 10,000g (e.g. dropping onto concrete).",
    datasheetUrl: "https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf",
    tags: ["sensor", "mpu6050", "imu", "accelerometer", "gyroscope", "i2c", "robotics"],
    related: {
      components: ["arduino-uno", "esp32-wroom", "ic-l293d"],
      experiments: ["servo-control", "esp32-telemetry"],
      projects: ["obstacle-robot", "line-following-robot"],
      videos: ["vid-mpu6050-accelerometer"],
      quizzes: ["quiz-sensors"]
    }
  },
  {
    id: "sensor-mq2",
    name: "MQ-2 Gas, Smoke & LPG Sensor",
    category: "SENSORS",
    partNumber: "MQ-2 (Module with breakout board)",
    shortDesc: "Semiconductor gas sensor sensitive to Liquefied Petroleum Gas (LPG), propane, methane, hydrogen, alcohol, and flammable smoke.",
    purpose: "Kitchen gas leak alarms, fire smoke detection, industrial hazardous air monitoring, and air quality systems.",
    workingPrinciple: "Contains a micro-ceramic tube with Tin Dioxide (SnO2) sensitive layer heated by an internal 5V coil. In clean air, conductivity is low. In the presence of combustible gases, surface oxygen reacts, freeing electrons and lowering sensor resistance (Rs).",
    symbol: "Cylindrical stainless steel wire mesh cap with 4-pin breakout board",
    pinout: [
      { pin: "VCC", name: "5V Power", desc: "Provides 5V to internal 800mW heating coil (draws ~160mA!)." },
      { pin: "GND", name: "Ground", desc: "Common ground reference." },
      { pin: "D0", name: "Digital Output", desc: "Active LOW output switched by onboard LM393 comparator threshold pot." },
      { pin: "A0", name: "Analog Output", desc: "Analog voltage (0.1V to 4.5V) proportional to gas concentration in PPM." }
    ],
    specifications: {
      "Operating Voltage": "5.0 V ± 0.1 V",
      "Heater Power Dissipation": "~800 mW (160 mA current draw)",
      "Target Gases": "LPG, i-butane, propane, methane, alcohol, hydrogen, smoke",
      "Detection Concentration Range": "300 to 10,000 ppm (LPG and combustible gas)",
      "Preheat Time": "Initial warm-up 24-48 hours; daily warm-up 3-5 minutes"
    },
    electricalCharacteristics: "Sensor requires continuous 5V heating to maintain ~300°C internal sensing temperature. Power supply must deliver at least 250mA for the heater alone.",
    howToUse: "Connect A0 to microcontroller analog pin. Measure sensor resistance Rs in test gas relative to clean air resistance Ro. Calculate gas concentration via logarithmic curve.",
    exampleCircuit: "Smart Fire & Gas Alarm: MQ-2 A0 pin triggers piezo buzzer and sends MQTT alert to smartphone when smoke PPM > 400.",
    applications: ["Domestic gas leak alarms", "Industrial combustible gas detectors", "Early fire warning smoke detectors", "Smart kitchen safety devices"],
    advantages: ["High sensitivity to LPG and propane", "Long life and low cost", "Both analog PPM and digital threshold outputs"],
    limitations: ["High current consumption (160mA heater drains small batteries in hours)", "Cross-sensitivity (cannot distinguish methane from alcohol easily)"],
    commonMistakes: [
      "Powering from USB-powered 3.3V pin (heater requires true 5V and >200mA).",
      "Testing immediately after power up without waiting 3 minutes for heater stabilization."
    ],
    safety: "The metal mesh cap naturally becomes warm during normal operation (this is normal heater behavior). Keep away from flammable liquid sprays.",
    datasheetUrl: "https://www.pololu.com/file/0J309/MQ2.pdf",
    tags: ["sensor", "mq2", "gas", "smoke", "fire", "analog"],
    related: {
      components: ["arduino-uno", "relay-module", "bjt-bc547"],
      experiments: ["temperature-measurement", "relay-control"],
      projects: ["security-alert-system", "smart-home-automation"],
      videos: ["vid-mq2-gas-sensor"],
      quizzes: ["quiz-sensors"]
    }
  },
  {
    id: "arduino-uno",
    name: "Arduino Uno R3 Development Board",
    category: "BOARDS",
    partNumber: "Arduino Uno R3 (ATmega328P)",
    shortDesc: "Industry-standard open-source microcontroller board based on the 8-bit Microchip ATmega328P clocked at 16 MHz.",
    purpose: "Prototyping practical electronics, educational lab experiments, robotics, sensor acquisition, and automation.",
    workingPrinciple: "Executes C/C++ compiled binaries. Provides hardware timers, 10-bit analog-to-digital converters, PWM generators, and UART serial communication accessible via simple high-level API functions (`pinMode`, `digitalWrite`, `analogRead`).",
    symbol: "Rectangular PCB with dual row female pin headers, USB-B jack, and DC barrel jack",
    pinout: [
      { pin: "D0 - D1", name: "UART RX / TX", desc: "Hardware serial communication lines and USB programming." },
      { pin: "D2 - D13", name: "Digital I/O", desc: "General purpose digital pins (D3, D5, D6, D9, D10, D11 support 8-bit PWM)." },
      { pin: "A0 - A5", name: "Analog Inputs", desc: "10-bit ADC inputs (0-1023). A4 is I2C SDA, A5 is I2C SCL." },
      { pin: "5V / 3.3V / GND", name: "Power Rails", desc: "Onboard power supply outputs for breadboards and sensors." },
      { pin: "VIN", name: "External DC In", desc: "Raw input voltage pin (7V - 12V DC)." },
      { pin: "RESET", name: "Master Reset", desc: "Active LOW reset pin." }
    ],
    specifications: {
      "Microcontroller": "ATmega328P (8-bit AVR RISC)",
      "Operating Voltage": "5 V",
      "Input Voltage (Recommended)": "7 V to 12 V (via barrel jack or VIN)",
      "Flash Memory": "32 KB (0.5 KB used by bootloader)",
      "SRAM": "2 KB",
      "EEPROM": "1 KB",
      "Clock Speed": "16 MHz crystal oscillator",
      "DC Current per I/O Pin": "20 mA recommended (40 mA absolute max)"
    },
    electricalCharacteristics: "5V TTL logic levels. High level recognized above 3.0V; low level below 1.5V. 10-bit ADC resolution = 5V / 1024 = 4.88 mV per step.",
    howToUse: "Write sketch in Arduino IDE, connect via USB-B cable, select Board 'Arduino Uno' and COM Port, click Upload.",
    exampleCircuit: "Standard laboratory starter circuit: LED on pin 13, potentiometer on A0, push button on pin 2.",
    applications: ["Engineering lab instruction", "Rapid hardware prototyping", "Robotics and mechatronics", "Automated test fixtures"],
    advantages: ["Massive global open-source community and thousands of libraries", "Extremely rugged and forgiving for student mistakes", "Removable DIP-package IC"],
    limitations: ["Limited 2KB RAM and 16MHz speed cannot handle video or heavy DSP", "No native Wi-Fi or Bluetooth (requires shields)"],
    commonMistakes: [
      "Drawing more than 200mA total current across all GPIO pins combined.",
      "Connecting 12V directly into 5V pin, destroying the ATmega328P chip instantly."
    ],
    safety: "Operate on insulated surface; avoid laying on metallic screwdrivers or solder scraps while powered.",
    datasheetUrl: "https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf",
    tags: ["board", "arduino", "uno", "microcontroller", "embedded", "atmega328p"],
    related: {
      components: ["resistor", "led", "sensor-ultrasonic", "sensor-ldr"],
      experiments: ["led-blink", "led-pwm", "ultrasonic-distance", "servo-control"],
      projects: ["smart-dustbin", "obstacle-robot", "line-following-robot"],
      videos: ["vid-arduino-basics"],
      quizzes: ["quiz-microcontrollers"]
    }
  },
  {
    id: "esp32-wroom",
    name: "ESP32-WROOM-32 Wi-Fi & Bluetooth MCU",
    category: "BOARDS",
    partNumber: "ESP32-WROOM-32D / 38-Pin NodeMCU",
    shortDesc: "Powerhouse 32-bit dual-core microcontroller with integrated 2.4 GHz Wi-Fi, Bluetooth 4.2 BLE, and rich peripheral set.",
    purpose: "Internet of Things (IoT) devices, cloud telemetry, wireless robotics, edge AI computation, and web servers.",
    workingPrinciple: "Dual-core Xtensa 32-bit LX6 microprocessor operating up to 240 MHz. Supports real-time FreeRTOS multitasking, hardware cryptography, capacitive touch, and ultra-low power coprocessing.",
    symbol: "Shielded module on breakout board with dual row headers, micro-USB / Type-C port, EN and BOOT buttons",
    pinout: [
      { pin: "GPIO 21 / 22", name: "I2C SDA / SCL", desc: "Default hardware I2C bus pins." },
      { pin: "GPIO 18, 19, 23, 5", name: "SPI Bus", desc: "VSPI SCK, MISO, MOSI, SS pins." },
      { pin: "GPIO 34, 35, 36, 39", name: "Input Only (GPI)", desc: "Analog ADC pins without internal pull-up/pull-down resistors." },
      { pin: "GPIO 2", name: "Onboard Blue LED", desc: "Connected to onboard LED and internal strapping pin." },
      { pin: "3V3 / GND", name: "Power", desc: "Regulated 3.3V power input/output." },
      { pin: "EN (Enable)", name: "Chip Enable", desc: "Pull LOW to reset chip; high for normal operation." }
    ],
    specifications: {
      "CPU": "Dual-Core Xtensa 32-bit LX6 @ up to 240 MHz",
      "Wireless Connectivity": "Wi-Fi 802.11 b/g/n (up to 150 Mbps) + Bluetooth v4.2 BR/EDR & BLE",
      "SRAM": "520 KB",
      "Flash Memory": "4 MB / 8 MB SPI Flash",
      "ADC Resolution": "12-bit (0 - 4095 range across 18 channels)",
      "DAC": "Dual 8-bit digital-to-analog converters",
      "Operating Logic Voltage": "3.3 V (NOT 5V tolerant!)"
    },
    electricalCharacteristics: "Logic level is strictly 3.3V. Applying 5V directly to GPIO pins can permanently damage the silicon. Peak Wi-Fi transmission bursts draw up to 250mA current spikes.",
    howToUse: "Install ESP32 board definition in Arduino IDE. Use `#include <WiFi.h>` and Firebase-ESP-Client library to connect to cloud services in seconds.",
    exampleCircuit: "IoT Weather Station: ESP32 reads DHT11 temperature and sends JSON payload directly to Google Firebase Firestore via Wi-Fi.",
    applications: ["Cloud IoT telemetry", "Smart home automation", "Wireless sensor networks", "Bluetooth audio streaming", "Local HTTP web servers"],
    advantages: ["Unbeatable performance-to-cost ratio", "Dual cores run FreeRTOS tasks in parallel", "Massive RAM compared to Arduino"],
    limitations: ["GPIO pins are NOT 5V tolerant", "ADC has non-linear response near 0V and 3.3V extremes"],
    commonMistakes: [
      "Connecting 5V sensor outputs directly to ESP32 pins without a level shifter.",
      "Powering from a weak USB port that brownouts during Wi-Fi connection handshake."
    ],
    safety: "Ensure external 3.3V regulator can supply at least 500mA continuous to prevent brownout reset loops.",
    datasheetUrl: "https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32_datasheet_en.pdf",
    tags: ["board", "esp32", "iot", "wifi", "bluetooth", "wireless", "microcontroller"],
    related: {
      components: ["sensor-dht11", "sensor-mpu6050", "relay-module"],
      experiments: ["esp32-telemetry", "iot-cloud-monitoring"],
      projects: ["iot-weather-station", "smart-home-automation"],
      videos: ["vid-esp32-firebase-tutorial"],
      quizzes: ["quiz-iot-embedded"]
    }
  },
  {
    id: "relay-module",
    name: "5V Dual Channel Relay Module with Optocoupler",
    category: "MODULES",
    partNumber: "5V 2-Channel Relay Board with Songle Relays",
    shortDesc: "Electromechanical relay module with optical isolation that allows 3.3V/5V microcontrollers to safely switch high-power AC or DC mains loads.",
    purpose: "Switching AC lamps, fans, water pumps, heater elements, and high-voltage industrial circuits from microcontrollers.",
    workingPrinciple: "A low-current control signal activates an infrared LED inside an EL817 optocoupler, which turns on a phototransistor to energize the relay's electromagnetic coil. The magnetic field pulls a mechanical contact armature from Normally Closed (NC) to Normally Open (NO).",
    symbol: "Coil symbol adjacent to single-pole double-throw (SPDT) switch contacts (COM, NO, NC)",
    pinout: [
      { pin: "VCC", name: "Power (+5V)", desc: "Powers the optocoupler and relay coil." },
      { pin: "GND", name: "Ground", desc: "Common ground reference." },
      { pin: "IN1 / IN2", name: "Control Inputs", desc: "Active LOW logic inputs; pull LOW to energize relay." },
      { pin: "COM", name: "Common", desc: "Mains load power entry terminal." },
      { pin: "NO", name: "Normally Open", desc: "Connects to COM only when relay is actively energized." },
      { pin: "NC", name: "Normally Closed", desc: "Connected to COM when relay is de-energized/idle." }
    ],
    specifications: {
      "Coil Voltage": "5.0 V DC (nominal current ~70 mA per coil)",
      "AC Contact Rating": "250V AC @ 10A, 125V AC @ 10A",
      "DC Contact Rating": "30V DC @ 10A, 28V DC @ 10A",
      "Optical Isolation": "Built-in PC817 / EL817 optocoupler",
      "Switching Time": "Release < 5ms, Operate < 10ms",
      "Mechanical Life": "10,000,000 operations"
    },
    electricalCharacteristics: "Galvanic optical barrier separates sensitive microcontroller low-voltage circuitry from deadly 230V AC mains lines. Onboard SMD transistor drives the coil.",
    howToUse: "Connect VCC to 5V, GND to GND, and IN1 to Arduino pin 7. Set `digitalWrite(7, LOW)` to turn ON the relay and light the appliance.",
    exampleCircuit: "Home automation light switch: 230VAC live wire connects to COM; NO connects to light bulb fixture; bulb neutral connects to AC mains neutral.",
    applications: ["Smart home AC lighting", "Automated garden irrigation pumps", "HVAC fan controls", "Emergency power cutoffs"],
    advantages: ["Complete electrical isolation protects human and MCU from AC spikes", "Switches up to 2500 Watts of AC power", "Tactile audible click confirms operation"],
    limitations: ["Mechanical contacts arc and wear out after hundreds of thousands of heavy cycles", "Cannot perform high-speed PWM dimming"],
    commonMistakes: [
      "Forgetting that modules are active-LOW: Writing HIGH turns the appliance OFF, writing LOW turns it ON.",
      "Attempting to use PWM on relay coil to dim a light bulb, which quickly destroys the mechanical contacts."
    ],
    safety: "DANGER: HIGH VOLTAGE MAINS. Insulate all 230V AC terminal screws. Never touch screw terminals while plugged into AC wall outlet.",
    datasheetUrl: "https://www.songle.com/en/pdf/200841793739818.pdf",
    tags: ["module", "relay", "ac-switch", "home-automation", "optocoupler"],
    related: {
      components: ["arduino-uno", "esp32-wroom", "bjt-bc547"],
      experiments: ["relay-control", "transistor-switch"],
      projects: ["smart-home-automation", "auto-street-light"],
      videos: ["vid-relay-module-arduino"],
      quizzes: ["quiz-power-supplies"]
    }
  },
  {
    id: "display-lcd1602",
    name: "I2C 16x2 Character LCD Module",
    category: "MODULES",
    partNumber: "LCD1602 with PCF8574T I2C Backpack",
    shortDesc: "Alphanumeric liquid crystal display capable of showing 2 rows of 16 characters each, interfaced via a convenient 2-wire I2C backpack.",
    purpose: "Displaying real-time sensor telemetry, diagnostic status, menus, and debugging messages without a PC serial monitor.",
    workingPrinciple: "Liquid crystal molecules change polarization angle when electric fields are applied between patterned electrodes. A PCF8574 I/O expander chip translates 2-wire I2C commands into 4-bit parallel HD44780 LCD control signals.",
    symbol: "16x2 character matrix screen with 4-pin I2C header (GND, VCC, SDA, SCL) and blue contrast trimmer pot",
    pinout: [
      { pin: "GND", name: "Ground", desc: "Common ground reference (0V)." },
      { pin: "VCC", name: "Power", desc: "+5V DC power supply input." },
      { pin: "SDA", name: "Serial Data", desc: "I2C data line; connects to Arduino A4 or ESP32 GPIO 21." },
      { pin: "SCL", name: "Serial Clock", desc: "I2C clock line; connects to Arduino A5 or ESP32 GPIO 22." }
    ],
    specifications: {
      "Operating Voltage": "5.0 V DC",
      "Display Capacity": "16 characters per line, 2 lines (32 characters total)",
      "Backlight": "Blue or Yellow-Green LED with jumper switch",
      "I2C Default Address": "0x27 or 0x3F (configurable via solder pads A0, A1, A2)",
      "Character Matrix": "5 x 8 dot matrix with cursor"
    },
    electricalCharacteristics: "Standard I2C bus speeds up to 100 kHz. Contrast is manually tuned via the blue single-turn potentiometer on the rear backpack.",
    howToUse: "Use `LiquidCrystal_I2C` library: `lcd.init()`, `lcd.backlight()`, `lcd.setCursor(0, 0)`, `lcd.print(\"Temp: 24.5 C\")`.",
    exampleCircuit: "Weather Monitor: DHT11 temperature and humidity readings refreshed on LCD screen every 2 seconds.",
    applications: ["Stand-alone laboratory instrumentation", "Sensor station monitors", "Access control passcode keypads", "Medical vital sign monitors"],
    advantages: ["Requires only 2 microcontroller pins instead of 16 wires in raw LCD mode", "Crisp high-contrast readable in bright sunlight", "Built-in character ROM"],
    limitations: ["Alphanumeric text only (cannot display graphical bitmaps or charts)", "Requires 5V for optimal liquid crystal contrast"],
    commonMistakes: [
      "Screen displays solid white rectangles because the rear contrast pot is out of adjustment.",
      "Using wrong I2C address in software (use an I2C scanner sketch to verify 0x27 vs 0x3F)."
    ],
    safety: "Glass display panel is brittle; avoid severe pressure on screen surface.",
    datasheetUrl: "https://www.sparkfun.com/datasheets/LCD/HD44780.pdf",
    tags: ["module", "display", "lcd1602", "i2c", "telemetry"],
    related: {
      components: ["arduino-uno", "sensor-dht11", "sensor-ultrasonic"],
      experiments: ["ultrasonic-distance", "temperature-measurement"],
      projects: ["temperature-monitor", "smart-dustbin"],
      videos: ["vid-lcd-i2c-arduino"],
      quizzes: ["quiz-microcontrollers"]
    }
  }
];
