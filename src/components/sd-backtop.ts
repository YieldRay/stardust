import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { query } from "lit/decorators.js";

import { debounce } from "froebel/function";

@customElement("sd-backtop")
export class SDBackTop extends LitElement {
    // 滚动的阈值，在此阈值之内元素将隐藏
    @property({ type: Number })
    threshold = 25;

    static styles = css`
        .container {
            position: fixed;
            right: 1em;
            bottom: 1em;
            cursor: pointer;
            max-width: 2em;
            max-height: 2em;
            border-radius: 50%;
            transition: opacity 0.3s;
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .default {
            width: 2em;
            height: 2em;
            box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), -1px 1px 1px rgba(0, 0, 0, 0.2);
            border-radius: 50%;
        }
    `;

    @query(".container")
    container!: HTMLDivElement;

    render() {
        return html`
            <div class="container center">
                <slot>
                    <div class="default center">▲</div>
                </slot>
            </div>
        `;
    }

    private _transitionListener = () => {
        this.container.style.display = "none";
    };

    private _scrollListener() {
        console.log(window.scrollY);
        if (window.scrollY > this.threshold) {
            // show
            this.container.removeEventListener("transitionend", this._transitionListener);
            this.container.style.display = "";
            requestAnimationFrame(() => (this.container.style.opacity = "1"));
        } else {
            // hide
            this.container.style.opacity = "0";
            this.container.addEventListener("transitionend", this._transitionListener);
        }
    }

    protected firstUpdated() {
        this.container.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        });
        this.container.style.display = "none";
        window.addEventListener(
            "scroll",
            debounce(() => requestAnimationFrame(this._scrollListener.bind(this)), 200)
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-backtop": SDBackTop;
    }
}
