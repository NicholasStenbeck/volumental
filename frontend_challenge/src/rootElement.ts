/**
 * Since we are using React 18, we can save our root element for global event listeners.
 * This will stop us from having conflicts with other React apps on the page if this
 * is used as a component in a larger app.
 */
export const rootElement = document.getElementById("root")!;
