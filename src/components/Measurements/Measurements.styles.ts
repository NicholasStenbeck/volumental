import { css } from "@emotion/css";

/**
 * Separate file for styles to avoid cluttering the component file.
 */

export const styles = {
  container: css`
    top: 0;
    left: 1rem;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding: 2rem 1rem;
    box-sizing: border-box;

    max-height: 100%;
    overflow-y: auto;

    /*
      * Would use container query, as it is supported by all major browsers,
      * but it is not supported by emotion yet.
      */
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  `,
  measurement: css`
    min-height: 7rem;
    padding: 0 1rem 2rem 1rem;
    background: white;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    filter: grayscale(1);

    &.selected {
      scale: 1.05;
      filter: grayscale(0);
    }
  `,
  measurementTitle: css`
    font-size: 1rem;
  `,
  measurementSubtitle: css`
    font-size: 0.75rem;
    margin-top: -0.75rem;
    color: #555;
  `,

  toggleButton: css`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    color: #ccc;
    font-size: 1.5rem;
    transition: color 0.2s ease-in-out;

    // Don't use hover style on touch devices
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: #888;
      }
    }
  `,
};
