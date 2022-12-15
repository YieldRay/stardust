import { css } from "lit";

export default css`
    .theme {
        color: var(--sd-color-text);
        background-color: var(--sd-color-background);
        transition: color, background-color var(--sd-time-normal);
    }

    .border {
        border: solid var(--sd-color-border) var(--sd-length-border);
        transition: border-color var(--sd-time-normal);
        border-radius: var(--sd-length-radius);
    }
    .border:hover {
        border-color: var(--sd-color-border-active);
    }

    .ui {
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }

    .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
