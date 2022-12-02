import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-tabs")
export class SDTabs extends LitElement {
    static styles = css``;
    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tabs": SDTabs;
    }
}
