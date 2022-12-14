import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import { SDRipple } from "../containers/sd-ripple";

/**
 * @dependency sd-ripple
 */
@customElement("sd-button")
export class SDButton extends LitElement {
    /**  是否禁用按钮 */
    @property({ type: Boolean, reflect: true }) disabled = false;

    static styles = css`
        :host {
            display: inline-flex; /* 消除空字符空间 */
            vertical-align: baseline;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }
        :host > .container {
            cursor: pointer;
            display: inline-block;
        }
        :host([disabled]) > .container {
            cursor: not-allowed;
            opacity: 0.6;
        }
        .container {
            font-family: inherit;
            transition: border-color var(--sd-time-normal);
            padding: var(--sd-length-padding);
            color: var(--sd-color-text-reverse);
            background-color: var(--sd-color-primary);
            background-clip: padding-box;
            border-radius: var(--sd-length-radius);
            border: solid transparent var(--sd-length-border);
            overflow: hidden;
        }
        .container:hover {
            border: solid var(--sd-color-border) var(--sd-length-border);
        }
    `;

    render() {
        return html`<sd-ripple class="container"><slot></slot></sd-ripple>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button": SDButton;
    }
}
