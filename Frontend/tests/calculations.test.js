import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Important Calculation Functions under test
 * Matches formulas implemented in src/pages/EngineeringTools.jsx
 */

// 1. Ohm's Law
export function solveOhmsLaw(solveFor, { voltage, current, resistance }) {
  let v = parseFloat(voltage) || 0;
  let i = parseFloat(current) || 0;
  let r = parseFloat(resistance) || 0;

  if (solveFor === "V") v = i * r;
  if (solveFor === "I") i = r > 0 ? v / r : 0;
  if (solveFor === "R") r = i > 0 ? v / i : 0;

  const power = v * i;
  return { v: Number(v.toFixed(4)), i: Number(i.toFixed(4)), r: Number(r.toFixed(4)), power: Number(power.toFixed(4)) };
}

// 2. LED Series Resistor
export function calculateLedResistor(sourceV, forwardV, forwardI_mA) {
  const current_A = forwardI_mA / 1000;
  const deltaV = Math.max(0, sourceV - forwardV);
  const resistor_Ohms = current_A > 0 ? deltaV / current_A : 0;
  const power_W = deltaV * current_A;

  return {
    resistor_Ohms: Math.round(resistor_Ohms * 10) / 10,
    power_W: Number(power_W.toFixed(4)),
    deltaV: Number(deltaV.toFixed(2))
  };
}

// 3. Voltage Divider
export function calculateVoltageDivider(vin, r1, r2) {
  const v = parseFloat(vin) || 0;
  const res1 = parseFloat(r1) || 0;
  const res2 = parseFloat(r2) || 0;
  const totalR = res1 + res2;

  const vout = totalR > 0 ? v * (res2 / totalR) : 0;
  const current_mA = totalR > 0 ? (v / totalR) * 1000 : 0;

  return {
    vout: Number(vout.toFixed(4)),
    current_mA: Number(current_mA.toFixed(4))
  };
}

// 4. RC Time Constant
export function calculateRcTime(resistance_Ohms, capacitance_uF) {
  const c_Farads = capacitance_uF * 1e-6;
  const tau_sec = resistance_Ohms * c_Farads;
  const cutoffFreq_Hz = tau_sec > 0 ? 1 / (2 * Math.PI * tau_sec) : 0;

  return {
    tau_sec: Number(tau_sec.toFixed(6)),
    cutoffFreq_Hz: Number(cutoffFreq_Hz.toFixed(2))
  };
}

// 5. 4-Band Resistor Color Code
export function calculate4BandResistor(band1, band2, multiplier) {
  const baseValue = (band1 * 10) + band2;
  return baseValue * multiplier;
}

describe("Important Engineering Calculation Functions", () => {
  describe("Ohm's Law Calculator", () => {
    it("should correctly solve for Voltage: V = I * R", () => {
      const res = solveOhmsLaw("V", { current: 0.02, resistance: 250 });
      assert.equal(res.v, 5.0);
      assert.equal(res.power, 0.1);
    });

    it("should correctly solve for Current: I = V / R", () => {
      const res = solveOhmsLaw("I", { voltage: 12.0, resistance: 1000 });
      assert.equal(res.i, 0.012);
      assert.equal(res.power, 0.144);
    });

    it("should correctly solve for Resistance: R = V / I", () => {
      const res = solveOhmsLaw("R", { voltage: 3.3, current: 0.01 });
      assert.equal(res.r, 330);
      assert.equal(res.power, 0.033);
    });
  });

  describe("LED Series Resistor Calculator", () => {
    it("should calculate correct resistance and power for 5V source, 2V LED, 20mA current", () => {
      const res = calculateLedResistor(5.0, 2.0, 20);
      // R = (5 - 2) / 0.02 = 150 Ohms
      assert.equal(res.resistor_Ohms, 150);
      assert.equal(res.power_W, 0.06);
      assert.equal(res.deltaV, 3.0);
    });

    it("should handle 3.3V source with blue LED (3.2V, 10mA)", () => {
      const res = calculateLedResistor(3.3, 3.2, 10);
      // R = (3.3 - 3.2) / 0.01 = 10 Ohms
      assert.equal(res.resistor_Ohms, 10);
      assert.equal(res.power_W, 0.001);
    });
  });

  describe("Voltage Divider Calculator", () => {
    it("should calculate exact half voltage with equal resistors", () => {
      const res = calculateVoltageDivider(5.0, 10000, 10000);
      assert.equal(res.vout, 2.5);
      assert.equal(res.current_mA, 0.25);
    });

    it("should correctly step down 12V with 10k and 2.2k resistors", () => {
      const res = calculateVoltageDivider(12.0, 10000, 2200);
      // 12 * (2200 / 12200) = 2.16393...
      assert.equal(res.vout, 2.1639);
    });
  });

  describe("RC Time Constant Calculator", () => {
    it("should compute tau = 1 second for 10k ohm and 100 uF", () => {
      const res = calculateRcTime(10000, 100);
      assert.equal(res.tau_sec, 1.0);
      // fc = 1 / (2 * pi * 1.0) = ~0.16 Hz
      assert.equal(res.cutoffFreq_Hz, 0.16);
    });
  });

  describe("4-Band Resistor Color Code", () => {
    it("should correctly calculate 4.7k (Yellow=4, Violet=7, Orange=100)", () => {
      const value = calculate4BandResistor(4, 7, 100);
      assert.equal(value, 4700);
    });

    it("should correctly calculate 220 ohm (Red=2, Red=2, Brown=10)", () => {
      const value = calculate4BandResistor(2, 2, 10);
      assert.equal(value, 220);
    });
  });
});
