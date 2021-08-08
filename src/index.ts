import MersenneTwister from "mersenne-twister";
import seedrandom from "seedrandom";
import { colors } from "./colors";
// @ts-ignore
import blobshape from "blobshape";

const SVGNS = "http://www.w3.org/2000/svg";

export function generateIdentIcon(
  hash: string,
  outputAsString?: false
): SVGSVGElement;
export function generateIdentIcon(hash: string, outputAsString: true): string;
export function generateIdentIcon(
  hash: string,
  outputAsString = false
): string | SVGSVGElement {
  const range = seedrandom(hash);
  const generator = new MersenneTwister(range.int32());
  const shiftedColors = [...colors];
  const backgroundColors = ["#ECF0F1"];

  const diameter = 100;

  const svg = document.createElementNS(SVGNS, "svg");

  svg.setAttribute("x", "0");
  svg.setAttribute("y", "0");
  svg.setAttribute("viewBox", `0 0 ${diameter} ${diameter}`);

  const circle = document.createElementNS(SVGNS, "circle");
  circle.setAttribute("r", (diameter / 2).toString());
  circle.setAttribute("cx", (diameter / 2).toString());
  circle.setAttribute("cy", (diameter / 2).toString());
  circle.setAttribute("fill", getColor(backgroundColors, generator));
  svg.appendChild(circle);

  const shapeCount = 3;

  for (let i = 0; i < shapeCount; i++) {
    const shape = generateShape(generator, shiftedColors, diameter);

    svg.appendChild(shape);
  }

  return outputAsString ? svg.outerHTML : svg;
}

const generateShape = (
  generator: MersenneTwister,
  colors: string[],
  diameter: number
) => {
  const center = diameter / 2;

  let size = diameter * generator.random();

  while (size < 20) {
    size += size;
  }

  let stringId = generator.random().toString();

  let edges = parseInt(generator.random().toString().slice(-1));

  while (edges <= 3) {
    edges = parseInt(stringId.slice(-1));
    stringId = stringId.slice(0, -1);
  }

  const { path } = blobshape({
    size,
    growth: 8,
    seed: generator.random().toString(),
    edges,
  });

  const shape = document.createElementNS(SVGNS, "path");
  const position = generator.random() > 0.5 ? -1 : 1;
  const shapeCenter = center - size / 2;

  shape.setAttribute(
    "transform",
    `translate(${
      shapeCenter + ((position * diameter) / 2) * generator.random()
    }, ${shapeCenter + ((position * diameter) / 2) * generator.random()})`
  );

  shape.setAttribute("d", path);
  shape.setAttribute("fill", getColor(colors, generator));

  return shape;
};

const getColor = (colors: string[], generator: MersenneTwister) => {
  const idx = Math.floor(colors.length * generator.random());
  return colors.splice(idx, 1)[0];
};
