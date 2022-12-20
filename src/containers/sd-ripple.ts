import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

@customElement("sd-ripple")
export class SDRipple extends LitElement {
    /**
     * Whether ripple is disabled.
     * Generally used to disable ripples when the elements inside the container are disabled.
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /**
     * ripple scaling size, the default scale is 1.
     * By default, the diameter of the ripple is the larger one of the width and height of the container element.
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

    private _globalMouseUp = () => {
        const ripples = this.renderRoot.querySelectorAll(".ripple.animate");
        if (!ripples) return;
        const ripple = ripples[ripples.length - 1];
        if (!(ripple instanceof HTMLElement)) return;
        ripple.classList.remove("animate");
        ripple.style.transition = "all cubic-bezier(0,1.21,.81,.95) var(--sd-time-slow)";
        requestAnimationFrame(() => {
            ripple.classList.add("animate");
            setTimeout(() => (ripple.ontransitioncancel = () => ripple.remove()), 100);
        });
    };

    disconnectedCallback() {
        window.removeEventListener("mouseup", this._globalMouseUp);
    }

    private _handleMouseDown(event: MouseEvent) {
        if (this.disabled) return;
        const container = this.container;
        const ripple = this._genRipple(event);
        container.append(ripple);
        const remove = () => ripple.remove();
        ripple.addEventListener("transitionend", remove);
        requestAnimationFrame(() => ripple.classList.add("animate"));
        window.addEventListener("mouseup", this._globalMouseUp);
    }

    /**
     * Remove all ripple effects
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
