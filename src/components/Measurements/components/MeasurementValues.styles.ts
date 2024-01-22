import { css } from "@emotion/css";

export const styles = {
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
};
