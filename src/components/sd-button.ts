import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";

@customElement("sd-button")
export class SDButton extends LitElement {
    @property({ type: Boolean })
    disabled = false;

    // forward the style property
    @property()
    style: CSSStyleDeclaration = undefined as any as CSSStyleDeclaration;

    static styles = css`
        :host{
            display:inline-block;
        }
        :host > button {
            cursor: pointer;
            display: inline-block;
        }
        :host([disabled]) > button {
            cursor: not-allowed;
            opacity: 0.6;
        }
        button {
            display: inline-block;
            color: var(--sd-color-text);
            padding: var(--sd-length-padding);
            background-color: var(--sd-color-background);
            background-clip: padding-box;
            border-radius: var(--sd-length-radius);
            border: solid transparent var(--sd-length-border);
            overflow: hidden;
        }
        button:hover{
            border: solid var(--sd-color-border) var(--sd-length-border);
        }
        button {
            position: relative;
        }
        .ripple {
            box-sizing: border-box;
            position: absolute;
            border-radius: 50%;
            transform-origin: center center;
            background-color: rgba(0, 0, 0, 0.2);
            animation: ripple 0.45s;
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
                scale(1.0)
                opacity: 0;
            }
        }
    `;

    private btnRef: Ref<HTMLButtonElement> = createRef();
    render() {
        return html`
            <button ${ref(this.btnRef)} style=${this.style}>
                <slot>button</slot>
            </button>
        `;
    }

    protected firstUpdated(): void {
        const span = this.btnRef.value!;
        span.addEventListener("click", (event) => {
            if (this.disabled) return;
            const ripple = document.createElement("div");
            const rect = span.getBoundingClientRect();
            const bigger = Math.max(rect.width, rect.height);
            const left = event.clientX - rect.x;
            const top = event.clientY - rect.y;
            ripple.style.left = left - bigger / 2 + "px";
            ripple.style.top = top - bigger / 2 + "px";
            ripple.style.width = bigger + "px";
            ripple.style.height = bigger + "px";
            ripple.classList.add("ripple");
            span.append(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button": SDButton;
    }
}
