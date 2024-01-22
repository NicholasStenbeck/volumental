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
    padding: 0 1rem 1rem 1rem;
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
  measurementValues: css`
    display: flex;
    justify-content: center;
    gap: 0.1rem;
    list-style: none;
    width: 100%;
    padding: 0;
  `,
  measurementValue: css`
    position: relative;
    display: flex;
    flex: 1 1 100%;
    .content {
      flex: 1 1 100%;
      background-color: rgb(169 183 193);
      padding: 0.25rem 0.5rem;
      color: white;
      text-align: center;

      &.active {
        background-color: rgb(41 79 115);
      }
    }

    & .left,
    & .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;

      p {
        font-size: 0.5rem;
        color: #555;
        font-weight: 900;
      }
    }

    & .left {
      top: 0;
      translate: -50% -100%;
    }
    & .right {
      bottom: 0;
      translate: -50% 100%;
    }
  `,
  caretUp: css`
    width: 0;
    height: 0;
    border-left: 0.25rem solid transparent;
    border-right: 0.25rem solid transparent;
    border-bottom: 0.5rem solid rgb(105 182 189);
    margin-bottom: -0.5rem;
  `,
  caretDown: css`
    width: 0;
    height: 0;
    border-left: 0.25rem solid transparent;
    border-right: 0.25rem solid transparent;
    border-top: 0.5rem solid rgb(105 182 189);
    margin-top: -0.5rem;
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
