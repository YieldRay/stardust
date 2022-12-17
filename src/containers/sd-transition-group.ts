import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

@customElement("sd-transition-group")
export class SDTransitionGroup extends LitElement {
    static styles = [stylesheet, css``];
    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-transition-group": SDTransitionGroup;
    }
}
