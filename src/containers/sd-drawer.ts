import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

export type Position = "top" | "bottom" | "left" | "right";
const isPosition = (x: unknown): x is Position =>
    typeof x === "string" && ["top", "bottom", "left", "right"].includes(x);

@customElement("sd-drawer")
export class SDDrawer extends LitElement {
    /** 位置，默认为left，可选为top,bottom,left,right */
    @property({
        converter(value) {
            return isPosition(value) ? value : "left";
        },
    })
    position: Position = "left";

    /**
     * 默认为absolute定位，此值设为true则fixed定位
     */
    @property({ type: Boolean }) fixed = false;

    /**
     * 是否打开
     */
    @property({ type: Boolean }) open = false;

    static styles = css`
        :host {
            --width: 20em;
            --height: 20em;
        }

        .container {
            position: absolute;
            color: var(--sd-color-text);
            background: var(--sd-color-background);
            max-width: 100vw;
            max-height: 100vh;
            overflow: auto;
            transition: all var(--sd-time-normal);
            z-index: 1;
        }

        .left,
        .right {
            top: 0;
            height: 100vh;
            width: var(--width);
        }
        .top,
        .bottom {
            left: 0;
            height: var(--height);
            width: 100vw;
        }

        .top,
        .left {
            box-shadow: 1px 1px 1px var(--sd-color-shadow);
        }
        .right,
        .bottom {
            box-shadow: -1px -1px 1px var(--sd-color-shadow);
        }

        .top[data-open],
        .bottom[data-open],
        .left[data-open],
        .right[data-open] {
            transform: translateX(0) translateY(0);
        }

        .left {
            left: 0;
            transform: translateX(-100%);
        }

        .right {
            right: 0;
            transform: translateX(100%);
        }

        .top {
            top: 0;
            transform: translateY(-100%);
        }

        .bottom {
            bottom: 0;
            transform: translateY(100%);
        }
    `;

    render() {
        return html`
            <div
                class="container ${this.position}"
                data-open=${this.open ? "" : nothing}
                style=${styleMap({
                    position: this.fixed ? "fixed" : "",
                })}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-drawer": SDDrawer;
    }
}
