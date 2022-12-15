import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { classMap } from "lit/directives/class-map.js";
import stylesheet from "../stylesheet.js";

//@ts-ignore
import { SDCollapse } from "../containers/sd-collapse";
//@ts-ignore
import { SDCard } from "../components/sd-card";

/**
 * High-level component of sd-collapse
 *
 * @dependency sd-collapse
 * @dependency sd-card
 * @slot summary
 * @slot arrow
 */
@customElement("sd-detail")
export class SDDetail extends LitElement {
    @property({ type: Boolean, reflect: true }) open = false;

    static styles = [
        stylesheet,
        css`
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

            .plus {
                --plus-area: 1em;
                --plus-h: calc(var(--plus-area) * 0.1);
                --plus-w: calc(var(--plus-area) * 0.8);
                --plus-i: calc(var(--plus-area) * -0.4);
                --plus-j: calc(var(--plus-area) * -0.05);
                transition: transform var(--sd-time-normal);
                transform-origin: center center;
                width: var(--plus-area);
                height: var(--plus-area);
                position: relative;
            }
            .plus.rotated {
                transform: rotate(-45deg);
            }
            .plus::before,
            .plus::after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
            }
            .plus::before {
                width: var(--plus-w);
                margin-left: var(--plus-i);
                margin-top: var(--plus-j);
                border-top: var(--plus-h) solid;
            }
            .plus::after {
                height: var(--plus-w);
                margin-left: var(--plus-j);
                margin-top: var(--plus-i);
                border-left: var(--plus-h) solid;
            }
        `,
    ];

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
                            <slot name="arrow">
                                <div
                                    class="${classMap({
                                        plus: true,
                                        rotated: this.open,
                                    })}"
                                ></div>
                            </slot>
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
