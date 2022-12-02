import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { SDRipple } from "../containers/sd-ripple";

@customElement("sd-button")
export class SDButton extends LitElement {
    @property({ type: Boolean })
    disabled = false;

    // forward the style property
    style!: CSSStyleDeclaration;

    static styles = css`
        :host {
            display: inline-block;
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
            color: var(--sd-color-text);
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
