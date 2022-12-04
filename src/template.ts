import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

//! 此文件只是一个模板
@customElement("sd-xxx")
export class SDxxx extends LitElement {
    static styles = css``;

    render() {
        html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-xxx": SDxxx;
    }
}
