import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * @fires change
 */
@customElement("sd-slider")
export class SDSlider extends LitElement {
    /**
     * 每步长度，默认为连续值。若设置，应设置为整数，否则由于Javascript计算浮点数失精会造成错误
     */
    @property({ type: Number, reflect: false }) step = 0;
    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    /**
     * 滑动条当前百分比，范围 min-max 默认为 0-100
     */
    @property({ type: Number, reflect: true }) value = this.min;

    protected firstUpdated() {
        if (!this.hasAttribute("value")) {
            this.value = this.min;
        }
        const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.thumb.style.left = this._calcStep(percentage, true) + "%";
    }

    static styles = css`
        :host {
            --size: 1em;
            -webkit-tap-highlight-color: transparent;
        }
        .container {
            position: relative;
            margin: 0 calc(var(--size) / 2);
            min-height: var(--size);
        }
        .slider {
            height: 0.25em;
            border-radius: var(--size);
            background: var(--sd-color-border);
            width: 100%;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            cursor: pointer;
            box-sizing: padding-box;
        }
        .thumb {
            width: var(--size);
            height: var(--size);
            border-radius: 100%;
            background: var(--sd-color-primary);
            position: absolute;
            transition: transform var(--sd-time-fast);
            cursor: grab;
            transform: translate(-50%, -50%);
            top: 50%;
            touch-action: none;
        }
        .thumb:hover,
        .thumb.hover {
            transform: translate(-50%, -50%) scale(1.33);
        }
    `;

    @query(".thumb") thumb!: HTMLDivElement;
    @query(".slider") slider!: HTMLDivElement;
    render() {
        return html`
            <div class="container">
                <div class="slider" @click=${this._handleClick}>
                    <div
                        class="thumb"
                        @dragstart=${(e: DragEvent) => e.preventDefault()}
                        @pointerdown=${this._pointerdown}
                    ></div>
                </div>
            </div>
        `;
    }

    /**
     * this method calculate percentage ranging in 0-100
     */

    private _calcPercentage(rect: DOMRect, e: MouseEvent) {
        const { clientX } = e;
        const percentage = ((clientX - rect.left) / rect.width) * 100;
        let value = percentage;
        if (percentage > 100) value = 100;
        if (percentage < 0) value = 0;
        return value;
    }

    private _calcStep(value: number, byPercent = false) {
        let step = this.step;
        if (byPercent) {
            step = step * (100 / (this.max - this.min));
        }
        if (!step || step <= 0) return value;
        const mod = value % step;
        if (mod === 0) return value;
        if (mod < step / 2) {
            value -= mod;
        } else {
            value += step - mod;
        }
        return value;
    }

    private _calcValue(percent: number): number {
        return this.min + (this.max - this.min) * (percent / 100);
    }

    private _handleClick(e: MouseEvent) {
        const rect = this.slider.getBoundingClientRect();
        const percentage = this._calcPercentage(rect, e);
        this.thumb.style.left = this._calcStep(percentage, true) + "%";
        // set value & fire event
        const value = this._calcStep(this._calcValue(percentage));
        this.value = value;
        this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
    }

    private _pointerdown(event: PointerEvent) {
        const { thumb, slider } = this;
        thumb.setPointerCapture(event.pointerId);
        // add grab style
        thumb.style.cursor = "grabbing";
        thumb.classList.add("hover");

        // calc size
        const rect = slider.getBoundingClientRect();
        let percentage: number;

        thumb.onpointermove = (e: PointerEvent) => {
            percentage = this._calcPercentage(rect, e);
            thumb.style.left = this._calcStep(percentage, true) + "%";
        };

        thumb.onpointerup = () => {
            thumb.onpointermove = null;
            thumb.onpointerup = null;

            // remove grab style
            thumb.style.cursor = "";
            thumb.classList.remove("hover");

            // set value & fire event
            const value = this._calcStep(this._calcValue(percentage));
            this.value = value;
            this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-slider": SDSlider;
    }
}
