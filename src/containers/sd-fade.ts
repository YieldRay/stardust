import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-fade")
export class SDFade extends LitElement {
    /** 是否隐藏，此属性不能反映到标签属性！ */
    @property({ type: Boolean }) hidden = false;

    static styles = css`
        #container {
            transition: opacity var(--sd-time-normal);
            max-width: 100%;
            max-height: 100%;
        }
        .hide {
            opacity: 0;
        }
    `;

    @query("#container") container!: HTMLDivElement;

    render() {
        return html`
            <div id="container">
                <slot></slot>
            </div>
        `;
    }

    protected updated() {
        if (this.hidden) {
            this._hide();
        } else {
            this._show();
        }
    }

    private _transitionListener = (() => {
        this.container.style.display = "none";
    }).bind(this);

    private _show() {
        this.container.style.display = "";
        this.container.removeEventListener("transitionend", this._transitionListener);
        animate(() => this.container.classList.remove("hide"));
    }
    private _hide() {
        this.container.addEventListener("transitionend", this._transitionListener);
        animate(() => this.container.classList.add("hide"));
    }
}

function animate(cb: FrameRequestCallback) {
    setTimeout(() => {
        requestAnimationFrame(cb);
    }, 0);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-fade": SDFade;
    }
}
