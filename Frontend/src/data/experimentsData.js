// NextGen Education - Practical Experiment Lab Dataset
// Contains 15 comprehensive engineering lab experiments with theory, connections, step-by-step procedures,
// expected outputs, observations, results, troubleshooting tables, safety precautions, and relationship mappings.

export const experimentsData = [
  {
    id: "led-blink",
    title: "Experiment 01: LED Blink & Timing Fundamentals",
    category: "EMBEDDED & DIGITAL",
    difficulty: "BEGINNER",
    estimatedTime: "20 Mins",
    objective: "Understand GPIO digital output pin states (HIGH and LOW), calculate series current limiting resistance, and implement software-controlled periodic delay loops.",
    theory: "A Light Emitting Diode (LED) is a semiconductor P-N junction diode that emits light when forward biased above its threshold voltage (Vf ~ 2.0V for Red). The microcontroller GPIO pin outputs 5V (HIGH) or 0V (LOW). Because an LED has near-zero internal dynamic resistance once forward-biased, connecting it directly to a 5V source causes excessive current that burns the diode. A series resistor R limits current: R = (Vcc - Vf) / If. For Vcc=5V, Vf=2V, If=15mA: R = (5 - 2)/0.015 = 200Ω (standard 220Ω).",
    requiredComponents: [
      { name: "Arduino Uno or ESP32 Board", qty: "1" },
      { name: "5mm Red Diffused LED", qty: "1" },
      { name: "220Ω 1/4W Resistor (Red-Red-Brown-Gold)", qty: "1" },
      { name: "Solderless Breadboard", qty: "1" },
      { name: "Male-to-Male Jumper Wires", qty: "2" }
    ],
    requiredEquipment: ["Digital Multimeter (DMM)", "PC with Arduino IDE & USB Cable"],
    circuitDiagramDesc: "Arduino Pin 13 connects to the 220Ω resistor. The resistor's other lead connects to the LED Anode (longer lead). The LED Cathode (shorter lead) connects to Arduino GND rail.",
    connections: [
      "Arduino Digital Pin 13 ──> 220Ω Resistor Lead 1",
      "220Ω Resistor Lead 2 ──> LED Anode (Long lead / +)",
      "LED Cathode (Short lead / -) ──> Arduino GND Pin"
    ],
    procedure: [
      "Insert the 5mm Red LED into the breadboard across two different terminal rows.",
      "Identify the longer lead as the Anode (+) and the shorter lead with flat rim as Cathode (-).",
      "Insert one lead of the 220Ω resistor into the same row as the LED Anode, and the other lead into a free row.",
      "Connect a jumper wire from Arduino Pin 13 to the free resistor row.",
      "Connect a jumper wire from Arduino GND to the LED Cathode row.",
      "Plug the Arduino into your PC using the USB cable.",
      "Open the Arduino IDE, paste the Blink sketch, select 'Arduino Uno' and COM Port, then click Upload.",
      "Observe the periodic 1 Hz flashing of the LED."
    ],
    codeSnippet: `// NextGen Education - Lab 01: LED Blink
const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH); // Turn LED ON (5V)
  delay(1000);                 // Wait 1000 milliseconds
  digitalWrite(LED_PIN, LOW);  // Turn LED OFF (0V)
  delay(1000);                 // Wait 1000 milliseconds
}`,
    expectedOutput: "The breadboard LED blinks continuously, illuminating brightly for exactly 1.0 second and turning completely off for 1.0 second in an endless periodic square wave.",
    observation: "Measuring with a multimeter across the LED terminals shows approximately 1.95V during the ON cycle. Measuring across the 220Ω resistor shows approximately 3.05V. Using Ohm's Law: I = 3.05V / 220Ω = 13.86 mA, which is well within the safe 20mA rating of the microcontroller GPIO pin.",
    result: "Successfully demonstrated GPIO digital output switching and verified that a 220Ω series resistor safely limits LED forward current to ~14mA.",
    troubleshooting: [
      {
        issue: "LED remains completely dark / does not blink",
        cause: "LED reversed (Anode/Cathode swapped), bad jumper wire, or wrong GPIO pin selected in code.",
        solution: "Rotate the LED 180 degrees so the longer lead connects to the resistor from Pin 13."
      },
      {
        issue: "LED is very dim",
        cause: "Resistor value too large (e.g. 220kΩ instead of 220Ω).",
        solution: "Verify resistor color code: Red-Red-Brown-Gold for 220Ω."
      },
      {
        issue: "LED flashed once brightly and never lit again",
        cause: "LED connected directly to 5V without series resistor, resulting in burned junction.",
        solution: "Replace damaged LED and ensure a 220Ω series resistor is in line."
      }
    ],
    safetyNotes: [
      "Always disconnect the USB cable before modifying breadboard wiring to avoid accidental short circuits.",
      "Never connect an LED directly between 5V and GND without a series resistor."
    ],
    related: {
      videoId: "vid-led-basics",
      quizId: "quiz-fundamentals",
      projectId: "auto-street-light",
      componentIds: ["led", "resistor", "arduino-uno"]
    }
  },
  {
    id: "led-pwm",
    title: "Experiment 02: LED Dimming & Pulse Width Modulation (PWM)",
    category: "EMBEDDED & DIGITAL",
    difficulty: "BEGINNER",
    estimatedTime: "25 Mins",
    objective: "Understand Pulse Width Modulation (PWM), duty cycle calculations, and utilize hardware PWM timers to smoothly control LED brightness.",
    theory: "Digital microcontrollers cannot produce a continuously variable analog output voltage without an expensive DAC. Instead, they use Pulse Width Modulation (PWM). By switching a 5V digital signal ON and OFF at a high frequency (~490 Hz or 980 Hz on Arduino), the human eye integrates the light pulses due to persistence of vision. The perceived brightness is proportional to the Duty Cycle: Duty Cycle (%) = (Ton / (Ton + Toff)) * 100%. The effective average voltage is Vavg = Vcc * (Duty Cycle / 100). Arduino `analogWrite()` accepts values from 0 (0% duty cycle, 0V avg) to 255 (100% duty cycle, 5V avg).",
    requiredComponents: [
      { name: "Arduino Uno", qty: "1" },
      { name: "5mm Blue or Green LED", qty: "1" },
      { name: "220Ω Resistor", qty: "1" },
      { name: "10kΩ Potentiometer", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["Digital Multimeter / Oscilloscope", "PC with Arduino IDE"],
    circuitDiagramDesc: "Potentiometer Pin 1 to 5V, Pin 3 to GND, Center Wiper to Arduino Analog Pin A0. Arduino PWM Pin 9 connects to 220Ω resistor and Blue LED Anode. LED Cathode to GND.",
    connections: [
      "Potentiometer Pin 1 ──> Arduino 5V",
      "Potentiometer Pin 2 (Center) ──> Arduino Analog Pin A0",
      "Potentiometer Pin 3 ──> Arduino GND",
      "Arduino Digital Pin 9 (PWM ~) ──> 220Ω Resistor",
      "220Ω Resistor ──> LED Anode",
      "LED Cathode ──> Arduino GND"
    ],
    procedure: [
      "Connect the 10k potentiometer across 5V and GND, routing the wiper to Analog Pin A0.",
      "Connect the LED in series with the 220Ω resistor to PWM pin 9 (marked with a tilde '~').",
      "Upload the sketch to map the 10-bit analog input (0-1023) to an 8-bit PWM value (0-255).",
      "Rotate the potentiometer knob from left to right and observe the LED fading from dark to full brightness.",
      "If an oscilloscope is available, probe Pin 9 to visualize the variable duty cycle square wave."
    ],
    codeSnippet: `// NextGen Education - Lab 02: PWM Dimming
const int POT_PIN = A0;
const int LED_PIN = 9;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int potValue = analogRead(POT_PIN);          // 0 to 1023
  int brightness = map(potValue, 0, 1023, 0, 255); // 0 to 255
  analogWrite(LED_PIN, brightness);           // Set PWM duty cycle
  delay(10);
}`,
    expectedOutput: "Smooth, flicker-free gradation in LED light output as the potentiometer is turned across its 300° rotational sweep.",
    observation: "Measuring Pin 9 with a DC voltmeter reveals an apparent DC voltage that smoothly transitions from 0.0V to 4.95V. However, inspecting with an oscilloscope shows a fixed 490 Hz square wave whose pulse width (Ton) widens proportionally with wiper rotation.",
    result: "Demonstrated that average electrical energy delivered to a load can be modulated digitally using PWM duty cycles without wasting power in series resistive drops.",
    troubleshooting: [
      {
        issue: "LED only snaps fully ON or fully OFF, no dimming",
        cause: "Connected to a non-PWM pin (such as Pin 2, 4, 7, 8).",
        solution: "Move jumper to a designated PWM pin (Pin 3, 5, 6, 9, 10, or 11 on Arduino Uno)."
      }
    ],
    safetyNotes: ["Ensure potentiometer end terminals do not short 5V to GND without internal resistance."],
    related: {
      videoId: "vid-pwm-explained",
      quizId: "quiz-fundamentals",
      projectId: "smart-dustbin",
      componentIds: ["led", "potentiometer", "arduino-uno"]
    }
  },
  {
    id: "ohms-law",
    title: "Experiment 03: Verification of Ohm's Law (V = I × R)",
    category: "ELECTRONICS FUNDAMENTALS",
    difficulty: "BEGINNER",
    estimatedTime: "30 Mins",
    objective: "Verify the fundamental relationship between Voltage, Current, and Resistance in an electrical circuit, and plot the linear V-I characteristic curve.",
    theory: "Formulated by Georg Simon Ohm in 1827, Ohm's Law states that the current flowing through a conductor between two points is directly proportional to the voltage across the two points, provided physical conditions (such as temperature) remain constant: V = I * R. The slope of the V versus I graph represents the resistance R (in Ohms): R = ΔV / ΔI.",
    requiredComponents: [
      { name: "1kΩ 1/4W Metal Film Resistor", qty: "1" },
      { name: "Variable DC Bench Power Supply (0 - 15V)", qty: "1" },
      { name: "Breadboard & Alligator Clips", qty: "1 set" }
    ],
    requiredEquipment: ["Two Digital Multimeters (one as DC Voltmeter, one as DC Milliammeter)"],
    circuitDiagramDesc: "Power Supply (+) connects to Multimeter 1 (mA mode) in series. Multimeter 1 out connects to 1kΩ Resistor. Resistor out returns to Power Supply (-). Multimeter 2 (Volts mode) connects directly across the 1kΩ resistor in parallel.",
    connections: [
      "Power Supply (+) ──> Ammeter Red Lead (+)",
      "Ammeter Black Lead (-) ──> 1kΩ Resistor Terminal 1",
      "1kΩ Resistor Terminal 2 ──> Power Supply (-)",
      "Voltmeter Red Lead (+) ──> 1kΩ Resistor Terminal 1 (Parallel)",
      "Voltmeter Black Lead (-) ──> 1kΩ Resistor Terminal 2 (Parallel)"
    ],
    procedure: [
      "Configure Multimeter 1 to measure DC Current (mA range) and wire it in SERIES with the circuit.",
      "Configure Multimeter 2 to measure DC Voltage and wire it in PARALLEL across the 1kΩ resistor.",
      "Set DC power supply to 2.0V, record measured Voltage (V) and Current (mA).",
      "Increase supply voltage in 2.0V increments up to 10.0V (2V, 4V, 6V, 8V, 10V).",
      "Record measured values in an observation table and compute R = V / I for each point.",
      "Plot V on the vertical Y-axis and I on the horizontal X-axis to verify linearity."
    ],
    codeSnippet: `// Not code-based: Analytical laboratory calculation
// Formula: R = V / I
// V = 2.00V -> I = 2.01mA -> R = 995 Ω
// V = 4.00V -> I = 4.02mA -> R = 995 Ω
// V = 6.00V -> I = 6.03mA -> R = 995 Ω
// V = 8.00V -> I = 8.04mA -> R = 995 Ω
// V = 10.0V -> I = 10.05mA -> R = 995 Ω`,
    expectedOutput: "A strictly linear straight-line graph passing through the origin (0,0) with constant slope equal to the 1000Ω resistance value.",
    observation: "For every 2V increase in voltage, current increases by precisely ~2.0 mA. At 10V, current is 10.0 mA, dissipating P = 10V * 0.01A = 0.1W, well under the 0.25W resistor rating.",
    result: "Ohm's Law (V = I * R) was experimentally confirmed with less than 1% error against the calibrated 1% metal film resistor.",
    troubleshooting: [
      {
        issue: "Ammeter displays 0.00mA at all voltages",
        cause: "Ammeter internal fuse blown (usually due to accidentally connecting ammeter in parallel across power supply).",
        solution: "Replace ammeter 200mA glass fuse or check meter terminal probe sockets."
      }
    ],
    safetyNotes: [
      "Never connect an ammeter in parallel with a power source; its near-zero internal resistance creates a dead short.",
      "Verify resistor power dissipation P = V²/R to avoid thermal breakdown."
    ],
    related: {
      videoId: "vid-ohms-law",
      quizId: "quiz-fundamentals",
      projectId: "energy-monitor",
      componentIds: ["resistor", "potentiometer"]
    }
  },
  {
    id: "rc-charging",
    title: "Experiment 04: RC Circuit Transient Response & Time Constant",
    category: "ELECTRONICS FUNDAMENTALS",
    difficulty: "INTERMEDIATE",
    estimatedTime: "35 Mins",
    objective: "Investigate capacitor charging and discharging dynamics, measure time constant τ = R × C, and verify exponential transient curves.",
    theory: "When a DC step voltage V0 is applied to an uncharged series RC circuit, the capacitor voltage Vc(t) rises exponentially: Vc(t) = V0 * (1 - e^(-t / RC)). The product of resistance R and capacitance C is the circuit Time Constant (τ = RC, in seconds). At t = 1τ, the capacitor charges to 63.2% of V0. At t = 5τ, the capacitor is considered fully charged (>99.3%). During discharge through R, Vc(t) = V0 * e^(-t / RC). At t = 1τ, voltage drops to 36.8% of initial value.",
    requiredComponents: [
      { name: "100kΩ Resistor (Brown-Black-Yellow)", qty: "1" },
      { name: "100µF 25V Electrolytic Capacitor", qty: "1" },
      { name: "SPDT Slide Switch / Pushbutton", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["Regulated 5V DC Power Source / Arduino 5V", "Digital Multimeter (High input impedance)", "Stopwatch / Phone Timer"],
    circuitDiagramDesc: "5V supply connects through SPDT switch to 100kΩ resistor. Resistor connects to 100µF capacitor positive terminal. Capacitor negative connects to GND. Switch position 1 connects to 5V (charge), position 2 connects to GND (discharge).",
    connections: [
      "5V DC ──> Switch Terminal 1",
      "Switch Common ──> 100kΩ Resistor",
      "100kΩ Resistor ──> 100µF Capacitor (+)",
      "100µF Capacitor (-) ──> Circuit GND",
      "Switch Terminal 2 ──> Circuit GND (Discharge path)"
    ],
    procedure: [
      "Assemble the series RC network on breadboard with 100kΩ and 100µF. Calculate theoretical τ = 100,000 Ω * 0.000100 F = 10.0 seconds.",
      "Fully discharge the capacitor by momentarily shorting its leads with a jumper wire.",
      "Connect the DMM in DC voltage mode across the capacitor terminals.",
      "Flip the switch to 5V and start the stopwatch simultaneously.",
      "Record capacitor voltage every 5 seconds up to 50 seconds (5τ).",
      "Note the exact voltage at t = 10.0 seconds (1τ) and compare to 63.2% of 5V (3.16V).",
      "Flip switch to discharge and record decay values."
    ],
    codeSnippet: `// Theoretical calculations:
// R = 100kΩ, C = 100µF -> τ = 10.0 seconds
// t = 0s:  Vc = 0.00V (0%)
// t = 10s: Vc = 3.16V (63.2%)
// t = 20s: Vc = 4.32V (86.5%)
// t = 30s: Vc = 4.75V (95.0%)
// t = 50s: Vc = 4.97V (99.3% - Fully Charged)`,
    expectedOutput: "The multimeter voltage rises rapidly at first, then progressively slows, asymptotically approaching 5.0V. At t = 10 seconds, voltage reads 3.15V ± 0.1V.",
    observation: "Due to real-world electrolytic capacitor tolerance (±20%) and DMM 10MΩ input impedance, the measured time constant is within 9.5s - 10.5s of theoretical 10.0s.",
    result: "Verified RC charging exponential curve and proved that 1τ corresponds to 63.2% of maximum supply potential.",
    troubleshooting: [
      {
        issue: "Capacitor voltage refuses to rise above ~3.8V",
        cause: "Using a very cheap multimeter with low 1MΩ input impedance that forms a voltage divider with the 100kΩ charging resistor.",
        solution: "Use a smaller charging resistor (e.g. 10kΩ) and larger capacitor (e.g. 1000µF) to maintain τ = 10s while minimizing meter loading."
      }
    ],
    safetyNotes: ["Observe electrolytic capacitor polarity (+ and -); reverse polarity will cause leakage and failure."],
    related: {
      videoId: "vid-capacitors-explained",
      quizId: "quiz-fundamentals",
      projectId: "touch-based-light",
      componentIds: ["capacitor", "resistor"]
    }
  },
  {
    id: "diode-characteristics",
    title: "Experiment 05: PN Junction Diode Forward & Reverse Characteristics",
    category: "ANALOG ELECTRONICS",
    difficulty: "INTERMEDIATE",
    estimatedTime: "30 Mins",
    objective: "Plot the non-linear V-I characteristic curve of a 1N4007 silicon diode and determine its knee/cut-in voltage (Vγ) and dynamic resistance.",
    theory: "A P-N junction diode acts as a one-way electrical valve. In forward bias, until applied voltage exceeds the internal barrier potential (cut-in voltage Vγ ≈ 0.6V - 0.7V for Silicon), current is negligible. Beyond 0.7V, forward current increases exponentially: I = Is * (e^(V/ηVt) - 1). In reverse bias, only a tiny reverse saturation leakage current (microamps) flows until reverse breakdown is reached.",
    requiredComponents: [
      { name: "1N4007 Silicon Diode", qty: "1" },
      { name: "330Ω 1/2W Resistor", qty: "1" },
      { name: "0-15V Variable DC Power Supply", qty: "1" },
      { name: "Breadboard & Leads", qty: "1 set" }
    ],
    requiredEquipment: ["Two Digital Multimeters (Voltmeter across diode, Ammeter in series)"],
    circuitDiagramDesc: "Power Supply (+) -> Ammeter (+) -> Ammeter (-) -> 330Ω Resistor -> Diode Anode. Diode Cathode (silver band) -> Power Supply (-). Voltmeter connects across Diode Anode and Cathode.",
    connections: [
      "Power Supply (+) ──> Ammeter (mA) In",
      "Ammeter Out ──> 330Ω Series Resistor",
      "330Ω Resistor ──> Diode Anode",
      "Diode Cathode (Banded end) ──> Power Supply (-)",
      "Voltmeter across Diode Anode (+) and Cathode (-)"
    ],
    procedure: [
      "Assemble forward bias circuit with 1N4007 diode and 330Ω current limiting resistor.",
      "Gradually increase power supply voltage in small steps (0.1V, 0.2V, 0.4V, 0.5V, 0.6V, 0.65V, 0.7V, 0.75V, 0.8V).",
      "Record diode voltage Vd and circuit current Id at each step.",
      "Notice that between 0.0V and 0.5V, Id is virtually 0.00 mA.",
      "Above 0.65V, current shoots up rapidly while diode voltage clamps near 0.72V.",
      "Reverse the diode connections to test reverse bias up to 10V; observe 0.00 mA current."
    ],
    codeSnippet: `// Sample Forward Bias Data:
// Vd (V)   | Id (mA)
// 0.20V    | 0.00 mA
// 0.40V    | 0.01 mA
// 0.55V    | 0.15 mA
// 0.62V    | 1.20 mA  (Cut-in Knee point)
// 0.68V    | 8.50 mA
// 0.72V    | 18.2 mA`,
    expectedOutput: "An exponential forward curve showing zero conduction below 0.6V and sharp vertical conduction above 0.7V.",
    observation: "Cut-in barrier potential is determined to be ~0.62V. Once forward-biased, the diode voltage drop remains nearly constant at ~0.7V even as current increases significantly.",
    result: "Demonstrated non-linear semiconductor conduction and experimentally determined silicon diode cut-in voltage Vγ ≈ 0.65V.",
    troubleshooting: [
      {
        issue: "Circuit draws high current even below 0.5V",
        cause: "Diode is defective (shorted internal junction) or resistor connected incorrectly.",
        solution: "Test diode with DMM Diode Check mode; should read ~0.6V one way and 'OL' the other."
      }
    ],
    safetyNotes: ["Never apply voltage directly across a forward-biased diode without a series resistor."],
    related: {
      videoId: "vid-diodes-explained",
      quizId: "quiz-semiconductors",
      projectId: "energy-monitor",
      componentIds: ["diode-1n4007", "resistor"]
    }
  },
  {
    id: "transistor-switch",
    title: "Experiment 06: BJT Transistor as a Digital Switch",
    category: "ANALOG ELECTRONICS",
    difficulty: "INTERMEDIATE",
    estimatedTime: "30 Mins",
    objective: "Configure an NPN Bipolar Junction Transistor (BC547) in cutoff and saturation states to switch a 12V / 50mA relay or LED load from a low-current digital signal.",
    theory: "A BJT operates in three distinct regions: Cutoff, Active, and Saturation. As a digital switch, only Cutoff and Saturation are used. In Cutoff (Vin < 0.6V), base current Ib = 0, no collector current flows (Ic = 0), and the transistor behaves as an OPEN switch (Vce = Vcc). In Saturation (Ib >= Ic / 10), the collector-emitter voltage collapses to Vce(sat) ≈ 0.1V - 0.2V, acting as a CLOSED switch connecting the load to ground.",
    requiredComponents: [
      { name: "BC547 NPN Transistor", qty: "1" },
      { name: "1kΩ Resistor (Base resistor Rb)", qty: "1" },
      { name: "220Ω Resistor + Red LED (Collector load)", qty: "1" },
      { name: "Pushbutton or 5V logic source", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["5V DC Power Supply", "Digital Multimeter"],
    circuitDiagramDesc: "5V -> 220Ω Resistor -> LED Anode -> LED Cathode -> BC547 Collector. BC547 Emitter -> GND. Base connects through 1kΩ resistor to 5V control signal (or Arduino GPIO).",
    connections: [
      "5V DC ──> 220Ω Resistor ──> LED Anode",
      "LED Cathode ──> BC547 Collector (Pin 1)",
      "Control Signal (5V / 0V) ──> 1kΩ Resistor ──> BC547 Base (Pin 2)",
      "BC547 Emitter (Pin 3) ──> Circuit GND"
    ],
    procedure: [
      "Insert the BC547 transistor into breadboard with flat face pointing forward (Collector = Pin 1 Left, Base = Pin 2 Center, Emitter = Pin 3 Right).",
      "Connect Emitter directly to GND.",
      "Connect LED Cathode to Collector; connect LED Anode through 220Ω resistor to +5V.",
      "Connect 1kΩ resistor to Base.",
      "When Base resistor is connected to GND (0V): Measure Vce. LED is OFF, Vce ≈ 5.0V (Cutoff).",
      "When Base resistor is connected to +5V: Measure Vce. LED turns bright ON, Vce drops to ~0.15V (Saturation)."
    ],
    codeSnippet: `// Demonstration with Arduino GPIO 8
const int SWITCH_PIN = 8;

void setup() {
  pinMode(SWITCH_PIN, OUTPUT);
}

void loop() {
  digitalWrite(SWITCH_PIN, HIGH); // Base biased -> Transistor ON
  delay(2000);
  digitalWrite(SWITCH_PIN, LOW);  // Base 0V -> Transistor OFF
  delay(2000);
}`,
    expectedOutput: "A tiny 4.3mA base signal reliably switches a 20mA LED load ON and OFF, demonstrating digital current amplification and switching.",
    observation: "In saturation, Vbe is ~0.75V, and Vce is 0.12V. Base current is Ib = (5V - 0.75V)/1000Ω = 4.25 mA. Collector current is Ic = (5V - 2V - 0.12V)/220Ω = 13.1 mA. Transistor remains cool.",
    result: "Verified the cutoff and saturation operation of an NPN BJT as a low-side solid-state switch.",
    troubleshooting: [
      {
        issue: "Transistor gets hot and LED stays dimly on",
        cause: "Base resistor omitted or collector and emitter swapped.",
        solution: "Ensure 1kΩ base resistor is present and verify BC547 pinout: C-B-E from left to right."
      }
    ],
    safetyNotes: ["Never connect base directly to 5V without a series current-limiting resistor."],
    related: {
      videoId: "vid-transistor-basics",
      quizId: "quiz-transistor-circuits",
      projectId: "auto-street-light",
      componentIds: ["bjt-bc547", "resistor", "led"]
    }
  },
  {
    id: "ldr-auto-light",
    title: "Experiment 07: Automatic Night Light with LDR & Transistor",
    category: "ANALOG ELECTRONICS",
    difficulty: "INTERMEDIATE",
    estimatedTime: "30 Mins",
    objective: "Design and build an autonomous automatic night light that switches on a high-brightness LED when ambient light drops below a calibrated threshold.",
    theory: "A Light Dependent Resistor (LDR) exhibits high resistance in darkness (~1 MΩ) and low resistance under bright illumination (~1 kΩ). By wiring the LDR in a voltage divider network with a 10kΩ potentiometer and feeding the midpoint into the base of a BC547 NPN transistor, the base voltage rises above 0.7V only when ambient light drops, turning the transistor ON and illuminating the LED.",
    requiredComponents: [
      { name: "LDR (Photoresistor)", qty: "1" },
      { name: "BC547 NPN Transistor", qty: "1" },
      { name: "10kΩ Potentiometer (Sensitivity trimmer)", qty: "1" },
      { name: "1kΩ Fixed Resistor", qty: "1" },
      { name: "220Ω Resistor + White LED", qty: "1" },
      { name: "Breadboard & 9V / 5V Supply", qty: "1" }
    ],
    requiredEquipment: ["Digital Multimeter", "Small card/cloth to cover LDR"],
    circuitDiagramDesc: "5V -> 10k Potentiometer -> Node A. Node A -> LDR -> GND. Node A connects through 1k resistor to BC547 Base. BC547 Emitter to GND. BC547 Collector connects through White LED + 220Ω resistor to 5V.",
    connections: [
      "5V DC ──> 10k Potentiometer Terminal 1",
      "Potentiometer Wiper ──> Node A (Base Divider)",
      "Node A ──> LDR Lead 1",
      "LDR Lead 2 ──> GND",
      "Node A ──> 1kΩ Resistor ──> BC547 Base",
      "BC547 Emitter ──> GND",
      "5V DC ──> 220Ω Resistor ──> White LED Anode",
      "White LED Cathode ──> BC547 Collector"
    ],
    procedure: [
      "Assemble the potential divider consisting of the 10k pot (upper arm) and LDR (lower arm to ground).",
      "Feed the divider midpoint into BC547 base via 1kΩ protection resistor.",
      "Power the circuit with 5V DC.",
      "In room lighting, adjust the 10k pot until the White LED just turns completely OFF.",
      "Cover the LDR with your palm to simulate night; observe the White LED snap brightly ON.",
      "Measure base voltage Vb in light (Vb < 0.5V) vs darkness (Vb > 0.75V)."
    ],
    codeSnippet: `// Pure analog circuit - Zero microcontroller programming needed!
// Working Principle:
// Daylight:  R_ldr ≈ 2kΩ -> V_base = 5V * (2k / (10k + 2k)) = 0.83V -> adjusted to 0.5V -> BJT OFF
// Darkness:  R_ldr ≈ 500kΩ -> V_base = 5V * (500k / (10k + 500k)) = 4.9V -> BJT fully ON`,
    expectedOutput: "The White LED turns on automatically whenever darkness falls over the sensor and shuts off automatically in room illumination.",
    observation: "Varying the 10k potentiometer changes the light threshold sensitivity, allowing calibration for evening twilight versus pitch darkness.",
    result: "Successfully built an analog daylight sensor switch implementing automatic energy-efficient lighting.",
    troubleshooting: [
      {
        issue: "LED stays ON continuously regardless of light",
        cause: "Potentiometer set to minimum resistance or LDR disconnected.",
        solution: "Adjust potentiometer wiper toward higher resistance."
      }
    ],
    safetyNotes: ["Position the LED so its light does not shine directly back onto the LDR to prevent optical feedback oscillation."],
    related: {
      videoId: "vid-ldr-sensor-tutorial",
      quizId: "quiz-sensors",
      projectId: "auto-street-light",
      componentIds: ["sensor-ldr", "bjt-bc547", "led"]
    }
  },
  {
    id: "ir-obstacle",
    title: "Experiment 08: Infrared (IR) Proximity & Obstacle Detection",
    category: "SENSORS & ROBOTICS",
    difficulty: "INTERMEDIATE",
    estimatedTime: "25 Mins",
    objective: "Understand infrared reflection physics and interface an active IR obstacle sensor module with digital logic and microcontrollers.",
    theory: "An active IR obstacle sensor consists of an IR emitting diode and an IR photodiode receiver. The IR LED continuously emits invisible 950nm infrared light. When an obstacle approaches within range, reflected infrared energy strikes the photodiode, decreasing its reverse resistance. An onboard LM393 voltage comparator compares the photodiode signal against a threshold preset by a trimmer potentiometer, outputting an active LOW (0V) digital trigger.",
    requiredComponents: [
      { name: "IR Proximity Sensor Module (LM393 based)", qty: "1" },
      { name: "Arduino Uno", qty: "1" },
      { name: "5mm Red LED + 220Ω Resistor", qty: "1" },
      { name: "Piezo Buzzer", qty: "1" },
      { name: "Jumper Wires", qty: "5" }
    ],
    requiredEquipment: ["PC with Arduino IDE", "Reflective obstacle (white cardboard / hand)"],
    circuitDiagramDesc: "IR Module VCC to 5V, GND to GND, OUT to Arduino Digital Pin 2. Arduino Pin 13 to LED Anode. Pin 12 to Buzzer (+). LED & Buzzer (-) to GND.",
    connections: [
      "IR Module VCC ──> Arduino 5V",
      "IR Module GND ──> Arduino GND",
      "IR Module OUT ──> Arduino Pin 2",
      "Arduino Pin 13 ──> 220Ω Resistor ──> LED (+) ──> GND",
      "Arduino Pin 12 ──> Piezo Buzzer (+) ──> GND"
    ],
    procedure: [
      "Connect the 3 pins of the IR module (VCC, GND, OUT) to the Arduino.",
      "Turn the module's onboard trimmer potentiometer until the onboard green indicator LED turns off.",
      "Bring your hand within 5cm - 15cm of the IR diodes; observe the green indicator illuminate.",
      "Upload the Arduino sketch to sound the buzzer and light Pin 13 whenever an obstacle is detected.",
      "Test detection distances with white paper (high reflection) versus black matte paper (high absorption)."
    ],
    codeSnippet: `// NextGen Education - Lab 08: IR Obstacle Detection
const int IR_PIN = 2;
const int LED_PIN = 13;
const int BUZZER_PIN = 12;

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int detected = digitalRead(IR_PIN);
  if (detected == LOW) { // Active LOW sensor
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);
    Serial.println("Obstacle Detected!");
  } else {
    digitalWrite(LED_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
  }
  delay(50);
}`,
    expectedOutput: "Immediate audio-visual alert within 5ms whenever an obstacle moves within the sensor's calibrated detection cone.",
    observation: "White surfaces are detected at up to 18cm, whereas matte black surfaces are detected only at 3cm due to infrared photon absorption.",
    result: "Verified active optical reflection sensing and configured an immediate proximity alarm circuit.",
    troubleshooting: [
      {
        issue: "Module detects continuously even with no obstacle",
        cause: "Potentiometer sensitivity tuned too high or direct incandescent sunlight hitting photodiode.",
        solution: "Rotate potentiometer counter-clockwise to lower sensitivity."
      }
    ],
    safetyNotes: ["Avoid direct prolonged exposure to high-power industrial infrared emitters."],
    related: {
      videoId: "vid-ir-obstacle-sensor",
      quizId: "quiz-sensors",
      projectId: "obstacle-robot",
      componentIds: ["arduino-uno", "sensor-ldr", "bjt-bc547"]
    }
  },
  {
    id: "ultrasonic-distance",
    title: "Experiment 09: Ultrasonic Distance Measurement with HC-SR04",
    category: "SENSORS & ROBOTICS",
    difficulty: "INTERMEDIATE",
    estimatedTime: "30 Mins",
    objective: "Implement precision non-contact acoustic distance measurement from 2cm to 300cm using ultrasonic flight-time calculations.",
    theory: "Sound waves travel through ambient air at approximately 343 meters per second at 20°C (0.0343 cm/µs). The HC-SR04 sensor transmits an 8-cycle sonic burst at 40 kHz. The sound reflects off the target and returns to the receiver. The ECHO pin outputs a HIGH pulse whose duration (T) in microseconds represents total round-trip travel time. Distance D = (Time * Speed of Sound) / 2 = (T * 0.0343) / 2 = T / 58.3 cm.",
    requiredComponents: [
      { name: "HC-SR04 Ultrasonic Sensor", qty: "1" },
      { name: "Arduino Uno", qty: "1" },
      { name: "I2C 16x2 LCD Display (Optional)", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["PC with Arduino IDE", "Ruler / Measuring tape (30cm or 1m)"],
    circuitDiagramDesc: "HC-SR04 VCC -> 5V, GND -> GND, TRIG -> Arduino Pin 9, ECHO -> Arduino Pin 10.",
    connections: [
      "HC-SR04 VCC ──> Arduino 5V",
      "HC-SR04 GND ──> Arduino GND",
      "HC-SR04 TRIG ──> Arduino Pin 9",
      "HC-SR04 ECHO ──> Arduino Pin 10"
    ],
    procedure: [
      "Mount HC-SR04 on breadboard with transducers facing unobstructed space.",
      "Wire VCC, GND, TRIG, and ECHO to Arduino.",
      "Upload the sketch, open Serial Monitor at 9600 baud.",
      "Place a flat cardboard box at known distances: 10cm, 20cm, 30cm, 50cm.",
      "Compare displayed distance against physical measuring ruler.",
      "Calculate measurement error percentage: Error (%) = (|Measured - Actual| / Actual) * 100."
    ],
    codeSnippet: `// NextGen Education - Lab 09: HC-SR04 Ultrasonic Ranging
const int TRIG_PIN = 9;
const int ECHO_PIN = 10;

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  float distanceCm = (duration * 0.0343) / 2.0;

  if (duration == 0) {
    Serial.println("Out of range (>400cm)");
  } else {
    Serial.print("Distance: ");
    Serial.print(distanceCm, 1);
    Serial.println(" cm");
  }
  delay(200);
}`,
    expectedOutput: "Serial monitor reports stable distance updates every 200ms accurate within ±3mm.",
    observation: "Flat hard surfaces produce extremely stable readings. Soft fabrics (cotton towel) attenuate acoustic reflections, degrading accuracy.",
    result: "Validated acoustic time-of-flight equation and achieved 3mm distance resolution across a 2cm to 250cm test envelope.",
    troubleshooting: [
      {
        issue: "Serial monitor constantly prints 0.0 cm or 'Out of range'",
        cause: "ECHO and TRIG wires swapped or loose connection.",
        solution: "Double-check: TRIG to Pin 9, ECHO to Pin 10."
      }
    ],
    safetyNotes: ["Never place hands directly inside high-voltage acoustic transducers."],
    related: {
      videoId: "vid-ultrasonic-hc-sr04",
      quizId: "quiz-sensors",
      projectId: "smart-dustbin",
      componentIds: ["sensor-ultrasonic", "arduino-uno", "display-lcd1602"]
    }
  },
  {
    id: "temperature-measurement",
    title: "Experiment 10: Ambient Temperature & Humidity with DHT11",
    category: "SENSORS & EMBEDDED",
    difficulty: "INTERMEDIATE",
    estimatedTime: "25 Mins",
    objective: "Interface a digital composite humidity and temperature sensor with single-bus communication protocol and extract environmental telemetry.",
    theory: "The DHT11 utilizes a capacitive humidity sensing element and a thermistor to measure surrounding air, outputting a digital signal on the data pin. To start communication, the MCU pulls the data bus LOW for at least 18ms, then pulls it HIGH. The DHT11 responds with an 80µs LOW followed by 80µs HIGH, then streams 40 bits containing relative humidity (16 bits), temperature (16 bits), and an 8-bit error-checking checksum.",
    requiredComponents: [
      { name: "DHT11 Sensor Module", qty: "1" },
      { name: "Arduino Uno or ESP32", qty: "1" },
      { name: "4.7kΩ - 10kΩ Pull-up Resistor", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["PC with Arduino IDE & DHT library installed"],
    circuitDiagramDesc: "DHT11 Pin 1 (VCC) to 5V. Pin 4 (GND) to GND. Pin 2 (DATA) to Arduino Pin 2 with a 10kΩ pull-up resistor to 5V rail.",
    connections: [
      "DHT11 VCC ──> Arduino 5V",
      "DHT11 GND ──> Arduino GND",
      "DHT11 DATA ──> Arduino Digital Pin 2",
      "10kΩ Pull-Up Resistor between DHT11 VCC and DATA"
    ],
    procedure: [
      "Install the 'DHT sensor library by Adafruit' via Arduino Library Manager.",
      "Wire the DHT11 module to Arduino 5V, GND, and Pin 2.",
      "Upload the sketch and open Serial Monitor at 9600 baud.",
      "Observe temperature (°C) and relative humidity (%) readings updating every 2 seconds.",
      "Gently blow warm breath across the sensor; observe humidity and temperature spike instantaneously.",
      "Verify checksum validation in the library prevents corrupt data packets."
    ],
    codeSnippet: `// NextGen Education - Lab 10: DHT11 Environmental Sensing
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000); // 2 second sampling interval
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(h, 1);
  Serial.print(" % | Temp: ");
  Serial.print(t, 1);
  Serial.println(" *C");
}`,
    expectedOutput: "Serial monitor displays clear telemetry: 'Humidity: 54.0 % | Temp: 26.5 *C' every 2000ms.",
    observation: "Blowing on the sensor causes humidity to surge from 50% to over 85% within 3 seconds, demonstrating rapid moisture absorption of the polymer dielectric.",
    result: "Successfully acquired calibrated digital environmental data over a single-wire digital bus.",
    troubleshooting: [
      {
        issue: "Serial monitor displays 'Failed to read from DHT sensor!'",
        cause: "Missing pull-up resistor on bare sensor or sampling too fast (<2s).",
        solution: "Add 10kΩ resistor between DATA and VCC; increase delay to 2500ms."
      }
    ],
    safetyNotes: ["Do not expose DHT11 to direct liquids, boiling water, or organic solvent vapors."],
    related: {
      videoId: "vid-dht11-esp32",
      quizId: "quiz-sensors",
      projectId: "iot-weather-station",
      componentIds: ["sensor-dht11", "arduino-uno", "esp32-wroom"]
    }
  },
  {
    id: "servo-control",
    title: "Experiment 11: Angular Servo Motor Position Control (0° to 180°)",
    category: "ROBOTICS & EMBEDDED",
    difficulty: "INTERMEDIATE",
    estimatedTime: "25 Mins",
    objective: "Control the precise shaft angular position of an SG90 micro servo motor using 50 Hz PWM control pulses and a potentiometer.",
    theory: "An RC servo motor contains a DC motor, reduction gearbox, potentiometer feedback shaft, and an internal error amplifier. Unlike standard PWM where duty cycle alters speed, servo motors use Pulse Position Modulation (PPM) at a fixed 50 Hz frequency (20ms period). Pulse width determines angular position: 1.0 ms pulse = 0° (extreme left), 1.5 ms pulse = 90° (neutral center), 2.0 ms pulse = 180° (extreme right).",
    requiredComponents: [
      { name: "TowerPro SG90 9g Micro Servo", qty: "1" },
      { name: "10kΩ Potentiometer", qty: "1" },
      { name: "Arduino Uno", qty: "1" },
      { name: "External 5V 1A Power Source / USB", qty: "1" }
    ],
    requiredEquipment: ["PC with Arduino IDE", "Servo horn accessory"],
    circuitDiagramDesc: "Servo Brown/Black wire to GND. Red wire to 5V. Orange/Yellow wire to Arduino Pin 9. 10k Potentiometer across 5V and GND with Wiper to A0.",
    connections: [
      "Servo Brown / Black Lead ──> Arduino GND",
      "Servo Red Lead ──> Arduino 5V (or external 5V rail)",
      "Servo Orange / Yellow Lead ──> Arduino Pin 9",
      "Potentiometer Wiper ──> Arduino Analog Pin A0"
    ],
    procedure: [
      "Attach a plastic single-arm servo horn onto the spline shaft.",
      "Connect the 3 servo leads: GND (Brown), 5V (Red), Signal (Orange to Pin 9).",
      "Connect the 10k potentiometer to Analog Pin A0.",
      "Upload the sketch using the standard `<Servo.h>` library.",
      "Rotate the potentiometer knob; observe the servo arm rotate synchronously in real-time.",
      "Observe that the servo holds torque at whichever angle it is positioned."
    ],
    codeSnippet: `// NextGen Education - Lab 11: Servo Position Control
#include <Servo.h>

Servo myServo;
const int POT_PIN = A0;

void setup() {
  myServo.attach(9); // Attach servo signal to pin 9
}

void loop() {
  int potVal = analogRead(POT_PIN);            // 0 - 1023
  int angle = map(potVal, 0, 1023, 0, 180);    // 0 - 180 degrees
  myServo.write(angle);                        // Send position
  delay(15);
}`,
    expectedOutput: "The servo horn precisely tracks potentiometer rotation from 0° to 180° with high holding torque.",
    observation: "When holding a position under mechanical resistance, the servo motor hums slightly as the internal closed-loop feedback motor draws current to counter the external torque.",
    result: "Demonstrated closed-loop positional servomechanism control through 50 Hz pulse-width positioning signals.",
    troubleshooting: [
      {
        issue: "Arduino resets or freezes whenever servo moves",
        cause: "Servo inrush stall current (>500mA) causes a voltage sag on the Arduino 5V rail.",
        solution: "Power the servo from an external 5V 1A power supply, connecting external ground to Arduino ground."
      }
    ],
    safetyNotes: ["Do not force the servo horn past mechanical stop limits (beyond 0° or 180°) to prevent gear stripping."],
    related: {
      videoId: "vid-servo-motor-arduino",
      quizId: "quiz-microcontrollers",
      projectId: "smart-dustbin",
      componentIds: ["arduino-uno", "potentiometer"]
    }
  },
  {
    id: "dc-motor-control",
    title: "Experiment 12: Bi-directional DC Motor Speed & Direction with L293D",
    category: "ROBOTICS & EMBEDDED",
    difficulty: "INTERMEDIATE",
    estimatedTime: "35 Mins",
    objective: "Interface an H-bridge driver IC (L293D) to achieve bi-directional direction switching and PWM speed control of a DC gearmotor.",
    theory: "A DC motor spins in the direction dictated by polarity across its terminals. Reversing terminal polarity reverses rotation. An H-Bridge comprises 4 electronic switches configured in an 'H' formation around the motor. Closing switches S1 & S4 spins the motor forward. Closing switches S2 & S3 spins it in reverse. Closing S1 & S2 simultaneously would create a dangerous short circuit ('shoot-through'). The L293D IC encapsulates two complete H-bridges with internal logic interlocks and freewheeling clamp diodes.",
    requiredComponents: [
      { name: "L293D Motor Driver IC", qty: "1" },
      { name: "5V - 9V DC Gearmotor (BO Motor)", qty: "1" },
      { name: "Arduino Uno", qty: "1" },
      { name: "External 9V Battery or DC Supply", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["PC with Arduino IDE", "Tachometer / visual marker on motor shaft"],
    circuitDiagramDesc: "L293D Pin 16 (VCC1) to Arduino 5V. Pin 8 (VCC2) to External 9V Battery (+). Pins 4, 5, 12, 13 to Common GND. Pin 1 (EN1) to Arduino Pin 5 (PWM). Pin 2 (IN1) to Pin 3. Pin 7 (IN2) to Pin 4. Motor connected between Pin 3 (OUT1) and Pin 6 (OUT2).",
    connections: [
      "L293D Pin 16 (VCC1 Logic) ──> Arduino 5V",
      "L293D Pin 8 (VCC2 Motor) ──> 9V External Battery (+)",
      "L293D Pins 4, 5, 12, 13 ──> Common GND (Battery (-) and Arduino GND)",
      "L293D Pin 1 (1,2EN) ──> Arduino Pin 5 (PWM)",
      "L293D Pin 2 (1A) ──> Arduino Pin 3",
      "L293D Pin 7 (2A) ──> Arduino Pin 4",
      "L293D Pin 3 (1Y) & Pin 6 (2Y) ──> DC Motor Terminals"
    ],
    procedure: [
      "Insert L293D across breadboard center trough.",
      "Tie all ground pins together and connect to both Arduino GND and external power GND.",
      "Wire logic power (Pin 16 to 5V) and motor power (Pin 8 to 9V battery).",
      "Connect motor terminals to OUT1 and OUT2.",
      "Upload test sketch that cycles motor: Forward 2 seconds -> Stop -> Reverse 2 seconds -> Ramp speed from 0 to 255.",
      "Observe direction reversal and smooth speed regulation."
    ],
    codeSnippet: `// NextGen Education - Lab 12: L293D Motor Control
const int EN1 = 5;  // PWM speed
const int IN1 = 3;  // Direction
const int IN2 = 4;  // Direction

void setup() {
  pinMode(EN1, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

void loop() {
  // Rotate Clockwise at 75% speed
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(EN1, 190);
  delay(3000);

  // Stop / Brake
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  delay(1000);

  // Rotate Counter-Clockwise at full speed
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(EN1, 255);
  delay(3000);
}`,
    expectedOutput: "The DC motor executes continuous cycles of forward rotation, braking stop, reverse rotation, and speed modulation.",
    observation: "At low PWM values (<60 on analogWrite), the motor hums but cannot start moving due to static gearbox friction. Once above threshold, speed scales linearly.",
    result: "Verified H-bridge operation and implemented dual-direction PWM DC motor control.",
    troubleshooting: [
      {
        issue: "Motor does not turn at all",
        cause: "Missing common ground between external battery and Arduino.",
        solution: "Connect the battery negative terminal to the Arduino GND pin."
      }
    ],
    safetyNotes: ["Never supply motor power from the Arduino 5V pin; high inductive noise and stall currents can destroy the microcontroller."],
    related: {
      videoId: "vid-l293d-motor-driver",
      quizId: "quiz-microcontrollers",
      projectId: "obstacle-robot",
      componentIds: ["ic-l293d", "arduino-uno", "mosfet-irfz44n"]
    }
  },
  {
    id: "relay-control",
    title: "Experiment 13: High-Voltage AC Load Control via 5V Relay Module",
    category: "EMBEDDED & POWER",
    difficulty: "ADVANCED",
    estimatedTime: "30 Mins",
    objective: "Safely interface an optoisolated 5V electromechanical relay with a microcontroller to switch higher-voltage AC or DC electrical loads.",
    theory: "Microcontroller GPIO pins operate at 3.3V or 5V with a maximum current of 20mA, making direct control of 230V AC home appliances or 12V DC solenoids impossible. A relay module bridges this gap using an optocoupler (phototransistor barrier) to isolate sensitive digital electronics from electrical noise and voltage spikes, while an electromagnetic coil physically moves mechanical switch contacts rated up to 250V AC @ 10A.",
    requiredComponents: [
      { name: "5V Relay Module with Optocoupler", qty: "1" },
      { name: "Arduino Uno", qty: "1" },
      { name: "12V DC Lamp or 5V Test Bulb", qty: "1" },
      { name: "External 12V DC Power Supply", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["PC with Arduino IDE", "Insulated screwdriver for screw terminals"],
    circuitDiagramDesc: "Relay VCC to 5V, GND to GND, IN1 to Arduino Pin 7. External 12V (+) connects to Relay COM. Relay NO connects to Lamp (+). Lamp (-) returns to External 12V (-).",
    connections: [
      "Relay Module VCC ──> Arduino 5V",
      "Relay Module GND ──> Arduino GND",
      "Relay Module IN1 ──> Arduino Pin 7",
      "12V Power (+) ──> Relay COM (Common) Terminal",
      "Relay NO (Normally Open) Terminal ──> Lamp (+)",
      "Lamp (-) ──> 12V Power (-)"
    ],
    procedure: [
      "Connect VCC, GND, and IN1 from the relay module to the Arduino.",
      "Upload the relay test sketch (switches every 3 seconds).",
      "Listen for the distinctive mechanical 'click' sound of the relay armature every 3 seconds.",
      "Notice the onboard red indicator LED turns on when the relay is energized.",
      "De-energize circuit, wire the external 12V lamp circuit through COM and NO screw terminals.",
      "Power up the 12V supply; observe the lamp turn on and off synchronized with the clicks."
    ],
    codeSnippet: `// NextGen Education - Lab 13: Relay Module Control
const int RELAY_PIN = 7;

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Relay modules are typically ACTIVE-LOW
}

void loop() {
  digitalWrite(RELAY_PIN, LOW);  // Turn Relay ON
  delay(3000);
  digitalWrite(RELAY_PIN, HIGH); // Turn Relay OFF
  delay(3000);
}`,
    expectedOutput: "The relay contacts click authoritatively every 3 seconds, reliably switching the high-current external lamp without electrical disruption to the Arduino.",
    observation: "Multimeter continuity check confirms zero resistance between COM and NO when IN1 is LOW, and infinite resistance when IN1 is HIGH.",
    result: "Demonstrated galvanic optical isolation and reliable high-current load actuation using an electromechanical relay module.",
    troubleshooting: [
      {
        issue: "Relay logic is reversed (turns on when code says OFF)",
        cause: "Optocoupler relay boards use active-LOW input logic.",
        solution: "Write LOW to activate relay, and HIGH to deactivate relay."
      }
    ],
    safetyNotes: [
      "CAUTION: If working with 230V AC mains electricity, always ensure the power cord is UNPLUGGED before touching any terminal screws.",
      "Have an instructor or lab assistant inspect all AC mains connections before powering on."
    ],
    related: {
      videoId: "vid-relay-module-arduino",
      quizId: "quiz-power-supplies",
      projectId: "smart-home-automation",
      componentIds: ["relay-module", "bjt-bc547", "arduino-uno"]
    }
  },
  {
    id: "esp32-telemetry",
    title: "Experiment 14: ESP32 Real-Time Sensor Telemetry & Web Server",
    category: "IoT & WIRELESS",
    difficulty: "ADVANCED",
    estimatedTime: "40 Mins",
    objective: "Host an asynchronous HTTP web server on an ESP32 microcontroller to display live interactive sensor readings over a local Wi-Fi network without external cloud dependence.",
    theory: "The ESP32 features integrated 2.4 GHz 802.11 b/g/n Wi-Fi baseband and dual 32-bit Xtensa cores. It can operate in Station (STA) mode (connecting to an existing Wi-Fi router) or Access Point (AP) mode (creating its own Wi-Fi network). By instantiating a lightweight HTTP web server, the ESP32 serves HTML/CSS/JavaScript web pages directly from its flash memory and streams dynamic JSON sensor telemetry to connected mobile browsers.",
    requiredComponents: [
      { name: "ESP32-WROOM-32 Dev Board", qty: "1" },
      { name: "DHT11 or LDR Sensor", qty: "1" },
      { name: "Micro-USB or Type-C Cable", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["PC with Arduino IDE & ESP32 Board package", "Smartphone with Wi-Fi"],
    circuitDiagramDesc: "LDR connected to ESP32 ADC pin GPIO 34 through 10kΩ voltage divider. Onboard blue LED on GPIO 2.",
    connections: [
      "3.3V ──> 10kΩ Resistor ──> GPIO 34",
      "GPIO 34 ──> LDR ──> GND",
      "ESP32 connected via USB cable to PC"
    ],
    procedure: [
      "Install ESP32 board package in Arduino IDE.",
      "Enter your local Wi-Fi SSID and Password in the sketch credentials.",
      "Upload the sketch, open Serial Monitor at 115200 baud, and press the EN button on the ESP32.",
      "Copy the local IP address printed by the ESP32 (e.g. 192.168.1.145).",
      "Open any browser on your smartphone connected to the same Wi-Fi network.",
      "Type the IP address into the address bar to view the live NextGen telemetry dashboard.",
      "Cover the LDR; observe the web browser gauge update automatically."
    ],
    codeSnippet: `// NextGen Education - Lab 14: ESP32 Local Web Server
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int SENSOR_PIN = 34;

void handleRoot() {
  int sensorVal = analogRead(SENSOR_PIN);
  String html = "<html><head><meta http-equiv='refresh' content='2'>";
  html += "<style>body{font-family:sans-serif;background:#0f172a;color:#fff;text-align:center;padding:50px;}";
  html += ".card{background:#1e293b;border-radius:12px;padding:30px;display:inline-block;}";
  html += "h1{color:#38bdf8;} .val{font-size:48px;color:#4ade80;}</style></head><body>";
  html += "<div class='card'><h1>NextGen Sensor Telemetry</h1>";
  html += "<div class='val'>" + String(sensorVal) + "</div><p>ADC Raw Reading (0-4095)</p></div></body></html>";
  server.send(200, "text/html", html);
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("");
  Serial.print("ESP32 Web Server IP: ");
  Serial.println(WiFi.localIP());
  server.on("/", handleRoot);
  server.begin();
}

void loop() {
  server.handleClient();
}`,
    expectedOutput: "A responsive, modern web page displaying live sensor readings updates automatically every 2 seconds when accessed from any smartphone or tablet on the local network.",
    observation: "ESP32 handles simultaneous HTTP GET requests in ~12 milliseconds without blocking ongoing analog ADC conversions.",
    result: "Engineered an embedded IoT web server streaming local sensor telemetry across Wi-Fi.",
    troubleshooting: [
      {
        issue: "Serial monitor shows dots '.....' forever and never connects",
        cause: "Incorrect Wi-Fi SSID or password, or connecting to a 5 GHz only network (ESP32 supports 2.4 GHz only).",
        solution: "Verify Wi-Fi credentials and ensure router broadcasts 2.4 GHz band."
      }
    ],
    safetyNotes: ["Never power the ESP32 with voltages greater than 3.6V directly on the 3V3 pin."],
    related: {
      videoId: "vid-esp32-firebase-tutorial",
      quizId: "quiz-iot-embedded",
      projectId: "iot-weather-station",
      componentIds: ["esp32-wroom", "sensor-ldr", "sensor-dht11"]
    }
  },
  {
    id: "iot-cloud-monitoring",
    title: "Experiment 15: Cloud IoT Sensor Monitoring with Firebase / MQTT",
    category: "IoT & WIRELESS",
    difficulty: "ADVANCED",
    estimatedTime: "45 Mins",
    objective: "Stream real-time sensor measurements from an edge microcontroller into Google Firebase Cloud Firestore and trigger automated notifications.",
    theory: "Cloud IoT architectures decouple edge physical sensor nodes from remote client user interfaces using cloud publish/subscribe brokers or real-time document databases. An edge microcontroller formats local sensor samples into JSON payloads and transmits them via secure TLS over HTTPS or MQTT. Google Firebase stores the data in a real-time document store, pushing instant reactive updates to web dashboards anywhere in the world.",
    requiredComponents: [
      { name: "ESP32 Development Board", qty: "1" },
      { name: "DHT11 / DHT22 Sensor", qty: "1" },
      { name: "Micro-USB Cable", qty: "1" },
      { name: "Breadboard & Wires", qty: "1 set" }
    ],
    requiredEquipment: ["PC with Internet connection", "Google Firebase Account & NextGen Education Dashboard"],
    circuitDiagramDesc: "DHT11 VCC to 3.3V, GND to GND, DATA to ESP32 GPIO 4 with 10kΩ pull-up resistor to 3.3V.",
    connections: [
      "DHT11 VCC ──> ESP32 3V3",
      "DHT11 GND ──> ESP32 GND",
      "DHT11 DATA ──> ESP32 GPIO 4",
      "10kΩ Pull-up Resistor between ESP32 3V3 and GPIO 4"
    ],
    procedure: [
      "Open `src/firebase/config.js` in the NextGen project to retrieve the Project ID and API Key.",
      "Install the Mobizt Firebase-ESP-Client library in Arduino IDE.",
      "Configure Wi-Fi credentials and Firebase API configuration constants in the code.",
      "Upload the sketch to the ESP32 and open Serial Monitor at 115200 baud.",
      "Observe the ESP32 authenticate with Firebase and push sensor packets every 10 seconds.",
      "Open the NextGen Education web dashboard; observe the live cloud gauges update in real-time."
    ],
    codeSnippet: `// NextGen Education - Lab 15: Cloud IoT Firebase Streaming
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

#define WIFI_SSID "YOUR_WIFI"
#define WIFI_PASSWORD "YOUR_PASSWORD"
#define API_KEY "AIzaSyBMlP-wDPpuoonmfXhCU70LDWPyn_FJLOU"
#define DATABASE_URL "nextgen-education-68702.firebaseio.com"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  float temperature = 25.4; // replace with dht.readTemperature()
  float humidity = 62.0;    // replace with dht.readHumidity()

  if (Firebase.ready()) {
    Firebase.RTDB.setFloat(&fbdo, "/telemetry/temp", temperature);
    Firebase.RTDB.setFloat(&fbdo, "/telemetry/humidity", humidity);
    Serial.println("Pushed to Firebase Cloud successfully!");
  }
  delay(10000);
}`,
    expectedOutput: "Continuous 10-second cloud synchronization where sensor data is instantly accessible globally via the NextGen Education web application.",
    observation: "Average latency from physical event on the sensor to visual render on the NextGen React dashboard is under 250 milliseconds.",
    result: "Completed the end-to-end practical loop: physical sensor -> edge computation -> wireless telemetry -> cloud database -> live frontend dashboard.",
    troubleshooting: [
      {
        issue: "Firebase error: 'Permission denied / unauthenticated'",
        cause: "Database security rules require authentication or read/write tokens.",
        solution: "Update Firebase Realtime Database rules to allow read/write or configure email/password authentication."
      }
    ],
    safetyNotes: ["Never hardcode production admin private master keys directly in public firmware repositories."],
    related: {
      videoId: "vid-esp32-firebase-tutorial",
      quizId: "quiz-iot-embedded",
      projectId: "iot-weather-station",
      componentIds: ["esp32-wroom", "sensor-dht11"]
    }
  }
];
