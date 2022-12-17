import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

export interface Transition {
    from: Partial<CSSStyleDeclaration>;
    to: Partial<CSSStyleDeclaration>;
    transition?: string;
}

function applyCSSStyle(ele: HTMLElement, styl: Partial<CSSStyleDeclaration>) {
    for (const [k, v] of Object.entries(styl)) {
        Reflect.set(ele.style, k, v);
    }
}

function calcNotBlankNodeLength(nodes: Node[]): number {
    return nodes.filter((node) => {
        if (node.nodeType === 1) {
            // is Element
            return true;
        } else if (node.nodeType === 3) {
            // is Text
            const text = node.textContent ?? "";
            return text.trim().length !== 0; // check if is empty
        } else {
            return false;
        }
    }).length;
}

/**
 * perform transition when the slotted element enter/leave to/from the DOM
 * @example
 *  `<button @click=${()=>(show = !show)}>toggle</button>`
 *  <sd-transition>${ show ? html`hello` : nothing }</sd-transition>
 */
@customElement("sd-transition")
export class SDTransition extends LitElement {
    static styles = [stylesheet, css``];

    @property() enter: Transition = {
        from: { opacity: "0" },
        to: { opacity: "1" },
        transition: "opacity ease-in var(--sd-time-normal)",
    };
    @property() leave: Transition = {
        from: { opacity: "1" },
        to: { opacity: "0" },
        transition: "opacity ease-out var(--sd-time-normal)",
    };

    @query("span") _span!: HTMLSpanElement;

    render() {
        return html`
            <slot @slotchange=${this._handleSlotChange} style="display:none"></slot>
            <span></span>
        `;
    }

    @state() _lastSlotted: Node[] | undefined;

    private _handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const slotted = slot.assignedNodes({ flatten: true });
        const lastSlotted = this._lastSlotted;
        const renderRoot = this._span; //! Here we use a <span> to render

        const clearRenderRoot = () => (renderRoot.innerHTML = "");
        const renderToRenderRoot = () => {
            clearRenderRoot();
            renderRoot.append(...slotted.map((n) => n.cloneNode(true))); //! deep clone is must
        };

        console.log(lastSlotted, slotted);

        if (lastSlotted === undefined) {
            // init state
            renderToRenderRoot();
        } else if (calcNotBlankNodeLength(slotted) === 0) {
            // from anything to nothing
            //! perform LEAVE

            applyCSSStyle(this, this.leave.from);
            this.style.transition = this.leave.transition ?? "all var(--sd-time-normal)";
            requestAnimationFrame(() => applyCSSStyle(this, this.leave.to));

            const afterEnd = () => {
                clearRenderRoot();
                this.ontransitionend = null;
                this.ontransitioncancel = null;
            };

            this.ontransitionend = afterEnd;
            this.ontransitioncancel = afterEnd;
        } else if (calcNotBlankNodeLength(lastSlotted) === 0) {
            // from nothing to anything
            //! perform ENTER
            renderToRenderRoot();

            applyCSSStyle(this, this.enter.from);
            this.style.transition = this.enter.transition ?? "all var(--sd-time-normal)";
            requestAnimationFrame(() => applyCSSStyle(this, this.enter.to));
        } else {
            renderToRenderRoot();
        }

        this._lastSlotted = slotted; // we perform update from one to another, so keep track of it
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-transition": SDTransition;
    }
}
