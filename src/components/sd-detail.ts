import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

//@ts-ignore
import { SDCollapse } from "../containers/sd-collapse";
//@ts-ignore
import { SDCard } from "../components/sd-card";

/**
 * @summary High-level component of sd-collapse
 * @dependency sd-collapse
 * @dependency sd-card
 */
@customElement("sd-detail")
export class SDDetail extends LitElement {
    @property({ type: Boolean, reflect: true }) open = false;

    static styles = css`
        .summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .summary,
        .detail {
            padding: var(--sd-length-padding);
        }

        .arrow {
            user-select: none;
        }
    `;

    render() {
        return html`
            <sd-card>
                <sd-collapse .expand=${this.open} @change=${(e: any) => (this.open = e.detail.expand)}>
                    <div class="summary" slot="toggle">
                        <div class="info">
                            <slot name="summary">
                                ${when(
                                    this.open,
                                    () => "collapse",
                                    () => "expand"
                                )}
                            </slot>
                        </div>
                        <div class="arrow">
                            ${when(
                                this.open,
                                () => "▲",
                                () => "▼"
                            )}
                        </div>
                    </div>
                    <div class="detail">
                        <slot></slot>
                    </div>
                </sd-collapse>
            </sd-card>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-detail": SDDetail;
    }
}
