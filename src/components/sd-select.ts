import { LitElement, css, html } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import { findTagInPath } from "../utils";
import stylesheet from "../stylesheet.js";
import equal from "froebel/equal";

// @dependency
import { SDOption } from "./sd-option";
import "../containers/sd-transition-easy";

/**
 * @fires change
 */
@customElement("sd-select")
export class SDSelect extends LitElement {
    @property({ attribute: false })
    get options() {
        return this._options;
    }

    /**
     * 是否启用多选
     */
    @property({ type: Boolean }) multiple = false;

    /**
     * 获取所有选中的选项元素
     */
    @property()
    get selectedOptions(): SDOption | undefined | SDOption[] {
        if (this.multiple) {
            const indexes = this.selectedIndex as number[];
            const opts: SDOption[] = [];
            indexes.forEach((i) => opts.push(this._options.at(i) as SDOption));
            return opts;
        } else {
            const index = this.selectedIndex as number;
            return this._options.at(index);
        }
    }

    /**
     * 通过下标获取和设置选中选项
     */
    @property()
    get selectedIndex(): number | number[] {
        if (this.multiple) {
            // find all selected ones
            return this._options
                .map(({ selected }, index) => (selected ? index : undefined))
                .filter((i) => i !== undefined) as number[];
        } else {
            // find the first selected one
            return this._options.findIndex((opt) => opt.selected);
        }
    }
    set selectedIndex(index: number | number[]) {
        if (Array.isArray(index)) {
            index.forEach((i) => (this._options[i].selected = true));
            this._setSelectedText();
        } else {
            this._options.forEach((opt) => (opt.selected = false));
            this._options.at(index)!.selected = true;
            this._setSelectedText(index);
        }
    }

    @queryAssignedElements({ flatten: true, selector: "sd-option" }) private _options!: Array<SDOption>;
    @state() expand = false;
    @state() selectedText = "";

    static styles = [
        stylesheet,
        css`
            :host {
                --min-width: 10em;
                --max-width: 100%;
                --font-size: 1em;
            }
            .select {
                padding: var(--sd-length-padding);
                gap: var(--triangle-size);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: all var(--sd-time-fast);
            }
            .options {
                cursor: pointer;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;
            }
            .select,
            .options {
                font-size: var(--font-size);
                min-width: var(--min-width);
                max-width: var(--max-width);
                box-sizing: border-box;
                -webkit-tap-highlight-color: transparent;
            }

            .text {
                font-size: var(--font-size);
                flex: 1;
                min-height: var(--font-size);
                line-height: var(--font-size);
            }

            ::slotted(sd-option) {
                border: solid var(--sd-color-border) var(--sd-length-border);
                background: var(--sd-color-background);
                overflow: hidden;
            }
            ::slotted(sd-option:not([disabled]):hover),
            .select:hover {
                background-color: var(--sd-color-border-active);
            }
            ::slotted(sd-option:not(:first-child)) {
                border-top: none;
            }
            ::slotted(sd-option:first-child) {
                border-top-left-radius: var(--sd-length-radius);
                border-top-right-radius: var(--sd-length-radius);
            }
            ::slotted(sd-option:last-child) {
                border-bottom-left-radius: var(--sd-length-radius);
                border-bottom-right-radius: var(--sd-length-radius);
            }
        `,
    ];

    render() {
        return html`
            <sd-aside>
                <div class="select border theme" @click=${() => (this.expand = !this.expand)}>
                    <span class="text ellipsis"> ${this.selectedText} </span>
                    <div class="triangle"></div>
                </div>
                <div slot="aside">
                    <sd-transition-easy .state=${this.expand}>
                        <div div class="options">
                            <slot @click=${this._handleClick} @slotchange=${this._slotChange}></slot>
                        </div>
                    </sd-transition-easy>
                </div>
            </sd-aside>
        `;
    }

    private _setSelectedText(selectedIndex?: number) {
        if (this.multiple) {
            this.selectedText = this._options
                .filter(({ selected }) => selected)
                .map(({ textContent }) => textContent ?? "")
                .join(", ");
        } else {
            const index = selectedIndex ?? (this.selectedIndex as number);
            this.selectedText = this._options[index >= 0 ? index : 0]?.textContent ?? "";
        }
    }

    private _slotChange() {
        if (this.multiple) this._options.forEach((o) => (o.checkbox = true));
        this._setSelectedText();
    }

    private _handleClick(e: MouseEvent) {
        const option = findTagInPath<SDOption>(e, "sd-option");
        if (!option) return;
        if (option.disabled) return;

        // record previous state
        const prevIndex = this.selectedIndex;

        if (!this.multiple) {
            this.expand = false;
            this._options.forEach((opt) => (opt.selected = false));
        }

        // change to new state
        option.selected = !option.selected;
        const index = this.selectedIndex;

        // fires when NOT equal
        if (!equal(prevIndex, index)) {
            this.dispatchEvent(new CustomEvent("change", { detail: { index } }));
            this._setSelectedText();
        }
    }

    private _outsideClick = ((e: MouseEvent) => {
        //@ts-ignore
        if (e.target === this || e.target?.tagName === "SD-OPTION") return;
        this.expand = false;
    }).bind(this);

    protected firstUpdated() {
        window.addEventListener("click", this._outsideClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("click", this._outsideClick);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-select": SDSelect;
    }
}
