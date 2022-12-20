import { LitElement, css, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { throttle } from "froebel/function";
import stylesheet from "../stylesheet.js";

// @dependency
import "../containers/sd-ripple";
import "../containers/sd-float";
import { SDRipple } from "../containers/sd-ripple";

/**
 * @cssprop --size - the size of the element, i.e. the diameter
 * @cssprop --distance - the distance from the lower right corner when the element floats.
 */
@customElement("sd-fab")
export class SDFab extends LitElement {
    /** whether enable click button back to top */
    @property({ type: Boolean }) backtop = false;
    /** whether it is suspended in the lower right corner */
    @property({ type: Boolean }) fixed = false;
    /** auto-hide, only valid when fixed is set to true. */
    @property({ type: Boolean }) autohide = false;
    /**
     * scrolling threshold of, within which the element will be hidden,
     * which is only valid when autohide is set to true.
     */
    @property({ type: Number }) threshold = 25;

    static styles = [
        stylesheet,
        css`
            :host {
                --size: 3em;
                --distance: 2em;
                -webkit-tap-highlight-color: transparent;
            }

            #container {
                cursor: pointer;
                display: inline-block;
                box-shadow: 1px 1px 1px var(--sd-color-shadow), -1px 1px 1px var(--sd-color-shadow);
                width: var(--size);
                height: var(--size);
                border-radius: var(--size);
                transition: opacity var(--sd-time-normal);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `,
    ];

    @query("#container") private container!: SDRipple;

    @state() hidden = false;

    render() {
        return html`
            <sd-float fixed position="${this.fixed ? "bottom-right" : "disabled"}">
                <div
                    style=${styleMap({
                        marginRight: this.fixed ? "var(--distance)" : null,
                        marginBottom: this.fixed ? "var(--distance)" : null,
                    })}
                >
                    <sd-transition-easy .state=${!this.hidden}>
                        <sd-ripple scale="1.25" id="container">
                            <slot>
                                <div>▲</div>
                            </slot>
                        </sd-ripple>
                    </sd-transition-easy>
                </div>
            </sd-float>
        `;
    }

    protected firstUpdated() {
        if (this.fixed && this.autohide) {
            if (window.scrollY <= this.threshold) requestAnimationFrame(() => (this.hidden = true));
            window.addEventListener("scroll", throttle(this._scrollListener.bind(this), 100));
        }
        if (this.backtop) {
            this.container.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            });
        }
    }

    private _scrollListener() {
        if (window.scrollY > this.threshold) {
            // over threshold, display it
            this.hidden = false;
        } else {
            this.hidden = true;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-fab": SDFab;
    }
}
