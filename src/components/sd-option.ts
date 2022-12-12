import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sd-option")
export class SDOption extends LitElement {
    static styles = css`
        :host {
            width: 100%;
            height: 100%;
        }
        .container {
            white-space: nowrap;
            overflow: hidden;
            padding: var(--sd-length-padding);
            transition: all var(--sd-time-fast);
        }
    `;
    @property() value = "";
    @property({ type: Boolean, reflect: true }) selected = false;

    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-option": SDOption;
    }
}
