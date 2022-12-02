import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { throttle } from "froebel/function";

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
    autohide = false; // 是否自动隐藏，仅在fixed属性设置为true时有效

    @property({ type: Boolean })
    fixed = false; // 是否悬浮在右下角，位置可以通过自定义style属性覆盖

    @state()
    hidden = false;

    style!: CSSStyleDeclaration; // forward the style property

    static styles = css`
        :host {
            --size: 3em;
            --distance: 2em;
            -webkit-tap-highlight-color: transparent;
        }

        .container {
            box-shadow: 1px 1px 1px var(--sd-color-shadow), -1px 1px 1px var(--sd-color-shadow);
            cursor: pointer;
            display: inline-block;
            width: var(--size);
            height: var(--size);
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
            <sd-modal position="${this.fixed ? "bottom-right" : "disabled"}">
                <div
                    style=${styleMap({
                        marginRight: this.fixed ? "var(--distance)" : null,
                        marginBottom: this.fixed ? "var(--distance)" : null,
                    })}
                >
                    <sd-fade .hidden=${this.hidden}>
                        <sd-ripple scale="1.2" class="container center" .style=${this.style ?? nothing}>
                            <slot>
                                <div>▲</div>
                            </slot>
                        </sd-ripple>
                    </sd-fade>
                </div>
            </sd-modal>
        `;
    }

    protected firstUpdated() {
        if (this.fixed && this.autohide) {
            if (window.scrollY <= this.threshold) requestAnimationFrame(() => (this.hidden = true));
            window.addEventListener("scroll", throttle(this._scrollListener.bind(this), 100));
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
            // over threshold, display it
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
