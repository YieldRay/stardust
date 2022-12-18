import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { when } from "lit/directives/when.js";
import stylesheet from "../stylesheet.js";

/**
 * @dependency sd-transition
 */
@customElement("sd-tree")
export class SDTree extends LitElement {
    /**
     * 是否包含子节点
     */
    @property({ type: Boolean, attribute: "has-child" }) hasChild = false;

    /**
     * 本结点的内容，仅能为文本。若需要渲染HTML则应使用 slot=node 插槽
     */
    @property() node = "";

    /**
     * 是否展开
     */
    @property({ type: Boolean }) expand = false;

    static styles = [
        stylesheet,
        css`
            .node {
                cursor: pointer;
                display: flex;
                align-items: center;
            }
            .node:hover {
                background-color: var(--sd-color-shadow);
            }

            .subtree {
                margin-left: 1em;
            }
            .toggle {
                width: 1em;
            }
            .triangle {
                --triangle-size: 0.25em;
                transition: all var(--sd-time-fast);
                transform: rotate(-90deg);
            }
        `,
    ];

    render() {
        return html`
            <div class="node" @click=${this._handleClick}>
                <div class="toggle">
                    ${when(
                        this.hasChild,
                        () => html`
                            <slot name="toggle">
                                <div
                                    class="triangle"
                                    style=${styleMap({ transform: this.expand ? "rotate(0)" : "" })}
                                ></div>
                            </slot>
                        `
                    )}
                </div>
                <div><slot name="node">${this.node}</slot></div>
            </div>

            <sd-transition-easy
                .enter=${{ transform: "translateY(0)", opacity: "1" }}
                .leave=${{ transform: "translateY(-.25em)", opacity: "0" }}
                .begin=${{ display: "block", transformOrigin: "0 0" }}
                .end=${{ display: "none" }}
                .state=${this.expand}
            >
                <div class="subtree">
                    <slot></slot>
                </div>
            </sd-transition-easy>
        `;
    }

    private _handleClick() {
        this.expand = !this.expand;
        this.dispatchEvent(new CustomEvent<{ expand: boolean }>("change", { detail: { expand: this.expand } }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tree": SDTree;
    }
}
