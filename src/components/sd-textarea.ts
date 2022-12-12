import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-textarea")
export class SDTextarea extends LitElement {
    @property() value = "";

    @query("textarea") private textarea!: HTMLTextAreaElement;

    render() {
        return html`
            <div class="container">
                <textarea
                    .value=${this.value}
                    @change=${() => this._handleChange()}
                    @input=${() => this._handleInput()}
                >
<slot></slot></textarea
                >
            </div>
        `;
    }

    public focus() {
        this.textarea.focus();
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
        :host(:hover) .container {
            border-color: var(--sd-color-border-active);
        }

        textarea {
            all: unset;
            height: 100%;
            margin: 0 calc(var(--padding-x) / 2);
            flex: 1;
        }

        .container {
            padding: var(--sd-length-padding);
            border: solid var(--sd-color-border) var(--sd-length-border);
            border-radius: var(--sd-length-radius);
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            max-width: 100%;
            min-height: 2em;
            resize: both;
            background: var(--sd-color-background);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-textarea": SDTextarea;
    }
}
