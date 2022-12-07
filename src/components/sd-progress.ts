import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement("sd-progress")
export class SDProgress extends LitElement {
    /**
     * 按百分比计，范围为0-100
     */
    @property({ type: Number }) value = 0;

    static styles = css`
        :host {
            --height: 0.75em;
            --background: var(--sd-color-alert);
        }
        .container {
            width: 100%;
            box-sizing: border-box;
            height: var(--height);
            border-radius: var(--height);
            overflow: hidden;
            color: var(--sd-color-text);
            border: solid var(--sd-color-border) var(--sd-length-border);
        }
        .indicator {
            height: 100%;
            background: var(--background);
            box-shadow: 1px 0 var(--height) var(--sd-color-shadow);
        }
    `;

    render() {
        return html`<div class="container">
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
