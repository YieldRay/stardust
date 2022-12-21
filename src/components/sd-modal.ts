import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

/**
 * A center placed modal with default background
 */
@customElement("sd-modal")
export class SDModal extends LitElement {
    static styles = [
        stylesheet,
        css`
            .container {
                max-height: 100vh;
                max-width: 100vw;
                box-shadow: 1px 1px 2px var(--sd-color-shadow), -1px -1px 2px var(--sd-color-shadow);
                border-radius: 3px;
                overflow: auto;
            }
        `,
    ];

    @property({ type: Boolean }) open = false;
    render() {
        return html`
            <sd-float fixed position="center-center">
                <sd-transition-easy
                    .state=${this.open}
                    .enter=${{ opacity: "1", transform: "translateY(0)", display: "block" }}
                    .leave=${{ opacity: "0", transform: "translateY(0.25em)" }}
                    .begin=${{ display: "block" }}
                    .end=${{ display: "block" }}
                >
                    <div class="container theme">
                        <slot></slot>
                    </div>
                </sd-transition-easy>
            </sd-float>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-modal": SDModal;
    }
}
