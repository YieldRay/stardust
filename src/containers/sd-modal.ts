import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-modal")
export class SDModal extends LitElement {
    @property({ type: Boolean })
    overlay = false;

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
    position = "disabled"; // if position cannot be parsed, an error will occur

    style!: CSSStyleDeclaration;

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

    @query(".container")
    container!: HTMLDivElement;

    render() {
        return html`
            <div class="container ${this.position}" .style=${this.style ?? nothing}>
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
