import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * @cssproperty --size 元素的尺寸
 * @slot 开关内部
 * @slot label-before 开关前的标签，可以触发开关
 * @slot label-after 开关后的标签，可以触发开关
 * @event change {{checked: Boolean}}
 */
@customElement("sd-checkbox")
export class SDCheckBox extends LitElement {
    /** 是否选中 */
    @property({ type: Boolean, reflect: true }) checked = false;
    /** 是否禁用 */
    @property({ type: Boolean, reflect: true }) disabled = false;

    static styles = css`
        :host {
            --size: 1em;
            --border-size: calc(var(--size) * 0.12);
            display: inline-block;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
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
            user-select: none;
            width: var(--size);
            height: var(--size);
            border: solid var(--sd-color-border) var(--border-size);
            overflow: hidden;
        }
    `;

    @query("input")
    input!: HTMLInputElement;
    render() {
        return html`
            <label>
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

                <slot name="label-before"></slot>
                <span class="box">
                    <sd-fade .hidden=${!this.checked}>
                        <slot>✔</slot>
                    </sd-fade>
                </span>
                <slot name="label-after"></slot>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SDCheckBox;
    }
}
