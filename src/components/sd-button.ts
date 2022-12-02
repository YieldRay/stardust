import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { SDRipple } from "../containers/sd-ripple";

@customElement("sd-button")
export class SDButton extends LitElement {
    @property({ type: Boolean, reflect: true })
    disabled = false; // 是否禁用按钮

    style!: CSSStyleDeclaration; // forward the style property

    static styles = css`
        :host {
            display: inline-block;
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
            color: var(--sd-color-text-reverse);
            padding: var(--sd-length-padding);
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

    @query(".container")
    container!: SDRipple;
    render() {
        return html`
            <sd-ripple class="container" .style=${this.style ?? nothing}>
                <slot></slot>
            </sd-ripple>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button": SDButton;
    }
}
