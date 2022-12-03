import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";


/**
 * `slot=header`
 * `slot=footer`
 */
@customElement("sd-card")
export class SDCard extends LitElement {
    static styles = css`
        .container {
            transition: border-color var(--sd-time-normal);
            border-radius: var(--sd-length-radius);
            color: var(--sd-color-text);
            background-color: var(--sd-color-secondary);
            border: solid var(--sd-color-border) var(--sd-length-border);
        }
        .header {
        }
        .body {
            padding: var(--sd-length-padding);
        }
        .footer {
        }
    `;

    render() {
        return html`
            <div class="container">
                <div class="header">
                    <slot name="header"></slot>
                </div>
                <div class="body">
                    <slot></slot>
                </div>
                <div class="footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-card": SDCard;
    }
}
