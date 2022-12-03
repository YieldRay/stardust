import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

type Position = "left" | "right" | "center";

@customElement("sd-divider")
export class SDDivider extends LitElement {
    /** 插槽（一般为文本）位置，默认为center，可选为left right */
    @property({
        converter(value): Position {
            if (["left", "right", "center"].includes(value ?? "top")) return value as Position;
            return "center";
        },
    })
    position: Position = "center";

    static styles = css`
        :host {
            display: flex;
            align-items: center;
            color: var(--sd-color-border);
        }
        div {
            flex: 16;
            height: calc(var(--sd-length-border) * 0.75);
            background: var(--sd-color-border);
        }
    `;

    render() {
        return html`
            <div .style=${when(this.position === "left", () => "flex:1")}></div>
            <span><slot></slot></span>
            <div .style=${when(this.position === "right", () => "flex:1")}></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-divider": SDDivider;
    }
}
