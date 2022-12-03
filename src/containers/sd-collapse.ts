import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

/**
 * `slot=open`
 * `slot=close`
 */
@customElement("sd-collapse")
export class SDCollapse extends LitElement {
    /** 是否隐藏 */
    @property({ type: Boolean, reflect: false })
    hidden = false;

    /** 位置，默认为top，可选为bottom */
    @property({
        converter(value) {
            if (["top", "bottom"].includes(value ?? "top")) return value;
            return "top";
        },
    })
    position: "top" | "bottom" = "top";

    static styles = css`
        #body {
            overflow: hidden;
            transition: all var(--sd-time-normal);
        }
        #action {
            cursor: pointer;
        }
    `;

    @query("#action")
    action!: HTMLDivElement;

    @query("#body")
    body!: HTMLDivElement;

    render() {
        const actionArea = () =>
            html`
                <div id="action">
                    ${when(
                        this.hidden,
                        () => html`<slot name="open"> open</slot>`,
                        () => html`<slot name="close"> close</slot>`
                    )}
                </div>
            `;

        return html`
            ${when(this.position === "top", actionArea)}
            <div id="body"><slot></slot></div>
            ${when(this.position === "bottom", actionArea)}
        `;
    }

    protected firstUpdated() {
        const handleClick = (() => (this.hidden = !this.hidden)).bind(this);
        this.action.addEventListener("click", handleClick);
    }
    protected updated() {
        if (this.hidden) {
            this.body.style.maxHeight = 0 + "px";
        } else {
            this.body.style.maxHeight = this.body.scrollHeight + "px";
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-collapse": SDCollapse;
    }
}
