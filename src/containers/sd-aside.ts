import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * @slot - 默认插槽
 * @slot aside - 悬浮的元素，位置相对默认插槽自动计算
 */
@customElement("sd-aside")
export class SDAside extends LitElement {
    @property({ type: Boolean }) hidden = false;

    static styles = css`
        :host {
            display: inline-block;
        }
        #body {
            position: relative;
            max-width: 100vw;
            max-height: 100vh;
        }
        #aside {
            position: absolute;
            transition: all var(--sd-time-normal);
        }
    `;

    @query("#body") private body!: HTMLDivElement;

    @query("#aside") private aside!: HTMLDivElement;

    render() {
        return html`
            <div id="body">
                <slot @slotchange=${() => this.calculatePosition()}></slot>
                <div id="aside">
                    <slot name="aside" @slotchange=${() => this.calculatePosition()}> </slot>
                </div>
            </div>
        `;
    }

    /**
     * 调用此方法重新计算并设置菜单位置
     */
    public calculatePosition() {
        const { body, aside } = this;
        const bodyRect = body.getBoundingClientRect();

        if (bodyRect.top > window.innerHeight - bodyRect.bottom) {
            // top
            aside.style.top = "";
            aside.style.bottom = "100%";
        } else {
            // bottom
            aside.style.top = "100%";
            aside.style.bottom = "";
        }
        if (bodyRect.left > window.innerWidth - bodyRect.left) {
            // left
            aside.style.left = "";
            aside.style.right = "0px";
        } else {
            // right
            aside.style.left = "0px";
            aside.style.right = "";
        }
    }

    protected updated() {
        this.calculatePosition();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-aside": SDAside;
    }
}
