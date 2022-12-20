import { LitElement, css, html, nothing, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

/**
* @cssprop --size - the size of the element, i.e. the height
* @cssprop --scale - the aspect ratio of the element, and the height is `--size * --scale`.
* @slot - inside the switch
* @slot before - the label before the switch, which can trigger the switch.
* @slot after - the label after the switch can trigger the switch.
* @fires change - {{checked: Boolean}}
*/
@customElement("sd-switch")
export class SDSwitch extends LitElement {
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;

    static styles = [
        stylesheet,
        css`
            :host {
                display: inline-block;
                vertical-align: baseline;
                overflow: hidden;
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
        `,
    ];

    @query("#ball") private ballElem!: HTMLDivElement;

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

    @state() isInit = true;

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
