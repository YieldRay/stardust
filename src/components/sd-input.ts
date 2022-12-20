import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

/**
* @slot before - inside the input box, in front of the text
* @slot after - inside the input box, behind the text
 * @fires change - {{value: String}}
 * @fires input - {{value: String}}
 */
@customElement("sd-input")
export class SDInput extends LitElement {
    @property() type = "text";

    @property()
    get value() {
        if (!this.input) return "";
        return this.input.value ?? "";
    }
    set value(v) {
        this.input.value = v;
    }
    @property() placeholder = "";

    static styles = [
        stylesheet,
        css`
            input {
                all: unset;
                height: 100%;
                margin: 0 calc(var(--padding-x) / 2);
                padding: var(--sd-length-padding);
                flex: 1;
            }
            .container {
                overflow: hidden;
                display: inline-flex;
                vertical-align: middle;
                align-items: center;
            }
        `,
    ];

    @query("input") private input!: HTMLInputElement;
    render() {
        return html`
            <div class="container border theme">
                <slot name="before"></slot>
                <input
                    .value=${this.value}
                    .type=${this.type}
                    @change=${() => this._handleChange()}
                    @input=${() => this._handleInput()}
                    placeholder=${this.placeholder}
                />
                <slot name="after"></slot>
            </div>
        `;
    }

    public focus() {
        this.input.focus();
    }

    private _handleChange() {
        const value = this.value;
        this.dispatchEvent(new CustomEvent<{ value: string }>("change", { detail: { value } }));
    }
    private _handleInput() {
        const value = this.value;
        this.dispatchEvent(new CustomEvent<{ value: string }>("change", { detail: { value } }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-input": SDInput;
    }
}
