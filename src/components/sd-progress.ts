import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import stylesheet from "../stylesheet.js";

@customElement("sd-progress")
export class SDProgress extends LitElement {
    /**
     * By percentage, the range is 0-100.
     */
    @property({ type: Number }) value = 0;

    static styles = [
        stylesheet,
        css`
            :host {
                --height: 0.75em;
                --background: var(--sd-color-primary);
            }
            .container {
                width: 100%;
                box-sizing: border-box;
                height: var(--height);
                overflow: hidden;
                border-radius: var(--height);
                border: solid var(--sd-color-border) var(--sd-length-border);
            }
            .indicator {
                height: 100%;
                background: var(--background);
                box-shadow: 1px 0 var(--height) var(--sd-color-shadow);
            }
        `,
    ];

    render() {
        return html`<div class="container theme">
            <div
                class="indicator"
                style=${styleMap({
                    width: this.value + "%",
                })}
            ></div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-progress": SDProgress;
    }
}
