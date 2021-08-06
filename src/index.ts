import { applyPolyfill } from "./polyfill";
applyPolyfill();

import MersenneTwister from "mersenne-twister";
import seedrandom from "seedrandom";
import { colord } from "colord";
import { colors } from "./colors";
import { generatePaper } from "./generatePaper";
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
  const shiftedColors = hueShift([...colors], generator);
  const diameter = 100;

  const svg = document.createElementNS(SVGNS, "svg");

  svg.setAttribute("x", "0");
  svg.setAttribute("y", "0");
  svg.setAttribute("viewBox", `0 0 ${diameter} ${diameter}`);

  const circle = document.createElement("circle");
  circle.setAttribute("r", (diameter / 2).toString());
  circle.setAttribute("cx", (diameter / 2).toString());
  circle.setAttribute("cy", (diameter / 2).toString());
  circle.setAttribute("fill", getColor(shiftedColors, generator));
  svg.appendChild(circle);

  shiftedColors.push("#ffffff");

  const shapeCount = 3;

  for (let i = 0; i < shapeCount; i++) {
    const shape = generateShape(
      generator,
      shiftedColors,
      diameter,
      i,
      shapeCount
    );

    svg.appendChild(shape);
  }

  return outputAsString ? (svg.outerHTML as any) : svg;
}

const generateShape = (
  generator: MersenneTwister,
  colors: string[],
  diameter: number,
  i: number,
  total: number
) => {
  const center = diameter / 2;
  const gap = diameter / 8;

  const size = (diameter / total) * (total - i) + gap;

  let stringId = generator.random().toString();

  let edges = parseInt(generator.random().toString().slice(-1));

  while (edges <= 3) {
    edges = parseInt(stringId.slice(-1));
    stringId = stringId.slice(0, -1);
  }

  const { path } = blobshape({
    size,
    seed: generator.random().toString(),
    edges,
  });

  const shape = document.createElement("path");

  shape.setAttribute(
    "transform",
    `translate(${
      center - size / 2 + generator.random() * (generator.random() * 10)
    }, ${center - size / 2 + generator.random() * (generator.random() * 10)})`
  );

  shape.setAttribute("d", path);
  shape.setAttribute("fill", getColor(colors, generator));

  return shape;
};

const getColor = (colors: string[], generator: MersenneTwister) => {
  const idx = Math.floor(colors.length * generator.random());
  return colors.splice(idx, 1)[0];
};

const hueShift = (colors: string[], generator: MersenneTwister) => {
  const amount = generator.random() * 30 - 30 / 2;

  return colors.map((hex: string) => colorRotate(hex, amount));
};

function colorRotate(hex: string, degrees: number) {
  const hsl = colord(hex).toHsl();
  let hue = hsl.h;

  hue = (hue + degrees) % 360;
  hue = hue < 0 ? 360 + hue : hue;
  hsl.h = hue;

  return colord(hsl).toHex();
}
