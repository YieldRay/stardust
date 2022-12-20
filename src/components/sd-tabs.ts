import { LitElement, css, html, PropertyValueMap } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { findTagInPath } from "../utils";
import stylesheet from "../stylesheet.js";

// @dependency
import { SDTab } from "./sd-tab";

/**
 * This element should contain the `<sd-tab>` element
 *
 * @fires change - {{ index: Number; tab: SDTab }}
 */
@customElement("sd-tabs")
export class SDTabs extends LitElement {
    constructor() {
        super();

        this.addEventListener("click", (e) => {
            const tab = findTagInPath<SDTab>(e, "sd-tab");
            if (!tab) return;

            // set .active
            this._tabs.forEach((tab) => (tab.active = false));
            tab.active = true;

            // update index
            const index = this._tabs.indexOf(tab);
            if (this.tab != index)
                // only update if tab changes
                this.dispatchEvent(
                    new CustomEvent<{ index: Number; tab: SDTab }>("change", { detail: { tab, index } })
                );
            this.tab = index;
        });
    }

    /**
     * 选中的sd-tab子元素的序号，第一个为0，顺序同文档顺序。若没有，则为-1
     */
    @property({ type: Number, reflect: true }) tab = -1;

    /**
     * 获取插槽所有子<sd-tab>元素
     */
    @queryAssignedElements({ flatten: true, selector: "sd-tab" }) private _tabs!: Array<SDTab>;

    static styles = [
        stylesheet,
        css`
            .container {
                display: inline-flex;
                border: solid var(--sd-color-border) var(--sd-length-border);
                border-radius: var(--sd-length-radius);
                background: var(--sd-color-background);
                overflow: hidden;
            }

            slot {
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
                user-select: none;
            }
        `,
    ];

    render() {
        return html`
            <div class="container theme">
                <slot></slot>
            </div>
        `;
    }

    protected updated(changedProperties: PropertyValueMap<this>) {
        if (changedProperties.has("tab")) {
            if (this.tab < 0) return;
            if (this.tab >= this._tabs.length) {
                this._tabs.forEach((t) => (t.active = false));
                return;
            }
            this._tabs.forEach((t) => (t.active = false));
            this._tabs[this.tab].active = true;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tabs": SDTabs;
    }
}
