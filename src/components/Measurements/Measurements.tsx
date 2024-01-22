import * as React from "react";
import { styles } from "./Measurements.styles";
import type { Measurement } from "types";
import { MeasurementValues } from "./components/MeasurementValues";

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

  const toggleMeasurements = () => {
    setHideMeasurements(!hideMeasurements);
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleMeasurements}>
        {hideMeasurements ? "Show" : "Hide"} measurements
      </button>
      {!hideMeasurements && (
        <ul className={styles.container}>
          {measurements.map((measurement, i) => (
            <li
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
              <MeasurementValues measurement={measurement} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
