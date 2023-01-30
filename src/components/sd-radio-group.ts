import { LitElement, html } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { isTarget } from "../utils";
import stylesheet from "../stylesheet.js";

// @dependency
import { SDRadio } from "./sd-radio";

@customElement("sd-radio-group")
export class SDRadioGroup extends LitElement {
    @property()
    get checked(): SDRadio | undefined {
        return this._radios.filter((r) => r.checked).at(0);
    }

    @queryAssignedElements({ flatten: true, selector: "sd-radio" }) private _radios!: Array<SDRadio>;
    constructor() {
        super();
        this.addEventListener("click", (e) => {
            if (isTarget<SDRadio>(e.target, "sd-radio")) {
                const radio = e.target;
                if (radio.checked) return; // skip if has been checked
                this._radios.forEach((r) => (r.checked = false));
                radio.checked = true;
                this.dispatchEvent(new CustomEvent("change", { detail: { value: radio.value } }));
                return;
            }
        });
    }

    static styles = [stylesheet];

    render() {
        return html`<slot @slotchange=${() => this._radios.forEach((r) => (r.inGroup = true))}></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-radio-group": SDRadioGroup;
    }
}
