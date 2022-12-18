import { LitElement, css, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { throttle } from "froebel/function";
import stylesheet from "../stylesheet.js";

// @dependency
import "../containers/sd-ripple";
import "../containers/sd-float";
import { SDRipple } from "../containers/sd-ripple";

/**
 * @cssprop --size - 元素的尺寸，即直径
 * @cssprop --distance - 元素浮动时，离右下角的距离
 */
@customElement("sd-fab")
export class SDFab extends LitElement {
    /** 启用点击按钮则回到顶部 */
    @property({ type: Boolean }) backtop = false;
    /** 是否悬浮在右下角 */
    @property({ type: Boolean }) fixed = false;
    /** 是否自动隐藏，仅在fixed设置为true时有效 */
    @property({ type: Boolean }) autohide = false;
    /** 滚动的阈值，在此阈值之内元素将隐藏，仅在autohide设置为true时有效 */
    @property({ type: Number }) threshold = 25;

    /** 隐藏状态 */
    @state() hidden = false;

    static styles = [
        stylesheet,
        css`
            :host {
                --size: 3em;
                --distance: 2em;
                -webkit-tap-highlight-color: transparent;
            }

            #container {
                cursor: pointer;
                display: inline-block;
                box-shadow: 1px 1px 1px var(--sd-color-shadow), -1px 1px 1px var(--sd-color-shadow);
                width: var(--size);
                height: var(--size);
                border-radius: var(--size);
                transition: opacity var(--sd-time-normal);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `,
    ];

    @query("#container") private container!: SDRipple;

    render() {
        return html`
            <sd-float fixed position="${this.fixed ? "bottom-right" : "disabled"}">
                <div
                    style=${styleMap({
                        marginRight: this.fixed ? "var(--distance)" : null,
                        marginBottom: this.fixed ? "var(--distance)" : null,
                    })}
                >
                    <sd-transition-easy .state=${!this.hidden}>
                        <sd-ripple scale="1.25" id="container">
                            <slot>
                                <div>▲</div>
                            </slot>
                        </sd-ripple>
                    </sd-transition-easy>
                </div>
            </sd-float>
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
