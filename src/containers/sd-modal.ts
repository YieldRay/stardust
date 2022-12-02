import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-modal")
export class SDModal extends LitElement {
    style!: CSSStyleDeclaration;

    static styles = css`
        :host {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    `;
    render() {
        return html` <slot></slot> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-modal": SDModal;
    }
}
