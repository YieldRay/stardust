import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-ripple")
export class SDRipple extends LitElement {
    @property({ type: Boolean, reflect: true })
    disabled = false; // 是否禁用涟漪

    @property({ type: Number })
    scale = 1; // 涟漪缩放尺寸

    style!: CSSStyleDeclaration; // forward the style property

    static styles = css`
        :host {
            display: inline-block;
            padding: 0;
            overflow: hidden;
            position: relative;
        }

        .ripple {
            position: absolute;
            box-sizing: border-box;
            border-radius: 50%;
            transform-origin: center center;
            background-color: rgba(0, 0, 0, 0.2);
            animation: ripple var(--sd-time-slow);
        }

        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            35% {
                transform: scale(0.9);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;

    @query(".container")
    container!: HTMLDivElement;
    render() {
        return html`
            <div class="container" .style=${this.style ?? nothing}>
                <slot></slot>
            </div>
        `;
    }

    protected firstUpdated() {
        this.addEventListener("click", this._handleClick);
    }

    protected _handleClick(event: MouseEvent) {
        if (this.disabled) return;
        const container = this.container;
        const ripple = document.createElement("div");
        const rect = this.getBoundingClientRect(); // calc size of :host
        const bigger = this.scale * Math.max(rect.width, rect.height);
        const left = event.clientX - rect.x;
        const top = event.clientY - rect.y;
        ripple.style.left = left - bigger / 2 + "px";
        ripple.style.top = top - bigger / 2 + "px";
        ripple.style.width = bigger + "px";
        ripple.style.height = bigger + "px";
        ripple.classList.add("ripple");
        container.append(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-ripple": SDRipple;
    }
}
