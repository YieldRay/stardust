import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { classMap } from "lit/directives/class-map.js";
import stylesheet from "../stylesheet.js";

/**
 * @slot -
 * @slot loading -
 */
@customElement("sd-loading")
export class SDLoading extends LitElement {
    @property({ type: Boolean }) loading = true;

    static styles = [
        stylesheet,
        css`
            .container {
                position: relative;
                transition: all var(--sd-time-normal);
            }
            .opacity {
                opacity: 0.4;
                cursor: progress;
            }

            .loading {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        `,
    ];

    render() {
        return html`
            <div class="container">
                ${when(this.loading, () => html`<div class="loading"><slot name="loading"></slot></div>`)}
                <div class="${classMap({ opacity: this.loading })}">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-loading": SDLoading;
    }
}
