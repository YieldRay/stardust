import { LitElement, css, html } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import { findTagInPath } from "../utils";
import { SDOption } from "./sd-option";

/**
 * @fires change
 */
@customElement("sd-select")
export class SDSelect extends LitElement {
    @queryAssignedElements({ flatten: true, selector: "sd-option" }) private _options!: Array<SDOption>;

    @property({ attribute: false })
    get options() {
        return this._options;
    }

    @property({ type: Number })
    get selectedIndex() {
        return this._options.findIndex((opt) => opt.selected);
    }
    set selectedIndex(index: number) {
        this._options.forEach((opt) => (opt.selected = false));
        this._options.at(index)!.selected = true;
        this.selectedText = this._options[index]?.textContent ?? "";
    }

    @state() expand = false;
    @state() selectedText = "";

    render() {
        return html`
            <sd-aside>
                <div class="select" @click=${() => (this.expand = !this.expand)}>
                    <span style="flex:1"> ${this.selectedText} </span>
                    <div class="triangle"></div>
                </div>
                <div slot="aside">
                    <sd-fade .hidden=${!this.expand}>
                        <div div class="options">
                            <slot
                                @click=${this._handleClick}
                                @slotchange=${() =>
                                    (this.selectedText =
                                        this._options[this.selectedIndex >= 0 ? this.selectedIndex : 0]?.textContent ??
                                        "")}
                            ></slot>
                        </div>
                    </sd-fade>
                </div>
            </sd-aside>
        `;
    }
    private _handleClick(e: MouseEvent) {
        this.expand = false;
        const option = findTagInPath<SDOption>(e, "sd-option");
        if (!option) return;
        const index = this._options.findIndex((opt) => opt === option);
        if (this.selectedIndex === index) return;
        this.selectedIndex = index;
        this.dispatchEvent(new CustomEvent("change", { detail: { index } }));
    }

    static styles = css`
        :host {
            --min-width: 10em;
            --max-width: 100%;
            --triangle-size: 0.25em;
        }
        .select {
            cursor: pointer;
            padding: var(--sd-length-padding);
            display: flex;
            gap: var(--triangle-size);
            align-items: center;
            justify-content: space-between;
        }
        .options {
            cursor: pointer;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
        }
        .select,
        .options {
            min-width: var(--min-width);
            max-width: var(--max-width);
            box-sizing: border-box;
            border: solid var(--sd-color-border) var(--sd-length-border);
            border-radius: var(--sd-length-radius);
        }

        .triangle {
            --size: 0.25em;
            width: 0;
            height: 0;
            border-top: var(--triangle-size) solid var(--sd-color-text);
            border-left: var(--triangle-size) solid transparent;
            border-right: var(--triangle-size) solid transparent;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-select": SDSelect;
    }
}
