import { LitElement, css, html } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import { findTagInPath } from "../utils";
import { SDOption } from "./sd-option";

@customElement("sd-select")
export class SDSelect extends LitElement {
    static styles = css``;

    @queryAssignedElements({ flatten: true, selector: "sd-option" }) options!: Array<SDOption>;

    render() {
        return html`
            <sd-aside>
                <div class="select"></div>
                <div class="options" slot="aside">
                    <slot @click=${this._handleClick}></slot>
                </div>
            </sd-aside>
        `;
    }
    private _handleClick(e: MouseEvent) {
        const options = findTagInPath<SDOption>(e, "sd-option");
        if (!options) return;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-select": SDSelect;
    }
}
