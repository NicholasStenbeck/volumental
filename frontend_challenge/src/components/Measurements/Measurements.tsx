import * as React from "react";
import { styles } from "./Measurements.styles";
import type { Measurement } from "types";

interface MeasurementsProps {
  measurements: Measurement[];
}

/**
 * This component is on the verge of being too large
 */

export const Measurements: React.FC<MeasurementsProps> = ({ measurements }) => {
  const [selectedMeasurement, setSelectedMeasurement] = React.useState<
    number | null
  >(null);
  const [hideMeasurements, setHideMeasurements] =
    React.useState<boolean>(false);

  const isSelectedMeasurement = (i: number) => selectedMeasurement === i;

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

  const toggleMeasurements = () => {
    setHideMeasurements(!hideMeasurements);
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleMeasurements}>
        {hideMeasurements ? "Show" : "Hide"} measurements
      </button>
      {!hideMeasurements && (
        <div className={styles.container}>
          {measurements.map((measurement, i) => (
            <div
              className={`${styles.measurement} ${
                isSelectedMeasurement(i) ? "selected" : ""
              }`}
              key={measurement.id}
              onClick={() => setSelectedMeasurement(i)}
            >
              <h2 className={styles.measurementTitle}>{measurement.title}</h2>
              <p className={styles.measurementSubtitle}>
                {measurement.subTitle}
              </p>
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
            </div>
          ))}
        </div>
      )}
    </>
  );
};
