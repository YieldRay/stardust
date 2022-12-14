import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";

@customElement("sd-option")
export class SDOption extends LitElement {
    static styles = css`
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
    `;
    @property() value = "";
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) checkbox = false;

    render() {
        return html`
            <div class="container ${classMap({ disabled: this.disabled })}">
                <span><slot></slot></span>
                ${when(
                    this.checkbox,
                    () => html`
                        <span>
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
