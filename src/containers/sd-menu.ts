import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * @slot - 默认插槽
 * @slot menu - 悬浮的菜单元素，位置相对默认插槽自动计算
 */
@customElement("sd-menu")
export class SDMenu extends LitElement {
    @property({ type: Boolean }) hidden = false;

    static styles = css`
        :host {
            display: inline-block;
        }
        #body {
            position: relative;
        }
        #menu {
            position: absolute;
            transition: left right top bottom var(--sd-time-normal);
        }
    `;

    @query("#body") private body!: HTMLDivElement;

    @query("#menu") private menu!: HTMLDivElement;

    render() {
        return html`
            <div id="body">
                <slot @slotchange=${() => this.calculatePosition()}></slot>
                <div id="menu">
                    <slot name="menu" @slotchange=${() => this.calculatePosition()}> </slot>
                </div>
            </div>
        `;
    }

    /**
     * 调用此方法重新计算并设置菜单位置
     */
    public calculatePosition() {
        const { body, menu } = this;
        const bodyRect = body.getBoundingClientRect();

        if (bodyRect.top > window.innerHeight - bodyRect.bottom) {
            // top
            menu.style.top = "";
            menu.style.bottom = "100%";
        } else {
            // bottom
            menu.style.top = "100%";
            menu.style.bottom = "";
        }
        if (bodyRect.left > window.innerWidth - bodyRect.left) {
            // left
            menu.style.left = "";
            menu.style.right = "0px";
        } else {
            // right
            menu.style.left = "0px";
            menu.style.right = "";
        }
    }

    protected updated() {
        this.calculatePosition();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-menu": SDMenu;
    }
}
