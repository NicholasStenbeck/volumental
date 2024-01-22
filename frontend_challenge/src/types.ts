/**
 * The main effect of importing with the "type" keyword is that it will not be included in the compiled javascript.
 */
import type dummy_measurements from "dummy_measurements.json";

export type Measurement = (typeof dummy_measurements.data)[number];
