// NextGen Education - Practical Engineering Calculators & Design Tools
import React, { useState } from "react";
import { 
  Wrench, 
  Zap, 
  Sliders, 
  Activity, 
  Compass, 
  HelpCircle,
  Copy,
  Check
} from "lucide-react";
import { resistorColorBands, ledPresetColors, physicalConstants } from "../data/toolsData";

export default function EngineeringTools() {
  const [activeTab, setActiveTab] = useState("ohms-law");

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "980px" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">BENCHTOP UTILITIES</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Engineering Design Tools</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          8 interactive laboratory calculators with live formula derivations, input parameter checks, and engineering design explanations.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-nav">
        {[
          { id: "ohms-law", label: "Ohm's Law" },
          { id: "resistor-code", label: "Resistor Color Bands" },
          { id: "led-resistor", label: "LED Series Resistor" },
          { id: "voltage-divider", label: "Voltage Divider" },
          { id: "power-calc", label: "Power & Watts" },
          { id: "freq-wavelength", label: "Frequency & Wavelength" },
          { id: "unit-converter", label: "Unit Converter" },
          { id: "rc-time", label: "RC Time Constant" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OHM'S LAW */}
      {activeTab === "ohms-law" && <OhmsLawTool />}

      {/* TAB 2: RESISTOR COLOR BANDS */}
      {activeTab === "resistor-code" && <ResistorCodeTool />}

      {/* TAB 3: LED SERIES RESISTOR */}
      {activeTab === "led-resistor" && <LedResistorTool />}

      {/* TAB 4: VOLTAGE DIVIDER */}
      {activeTab === "voltage-divider" && <VoltageDividerTool />}

      {/* TAB 5: POWER CALCULATOR */}
      {activeTab === "power-calc" && <PowerTool />}

      {/* TAB 6: FREQUENCY & WAVELENGTH */}
      {activeTab === "freq-wavelength" && <FreqWavelengthTool />}

      {/* TAB 7: UNIT CONVERTER */}
      {activeTab === "unit-converter" && <UnitConverterTool />}

      {/* TAB 8: RC TIME CONSTANT */}
      {activeTab === "rc-time" && <RcTimeTool />}
    </div>
  );
}

// 1. OHM'S LAW
function OhmsLawTool() {
  const [voltage, setVoltage] = useState(5.0);
  const [current, setCurrent] = useState(0.02); // 20mA
  const [resistance, setResistance] = useState(250);
  const [solveFor, setSolveFor] = useState("R"); // 'V', 'I', 'R'

  let v = parseFloat(voltage) || 0;
  let i = parseFloat(current) || 0;
  let r = parseFloat(resistance) || 0;

  if (solveFor === "V") v = i * r;
  if (solveFor === "I") i = r > 0 ? v / r : 0;
  if (solveFor === "R") r = i > 0 ? v / i : 0;

  const power = v * i;

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Ohm's Law Calculator (V = I × R)</h3>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", alignSelf: "center" }}>Calculate for:</span>
        {["R", "V", "I"].map(item => (
          <button
            key={item}
            onClick={() => setSolveFor(item)}
            className={`btn btn-sm ${solveFor === item ? 'btn-primary' : 'btn-secondary'}`}
          >
            {item === "R" ? "Resistance (R)" : item === "V" ? "Voltage (V)" : "Current (I)"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {solveFor !== "V" && (
          <div className="form-group">
            <label className="form-label">Voltage (V in Volts)</label>
            <input type="number" className="form-input" value={voltage} onChange={(e) => setVoltage(e.target.value)} step="0.1" />
          </div>
        )}
        {solveFor !== "I" && (
          <div className="form-group">
            <label className="form-label">Current (I in Amperes)</label>
            <input type="number" className="form-input" value={current} onChange={(e) => setCurrent(e.target.value)} step="0.001" />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{(current * 1000).toFixed(1)} mA</span>
          </div>
        )}
        {solveFor !== "R" && (
          <div className="form-group">
            <label className="form-label">Resistance (R in Ohms)</label>
            <input type="number" className="form-input" value={resistance} onChange={(e) => setResistance(e.target.value)} step="1" />
          </div>
        )}
      </div>

      {/* Result Card */}
      <div style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", background: "#080c14", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>CALCULATED RESULT</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)", margin: "0.3rem 0" }}>
          {solveFor === "V" && `${v.toFixed(2)} Volts (V)`}
          {solveFor === "I" && `${(i * 1000).toFixed(2)} mA (${i.toFixed(4)} A)`}
          {solveFor === "R" && `${r.toFixed(2)} Ω (${(r / 1000).toFixed(3)} kΩ)`}
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--accent-amber)" }}>
          Power Dissipation: <strong>{power.toFixed(3)} Watts</strong> ({power < 0.25 ? "Safe for 1/4W resistor" : "Exceeds 1/4W rating! Use 1/2W or 1W"})
        </div>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        <strong>Formula:</strong> <code>{solveFor === "V" ? "V = I × R" : solveFor === "I" ? "I = V / R" : "R = V / I"}</code><br/>
        <strong>Practical Tip:</strong> Always verify that calculated power does not exceed the power rating of the resistor to prevent thermal burnout.
      </div>
    </div>
  );
}

// 2. RESISTOR COLOR CODE GENERATOR
function ResistorCodeTool() {
  const [band1, setBand1] = useState(2); // Red (2)
  const [band2, setBand2] = useState(2); // Red (2)
  const [multiplier, setMultiplier] = useState(10); // Brown (x10)
  const [tolerance, setTolerance] = useState("± 5%"); // Gold (5%)

  const b1 = resistorColorBands.digits[band1];
  const b2 = resistorColorBands.digits[band2];
  const multObj = resistorColorBands.multipliers.find(m => m.multiplier === multiplier) || resistorColorBands.multipliers[1];
  const tolObj = resistorColorBands.tolerances.find(t => t.tolerance === tolerance) || resistorColorBands.tolerances[5];

  const valueOhms = (band1 * 10 + band2) * multiplier;
  const formattedVal = valueOhms >= 1000000 
    ? `${(valueOhms / 1000000).toFixed(2)} MΩ` 
    : valueOhms >= 1000 
      ? `${(valueOhms / 1000).toFixed(1)} kΩ` 
      : `${valueOhms} Ω`;

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Resistor Color Code Band Generator</h3>

      {/* Visual Resistor Canvas */}
      <div style={{
        background: "#080c14",
        padding: "1.5rem 0.5rem",
        borderRadius: "var(--radius-md)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem",
        border: "1px solid var(--border-subtle)",
        overflowX: "auto",
        maxWidth: "100%"
      }}>
        {/* Wire Left */}
        <div style={{ width: "40px", height: "4px", background: "#94a3b8" }} />
        {/* Resistor Body */}
        <div style={{
          width: "180px",
          height: "56px",
          background: "#d4a373",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 10px",
          boxShadow: "inset 0 4px 6px rgba(0,0,0,0.3)"
        }}>
          {/* Band 1 */}
          <div style={{ width: "12px", height: "56px", background: b1.hex }} title={`Band 1: ${b1.color}`} />
          {/* Band 2 */}
          <div style={{ width: "12px", height: "56px", background: b2.hex }} title={`Band 2: ${b2.color}`} />
          {/* Multiplier */}
          <div style={{ width: "12px", height: "56px", background: multObj.hex }} title={`Multiplier: ${multObj.color}`} />
          {/* Spacing gap */}
          <div style={{ width: "20px" }} />
          {/* Tolerance */}
          <div style={{ width: "12px", height: "56px", background: tolObj.hex }} title={`Tolerance: ${tolObj.color}`} />
        </div>
        {/* Wire Right */}
        <div style={{ width: "40px", height: "4px", background: "#94a3b8" }} />
      </div>

      {/* Result */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>DECODED VALUE</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>
          {formattedVal} <span style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>{tolerance}</span>
        </div>
      </div>

      {/* Selectors Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        <div className="form-group">
          <label className="form-label">Band 1 (1st Digit)</label>
          <select className="form-select" value={band1} onChange={(e) => setBand1(parseInt(e.target.value))}>
            {resistorColorBands.digits.map((d, i) => (
              <option key={d.color} value={i}>{d.color} ({d.value})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Band 2 (2nd Digit)</label>
          <select className="form-select" value={band2} onChange={(e) => setBand2(parseInt(e.target.value))}>
            {resistorColorBands.digits.map((d, i) => (
              <option key={d.color} value={i}>{d.color} ({d.value})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Multiplier</label>
          <select className="form-select" value={multiplier} onChange={(e) => setMultiplier(parseFloat(e.target.value))}>
            {resistorColorBands.multipliers.map(m => (
              <option key={m.color} value={m.multiplier}>{m.color} ({m.label})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Tolerance</label>
          <select className="form-select" value={tolerance} onChange={(e) => setTolerance(e.target.value)}>
            {resistorColorBands.tolerances.map(t => (
              <option key={t.color} value={t.tolerance}>{t.color} ({t.tolerance})</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// 3. LED SERIES RESISTOR
function LedResistorTool() {
  const [vcc, setVcc] = useState(5.0);
  const [vf, setVf] = useState(2.0);
  const [currentMa, setCurrentMa] = useState(15);

  const vSupply = parseFloat(vcc) || 0;
  const vForward = parseFloat(vf) || 0;
  const currentAmp = (parseFloat(currentMa) || 1) / 1000;

  const drop = Math.max(0, vSupply - vForward);
  const rCalculated = currentAmp > 0 ? drop / currentAmp : 0;
  const powerW = drop * currentAmp;

  // Standard E12 closest resistor
  const standardValues = [100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000];
  const closestStandard = standardValues.reduce((prev, curr) => 
    Math.abs(curr - rCalculated) < Math.abs(prev - rCalculated) ? curr : prev
  );

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>LED Series Current Limiting Calculator</h3>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", alignSelf: "center" }}>LED Presets:</span>
        {ledPresetColors.map(preset => (
          <button
            key={preset.name}
            onClick={() => { setVf(preset.vf); setCurrentMa(preset.ifDefault); }}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "0.78rem" }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="form-group">
          <label className="form-label">Supply Voltage (Vcc in Volts)</label>
          <input type="number" className="form-input" value={vcc} onChange={(e) => setVcc(e.target.value)} step="0.1" />
        </div>
        <div className="form-group">
          <label className="form-label">LED Forward Voltage (Vf in Volts)</label>
          <input type="number" className="form-input" value={vf} onChange={(e) => setVf(e.target.value)} step="0.1" />
        </div>
        <div className="form-group">
          <label className="form-label">Desired Current (If in mA)</label>
          <input type="number" className="form-input" value={currentMa} onChange={(e) => setCurrentMa(e.target.value)} step="1" />
        </div>
      </div>

      <div style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", background: "#080c14", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--accent-emerald)", fontWeight: 700, textTransform: "uppercase" }}>CALCULATED RESISTANCE</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)", margin: "0.3rem 0" }}>
          {rCalculated.toFixed(1)} Ω 
          <span style={{ fontSize: "1.1rem", color: "var(--accent-cyan)", marginLeft: "0.75rem" }}>
            (Standard: {closestStandard} Ω)
          </span>
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Resistor Power Dissipation: <strong>{(powerW * 1000).toFixed(1)} mW</strong> ({powerW < 0.25 ? "Standard 1/4W is sufficient" : "Exceeds 1/4W!"})
        </div>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        <strong>Formula:</strong> <code>R = (V_supply - V_forward) / I_forward</code><br/>
        <strong>Engineering Advice:</strong> Never power an LED without a series resistor; its dynamic resistance is zero once forward biased, leading to instant burnout.
      </div>
    </div>
  );
}

// 4. VOLTAGE DIVIDER
function VoltageDividerTool() {
  const [vin, setVin] = useState(5.0);
  const [r1, setR1] = useState(10000);
  const [r2, setR2] = useState(10000);

  const vIn = parseFloat(vin) || 0;
  const res1 = parseFloat(r1) || 1;
  const res2 = parseFloat(r2) || 1;

  const vOut = vIn * (res2 / (res1 + res2));
  const currentTotalMa = (vIn / (res1 + res2)) * 1000;

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Voltage Divider Calculator</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="form-group">
          <label className="form-label">Input Voltage (Vin in Volts)</label>
          <input type="number" className="form-input" value={vin} onChange={(e) => setVin(e.target.value)} step="0.1" />
        </div>
        <div className="form-group">
          <label className="form-label">Top Resistor R1 (Ohms)</label>
          <input type="number" className="form-input" value={r1} onChange={(e) => setR1(e.target.value)} step="100" />
        </div>
        <div className="form-group">
          <label className="form-label">Bottom Resistor R2 (Ohms)</label>
          <input type="number" className="form-input" value={r2} onChange={(e) => setR2(e.target.value)} step="100" />
        </div>
      </div>

      <div style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", background: "#080c14", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--accent-blue)", fontWeight: 700, textTransform: "uppercase" }}>DIVIDED OUTPUT VOLTAGE (VOUT)</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)", margin: "0.3rem 0" }}>
          {vOut.toFixed(3)} Volts
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Division Ratio: {(vOut / (vIn || 1)).toFixed(3)} • Quiescent Current: {currentTotalMa.toFixed(3)} mA
        </div>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        <strong>Formula:</strong> <code>Vout = Vin × (R2 / (R1 + R2))</code><br/>
        <strong>Practical Tip:</strong> Voltage dividers should only be used as signal voltage references or level shifters. Never use a passive voltage divider to power a motor or load, as load current drastically changes the output voltage!
      </div>
    </div>
  );
}

// 5. POWER CALCULATOR
function PowerTool() {
  const [volts, setVolts] = useState(12.0);
  const [amps, setAmps] = useState(2.0);

  const v = parseFloat(volts) || 0;
  const i = parseFloat(amps) || 0;
  const watts = v * i;
  const resistanceEquivalent = i > 0 ? v / i : 0;

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Electrical Power & Energy Calculator</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="form-group">
          <label className="form-label">Voltage (V in Volts)</label>
          <input type="number" className="form-input" value={volts} onChange={(e) => setVolts(e.target.value)} step="0.5" />
        </div>
        <div className="form-group">
          <label className="form-label">Current (I in Amperes)</label>
          <input type="number" className="form-input" value={amps} onChange={(e) => setAmps(e.target.value)} step="0.1" />
        </div>
      </div>

      <div style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", background: "#080c14", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--accent-purple)", fontWeight: 700, textTransform: "uppercase" }}>CALCULATED ACTIVE POWER</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)", margin: "0.3rem 0" }}>
          {watts.toFixed(2)} Watts (W)
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Energy Consumed in 1 Hour: {(watts / 1000).toFixed(3)} kWh • Equivalent Load Resistance: {resistanceEquivalent.toFixed(2)} Ω
        </div>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        <strong>Formulas:</strong> <code>P = V × I = I² × R = V² / R</code>
      </div>
    </div>
  );
}

// 6. FREQUENCY & WAVELENGTH
function FreqWavelengthTool() {
  const [freqMhz, setFreqMhz] = useState(2400); // 2.4 GHz Wi-Fi

  const fHz = (parseFloat(freqMhz) || 1) * 1000000;
  const c = physicalConstants.speedOfLight;
  const wavelengthM = c / fHz;
  const wavelengthCm = wavelengthM * 100;
  const quarterWaveCm = wavelengthCm / 4;

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>RF Frequency & Wavelength Calculator (λ = c / f)</h3>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", alignSelf: "center" }}>RF Presets:</span>
        {[
          { name: "433 MHz (LoRa / ISM)", f: 433.92 },
          { name: "868 MHz (EU LoRa)", f: 868 },
          { name: "915 MHz (US LoRa)", f: 915 },
          { name: "2.4 GHz (Wi-Fi / BT)", f: 2400 },
          { name: "5.8 GHz (FPV Video)", f: 5800 }
        ].map(item => (
          <button key={item.name} onClick={() => setFreqMhz(item.f)} className="btn btn-secondary btn-sm" style={{ fontSize: "0.78rem" }}>
            {item.name}
          </button>
        ))}
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label className="form-label">Frequency (MHz)</label>
        <input type="number" className="form-input" value={freqMhz} onChange={(e) => setFreqMhz(e.target.value)} step="1" />
      </div>

      <div style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", background: "#080c14", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>WAVELENGTH (λ)</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)", margin: "0.3rem 0" }}>
          {wavelengthCm >= 100 ? `${(wavelengthCm / 100).toFixed(3)} m` : `${wavelengthCm.toFixed(2)} cm`}
        </div>
        <div style={{ fontSize: "0.9rem", color: "var(--accent-emerald)" }}>
          Optimal Quarter-Wave Whip Antenna Length (λ/4): <strong>{quarterWaveCm.toFixed(2)} cm</strong>
        </div>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        <strong>Formula:</strong> <code>λ = c / f</code> (where c = 3 × 10⁸ m/s).<br/>
        <strong>Antenna Design:</strong> A standard quarter-wave monopole antenna (used for Wi-Fi or LoRa wire whips) has a physical conductor length of exactly one quarter of the electrical wavelength.
      </div>
    </div>
  );
}

// 7. UNIT CONVERTER
function UnitConverterTool() {
  const [val, setVal] = useState(100);
  const [domain, setDomain] = useState("capacitance");

  const v = parseFloat(val) || 0;

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Engineering Electrical Unit Converter</h3>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {["capacitance", "resistance", "frequency"].map(d => (
          <button
            key={d}
            onClick={() => setDomain(d)}
            className={`btn btn-sm ${domain === d ? 'btn-primary' : 'btn-secondary'}`}
            style={{ textTransform: "capitalize" }}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label className="form-label">Base Input Value ({domain === 'capacitance' ? 'in µF' : domain === 'resistance' ? 'in kΩ' : 'in kHz'})</label>
        <input type="number" className="form-input" value={val} onChange={(e) => setVal(e.target.value)} />
      </div>

      <div style={{ background: "#080c14", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
        {domain === "capacitance" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
            <div>Picofarads (pF): <span style={{ color: "var(--accent-cyan)" }}>{(v * 1000000).toLocaleString()} pF</span></div>
            <div>Nanofarads (nF): <span style={{ color: "var(--accent-cyan)" }}>{(v * 1000).toLocaleString()} nF</span></div>
            <div>Microfarads (µF): <span style={{ color: "var(--accent-emerald)" }}>{v} µF</span></div>
            <div>Farads (F): <span style={{ color: "var(--text-secondary)" }}>{(v / 1000000).toExponential(4)} F</span></div>
          </div>
        )}
        {domain === "resistance" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
            <div>Ohms (Ω): <span style={{ color: "var(--accent-cyan)" }}>{(v * 1000).toLocaleString()} Ω</span></div>
            <div>Kilo-ohms (kΩ): <span style={{ color: "var(--accent-emerald)" }}>{v} kΩ</span></div>
            <div>Mega-ohms (MΩ): <span style={{ color: "var(--accent-purple)" }}>{(v / 1000).toFixed(4)} MΩ</span></div>
          </div>
        )}
        {domain === "frequency" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
            <div>Hertz (Hz): <span style={{ color: "var(--accent-cyan)" }}>{(v * 1000).toLocaleString()} Hz</span></div>
            <div>Kilohertz (kHz): <span style={{ color: "var(--accent-emerald)" }}>{v} kHz</span></div>
            <div>Megahertz (MHz): <span style={{ color: "var(--accent-purple)" }}>{(v / 1000).toFixed(4)} MHz</span></div>
            <div>Gigahertz (GHz): <span style={{ color: "var(--accent-rose)" }}>{(v / 1000000).toExponential(4)} GHz</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

// 8. RC TIME CONSTANT
function RcTimeTool() {
  const [resistorK, setResistorK] = useState(10); // 10k
  const [capUf, setCapUf] = useState(100); // 100uF

  const rOhms = (parseFloat(resistorK) || 0) * 1000;
  const cFarads = (parseFloat(capUf) || 0) / 1000000;
  const tauSec = rOhms * cFarads;
  const cutoffHz = 1 / (2 * Math.PI * rOhms * cFarads);

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>RC Circuit Time Constant & Cutoff Frequency</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="form-group">
          <label className="form-label">Resistance (R in kΩ)</label>
          <input type="number" className="form-input" value={resistorK} onChange={(e) => setResistorK(e.target.value)} step="1" />
        </div>
        <div className="form-group">
          <label className="form-label">Capacitance (C in µF)</label>
          <input type="number" className="form-input" value={capUf} onChange={(e) => setCapUf(e.target.value)} step="10" />
        </div>
      </div>

      <div style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", background: "#080c14", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>TIME CONSTANT (τ = R × C)</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)", margin: "0.3rem 0" }}>
          {tauSec.toFixed(3)} Seconds
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Time to 99.3% Fully Charged (5τ): <strong>{(tauSec * 5).toFixed(3)} s</strong> • -3dB Filter Cutoff: <strong>{cutoffHz.toFixed(2)} Hz</strong>
        </div>
      </div>

      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        <strong>Formulas:</strong> <code>τ = R × C</code> and <code>fc = 1 / (2π × R × C)</code>
      </div>
    </div>
  );
}
