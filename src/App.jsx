
import { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [bmi, setBmi] = useState(null);
  const [errors, setErrors] = useState({});

  function getCategory(value) {
    if (value < 18.5) {
      return "Underweight";
    } else if (value < 25) {
      return "Normal weight";
    } else if (value < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

  function calculateBMI(e) {
    e.preventDefault();

    const newErrors = {};
    const w = Number(weight);
    const h = Number(height);

    const numberPattern = /^(?:\d+\.?\d*|\.\d+)$/;

    if (weight.trim() === "") {
      newErrors.weight = "Weight is required.";
    } else if (!numberPattern.test(weight.trim())) {
      newErrors.weight = "Please enter a valid number.";
    } else if (!Number.isFinite(w) || w <= 0) {
      newErrors.weight = "Weight must be greater than zero.";
    }

    if (height.trim() === "") {
      newErrors.height = "Height is required.";
    } else if (!numberPattern.test(height.trim())) {
      newErrors.height = "Please enter a valid number.";
    } else if (!Number.isFinite(h) || h <= 0) {
      newErrors.height = "Height must be greater than zero.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setBmi(null);
      return;
    }

    const heightInMeters = h / 100;

    const result = w / (heightInMeters * heightInMeters);

    setBmi(result);
  }

  function resetCalculator() {
    setWeight("");
    setHeight("");
    setBmi(null);
    setErrors({});
  }

  return (
    <div className="page">
      <div className="calculator">

        <h1>Body Mass Index (BMI) Calculator</h1>
        <p className="subtitle">
          Want to calculate your BMI? Use Abia's BMI calculator!
        </p>

        <form onSubmit={calculateBMI} noValidate>

          <div className="input-group">
            <label htmlFor="weight">
              Weight (kg)
            </label>

            <input
              id="weight"
              type="text"
              inputMode="decimal"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setBmi(null);
                setErrors((prev) => ({
                  ...prev,
                  weight: undefined
                }));
              }}
            />

            {errors.weight && (
              <p className="error">{errors.weight}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="height">
              Height (cm)
            </label>

            <input
              id="height"
              type="text"
              inputMode="decimal"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setBmi(null);
                setErrors((prev) => ({
                  ...prev,
                  height: undefined
                }));
              }}
            />

            {errors.height && (
              <p className="error">{errors.height}</p>
            )}
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate BMI
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={resetCalculator}
            >
              Reset
            </button>
          </div>
        </form>

        {bmi !== null && (
          <div className="result">
            <p>Your BMI is</p>
            <h2>{bmi.toFixed(1)}</h2>
            <h3>{getCategory(bmi)}</h3>
          </div>
        )}

        <div className="bmi-guide">
          <h3>BMI Categories</h3>
          <p>Underweight: Below 18.5</p>
          <p>Normal weight: 18.5 - 24.9</p>
          <p>Overweight: 25.0 - 29.9</p>
          <p>Obese: 30.0 and above</p>
        </div>

      </div>
    </div>
  );
}

export default App;
