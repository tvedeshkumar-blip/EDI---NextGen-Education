// NextGen Education - Engineering Tools & Reference Data
// Contains formulas, color bands, physical constants, and default configurations for the 8 Engineering Calculators

export const resistorColorBands = {
  digits: [
    { color: "Black", value: 0, hex: "#000000", textColor: "#ffffff" },
    { color: "Brown", value: 1, hex: "#8B4513", textColor: "#ffffff" },
    { color: "Red", value: 2, hex: "#EF4444", textColor: "#ffffff" },
    { color: "Orange", value: 3, hex: "#F97316", textColor: "#ffffff" },
    { color: "Yellow", value: 4, hex: "#EAB308", textColor: "#000000" },
    { color: "Green", value: 5, hex: "#22C55E", textColor: "#ffffff" },
    { color: "Blue", value: 6, hex: "#3B82F6", textColor: "#ffffff" },
    { color: "Violet", value: 7, hex: "#A855F7", textColor: "#ffffff" },
    { color: "Grey", value: 8, hex: "#6B7280", textColor: "#ffffff" },
    { color: "White", value: 9, hex: "#F3F4F6", textColor: "#000000" }
  ],
  multipliers: [
    { color: "Black", multiplier: 1, label: "× 1 Ω", hex: "#000000", textColor: "#ffffff" },
    { color: "Brown", multiplier: 10, label: "× 10 Ω", hex: "#8B4513", textColor: "#ffffff" },
    { color: "Red", multiplier: 100, label: "× 100 Ω", hex: "#EF4444", textColor: "#ffffff" },
    { color: "Orange", multiplier: 1000, label: "× 1 kΩ", hex: "#F97316", textColor: "#ffffff" },
    { color: "Yellow", multiplier: 10000, label: "× 10 kΩ", hex: "#EAB308", textColor: "#000000" },
    { color: "Green", multiplier: 100000, label: "× 100 kΩ", hex: "#22C55E", textColor: "#ffffff" },
    { color: "Blue", multiplier: 1000000, label: "× 1 MΩ", hex: "#3B82F6", textColor: "#ffffff" },
    { color: "Gold", multiplier: 0.1, label: "× 0.1 Ω", hex: "#D4AF37", textColor: "#000000" },
    { color: "Silver", multiplier: 0.01, label: "× 0.01 Ω", hex: "#C0C0C0", textColor: "#000000" }
  ],
  tolerances: [
    { color: "Brown", tolerance: "± 1%", hex: "#8B4513", textColor: "#ffffff" },
    { color: "Red", tolerance: "± 2%", hex: "#EF4444", textColor: "#ffffff" },
    { color: "Green", tolerance: "± 0.5%", hex: "#22C55E", textColor: "#ffffff" },
    { color: "Blue", tolerance: "± 0.25%", hex: "#3B82F6", textColor: "#ffffff" },
    { color: "Violet", tolerance: "± 0.1%", hex: "#A855F7", textColor: "#ffffff" },
    { color: "Gold", tolerance: "± 5%", hex: "#D4AF37", textColor: "#000000" },
    { color: "Silver", tolerance: "± 10%", hex: "#C0C0C0", textColor: "#000000" }
  ]
};

export const ledPresetColors = [
  { name: "Standard Red (GaP)", vf: 1.9, ifDefault: 15 },
  { name: "Yellow / Amber (GaAsP)", vf: 2.1, ifDefault: 15 },
  { name: "Standard Green (GaP)", vf: 2.2, ifDefault: 15 },
  { name: "High-Brightness Blue (InGaN)", vf: 3.2, ifDefault: 20 },
  { name: "Pure White LED (InGaN + Phosphor)", vf: 3.2, ifDefault: 20 },
  { name: "Infrared Emitter (GaAs, 940nm)", vf: 1.3, ifDefault: 20 },
  { name: "UV / Ultraviolet (GaN, 395nm)", vf: 3.4, ifDefault: 20 }
];

export const physicalConstants = {
  speedOfLight: 299792458, // m/s
  speedOfSoundAir20C: 343.2, // m/s
  planckConstant: 6.62607015e-34, // J·s
  elementaryCharge: 1.602176634e-19 // Coulombs
};
