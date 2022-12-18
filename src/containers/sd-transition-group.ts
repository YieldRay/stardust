import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";
import { applyCSSStyle } from "../utils.js";

/**
 * The transition can only apply to newer append element
 */
@customElement("sd-transition-group")
export class SDTransitionGroup extends LitElement {
    static styles = [stylesheet];
    render() {
        return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
    }

    @property() from: Partial<CSSStyleDeclaration> = { opacity: "0" };
    @property() to: Partial<CSSStyleDeclaration> = { opacity: "1" };
    @property() transition: string = "opacity ease-in var(--sd-time-normal)";
    @property({ type: Boolean }) immediate = false;

    @state() _init = true;

    private _handleSlotChange(e: Event) {
        if (this._init) {
            this._init = false;
            return;
        }
        const slot = e.target as HTMLSlotElement;
        const slotted = slot.assignedElements({ flatten: true });

        slotted.forEach((n) => {
            if (n instanceof HTMLElement) {
                applyCSSStyle(n, this.from);
                n.style.transition = this.transition;
                requestAnimationFrame(() => applyCSSStyle(n, this.to));
            }
        });
    }

    protected firstUpdated() {
        if (this.immediate) this._init = false;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-transition-group": SDTransitionGroup;
    }
}
