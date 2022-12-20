import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import stylesheet from "../stylesheet.js";

/**
 *  This element should be placed inside the `<sd-tabs>` element.
 */
@customElement("sd-tab")
export class SDTab extends LitElement {
    @property({ type: Boolean, reflect: true }) active = false;

    static styles = [
        stylesheet,
        css`
            :host {
                display: inline;
            }
            div {
                padding: var(--sd-length-padding);
                border-radius: var(--sd-length-radius);
                transition: background-color, color var(--sd-time-fast);
            }
            .active {
                color: var(--sd-color-text-reverse);
                background-color: var(--sd-color-primary);
            }

            div:not(.active):hover {
                background-color: var(--sd-color-border-active);
            }
        `,
    ];

    render() {
        return html`
            <div
                class=${classMap({
                    active: this.active,
                })}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tab": SDTab;
    }
}
