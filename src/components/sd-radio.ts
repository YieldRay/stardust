import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";
import stylesheet from "../stylesheet.js";

/**
 * @cssprop --size
 * @fires change
 */
@customElement("sd-radio")
export class SDRadio extends LitElement {
    @property({ type: Boolean }) checked = false;
    @property() position: "left" | "right" = "right";
    @property() value = "";

    static styles = [
        stylesheet,
        css`
            :host {
                --size: 1em;
            }
            .container {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }

            .radio {
                width: var(--size);
                height: var(--size);
                border-radius: var(--size);
                margin: 0 0.25em;
                box-sizing: border-box;
                border: solid calc(var(--size) * 0.2) var(--sd-color-border);
                transition: all var(--sd-time-fast);
            }

            .checked {
                border: solid calc(var(--size) * 0.4) var(--sd-color-primary);
            }
        `,
    ];

    render() {
        const slot = (pos: string) => when(this.position === pos, () => html`<span class="text"><slot></slot></span>`);

        return html`
            <div class="container ui" @click=${this._handleClick}>
                ${slot("left")}
                <span
                    class=${classMap({
                        radio: true,
                        checked: this.checked,
                    })}
                >
                </span>
                ${slot("right")}
            </div>
        `;
    }

    @property({ type: Boolean }) inGroup = false;
    private _handleClick() {
        if (this.inGroup) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.checked, value: this.value } }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-radio": SDRadio;
    }
}
