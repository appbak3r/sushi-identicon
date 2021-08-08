import { generateIdentIcon } from "../src";

const root = document.getElementById("root");

for (let i = 0; i < 50; i++) {
  const icon = generateIdentIcon(i.toString());

  const div = document.createElement("div");

  div.appendChild(icon);
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.borderRadius = "50%";
  div.style.display = "inline-block";
  div.style.overflow = "hidden";

  root.appendChild(div);
}
