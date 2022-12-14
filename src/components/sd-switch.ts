import { LitElement, css, html, nothing, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

/**
 * @cssprop --size - 元素的尺寸，即高度
 * @cssprop --scale - 元素的宽高比，高度即为 --size * --scale
 * @slot - 开关内部
 * @slot before - 开关前的标签，可以触发开关
 * @slot after - 开关后的标签，可以触发开关
 * @fires change - {{checked: Boolean}}
 */
@customElement("sd-switch")
export class SDSwitch extends LitElement {
    /** 是否选中 */
    @property({ type: Boolean, reflect: true }) checked = false;
    /** 是否禁用 */
    @property({ type: Boolean, reflect: true }) disabled = false;

    @state() isInit = true;

    static styles = css`
        :host {
            display: inline-block;
            vertical-align: text-bottom;
            overflow: hidden;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            --size: 1em;
            --scale: 1.75;
            /*! NEVER CHANGE ABOVE CSS PROPERTY OUTSIDE, THEY ARE CALCULATED !*/
            --height: var(--size);
            --width: calc(var(--size) * var(--scale));
            --border: calc(var(--height) * 0.12);
            --duration: var(--sd-time-normal);
            --ball-size: calc(var(--height) - var(--border) * 2);
            --distance: calc(var(--width) - var(--ball-size) - 2 * var(--border));
        }

        :host(:hover) .box {
            border-color: var(--sd-color-border-active);
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
            box-sizing: border-box;
            display: inline-block;
            cursor: pointer;
            user-select: none;
            color: var(--sd-color-text-reverse);
            width: var(--width);
            height: var(--height);
            overflow: hidden;
            border-radius: var(--height);
            border: solid var(--sd-color-border) var(--border);
            background: var(--sd-color-background);
            position: relative;
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
        }

        #ball {
            position: absolute;
            width: var(--ball-size);
            height: var(--ball-size);
            overflow: hidden;
            border-radius: var(--ball-size);
            background-color: var(--sd-color-primary);
            top: 0;
        }

        #slotOuter {
            width: var(--ball-size);
            height: var(--ball-size);
            position: absolute;
            overflow: hidden;
            left: 0;
            top: 0;
            transition: left var(--duration) ease-in-out;
        }

        #slotInner {
            font-size: calc(var(--ball-size) * 0.75);
        }

        .to-left {
            animation: var(--duration) ease-in-out 0s forwards toLeft;
        }
        .to-right {
            animation: var(--duration) ease-in-out 0s forwards toRight;
        }

        @keyframes toRight {
            from {
                left: 0;
            }
            50% {
                width: var(--width);
                left: 0;
            }
            to {
                width: var(--ball-size);
                left: var(--distance);
            }
        }
        @keyframes toLeft {
            from {
                left: var(--distance);
            }
            50% {
                width: var(--width);
                left: 0;
            }
            to {
                width: var(--ball-size);
                left: 0;
            }
        }
    `;

    @query("#ball") private ballElem!: HTMLDivElement;

    @query("input") private input!: HTMLInputElement;

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

                <slot name="before"></slot>
                <span class="box">
                    <div id="ball"></div>
                    <div id="slotOuter" class="center" .style=${this.checked ? `left: var(--distance)` : nothing}>
                        <div id="slotInner">
                            <slot></slot>
                        </div>
                    </div>
                </span>
                <slot name="after"></slot>
            </label>
        `;
    }

    protected updated(changedProperties: PropertyValueMap<this>): void {
        // the first time the component is shown, do not run the animation
        if (this.isInit) return;
        // react to the `checked` prop
        if (changedProperties.has("checked")) {
            const ball = this.ballElem;
            if (this.checked) {
                ball.classList.remove("to-left");
                if (!ball.classList.contains("to-right")) ball.classList.add("to-right");
            } else {
                ball.classList.remove("to-right");
                if (!ball.classList.contains("to-left")) ball.classList.add("to-left");
            }
        }
    }

    protected firstUpdated() {
        const ball = this.ballElem;
        ball.style.left = this.checked ? "var(--distance)" : "0";
        // updated() is called after firstUpdated()
        // so we set isInit=false in next render
        requestAnimationFrame(() => (this.isInit = false));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-switch": SDSwitch;
    }
}
