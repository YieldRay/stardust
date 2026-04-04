import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

@customElement("sd-box")
export class SDBox extends LitElement {
    static styles = [stylesheet];

    @property() p = "";
    @property() m = "";
    @property() display = "";

    protected updated(changed: PropertyValueMap<this>) {
        if (changed.has("p")) this.style.padding = this.p;
        if (changed.has("m")) this.style.margin = this.m;
        if (changed.has("display")) this.style.display = this.display;
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-box": SDBox;
    }
}
