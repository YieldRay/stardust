import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

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

    static styles = [
        stylesheet,
        css`
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
                background-color: rgba(0, 0, 0, 0.1);
                opacity: 0;
                transform: scale(0);
            }
            .animate {
                opacity: 1;
                transform: scale(1);
            }
        `,
    ];

    @query("#container") private container!: HTMLDivElement;

    render() {
        return html`
            <div id="container">
                <slot @slotchange=${() => this.removeRipple()}></slot>
            </div>
        `;
    }

    protected firstUpdated() {
        this.addEventListener("mousedown", this._handleMouseDown);
    }

    private _genRipple(e: MouseEvent) {
        const ripple = document.createElement("div");
        const rect = this.getBoundingClientRect(); // calc size of :host
        const size = this.scale * Math.max(rect.width, rect.height);
        const left = e.clientX - rect.x;
        const top = e.clientY - rect.y;
        ripple.style.left = left - size / 2 + "px";
        ripple.style.top = top - size / 2 + "px";
        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.transition = `all cubic-bezier(0,1.12,0,1) 60s`;
        ripple.classList.add("ripple");
        return ripple;
    }

    private _handleMouseDown(event: MouseEvent) {
        if (this.disabled) return;
        const container = this.container;
        const ripple = this._genRipple(event);
        container.append(ripple);
        const remove = () => ripple.remove();
        ripple.addEventListener("transitionend", remove);
        requestAnimationFrame(() => ripple.classList.add("animate"));
        window.addEventListener("mouseup", () => {
            ripple.classList.remove("animate");
            ripple.style.transition = "all cubic-bezier(0,1.21,.81,.95) var(--sd-time-slow)";
            requestAnimationFrame(() => {
                ripple.classList.add("animate");
            });
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
