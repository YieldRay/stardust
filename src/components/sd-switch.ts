import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";

@customElement("sd-switch")
export class SDSwitch extends LitElement {
    @property({ type: Boolean })
    checked = false;

    // forward the style property
    @property()
    style: CSSStyleDeclaration = undefined as any as CSSStyleDeclaration;

    static styles = css`
        :host {
            display: inline-block;
            overflow: hidden;
            vertical-align: text-bottom;
            --width: 2em;
            --height: 1em;
            --border: 0.1em;
            --time: 0.3s;
            --ball-size: calc(var(--height) - var(--border) * 2);
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
        }
        .box {
            box-sizing: border-box;
            display: inline-block;
            cursor: pointer;
            user-select: none;
            width: var(--width);
            height: var(--height);
            overflow: hidden;
            border-radius: var(--height);
            border: solid var(--sd-color-border) var(--border);
            position: relative;
        }

        .ball {
            width: var(--ball-size);
            height: var(--ball-size);
            overflow: hidden;
            border-radius: var(--ball-size);
            background-color: var(--sd-color-background);
            position: absolute;
            top: 0;
        }

        .slot-outer {
            width: var(--ball-size);
            height: var(--ball-size);
            position: absolute;
            overflow: hidden;
            left: 0;
            top: 0;
            transition: left var(--time) ease-in;
        }
        .slot-inner {
            transform: scale(0.6);
        }

        .to-left {
            animation: var(--time) ease-in 0s forwards toLeft;
        }
        .to-right {
            animation: var(--time) ease-in 0s forwards toRight;
        }

        @keyframes toRight {
            from {
                left: 0;
            }
            90% {
                width: var(--width);
                left: 0;
            }
            to {
                width: var(--ball-size);
                left: calc(var(--width) - 50% - var(--border));
            }
        }
        @keyframes toLeft {
            from {
                left: calc(var(--width) - 50% - var(--border));
            }
            10% {
                width: var(--width);
            }
            to {
                width: var(--ball-size);
                left: 0;
            }
        }
    `;

    ballRef = createRef<HTMLDivElement>();

    render() {
        return html`<div class="box" style=${this.style}>
            <div class="ball" ${ref(this.ballRef)}></div>
            <div
                class="slot-outer center"
                style=${this.checked ? `left: calc(var(--width) - 50% - var(--border))` : nothing}
            >
                <div class="slot-inner">
                    <slot></slot>
                </div>
            </div>
        </div>`;
    }

    protected firstUpdated(): void {
        this.addEventListener("click", () => {
            this.checked = !this.checked;
            const ball = this.ballRef.value!;
            if (this.checked) {
                ball.classList.remove("to-left");
                if (!ball.classList.contains("to-right")) ball.classList.add("to-right");
            } else {
                ball.classList.remove("to-right");
                if (!ball.classList.contains("to-left")) ball.classList.add("to-left");
            }
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-switch": SDSwitch;
    }
}
