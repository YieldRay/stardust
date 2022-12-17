import { LitElement, css, html, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

export interface Transition {
    from: Partial<CSSStyleDeclaration>;
    to: Partial<CSSStyleDeclaration>;
    begin?: Partial<CSSStyleDeclaration>;
    end?: Partial<CSSStyleDeclaration>;
    transition?: string;
    afterEnd?: () => void;
}

function applyCSSStyle(ele: HTMLElement, styl?: Partial<CSSStyleDeclaration>) {
    if (!styl) return;
    for (const [k, v] of Object.entries(styl)) {
        Reflect.set(ele.style, k, v);
    }
}

/**
 * perform transition when the whole slotted element enter/leave to/from the DOM
 * @example
 *  `<button @click=${()=>(show = !show)}>toggle</button>`
 *  <sd-transition .state=${state}><p>hello</p></sd-transition>
 */
@customElement("sd-transition")
export class SDTransition extends LitElement {
    static styles = [stylesheet, css``];

    @property() enter: Transition = {
        from: { opacity: "0" },
        to: { opacity: "1" },
        begin: { display: "" },
        transition: "opacity ease-in var(--sd-time-normal)",
    };
    @property() leave: Transition = {
        from: { opacity: "1" },
        to: { opacity: "0" },
        end: { display: "none" },
        transition: "opacity ease-out var(--sd-time-normal)",
    };

    /**
     * `true`  则为 enter；
     * `false` 则为 leave；
     */
    @property({ type: Boolean }) state = true;

    /**
     * 是否执行第一次过渡，默认不执行
     */
    @property({ type: Boolean }) immediate = false;

    render() {
        return html`<slot></slot>`;
    }

    @state() _init = true;

    protected updated(changedProperties: PropertyValueMap<this>) {
        const state = this.state ? "enter" : "leave";
        if (this.immediate) this._init = false;
        if (this._init) {
            this._init = false;
            state && applyCSSStyle(this, this[state].end);
            return;
        }
        if (changedProperties.has("state")) {
            switch (state) {
                case "enter":
                case "leave":
                    applyCSSStyle(this, this[state].begin); // begin
                    this.style.transition =
                        this[state].transition ?? `all var(--sd-time-normal) ${this.state ? "ease-in" : "ease-out"}`;
                    applyCSSStyle(this, this[state].from); // from
                    requestAnimationFrame(() => applyCSSStyle(this, this[state].to)); // to
                    const afterEnd = () => {
                        applyCSSStyle(this, this[state].end); // end
                        this.ontransitionend = null;
                        this.ontransitioncancel = null;
                        this[state].afterEnd?.(); // (callback) afterEnd
                    };
                    this.ontransitionend = afterEnd;
                    this.ontransitioncancel = afterEnd;
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
