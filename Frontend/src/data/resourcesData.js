// NextGen Education - Resource Library Dataset
// Contains 10 curated engineering resources, datasheets, reference cheat-sheets, and laboratory guides

export const resourcesData = [
  {
    id: "res-resistor-cheat-sheet",
    title: "Resistor Color Code & Standard E-Series Reference Sheet",
    category: "Cheat Sheets & Guides",
    format: "PDF Reference Guide",
    size: "1.2 MB",
    author: "NextGen Engineering Faculty",
    description: "Complete 4-band, 5-band, and 6-band color code visual chart including standard E12, E24, and E96 preferred resistance values and temperature coefficients.",
    downloadUrl: "#",
    externalUrl: "https://www.eia.org",
    tags: ["resistor", "color-code", "reference", "e24"]
  },
  {
    id: "res-arduino-pinout-poster",
    title: "Arduino Uno & Nano High-Resolution Pinout Architecture Poster",
    category: "Hardware Pinouts",
    format: "High-Res Poster / PDF",
    size: "2.4 MB",
    author: "Arduino Open Source Community",
    description: "Detailed vector diagram showing ATmega328P hardware registers, port mappings (PORTB, PORTC, PORTD), hardware PWM timers, I2C, SPI, and ADC channels.",
    downloadUrl: "#",
    externalUrl: "https://docs.arduino.cc",
    tags: ["arduino", "pinout", "atmega328p", "hardware"]
  },
  {
    id: "res-esp32-pinout-guide",
    title: "ESP32-WROOM-32 Pinout & Strapping Pin Best Practices Guide",
    category: "Hardware Pinouts",
    format: "Technical Whitepaper",
    size: "1.8 MB",
    author: "Espressif Systems Technical Documentation",
    description: "Essential reference detailing which ESP32 pins are safe to use, boot strapping pins (GPIO 0, 2, 12, 15), input-only pins (GPIO 34-39), and Wi-Fi ADC2 conflicts.",
    downloadUrl: "#",
    externalUrl: "https://www.espressif.com",
    tags: ["esp32", "pinout", "strapping-pins", "iot"]
  },
  {
    id: "res-oscilloscope-guide",
    title: "Laboratory Oscilloscope Operating Manual & Triggering Guide",
    category: "Laboratory Guides",
    format: "Laboratory Manual",
    size: "3.5 MB",
    author: "NextGen Instrumentation Lab",
    description: "Learn how to use digital storage oscilloscopes (DSOs): AC vs DC coupling, probe 10X attenuation compensation, edge triggering, FFT spectral analysis, and cursors.",
    downloadUrl: "#",
    externalUrl: "https://www.tek.com",
    tags: ["oscilloscope", "instrumentation", "measurement", "lab"]
  },
  {
    id: "res-soldering-standard",
    title: "IPC-A-610 Electronics Assembly & Soldering Quality Manual",
    category: "Manufacturing & Standards",
    format: "Reference Guide",
    size: "4.1 MB",
    author: "Association Connecting Electronics Industries (IPC)",
    description: "Visual inspection criteria for acceptable vs defective through-hole and SMD solder joints, wetting angles, flux types, lead-free profiles, and ESD workstation safety.",
    downloadUrl: "#",
    externalUrl: "https://www.ipc.org",
    tags: ["soldering", "ipc", "manufacturing", "quality"]
  },
  {
    id: "res-kicad-pcb-checklist",
    title: "KiCad PCB Layout & Design Rule Check (DRC) Pre-Flight Checklist",
    category: "Design Tools",
    format: "Checklist & Guidelines",
    size: "850 KB",
    author: "NextGen Hardware Team",
    description: "Comprehensive 25-point checklist before submitting Gerber files for PCB fabrication: trace clearance, via annular rings, ground copper pours, decoupling capacitor placement.",
    downloadUrl: "#",
    externalUrl: "https://www.kicad.org",
    tags: ["pcb", "kicad", "gerber", "drc"]
  },
  {
    id: "res-555-circuits-handbook",
    title: "50 Practical 555 Timer Circuits Application Handbook",
    category: "Application Notes",
    format: "Circuit Collection",
    size: "5.2 MB",
    author: "Forrest M. Mims III Inspired Collection",
    description: "Classic collection of astable, monostable, and bistable 555 timer schematics: PWM motor dimmers, frequency generators, continuity testers, and light meters.",
    downloadUrl: "#",
    externalUrl: "https://www.ti.com",
    tags: ["555", "analog", "circuits", "schematics"]
  },
  {
    id: "res-embedded-c-handbook",
    title: "Embedded C Style Guide & MISRA-C Best Practices",
    category: "Programming Reference",
    format: "Coding Standards",
    size: "1.1 MB",
    author: "Barr Group Embedded Guidelines",
    description: "Standard conventions for writing safe, bug-free embedded software: register masking, volatile keyword rules, deterministic interrupt handling, and memory limits.",
    downloadUrl: "#",
    externalUrl: "https://barrgroup.com",
    tags: ["embedded-c", "misra", "programming", "firmware"]
  },
  {
    id: "res-opamp-pocket-guide",
    title: "Op-Amp Linear Circuit Formulas & Stability Pocket Guide",
    category: "Cheat Sheets & Guides",
    format: "Formula Sheet",
    size: "950 KB",
    author: "Analog Devices Engineering Library",
    description: "Compact reference for inverting, non-inverting, differential, instrumentation amplifiers, active Sallen-Key low-pass/high-pass filters, and phase margins.",
    downloadUrl: "#",
    externalUrl: "https://www.analog.com",
    tags: ["op-amp", "analog", "formulas", "filters"]
  },
  {
    id: "res-iot-security-guide",
    title: "Embedded IoT Device Security & Cloud Credential Architecture",
    category: "Security & Standards",
    format: "Engineering Guidelines",
    size: "2.0 MB",
    author: "NextGen Cybersecurity & IoT Group",
    description: "Practical hardening guide for microcontrollers: Secure boot, flash encryption, avoiding hardcoded API tokens, implementing TLS 1.3, and MQTT over WebSockets.",
    downloadUrl: "#",
    externalUrl: "https://owasp.org",
    tags: ["security", "iot", "encryption", "tls"]
  }
];
