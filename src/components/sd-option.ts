import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-option")
export class SDOption extends LitElement {
    static styles = css``;

    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-option": SDOption;
    }
}
