import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type PositionX = "left" | "center" | "right";
type PositionY = "top" | "center" | "bottom";
type Position = "disabled" | `${PositionY}-${PositionX}`;
@customElement("sd-modal")
export class SDModal extends LitElement {
    /**
     * 浮动的位置，若类型不匹配将报错
     * 可设置为disabled或为空，此时将取消浮动（static定位）
     */
    @property({
        converter(value) {
            if (!value) return "disabled";
            if (value === "disabled") return value;
            const pos = value.split("-");
            if (pos.length != 2)
                throw new Error(`the position attr in <sd-modal> cannot be parsed! It should be like: "top-center"`);
            let [y, x] = pos;
            if (!["left", "right", "center"].includes(x))
                throw new Error(`"${x}" is wrong, it should be "left" or "right" or "center"`);
            if (!["top", "bottom", "center"].includes(y))
                throw new Error(`"${y}" is wrong, it should be "top" or "bottom" or "center"`);
            return `${y}-${x}`;
        },
        reflect: true,
    })
    position: Position = "disabled";

    static styles = css`
        .container {
            position: fixed;
        }
        .disabled {
            position: static;
        }
        .top-left {
            top: 0;
            left: 0;
        }
        .top-center {
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .top-right {
            top: 0;
            right: 0;
        }
        .center-left {
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
        }
        .center-center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .center-right {
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
        }
        .bottom-left {
            top: 100%;
            left: 0;
            transform: translate(0, -100%);
        }
        .bottom-center {
            top: 100%;
            left: 50%;
            transform: translate(-50%, -100%);
        }
        .bottom-right {
            top: 100%;
            right: 0;
            transform: translate(0, -100%);
        }
    `;

    render() {
        return html`
            <div class="container ${this.position}">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-modal": SDModal;
    }
}
