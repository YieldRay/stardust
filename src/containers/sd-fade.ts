import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-fade")
export class SDFade extends LitElement {
    @property({ type: Boolean })
    hidden = false;

    static styles = css`
        .container {
            transition: opacity var(--sd-time-normal);
        }
        .hide {
            opacity: 0;
        }
    `;

    @query(".container")
    container!: HTMLDivElement;

    render() {
        return html`
            <div class="container">
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
        requestAnimationFrame(() => setTimeout(() => this.container.classList.remove("hide"), 0));
    }
    private _hide() {
        this.container.addEventListener("transitionend", this._transitionListener);
        this.container.classList.add("hide");
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-fade": SDFade;
    }
}
