import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sd-spinner")
export class SDSpinner extends LitElement {
    static styles = css`
        :host {
            --color: var(--sd-color-alert);
            --size: 2.5em;
        }
        .container {
            display: inline-block;
            position: relative;
            width: var(--size);
            height: var(--size);
        }
        .s {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: calc(var(--size) * 0.76);
            height: calc(var(--size) * 0.76);
            margin: calc(var(--size) * 0.12);
            border: calc(var(--size) * 0.12) solid var(--color);
            border-radius: 50%;
            animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: var(--color) transparent transparent transparent;
        }
        .s:nth-child(1) {
            animation-delay: -0.45s;
        }
        .s:nth-child(2) {
            animation-delay: -0.3s;
        }
        .s:nth-child(3) {
            animation-delay: -0.15s;
        }
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;

    render() {
        return html`
            <div class="container">
                <div class="s"></div>
                <div class="s"></div>
                <div class="s"></div>
                <div class="s"></div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-spinner": SDSpinner;
    }
}
