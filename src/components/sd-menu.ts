import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-menu")
export class SDMenu extends LitElement {
    static styles = css``;
    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-menu": SDMenu;
    }
}
