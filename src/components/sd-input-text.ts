import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import stylesheet from "../stylesheet.js";

/**
 * @fires change - {{value: String}}
 * @fires input - {{value: String}}
 */
@customElement("sd-input-text")
export class SDInputText extends LitElement {
    @property()
    get value() {
        if (!this.input) return "";
        return this.input.value ?? "";
    }
    set value(v) {
        this.input.value = v;
    }
    @property() placeholder = "";

    @property() label = "input";

    @property({ type: Boolean, reflect: true }) disabled = false;

    @state() _focus = false;

    static styles = [
        stylesheet,
        css`
            :host {
                --font-size: 1em;
                font-size: var(--font-size);
                display: inline-block;
            }
            :host([disabled]) {
                opacity: 0.6;
                pointer-events: none;
                user-select: none;
            }
            .container {
                overflow: hidden;
                display: inline-flex;
                vertical-align: middle;
                align-items: center;
                transition: all var(--sd-time-normal);
                border: solid var(--sd-color-border-active) var(--sd-length-border);
                border-radius: calc(var(--sd-length-radius) / 2);
                background-color: var(--sd-color-border);
            }
            .container:hover {
                background-color: var(--sd-color-border-active);
            }

            .input {
                /* the inner container */
                position: relative;
            }
            .slot {
                padding: 0 var(--sd-length-padding-y);
            }
            input {
                all: unset;
                display: inline-block;
                height: calc(var(--font-size) + var(--sd-length-padding-y));
                padding-top: var(--font-size);
                padding-right: var(--sd-length-padding-x);
                flex: 1;
            }
            .label {
                pointer-events: none;
                transition: all var(--sd-time-fast);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                opacity: 0.8;
            }
            .label-up {
                top: 0.5em;
                font-size: smaller;
                opacity: 0.6;
            }
        `,
    ];

    @query("input") private input!: HTMLInputElement;
    render() {
        return html`
            <div class="container border theme">
                <span class="slot">
                    <slot></slot>
                </span>
                <div class="input">
                    <input
                        type="text"
                        placeholder=${this.placeholder}
                        .value=${this.value}
                        @change=${() => this._handleChange()}
                        @input=${() => this._handleInput()}
                        @focus=${() => (this._focus = true)}
                        @blur=${() => (this._focus = this.value.length > 0 || false)}
                    />
                    <div
                        class=${classMap({
                            label: true,
                            "label-up": this._focus,
                        })}
                    >
                        ${this.label}
                    </div>
                </div>
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
        "sd-input-text": SDInputText;
    }
}
