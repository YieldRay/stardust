import { LitElement, css, html, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SDTab } from "./sd-tab";

const isSDTab = (e: Element): e is SDTab => e.tagName === "sd-tab".toUpperCase();

/**
 * @summary 此元素应包含 <sd-tab> 元素
 *  @event change {{ index: Number; tab: SDTab }}
 */
@customElement("sd-tabs")
export class SDTabs extends LitElement {
    constructor() {
        super();

        this.addEventListener("click", (e) => {
            const tab = (e as MouseEvent & { path: Array<Element> }).path.find(isSDTab);
            if (!tab) return;
            const tabs = this.getAllTabs();
            tabs!.forEach((tab) => (tab.active = false));
            tab.active = true;
            const index = tabs!.indexOf(tab);

            if (this.index != index)
                // only update if tab changes
                this.dispatchEvent(
                    new CustomEvent<{ index: Number; tab: SDTab }>("change", { detail: { tab, index } })
                );
            this.index = index;
        });
    }

    public getAllTabs() {
        return this.renderRoot.querySelector("slot")?.assignedElements({ flatten: true }).filter(isSDTab);
    }

    /**
     * 选中的sd-tab子元素的序号，第一个为0，顺序同文档顺序。若没有，则为-1
     */
    @property({ type: Number, reflect: true }) index = -1;

    static styles = css`
        .container {
            border: solid var(--sd-color-border) var(--sd-length-border);
            display: inline-flex;
            border-radius: var(--sd-length-radius);
            overflow: hidden;
        }

        slot {
            cursor: pointer;
            user-select: none;
        }

        .active {
            color: var(--sd-color-text-reverse);
            background-color: var(--sd-color-primary);
            border-radius: var(--sd-length-radius);
        }
    `;
    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    protected updated(changedProperties: PropertyValueMap<this>) {
        if (changedProperties.has("index")) {
            if (this.index < 0) return;
            const tabs = this.getAllTabs();
            if (!tabs) return;
            if (this.index >= tabs.length) {
                tabs.forEach((t) => (t.active = false));
                return;
            }
            tabs.forEach((t) => (t.active = false));
            tabs[this.index].active = true;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tabs": SDTabs;
    }
}
