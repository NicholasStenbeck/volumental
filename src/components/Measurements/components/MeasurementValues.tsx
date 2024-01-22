import React from "react";
import type { Measurement } from "types";
import { styles } from "./MeasurementValues.styles";

interface MeasurementValuesProps {
  measurement: Measurement;
}

export const MeasurementValues: React.FC<MeasurementValuesProps> = ({
  measurement,
}) => {
  const isActiveValue = (measurement: Measurement, value: string) => {
    const measurementValue = measurement.active;
    return measurementValue === value;
  };

  const getDeviationPosition = (
    measurement: Measurement,
    foot: "left" | "right"
  ) => {
    const deviation =
      foot === "left" ? measurement.leftDeviation : measurement.rightDeviation;
    const basePosition = 0.5;
    return `${(basePosition + deviation) * 100}%`;
  };

  return (
    <ul className={styles.measurementValues}>
      {measurement.values.map((value) => (
        <li
          key={`${measurement.id}-${value}`}
          className={styles.measurementValue}
        >
          <span
            className={`content ${
              isActiveValue(measurement, value) ? "active" : ""
            }`}
          >
            {value}
          </span>
          {isActiveValue(measurement, value) && (
            <>
              {/**
               * Use dynamic styles inline, as per Emotion docs: https://emotion.sh/docs/best-practices#use-the-style-prop-for-dynamic-styles
               * Best case for React would be using @emotion/styled instead of @emotion/css,
               * but they should not be combined in one project.
               */}
              <span
                className="left"
                style={{
                  left: getDeviationPosition(measurement, "left"),
                }}
              >
                <p>Left</p>
                <span className={styles.caretDown} />
              </span>
              <span
                className="right"
                style={{
                  left: getDeviationPosition(measurement, "right"),
                }}
              >
                <span className={styles.caretUp} />
                <p>Right</p>
              </span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
