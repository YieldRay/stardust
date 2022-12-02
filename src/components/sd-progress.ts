import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-progress")
export class SDProgress extends LitElement {
    static styles = css``;
    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-progress": SDProgress;
    }
}
