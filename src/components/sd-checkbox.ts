import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sd-checkbox")
export class SDCheckBox extends LitElement {
    constructor() {
        super();
        this.addEventListener("click", () => (this.checked = !this.checked));
    }

    @property({ type: Boolean })
    checked = false;

    // forward the style property
    @property()
    style!: CSSStyleDeclaration;

    static styles = css`
        :host {
            display: inline-block;
            overflow: hidden;
        }
        .box {
            box-sizing: border-box;
            display: inline-block;
            cursor: pointer;
            user-select: none;
            width: 1em;
            height: 1em;
            border: solid var(--sd-color-border) 0.1em;
            overflow: hidden;
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;

    render() {
        return html`<div class="box center" style=${this.style}>${this.checked ? html`<slot>✔</slot>` : nothing}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SDCheckBox;
    }
}
