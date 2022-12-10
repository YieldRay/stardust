import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * @slot before - 输入框内部，文本前方
 * @slot after - 输入框内部，文本后方
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

    @query("input") private input!: HTMLInputElement;
    render() {
        return html`
            <div class="container">
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

    static styles = css`
        :host {
            --padding-x: calc(var(--sd-length-radius) / 2);
        }
        input {
            all: unset;
            height: 100%;
            margin: 0 calc(var(--padding-x) / 2);
        }
        .container {
            border: solid var(--sd-color-border) var(--sd-length-border);
            border-radius: var(--padding-x);
            overflow: hidden;
            display: inline-flex;
        }
        :host(:hover) .container {
            border-color: var(--sd-color-border-active);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-input": SDInput;
    }
}
