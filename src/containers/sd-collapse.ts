import { LitElement, css, html, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

export type Position = "top" | "bottom";
const isPosition = (x: unknown): x is Position => typeof x === "string" && ["top", "bottom"].includes(x);

/**
 * 一般来说，这个元素需要包装才能使用
 *
 * @slot toggle - 切换展开/折叠状态
 * @fires change - {{expand: Boolean}}
 *
 */
@customElement("sd-collapse")
export class SDCollapse extends LitElement {
    /** 是否展开 */
    @property({ type: Boolean, reflect: true }) expand = false;

    /** 位置，默认为top，可选为bottom */
    @property({
        converter(value): Position {
            return isPosition(value) ? value : "top";
        },
    })
    position: Position = "top";

    static styles = css`
        .body {
            display: block;
            overflow: hidden;
            transition: all var(--sd-time-normal);
        }
        .action {
            display: block;
            cursor: pointer;
        }
    `;

    @query(".body") private body!: HTMLDivElement;

    render() {
        const toggleArea = () =>
            html` <slot name="toggle" class="action" @click=${() => this._handleClick()}>toggle</slot> `;

        return html`
            ${when(this.position === "top", toggleArea)}
            <div class="body"><slot></slot></div>
            ${when(this.position === "bottom", toggleArea)}
        `;
    }

    private _handleClick() {
        this.expand = !this.expand;
        this.dispatchEvent(new CustomEvent<{ expand: boolean }>("change", { detail: { expand: this.expand } }));
    }

    protected updated(changedProperties: PropertyValueMap<this>) {
        if (changedProperties.has("expand")) {
            if (this.expand) {
                this.body.style.maxHeight = this.body.scrollHeight + "px";
            } else {
                this.body.style.maxHeight = 0 + "px";
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-collapse": SDCollapse;
    }
}
