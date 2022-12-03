import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * `--size`元素的尺寸
 */
@customElement("sd-checkbox")
export class SDCheckBox extends LitElement {
    constructor() {
        super();
        this.addEventListener("click", () => (this.checked = !this.checked));
    }
    /** 是否选中 */
    @property({ type: Boolean, reflect: true })
    checked = false;

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
        }
        .box {
            transition: border-color var(--sd-time-fast);
            color: var(--sd-color-text-reverse);
            line-height: calc(var(--size) * 0.8);
            text-align: center;
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
            <div class="box">
                <sd-fade .hidden=${!this.checked}>
                    <slot>✔</slot>
                </sd-fade>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SDCheckBox;
    }
}
