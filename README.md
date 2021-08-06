# Sushi Identicon

Yet another tiny identicon library.

Get Sushi identicon as SVG.

![Example](https://raw.githubusercontent.com/appbak3r/sushi-identicon/main/demo/example.png)

## Usage

### Install

```sh
npm install @appbak3r/sushi-identicon
```

Or with yarn

```sh
yarn add @appbak3r/sushi-identicon
```

#### Output as a SVG Element

```ts
import { generateIdentIcon } from "@appbak3r/sushi-identicon";

document.body.appendChild(generateIdentIcon("hash"));
```

#### Output as a string

```tsx
import { generateIdentIcon } from "@appbak3r/sushi-identicon";

export const App = () => {
  const svgString = generateIdentIcon("hash", true);

  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
