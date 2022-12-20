import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

/**
 * @slot - default slot
 * @slot aside - suspended element, the position of which is automatically calculated relative to the default slot.
 */
@customElement("sd-aside")
export class SDAside extends LitElement {
    @property({ type: Boolean }) hidden = false;

    static styles = [
        stylesheet,
        css`
            :host {
                display: inline-block;
            }
            #body {
                position: relative;
                max-width: 100vw;
                max-height: 100vh;
            }
            #aside {
                position: absolute;
                transition: all var(--sd-time-normal);
            }
        `,
    ];

    @query("#body") private body!: HTMLDivElement;

    @query("#aside") private aside!: HTMLDivElement;

    render() {
        return html`
            <div id="body">
                <slot @slotchange=${() => this.calculatePosition()}></slot>
                <div id="aside">
                    <slot name="aside" @slotchange=${() => this.calculatePosition()}> </slot>
                </div>
            </div>
        `;
    }

    /**
     * Call this method to recalculate and set the menu position.
     */
    public calculatePosition() {
        const { body, aside } = this;
        const bodyRect = body.getBoundingClientRect();

        if (bodyRect.top > window.innerHeight - bodyRect.bottom) {
            // top
            aside.style.top = "";
            aside.style.bottom = "100%";
        } else {
            // bottom
            aside.style.top = "100%";
            aside.style.bottom = "";
        }
        if (bodyRect.left > window.innerWidth - bodyRect.left) {
            // left
            aside.style.left = "";
            aside.style.right = "0px";
        } else {
            // right
            aside.style.left = "0px";
            aside.style.right = "";
        }
    }

    protected updated() {
        this.calculatePosition();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-aside": SDAside;
    }
}
