export const applyPolyfill = () => {
  if (typeof window === "undefined") {
    // @ts-ignore
    const { JSDOM } = require("jsdom");

    // @ts-ignore
    global.document = new JSDOM().window.document;
  }
};
