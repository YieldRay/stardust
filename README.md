# StarDust

A web components library built with [Lit 3](https://lit.dev). All components are custom elements prefixed with `sd-`.

## Development

```sh
npm install
npm run dev          # docs dev server with HMR
npm run build        # build library → dist/
npm run build:docs   # build docs site → docs-dist/
```

## Usage

Import the bundle:

```html
<script type="module" src="dist/stardust.js"></script>
```

Then use the elements:

```html
<sd-button>Click me</sd-button> <sd-input placeholder="Type here..."></sd-input>
```

## Dark mode

Add `data-dark-mode` to any ancestor element (typically `<html>`):

```js
document.documentElement.setAttribute("data-dark-mode", "");
```
