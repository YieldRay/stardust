import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

@customElement("sd-box")
export class SDBox extends LitElement {
    static styles = [stylesheet, css``];

    @property() p = "";
    @property() m = "";
    @property() display = "";
    render() {
        return html`
            <style>
                :host {
                    display: ${this.display};
                    padding: ${this.p};
                    margin: ${this.m};
                }
            </style>
            <slot></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-box": SDBox;
    }
}
