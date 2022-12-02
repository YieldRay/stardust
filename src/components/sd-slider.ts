import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-slider")
export class SDSlider extends LitElement {
    static styles = css``;
    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-slider": SDSlider;
    }
}
