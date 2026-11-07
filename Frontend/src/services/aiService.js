// NextGen Education - AI Learning Assistant Engine
// Adheres strictly to Section 22-25 guidelines:
// - Never fabricates fake resources; references actual NextGen components, experiments, and projects
// - Follows structured engineering pedagogy: Concept, Components, Connections, Working, Expected Result, Troubleshooting, Safety
// - Zero hardcoded API keys; supports optional student-configured session key for external Gemini LLM calls

import { componentsData } from "../data/componentsData";
import { experimentsData } from "../data/experimentsData";
import { projectsData } from "../data/projectsData";
import { videosData } from "../data/videosData";

// Finds actual NextGen knowledge resources matching user query keywords
export function findRelatedNextGenResources(query) {
  const q = query.toLowerCase();
  
  // Find matching component
  const matchedComponents = componentsData.filter(c => 
    q.includes(c.id.toLowerCase()) || 
    q.includes(c.name.toLowerCase()) ||
    c.tags.some(t => q.includes(t.toLowerCase()))
  );

  // Find matching experiments
  const matchedExperiments = experimentsData.filter(e =>
    q.includes(e.title.toLowerCase()) ||
    q.includes(e.id.toLowerCase()) ||
    e.requiredComponents.some(rc => q.includes(rc.name.toLowerCase()))
  );

  // Find matching projects
  const matchedProjects = projectsData.filter(p =>
    q.includes(p.title.toLowerCase()) ||
    q.includes(p.id.toLowerCase()) ||
    p.componentsList.some(cl => q.includes(cl.name.toLowerCase()))
  );

  // Find matching videos
  const matchedVideos = videosData.filter(v =>
    q.includes(v.title.toLowerCase()) ||
    v.topics.some(t => q.includes(t.toLowerCase()))
  );

  return {
    components: matchedComponents.slice(0, 3),
    experiments: matchedExperiments.slice(0, 3),
    projects: matchedProjects.slice(0, 3),
    videos: matchedVideos.slice(0, 3)
  };
}

// Built-in NextGen Engineering Knowledge Engine
export function generateNextGenAIResponse(userPrompt) {
  const prompt = userPrompt.toLowerCase().trim();
  const related = findRelatedNextGenResources(prompt);

  // Check if query is about ESP32
  if (prompt.includes("esp32")) {
    return {
      text: `### ESP32 Microcontroller: Practical Engineering Guide

**1. Core Concept:**
The ESP32 is a dual-core 32-bit Xtensa microcontroller operating at up to 240 MHz with built-in 2.4 GHz Wi-Fi and Bluetooth 4.2 BLE. It operates strictly at **3.3V logic** (applying 5V directly to GPIOs can destroy the chip).

**2. Key Pinout Rules:**
- **I2C Bus:** Default SDA is GPIO 21, SCL is GPIO 22.
- **Input-Only Pins:** GPIO 34, 35, 36, and 39 cannot output signals and have no internal pull-ups.
- **Strapping Pins:** GPIO 0, 2, 12, and 15 affect boot mode; keep them free during startup.

**3. Common Troubleshooting & Gotchas:**
- *Brown-Out Resets:* When Wi-Fi initiates transmit bursts, the ESP32 can pull 250mA current spikes. Ensure your power supply delivers at least 500mA continuous with a 10µF capacitor near the 3V3 rail.
- *5V Sensor Interfacing:* Always use a resistive voltage divider (e.g. 1kΩ and 2kΩ) or bidirectional logic level shifter before connecting 5V sensors (like HC-SR04 ECHO) to an ESP32 input.

**4. Safety:**
Never supply external voltages exceeding 3.6V to the 3V3 pin.`,
      related
    };
  }

  // Check if query is about Ultrasonic Sensor / HC-SR04
  if (prompt.includes("ultrasonic") || prompt.includes("distance") || prompt.includes("hc-sr04")) {
    return {
      text: `### HC-SR04 Ultrasonic Distance Sensor: Practical Guide

**1. Working Principle:**
The sensor emits an 8-pulse 40 kHz acoustic burst when triggered by a 10µs HIGH pulse on the TRIG pin. It then raises ECHO to HIGH until the reflected sound returns. 
Distance is calculated using the speed of sound in air (343 m/s):
\`\`\`
Distance (cm) = (Duration in microseconds × 0.0343) / 2
\`\`\`

**2. Circuit Connections:**
- **VCC:** Connect to +5.0V DC.
- **GND:** Connect to Common Ground.
- **TRIG:** Connect to any digital output pin (e.g. Arduino Pin 9).
- **ECHO:** Connect to digital input pin (Arduino Pin 10, or through 1k/2k divider for 3.3V ESP32).

**3. Common Errors & Troubleshooting:**
- *Out of Range / 0cm Readings:* Calling \`pulseIn()\` without a timeout can block execution. Use \`pulseIn(ECHO_PIN, HIGH, 30000)\` (30ms timeout).
- *Soft Sound-Absorbing Targets:* Cotton fabrics and thick carpets absorb ultrasound waves, causing missed reflections.

**4. Safety:**
Keep piezoelectric transducers clean and avoid liquid moisture accumulation.`,
      related
    };
  }

  // Check if query is about LDR / Light Sensor / Street Light
  if (prompt.includes("ldr") || prompt.includes("light") || prompt.includes("street light") || prompt.includes("photoresistor")) {
    return {
      text: `### LDR (Light Dependent Resistor) & Daylight Sensing Guide

**1. Working Principle:**
Cadmium Sulfide (CdS) photoresistors decrease resistance as incident lux increases (from ~1 MΩ in total darkness down to ~1 kΩ in bright room light).

**2. Circuit Connections (Voltage Divider):**
Because an LDR is a variable resistor, it must be paired with a fixed resistor (typically 10kΩ) to produce a variable voltage:
\`\`\`
+5V ──> [ LDR ] ──Node A──> [ 10kΩ Resistor ] ──> GND
\`\`\`
- Measure analog voltage at **Node A**. In bright light, Node A voltage rises toward 5V; in darkness, it drops toward 0V.
- Alternatively, swap the LDR and resistor to invert the voltage behavior.

**3. Common Errors & Troubleshooting:**
- *Street Light Flickering / Chattering:* When the street lamp turns on, its own illumination strikes the LDR, tricking it into thinking it's daytime, causing an endless on-off oscillation. Shield the LDR so it faces outward away from its own lamp.
- *Floating Analog Pin:* Never connect an LDR directly to an analog pin without a pull-down or pull-up resistor.`,
      related
    };
  }

  // Check if query is about Transistors / BJT / MOSFET / Switch
  if (prompt.includes("transistor") || prompt.includes("bjt") || prompt.includes("bc547") || prompt.includes("mosfet") || prompt.includes("switch")) {
    return {
      text: `### Solid-State Switching: BJT vs MOSFET Engineering Guide

**1. Fundamental Distinction:**
- **BJT (e.g. BC547):** Current-controlled device. Small base current (Ib) allows larger collector current (Ic). Requires a series base resistor (1kΩ) to prevent blowing the base-emitter diode.
- **MOSFET (e.g. IRFZ44N):** Voltage-controlled device. Gate is an insulated capacitor drawing near-zero DC current. Requires gate voltage (Vgs) above threshold.

**2. Saturated BJT Switch Design:**
To guarantee saturation (Vce ≈ 0.2V):
\`\`\`
Ib = Ic / 10
Rb = (V_control - 0.7V) / Ib
\`\`\`

**3. Common Errors & Troubleshooting:**
- *Floating MOSFET Gate:* If you disconnect the gate wire, stored static charge keeps the MOSFET partially conductive, heating it up until failure. Always install a **10kΩ pull-down resistor** between Gate and Source.
- *Inductive Loads (Relays/Motors):* Always install a 1N4007 flyback diode in reverse-parallel across coils to suppress inductive kickback spikes.`,
      related
    };
  }

  // Check if query is about Relay / AC switching
  if (prompt.includes("relay") || prompt.includes("ac mains") || prompt.includes("home automation")) {
    return {
      text: `### Electromechanical Relay & AC Appliance Control Guide

**1. Optical Isolation & Working Principle:**
A 5V relay module contains an internal optocoupler (e.g. PC817). Microcontroller current lights an internal infrared LED, optically activating a phototransistor that energizes the electromagnetic coil. This provides galvanic isolation between low-voltage digital circuits and deadly 230V AC lines.

**2. Contact Configuration:**
- **COM (Common):** Power entry terminal.
- **NO (Normally Open):** Connects to COM only when relay is actively energized.
- **NC (Normally Closed):** Connected to COM when relay is idle/off.

**3. Critical Safety Rules:**
- **DANGER:** High voltage AC mains can cause lethal electrical shock. Never touch relay screw terminals while power cord is plugged into an electrical outlet.
- Enclose all AC terminal connections inside an insulated junction box.
- Relay modules are typically **Active-LOW** (writing \`digitalWrite(pin, LOW)\` turns the appliance ON).`,
      related
    };
  }

  // General fallback structured engineering response
  return {
    text: `### NextGen Engineering Assistant Analysis

Thank you for your question regarding **"${userPrompt}"**.

Here is a structured engineering breakdown:

**1. Theoretical Concept:**
In electrical and electronics engineering, achieving dependable operation requires treating components as physical devices with parasitics, tolerances, and thermal limits rather than ideal textbook models.

**2. Recommended NextGen Learning Path:**
- Review the fundamentals of voltage division, current limiting, and signal conditioning.
- Verify that supply voltages and logic levels (3.3V vs 5V) match between your controller and transducers.
- Always check that your circuit shares a common ground reference between all power supplies and modules.

**3. Diagnostic & Troubleshooting Checklist:**
- *Power Rails First:* Measure supply voltage under load with a multimeter. Does the voltage sag when active components engage?
- *Signal Integrity:* Check for floating high-impedance inputs by verifying pull-up or pull-down resistors.
- *Inductive Clamping:* Ensure freewheeling flyback diodes are present across any relay or motor coils.

Explore the connected NextGen components, experiments, and projects linked below to dive deeper into practical hands-on implementations!`,
    related
  };
}

// Optional Gemini External API Caller (if student configures their own key in settings)
export async function queryGeminiWithNextGenContext(userPrompt, apiKey) {
  if (!apiKey) {
    return generateNextGenAIResponse(userPrompt);
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const systemInstruction = `You are the Lead Engineering Assistant for NextGen Education (EDI Project).
You teach practical electronics, ECE, IoT, and embedded systems.
Format your answer with clear markdown headings:
1. Concept
2. Components
3. Circuit & Connections
4. Working Principle
5. Expected Output
6. Common Errors & Troubleshooting
7. Safety Precautions
Always emphasize real-world practical advice.`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\nUser Question: ${userPrompt}` }] }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const related = findRelatedNextGenResources(userPrompt);

    return {
      text: candidateText || "Unable to extract response from Gemini API.",
      related
    };
  } catch (err) {
    console.warn("External Gemini API call failed, falling back to NextGen Knowledge Engine:", err);
    return generateNextGenAIResponse(userPrompt);
  }
}
