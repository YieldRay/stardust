import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-fade")
export class SDFade extends LitElement {
    /** 是否隐藏，此属性不反映到标签属性！ */
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

    @query("#container") private container!: HTMLDivElement;

    protected firstUpdated() {
        if (this.hidden) {
            this._onTransitionEnd();
        }
    }

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

    private _onTransitionEnd = (() => {
        this.container.style.display = "none";
    }).bind(this);

    private _show() {
        this.container.style.display = "";
        this.container.removeEventListener("transitionend", this._onTransitionEnd);
        this._animate(() => this.container.classList.remove("hide"));
    }

    private _hide() {
        this.container.addEventListener("transitionend", this._onTransitionEnd);
        this._animate(() => this.container.classList.add("hide"));
    }

    private async _animate(cb: FrameRequestCallback): Promise<void> {
        await this.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        requestAnimationFrame(cb);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-fade": SDFade;
    }
}
