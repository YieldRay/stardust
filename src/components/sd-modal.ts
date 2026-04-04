import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

// @dependency
import "../containers/sd-float";

/**
 * A center placed modal with default background
 */
@customElement("sd-modal")
export class SDModal extends LitElement {
    static styles = [
        stylesheet,
        css`
            :host {
                display: contents;
            }
            .backdrop {
                display: none;
                position: fixed;
                inset: 0;
                z-index: 1000;
                background: rgba(0, 0, 0, 0.4);
            }
            :host([open]) .backdrop {
                display: block;
            }
            .container {
                max-height: 100vh;
                max-width: 100vw;
                overflow: auto;
            }
        `,
    ];

    @property({ type: Boolean, reflect: true }) open = false;

    connectedCallback() {
        super.connectedCallback();
        this._onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") this.open = false;
        };
        document.addEventListener("keydown", this._onKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("keydown", this._onKeyDown);
    }

    private _onKeyDown!: (e: KeyboardEvent) => void;

    render() {
        return html`
            <div class="backdrop"></div>
            <sd-float fixed position="center-center" style="z-index:1001">
                <sd-transition-easy
                    .state=${this.open}
                    .enter=${{ opacity: "1", transform: "translateY(0)", display: "block" }}
                    .leave=${{ opacity: "0", transform: "translateY(0.25em)" }}
                    .begin=${{ display: "block" }}
                    .end=${{ display: "none" }}
                >
                    <div class="container">
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
