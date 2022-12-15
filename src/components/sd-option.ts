import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";
import stylesheet from "../stylesheet.js";

@customElement("sd-option")
export class SDOption extends LitElement {
    @property() value = "";
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) checkbox = false;

    static styles = [
        stylesheet,
        css`
            :host {
                width: 100%;
                height: 100%;
            }
            .container {
                white-space: nowrap;
                overflow: hidden;
                padding: var(--sd-length-padding);
                transition: all var(--sd-time-fast);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .disabled {
                opacity: 0.5;
                pointer-events: none;
            }
        `,
    ];

    render() {
        return html`
            <div class=${classMap({ container: true, ui: true, disabled: this.disabled })}>
                <span class="ellipsis"><slot></slot></span>
                ${when(
                    this.checkbox,
                    () => html`
                        <span style="margin-left:.25em;flex-shrink:0;">
                            <sd-checkbox
                                .checked=${this.selected}
                                @click=${(e: Event) => e.preventDefault()}
                            ></sd-checkbox>
                        </span>
                    `
                )}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-option": SDOption;
    }
}
