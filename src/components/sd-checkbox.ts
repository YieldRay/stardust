import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sd-checkbox")
export class SDCheckBox extends LitElement {
    constructor() {
        super();
        this.addEventListener("click", () => (this.checked = !this.checked));
    }

    @property({ type: Boolean, reflect: true })
    checked = false; // 是否选中

    style!: CSSStyleDeclaration; // forward the style property

    static styles = css`
        :host {
            --size: 1em;
            display: inline-block;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            overflow: hidden;
        }
        :host(:hover) > .box {
            border-color: var(--sd-color-border-active);
        }
        :host([checked]) > .box {
            background-color: var(--sd-color-primary);
            color: var(--sd-color-text-reverse);
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
        return html`
            <div class="box center" .style=${this.style ?? nothing}>
                <sd-fade .hidden=${!this.checked}> <slot>✔</slot> </sd-fade>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SDCheckBox;
    }
}
