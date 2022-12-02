import { LitElement, css, html, nothing, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("sd-switch")
export class SDSwitch extends LitElement {
    @property({ type: Boolean, reflect: true })
    checked = false; // 是否选中

    style!: CSSStyleDeclaration; // forward the style property

    @state()
    isInit = true;

    static styles = css`
        :host {
            display: inline-block;
            overflow: hidden;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            vertical-align: text-bottom;
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
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
        }
        :host(:hover) > .box {
            border-color: var(--sd-color-border-active);
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
            position: relative;
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

        .slot-outer {
            width: var(--ball-size);
            height: var(--ball-size);
            position: absolute;
            overflow: hidden;
            left: 0;
            top: 0;
            transition: left var(--duration) ease-in-out;
        }
        .slot-inner {
            transform: scale(0.75);
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

    @query("#ball")
    ballElem!: HTMLDivElement;
    render() {
        return html`
            <div class="box" .style=${this.style ?? nothing} @click=${() => (this.checked = !this.checked)}>
                <div id="ball"></div>
                <div class="slot-outer center" .style=${this.checked ? `left: var(--distance)` : nothing}>
                    <div class="slot-inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
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
