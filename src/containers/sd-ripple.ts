import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-ripple")
export class SDRipple extends LitElement {
    /**
     * 是否禁用涟漪
     * 一般用于容器内部元素禁用时禁用涟漪
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /**
     * 涟漪缩放尺寸，默认为1
     * 默认情况下涟漪的直径为元素宽高中较大的一个
     */
    @property({ type: Number }) scale = 1;

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

    @query("#container") private container!: HTMLDivElement;

    render() {
        return html`
            <div id="container" .style=${this.style ?? nothing}>
                <slot @slotchange=${() => this.removeRipple()}></slot>
            </div>
        `;
    }

    protected firstUpdated() {
        this.addEventListener("click", this._handleClick);
    }

    private _handleClick(event: MouseEvent) {
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
        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });
    }

    /**
     * 移除所有涟漪效果
     */
    public removeRipple() {
        this.renderRoot.querySelectorAll(".ripple").forEach((e) => e.remove());
    }

    protected updated() {
        this.removeRipple();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-ripple": SDRipple;
    }
}
