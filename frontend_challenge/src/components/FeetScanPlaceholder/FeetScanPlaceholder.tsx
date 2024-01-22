import { css } from "@emotion/css";
import * as React from "react";

import { SceneManager } from "./scene_manager";
import { rootElement } from "rootElement";

const styles = {
  canvasContainer: css`
    height: 100vh;
    width: 100vw;
    position: absolute;
  `,
  canvas: css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: visible;
  `,
  slider: css`
    position: absolute;
    cursor: ew-resize;
    width: 40px;
    height: 40px;
    background-color: #1cb5d1;
    opacity: 0.7;
    border-radius: 50%;
    top: calc(50% - 20px);
    left: 50%;
  `,
};

interface FeetScanPlaceholderProps {
  sceneLBackground: THREE.Color;
  sceneRBackground: THREE.Color;
  cameraPosition: {
    x: number;
    y: number;
    z: number;
  };
}

export const FeetScanPlaceholder: React.FC<FeetScanPlaceholderProps> = (
  props
) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    /**
     * Use guard clause instead of nesting the rest of the code in an if statement.
     * This improves readability and reduces nesting.
     */
    if (!containerRef.current || !sliderRef.current) {
      return;
    }

    // For cleanup of event listeners
    const currentSlider = sliderRef.current;
    const container = containerRef.current;

    new SceneManager(
      containerRef.current,
      currentSlider,
      props.cameraPosition,
      props.sceneLBackground,
      props.sceneRBackground
    );

    /**
     * Thanks to the guard clause above, we can assume that the saved
     * sliderRef.current is not null, so we can remove the null check
     * for better readability.
     */
    const onMouseMove = (event: MouseEvent) => {
      const sliderPos = Math.max(
        0,
        Math.min(rootElement.offsetWidth, event.pageX)
      );
      /**
       * Expressed the slider position in percent instead, so that it can stay in
       * roughly the same position when the window is resized. This also removes
       * the need to use a resize listener.
       */
      currentSlider.style.left = `${
        ((sliderPos - currentSlider.offsetWidth / 2) / container.offsetWidth ??
          1) * 100
      }%`;
    };

    const onMouseDown = (_: MouseEvent) => {
      rootElement.addEventListener("mousemove", onMouseMove);
      rootElement.addEventListener("mouseup", onMouseUp);
    };

    const onMouseUp = (_: MouseEvent) => {
      rootElement.removeEventListener("mousemove", onMouseMove);
      rootElement.removeEventListener("mouseup", onMouseUp);
    };

    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      rootElement.addEventListener("touchmove", onTouchMove);
      rootElement.addEventListener("touchend", onTouchEnd);
    };

    /**
     * Add support for mobile devices.
     * This is a very basic implementation, but it should work
     * for moving the slider.
     */
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const sliderPos = Math.max(
        0,
        Math.min(rootElement.offsetWidth, event.touches[0].pageX)
      );
      /**
       * Expressed the slider position in percent instead, so that it can stay in
       * roughly the same position when the window is resized. This also removes
       * the need to use a resize listener.
       */
      currentSlider.style.left = `${
        ((sliderPos - currentSlider.offsetWidth / 2) / container.offsetWidth ??
          1) * 100
      }%`;
    };

    const onTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      rootElement.removeEventListener("touchmove", onTouchMove);
      rootElement.removeEventListener("touchend", onTouchEnd);
    };

    currentSlider.addEventListener("mousedown", onMouseDown);
    currentSlider.addEventListener("touchstart", onTouchStart);

    /**
     * Including mousemove and mouseup just in case the component unmounts
     * while the mouse is down. This would probably not happen, but
     * it's better to be safe than sorry.
     */
    return () => {
      currentSlider.removeEventListener("mousedown", onMouseDown);
      rootElement.removeEventListener("mousemove", onMouseMove);
      rootElement.removeEventListener("mouseup", onMouseUp);
    };
  }, [props]);

  return (
    <>
      <div className={styles.canvasContainer}>
        <div className={styles.canvas} id="canvas" ref={containerRef} />
      </div>
      <div className={styles.slider} id="slider" ref={sliderRef} />
    </>
  );
};
