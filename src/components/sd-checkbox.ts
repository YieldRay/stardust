import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

// @dependency
import "../containers/sd-transition-easy";

/**
 * @cssprop --size - the size of the element
 * @slot - inside the switch
 * @slot before - the label before the switch, which can trigger the switch.
 * @slot after - the label after the switch can trigger the switch.
 * @fires change - {{checked: Boolean}}
 */
@customElement("sd-checkbox")
export class SDCheckBox extends LitElement {
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;

    static styles = [
        stylesheet,
        css`
            :host {
                --size: 1em;
                --border-size: calc(var(--size) * 0.12);
                display: inline-block;
                vertical-align: baseline;
                overflow: hidden;
            }
            :host(:hover) .box {
                border-color: var(--sd-color-border-active);
            }
            :host([checked]) .box {
                background-color: var(--sd-color-primary);
            }
            :host([disabled]) {
                opacity: 0.4;
            }
            label {
                display: inline-flex;
                justify-content: center;
                align-items: center;
            }
            input {
                all: unset;
            }
            .box {
                transition: border-color var(--sd-time-fast);
                color: var(--sd-color-text-reverse);
                line-height: calc(var(--size) - 2 * var(--border-size));
                text-align: center;
                box-sizing: border-box;
                display: inline-block;
                cursor: pointer;
                width: var(--size);
                height: var(--size);
                border: solid var(--sd-color-border) var(--border-size);
                overflow: hidden;
                background: var(--sd-color-background);
            }
        `,
    ];

    @query("input") private input!: HTMLInputElement;
    render() {
        return html`
            <label class="ui">
                <input
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    @change=${() => {
                        this.checked = this.input.checked;
                        this.dispatchEvent(
                            new CustomEvent<{ checked: Boolean }>("change", { detail: { checked: this.checked } })
                        );
                    }}
                />

                <slot name="before"></slot>
                <span class="box">
                    <sd-transition-easy .state=${this.checked}>
                        <slot>✔</slot>
                    </sd-transition-easy>
                </span>
                <slot name="after"></slot>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SDCheckBox;
    }
}
