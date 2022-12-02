import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-card")
export class SDCard extends LitElement {
    static styles = css``;
    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-card": SDCard;
    }
}
