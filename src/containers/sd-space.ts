import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-space")
export class SDSpace extends LitElement {
    static styles = css``;
    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-space": SDSpace;
    }
}
