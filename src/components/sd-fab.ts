import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { query } from "lit/decorators.js";
import { debounce } from "froebel/function";

//@ts-ignore
import { SDRipple } from "../containers/sd-ripple";
//@ts-ignore
import { SDFade } from "../containers/sd-fade";

@customElement("sd-fab")
export class SDFab extends LitElement {
    @property({ type: Number })
    threshold = 25; // 滚动的阈值，在此阈值之内元素将隐藏

    @property({ type: Boolean })
    backtop = false; // 点击FAB则back-to-top

    @property({ type: Boolean })
    autohide = true; // 是否自动隐藏，仅在fixed属性设置为true时有效

    @property({ type: Boolean })
    fixed = false; // 是否悬浮在右下角，位置可以通过自定义style属性覆盖

    @state()
    hidden = false;

    style!: CSSStyleDeclaration; // forward the style property

    static styles = css`
        .fixed {
            position: fixed;
            right: 1em;
            bottom: 1em;
        }
        .container {
            box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), -1px 1px 1px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: inline-block;
            width: 2em;
            height: 2em;
            border-radius: 50%;
            transition: opacity var(--sd-time-normal);
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;

    @query(".container")
    container!: HTMLDivElement;

    render() {
        return html`
            <sd-fade .hidden=${this.hidden}>
                <sd-ripple scale="1.1" class="container center" .style=${this.style ?? nothing}>
                    <slot>
                        <div>▲</div>
                    </slot>
                </sd-ripple>
            </sd-fade>
        `;
    }

    protected firstUpdated() {
        if (this.fixed) {
            this.container.classList.add("fixed");
        }
        if (this.fixed && this.autohide) {
            if (window.scrollY > this.threshold) this.container.style.display = "none";
            window.addEventListener(
                "scroll",
                debounce(() => requestAnimationFrame(this._scrollListener.bind(this)), 200)
            );
        }
        if (this.backtop) {
            this.container.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            });
        }
    }

    private _scrollListener() {
        if (window.scrollY > this.threshold) {
            this.hidden = false;
        } else {
            this.hidden = true;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-fab": SDFab;
    }
}
