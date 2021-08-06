export const generatePaper = (diameter: number, color: string) => {
  const container = document.createElement("div");

  Object.assign(container.style, {
    display: "inline-block",
    borderRadius: "100%",
    overflow: "hidden",
    padding: "0",
    margin: "0",
    width: `1rem`,
    height: `1rem`,
    background: color,
  } as CSSStyleDeclaration);

  return container;
};
