import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";


/**
 * @summary 此元素应置于 <sd-tabs> 元素内
 */
@customElement("sd-tab")
export class SDTab extends LitElement {
    @property({ type: Boolean, reflect: true }) active = false;

    static styles = css`
        :host {
            display: inline;
        }
        div {
            padding: var(--sd-length-padding);
        }
        .active {
            color: var(--sd-color-text-reverse);
            background-color: var(--sd-color-primary);
            border-radius: var(--sd-length-radius);
        }
    `;
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
