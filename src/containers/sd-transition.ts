import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";
import { applyCSSStyle } from "../utils.js";

export interface Transition {
    from?: Partial<CSSStyleDeclaration>;
    to?: Partial<CSSStyleDeclaration>;
    begin?: Partial<CSSStyleDeclaration>;
    end?: Partial<CSSStyleDeclaration>;
    transition?: string;
    afterEnd?: () => void;
}

/**
 * Perform transition when the whole slotted element enter/leave to/from the DOM
 * @example
 *  `<button @click=${()=>(show = !show)}>toggle</button>`
 *  `<sd-transition .state=${state}><p>hello</p></sd-transition>`
 */
@customElement("sd-transition")
export class SDTransition extends LitElement {
    static styles = [stylesheet];

    @property() enter: Transition = {
        from: { opacity: "0" },
        to: { opacity: "1" },
        begin: { display: "block" },
        transition: "opacity ease-in var(--sd-time-normal)",
    };
    @property() leave: Transition = {
        from: { opacity: "1" },
        to: { opacity: "0" },
        end: { display: "none" },
        transition: "opacity ease-out var(--sd-time-normal)",
    };

    /**
     * `true`  for `enter`;
     * `false` for `leave`;
     */
    @property({ type: Boolean }) state = true;

    /**
     * execute the first transition, which is not executed by default.
     */
    @property({ type: Boolean }) immediate = false;

    /**
     * transition acts on this (`:host`) by default,
     * modify this to adjuste to act on the first child element.
     */
    @property({ type: Boolean, attribute: "apply-to-first-element" }) applyToFirstElement = false;

    render() {
        return html`<slot></slot>`;
    }

    @state() _init = true;

    protected updated(changedProperties: PropertyValueMap<this>) {
        const state = this.state ? "enter" : "leave";

        // the TARGET element to which transition will apply
        const target: HTMLElement = this.applyToFirstElement
            ? (() => {
                  const slotted = this.querySelector("slot")?.assignedElements({ flatten: true })[0];
                  return slotted instanceof HTMLElement ? slotted : this;
              })()
            : this;

        // if show the transition for the first render
        if (this.immediate) this._init = false;
        if (this._init) {
            this._init = false;
            state && applyCSSStyle(this, this[state].end);
            return;
        }

        // handle state change
        if (changedProperties.has("state")) {
            switch (state) {
                case "enter":
                case "leave":
                    applyCSSStyle(target, this[state].begin); // begin
                    target.style.transition =
                        this[state].transition ?? `all var(--sd-time-normal) ${this.state ? "ease-in" : "ease-out"}`;
                    applyCSSStyle(target, this[state].from); // from
                    requestAnimationFrame(() => applyCSSStyle(target, this[state].to)); // to
                    const afterEnd = () => {
                        applyCSSStyle(target, this[state].end); // end
                        target.ontransitionend = null;
                        target.ontransitioncancel = null;
                        this[state].afterEnd?.(); // (callback) afterEnd
                    };
                    target.ontransitionend = afterEnd;
                    target.ontransitioncancel = afterEnd;
                    break;
                default:
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-transition": SDTransition;
    }
}
