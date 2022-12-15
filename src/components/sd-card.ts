import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

/**
 * @slot header - 卡片首部
 * @slot footer - 卡片尾部
 */
@customElement("sd-card")
export class SDCard extends LitElement {
    static styles = [
        stylesheet,
        css`
            .container {
                background-color: var(--sd-color-secondary);
            }
            .header {
            }
            .body {
                padding: var(--sd-length-padding);
                word-break: break-word;
            }
            .footer {
                word-break: break-word;
            }
        `,
    ];

    render() {
        return html`
            <div class="container border theme">
                <div class="header ellipsis">
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
