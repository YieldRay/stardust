import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import stylesheet from "../stylesheet.js";

// @dependency
import "../containers/sd-ripple";

/**
 * @cssprop --size - default=2em
 */
@customElement("sd-button")
export class SDButton extends LitElement {
    /**  是否禁用按钮 */
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) rounded = false;

    static styles = [
        stylesheet,
        css`
            :host {
                display: inline-flex; /* 消除空字符空间 */
                vertical-align: middle;
                margin: 0;
                padding: 0;
                --size: 2em;
            }

            :host([disabled]) > .container {
                cursor: not-allowed;
                opacity: 0.6;
            }
            .container {
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                transition: border-color var(--sd-time-normal);
                padding: var(--sd-length-padding);
                color: var(--sd-color-text-reverse);
                background-color: var(--sd-color-primary);
                background-clip: padding-box;
                border-radius: var(--sd-length-radius);
                border: solid transparent var(--sd-length-border);
                overflow: hidden;
                box-sizing: border-box;
                height: var(--size);
            }
            .container:hover {
                border: solid var(--sd-color-border) var(--sd-length-border);
            }
            .rounded {
                border-radius: var(--size);
                height: var(--size);
                width: var(--size);
            }
        `,
    ];

    render() {
        return html`<sd-ripple class="container ui ${classMap({ rounded: this.rounded })}">
            <span>
                <slot></slot>
            </span>
        </sd-ripple>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button": SDButton;
    }
}
