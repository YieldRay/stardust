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
    style!: CSSStyleDeclaration;

    static styles = css`
        :host {
            --size: 1em;
            display: inline-block;
            overflow: hidden;
        }
        :host(:hover) > .box {
            border-color: var(--sd-color-border-active);
        }
        .box {
            transition: border-color var(--sd-time-fast);
            box-sizing: border-box;
            display: inline-block;
            cursor: pointer;
            user-select: none;
            width: var(--size);
            height: var(--size);
            border: solid var(--sd-color-border) calc(var(--size) * 0.12);
            overflow: hidden;
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;

    render() {
        return html`<div class="box center" .style=${this.style ?? nothing}>
            ${this.checked ? html`<slot>✔</slot>` : nothing}
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SDCheckBox;
    }
}
