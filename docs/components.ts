interface PropDef {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface EventDef {
  name: string;
  detail: string;
  description: string;
}

interface CssPropDef {
  name: string;
  default: string;
  description: string;
}

interface SlotDef {
  name: string;
  description: string;
}

interface ComponentDef {
  tag: string;
  name: string;
  group: 'components' | 'containers' | '_hidden';
  description: string;
  properties: PropDef[];
  events: EventDef[];
  cssprops: CssPropDef[];
  slots: SlotDef[];
  demo: string;
}

const registry: ComponentDef[] = [
  {
    tag: 'sd-button',
    name: 'Button',
    group: 'components',
    description: 'A button component with optional rounded shape support.',
    properties: [
      { name: 'disabled', type: 'Boolean', default: 'false', description: 'whether the button is disabled' },
      { name: 'rounded', type: 'Boolean', default: 'false', description: 'whether the button is a circle shape' }
    ],
    events: [],
    cssprops: [
      { name: '--size', default: '2em', description: 'the size of the button' }
    ],
    slots: [
      { name: 'default', description: 'button content' }
    ],
    demo: `
  <sd-button>Click me</sd-button>
  <sd-button rounded>R</sd-button>
  <sd-button disabled>Disabled</sd-button>
`
  },
  {
    tag: 'sd-card',
    name: 'Card',
    group: 'components',
    description: 'A card container with optional header and footer sections.',
    properties: [],
    events: [],
    cssprops: [],
    slots: [
      { name: 'header', description: 'card header' },
      { name: 'default', description: 'card body content' },
      { name: 'footer', description: 'card footer' }
    ],
    demo: `
  <sd-card style="--max-width:280px">
    <span slot="header">Card Header</span>
    Card body content goes here.
    <span slot="footer">Footer</span>
  </sd-card>
`
  },
  {
    tag: 'sd-checkbox',
    name: 'Checkbox',
    group: 'components',
    description: 'A checkbox input with customizable size and optional labels.',
    properties: [
      { name: 'checked', type: 'Boolean', default: 'false', description: 'whether the checkbox is checked' },
      { name: 'disabled', type: 'Boolean', default: 'false', description: 'whether the checkbox is disabled' }
    ],
    events: [
      { name: 'change', detail: '{checked: Boolean}', description: 'fired when checkbox state changes' }
    ],
    cssprops: [
      { name: '--size', default: '1em', description: 'the size of the checkbox element' }
    ],
    slots: [
      { name: 'before', description: 'label before the checkbox' },
      { name: 'default', description: 'content inside the checkbox (default is \u2714)' },
      { name: 'after', description: 'label after the checkbox' }
    ],
    demo: `
  <sd-checkbox><span slot="after">Unchecked</span></sd-checkbox>
  <sd-checkbox checked><span slot="after">Checked</span></sd-checkbox>
  <sd-checkbox disabled><span slot="after">Disabled</span></sd-checkbox>
`
  },
  {
    tag: 'sd-detail',
    name: 'Detail',
    group: 'components',
    description: 'A collapsible detail component with expand/collapse state.',
    properties: [
      { name: 'open', type: 'Boolean', default: 'false', description: 'whether the detail is expanded' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'summary', description: 'summary text/content' },
      { name: 'default', description: 'detail content' }
    ],
    demo: `
  <sd-detail style="width:260px">
    <span slot="summary">Click to expand</span>
    Hidden content revealed on expand.
  </sd-detail>
`
  },
  {
    tag: 'sd-divider',
    name: 'Divider',
    group: 'components',
    description: 'A divider line with optional slot content and position control.',
    properties: [
      { name: 'position', type: 'String', default: '"center"', description: 'slot position: left, right, or center' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'content displayed on the divider line' }
    ],
    demo: `
  <div style="width:280px">
    <p>Above</p>
    <sd-divider>OR</sd-divider>
    <p>Below</p>
  </div>
`
  },
  {
    tag: 'sd-fab',
    name: 'FAB',
    group: 'components',
    description: 'A floating action button with optional auto-hide and back-to-top functionality.',
    properties: [
      { name: 'backtop', type: 'Boolean', default: 'false', description: 'whether to enable click to scroll back to top' },
      { name: 'fixed', type: 'Boolean', default: 'false', description: 'whether it is suspended in the lower right corner' },
      { name: 'autohide', type: 'Boolean', default: 'false', description: 'auto-hide (only valid when fixed is true)' },
      { name: 'threshold', type: 'Number', default: '25', description: 'scrolling threshold before hiding' }
    ],
    events: [],
    cssprops: [
      { name: '--size', default: '3em', description: 'the size of the element (diameter)' },
      { name: '--distance', default: '2em', description: 'distance from the lower right corner when floating' }
    ],
    slots: [
      { name: 'default', description: 'FAB content (default is \u25b2)' }
    ],
    demo: `
  <sd-fab>\u25b2</sd-fab>
  <sd-fab rounded>\u2605</sd-fab>
`
  },
  {
    tag: 'sd-input-text',
    name: 'InputText',
    group: 'components',
    description: 'A text input component with floating label.',
    properties: [
      { name: 'value', type: 'String', default: '""', description: 'the input value' },
      { name: 'placeholder', type: 'String', default: '""', description: 'placeholder text' },
      { name: 'label', type: 'String', default: '"input"', description: 'floating label text' },
      { name: 'disabled', type: 'Boolean', default: 'false', description: 'whether the input is disabled' }
    ],
    events: [
      { name: 'change', detail: '{value: String}', description: 'fired when input value changes' },
      { name: 'input', detail: '{value: String}', description: 'fired during input' }
    ],
    cssprops: [
      { name: '--font-size', default: '1em', description: 'font size of the input' }
    ],
    slots: [
      { name: 'default', description: 'prefix icon/content inside input' }
    ],
    demo: `
  <sd-input-text label="Name"></sd-input-text>
`
  },
  {
    tag: 'sd-input',
    name: 'Input',
    group: 'components',
    description: 'A basic input component with before/after slots.',
    properties: [
      { name: 'disabled', type: 'Boolean', default: 'false', description: 'whether the input is disabled' },
      { name: 'type', type: 'String', default: '"text"', description: 'input type (text, number, email, password, etc.)' },
      { name: 'value', type: 'String', default: '""', description: 'the input value' },
      { name: 'placeholder', type: 'String', default: '""', description: 'placeholder text' }
    ],
    events: [
      { name: 'change', detail: '{value: String}', description: 'fired when input value changes' },
      { name: 'input', detail: '{value: String}', description: 'fired during input' }
    ],
    cssprops: [],
    slots: [
      { name: 'before', description: 'content inside input box, before the text' },
      { name: 'after', description: 'content inside input box, after the text' }
    ],
    demo: `
  <sd-input placeholder="Type here..."></sd-input>
`
  },
  {
    tag: 'sd-modal',
    name: 'Modal',
    group: 'components',
    description: 'A centered modal dialog with transition animation.',
    properties: [
      { name: 'open', type: 'Boolean', default: 'false', description: 'whether the modal is open' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'modal content' }
    ],
    demo: `
  <sd-button onclick="this.nextElementSibling.open=true">Open Modal</sd-button>
  <sd-modal>
    <sd-card style="min-width:220px">
      <span slot="header">Modal Title</span>
      Modal body content.
      <sd-button slot="footer" onclick="this.closest('sd-modal').open=false">Close</sd-button>
    </sd-card>
  </sd-modal>
`
  },
  {
    tag: 'sd-option',
    name: 'Option',
    group: '_hidden',
    description: 'An option item for use within sd-select.',
    properties: [
      { name: 'value', type: 'String', default: '""', description: 'the value of the option' },
      { name: 'selected', type: 'Boolean', default: 'false', description: 'whether the option is selected' },
      { name: 'disabled', type: 'Boolean', default: 'false', description: 'whether the option is disabled' },
      { name: 'checkbox', type: 'Boolean', default: 'false', description: 'whether to show a checkbox for this option' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'option text content' }
    ],
    demo: `
  <sd-option>Option item</sd-option>
  <sd-option selected>Selected</sd-option>
  <sd-option disabled>Disabled</sd-option>
`
  },
  {
    tag: 'sd-progress',
    name: 'Progress',
    group: 'components',
    description: 'A progress bar component showing percentage value.',
    properties: [
      { name: 'value', type: 'Number', default: '0', description: 'progress percentage (0\u2013100)' }
    ],
    events: [],
    cssprops: [
      { name: '--height', default: '0.75em', description: 'height of the progress bar' },
      { name: '--background', default: 'var(--sd-color-primary)', description: 'background color of the progress indicator' }
    ],
    slots: [],
    demo: `
  <sd-progress value="30" style="width:240px"></sd-progress>
  <sd-progress value="70" style="width:240px"></sd-progress>
`
  },
  {
    tag: 'sd-radio-group',
    name: 'RadioGroup',
    group: 'components',
    description: 'A container for radio buttons with group selection logic.',
    properties: [
      { name: 'checked', type: 'SDRadio | undefined', default: 'undefined', description: 'the currently checked radio element' }
    ],
    events: [
      { name: 'change', detail: '{value: String}', description: 'fired when radio selection changes' }
    ],
    cssprops: [],
    slots: [
      { name: 'default', description: 'sd-radio child elements' }
    ],
    demo: `
  <sd-radio-group>
    <sd-radio value="a">Option A</sd-radio>
    <sd-radio value="b">Option B</sd-radio>
    <sd-radio value="c">Option C</sd-radio>
  </sd-radio-group>
`
  },
  {
    tag: 'sd-radio',
    name: 'Radio',
    group: 'components',
    description: 'A radio button component with optional label position control.',
    properties: [
      { name: 'checked', type: 'Boolean', default: 'false', description: 'whether the radio is checked' },
      { name: 'position', type: 'String', default: '"right"', description: 'label position: left or right' },
      { name: 'value', type: 'String', default: '""', description: 'the value of the radio' }
    ],
    events: [
      { name: 'change', detail: '{checked: Boolean, value: String}', description: 'fired when radio is toggled' }
    ],
    cssprops: [
      { name: '--size', default: '1em', description: 'the size of the radio button' }
    ],
    slots: [
      { name: 'default', description: 'radio label text' }
    ],
    demo: `
  <sd-radio>Unchecked</sd-radio>
  <sd-radio checked>Checked</sd-radio>
`
  },
  {
    tag: 'sd-select',
    name: 'Select',
    group: 'components',
    description: 'A dropdown select component with optional multiple selection.',
    properties: [
      { name: 'multiple', type: 'Boolean', default: 'false', description: 'whether multiple selection is enabled' },
      { name: 'selectedIndex', type: 'Number | Number[]', default: '-1', description: 'get/set the selected option by index' }
    ],
    events: [
      { name: 'change', detail: '{index: Number | Number[]}', description: 'fired when selection changes' }
    ],
    cssprops: [
      { name: '--min-width', default: '10em', description: 'minimum width of select dropdown' },
      { name: '--max-width', default: '100%', description: 'maximum width of select dropdown' }
    ],
    slots: [
      { name: 'default', description: 'sd-option child elements' }
    ],
    demo: `
  <div style="display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap">
    <div>
      <div style="font-size:0.75rem;opacity:0.5;margin-bottom:0.4rem">Single</div>
      <sd-select style="--min-width:160px">
        <sd-option value="1" selected>Option 1</sd-option>
        <sd-option value="2">Option 2</sd-option>
        <sd-option value="3">Option 3</sd-option>
      </sd-select>
    </div>
    <div>
      <div style="font-size:0.75rem;opacity:0.5;margin-bottom:0.4rem">Multiple</div>
      <sd-select style="--min-width:160px" multiple>
        <sd-option value="1" selected>Option 1</sd-option>
        <sd-option value="2" selected>Option 2</sd-option>
        <sd-option value="3">Option 3</sd-option>
      </sd-select>
    </div>
  </div>
`
  },
  {
    tag: 'sd-slider',
    name: 'Slider',
    group: 'components',
    description: 'A draggable slider component for selecting values within a range.',
    properties: [
      { name: 'step', type: 'Number', default: '0', description: 'step size (0 = continuous)' },
      { name: 'min', type: 'Number', default: '0', description: 'minimum value' },
      { name: 'max', type: 'Number', default: '100', description: 'maximum value' },
      { name: 'value', type: 'Number', default: '0', description: 'current value' }
    ],
    events: [
      { name: 'change', detail: '{value: Number}', description: 'fired when slider value changes' }
    ],
    cssprops: [
      { name: '--size', default: '1em', description: 'size of the slider thumb' }
    ],
    slots: [],
    demo: `
  <sd-slider style="width:200px"></sd-slider>
`
  },
  {
    tag: 'sd-spinner',
    name: 'Spinner',
    group: 'components',
    description: 'A simple animated loading spinner.',
    properties: [],
    events: [],
    cssprops: [
      { name: '--color', default: 'var(--sd-color-alert)', description: 'color of the spinner' },
      { name: '--size', default: '2.5em', description: 'size of the spinner' }
    ],
    slots: [],
    demo: `
  <sd-spinner></sd-spinner>
`
  },
  {
    tag: 'sd-switch',
    name: 'Switch',
    group: 'components',
    description: 'A toggle switch component with customizable size and aspect ratio.',
    properties: [
      { name: 'checked', type: 'Boolean', default: 'false', description: 'whether the switch is checked' },
      { name: 'disabled', type: 'Boolean', default: 'false', description: 'whether the switch is disabled' }
    ],
    events: [
      { name: 'change', detail: '{checked: Boolean}', description: 'fired when switch state changes' }
    ],
    cssprops: [
      { name: '--size', default: '1em', description: 'the size of the element (height)' },
      { name: '--scale', default: '1.75', description: 'the aspect ratio of the element' }
    ],
    slots: [
      { name: 'before', description: 'label before the switch' },
      { name: 'default', description: 'content inside the switch' },
      { name: 'after', description: 'label after the switch' }
    ],
    demo: `
  <sd-switch><span slot="after">Off</span></sd-switch>
  <sd-switch checked><span slot="after">On</span></sd-switch>
  <sd-switch disabled><span slot="after">Disabled</span></sd-switch>
`
  },
  {
    tag: 'sd-tab',
    name: 'Tab',
    group: 'components',
    description: 'A single tab item for use within sd-tabs.',
    properties: [
      { name: 'active', type: 'Boolean', default: 'false', description: 'whether this tab is active' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'tab label text' }
    ],
    demo: `
  <sd-tabs>
    <sd-tab>First</sd-tab>
    <sd-tab active>Active</sd-tab>
    <sd-tab>Third</sd-tab>
  </sd-tabs>
`
  },
  {
    tag: 'sd-tabs',
    name: 'Tabs',
    group: 'components',
    description: 'A tab container for managing multiple sd-tab children.',
    properties: [
      { name: 'tab', type: 'Number', default: '-1', description: 'index of the selected sd-tab (\u22121 if none)' }
    ],
    events: [
      { name: 'change', detail: '{index: Number, tab: SDTab}', description: 'fired when active tab changes' }
    ],
    cssprops: [],
    slots: [
      { name: 'default', description: 'sd-tab child elements' }
    ],
    demo: `
  <sd-tabs>
    <sd-tab>Tab One</sd-tab>
    <sd-tab>Tab Two</sd-tab>
    <sd-tab>Tab Three</sd-tab>
  </sd-tabs>
`
  },
  {
    tag: 'sd-textarea',
    name: 'Textarea',
    group: 'components',
    description: 'A textarea input component for multi-line text entry.',
    properties: [
      { name: 'value', type: 'String', default: '""', description: 'the textarea value' }
    ],
    events: [
      { name: 'change', detail: '{value: String}', description: 'fired when textarea value changes' },
      { name: 'input', detail: '{value: String}', description: 'fired during input' }
    ],
    cssprops: [],
    slots: [],
    demo: `
  <sd-textarea placeholder="Write something..." style="width:280px"></sd-textarea>
`
  },
  {
    tag: 'sd-aside',
    name: 'Aside',
    group: 'containers',
    description: 'A container that automatically positions a floating element relative to a main element.',
    properties: [
      { name: 'hidden', type: 'Boolean', default: 'false', description: 'whether the aside element is hidden' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'main element' },
      { name: 'aside', description: 'suspended element with automatic positioning' }
    ],
    demo: `
  <sd-aside style="display:inline-block">
    <sd-button>Hover me</sd-button>
    <sd-card slot="aside" style="padding:0.5rem;min-width:120px">Aside content</sd-card>
  </sd-aside>
`
  },
  {
    tag: 'sd-box',
    name: 'Box',
    group: 'containers',
    description: 'A utility container for applying padding, margin, and display properties.',
    properties: [
      { name: 'p', type: 'String', default: '""', description: 'padding CSS value' },
      { name: 'm', type: 'String', default: '""', description: 'margin CSS value' },
      { name: 'display', type: 'String', default: '""', description: 'display CSS value' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'box content' }
    ],
    demo: `
  <sd-box p="1rem" style="border:1px solid var(--sd-color-border);border-radius:0.5rem">Box with padding</sd-box>
`
  },
  {
    tag: 'sd-collapse',
    name: 'Collapse',
    group: 'containers',
    description: 'A collapsible container with expand/collapse animation.',
    properties: [
      { name: 'expand', type: 'Boolean', default: 'false', description: 'whether the collapse is expanded' },
      { name: 'position', type: 'String', default: '"top"', description: 'position of toggle: top or bottom' }
    ],
    events: [
      { name: 'change', detail: '{expand: Boolean}', description: 'fired when expand state changes' }
    ],
    cssprops: [],
    slots: [
      { name: 'toggle', description: 'toggle element to expand/collapse' },
      { name: 'default', description: 'collapsible content' }
    ],
    demo: `
  <sd-collapse style="width:240px">
    <sd-button slot="toggle">Toggle</sd-button>
    Collapsed content here.
  </sd-collapse>
`
  },
  {
    tag: 'sd-dragger',
    name: 'Dragger',
    group: 'containers',
    description: 'A container where child elements with data-draggable attribute can be dragged.',
    properties: [
      { name: 'percentage', type: 'Boolean', default: 'false', description: 'use percentage instead of pixels for positioning' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'draggable container content' }
    ],
    demo: `
  <sd-dragger style="left:320px;top:200px;padding:0.75rem 1.25rem;background:var(--sd-color-background);border:1px solid var(--sd-color-border);border-radius:var(--sd-length-radius);box-shadow:0 2px 12px var(--sd-color-shadow)">
    <div data-draggable style="cursor:move;font-weight:500;margin-bottom:0.25rem">⠿ Drag me</div>
    <div style="opacity:0.6;font-size:0.85rem">I can be dragged</div>
  </sd-dragger>
`
  },
  {
    tag: 'sd-drawer',
    name: 'Drawer',
    group: 'containers',
    description: 'A slide-out drawer panel with optional mask and position control.',
    properties: [
      { name: 'position', type: 'String', default: '"left"', description: 'position: top, bottom, left, or right' },
      { name: 'fixed', type: 'Boolean', default: 'false', description: 'whether to use fixed positioning' },
      { name: 'open', type: 'Boolean', default: 'false', description: 'whether the drawer is open' },
      { name: 'mask', type: 'Boolean', default: 'true', description: 'whether to show the mask (clicking closes drawer)' }
    ],
    events: [],
    cssprops: [
      { name: '--width', default: '20em', description: 'width when position is left or right' },
      { name: '--height', default: '20em', description: 'height when position is top or bottom' }
    ],
    slots: [
      { name: 'default', description: 'drawer content' }
    ],
    demo: `
  <div style="position:relative;width:260px;height:100px;overflow:hidden;border:1px solid var(--sd-color-border);border-radius:0.5rem">
    <sd-drawer position="left" style="--width:140px">
      <sd-box p="1rem">Drawer content</sd-box>
    </sd-drawer>
    <sd-button onclick="var dr=this.closest('div').querySelector('sd-drawer');dr.open=!dr.open" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">Toggle</sd-button>
  </div>
`
  },
  {
    tag: 'sd-float',
    name: 'Float',
    group: 'containers',
    description: 'A float container with 9 positioning options and fixed/absolute modes.',
    properties: [
      { name: 'position', type: 'String', default: '"disabled"', description: 'floating position (disabled, top/bottom-left/center/right)' },
      { name: 'z', type: 'String', default: '"1"', description: 'z-index of the float container' },
      { name: 'fixed', type: 'Boolean', default: 'false', description: 'whether to use fixed positioning' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'floating content' }
    ],
    demo: `
  <div style="position:relative;width:200px;height:80px;border:1px solid var(--sd-color-border);border-radius:0.5rem">
    <sd-float position="bottom-right"><sd-button>BR</sd-button></sd-float>
    <sd-float position="top-left"><sd-button>TL</sd-button></sd-float>
  </div>
`
  },
  {
    tag: 'sd-loading',
    name: 'Loading',
    group: 'containers',
    description: 'A container that overlays loading content on top of wrapped content.',
    properties: [
      { name: 'loading', type: 'Boolean', default: 'true', description: 'whether loading state is active' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'the actual content' },
      { name: 'loading', description: 'loading indicator (displayed center when active)' }
    ],
    demo: `
  <sd-loading style="width:200px;height:60px">
    <div style="padding:1rem;text-align:center">Content</div>
    <sd-spinner slot="loading"></sd-spinner>
  </sd-loading>
`
  },
  {
    tag: 'sd-transition',
    name: 'Transition',
    group: 'containers',
    description: 'A transition container for animating element enter/leave with custom CSS styles.',
    properties: [
      { name: 'state', type: 'Boolean', default: 'true', description: 'true for enter, false for leave' },
      { name: 'immediate', type: 'Boolean', default: 'false', description: 'execute the first transition' },
      { name: 'applyToFirstElement', type: 'Boolean', default: 'false', description: 'apply transition to first child element instead of :host' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'content to transition' }
    ],
    demo: `
  <sd-button onclick="var t=this.nextElementSibling;t.state=!t.state">Toggle</sd-button>
  <sd-transition style="display:inline-block">
    <sd-card style="padding:0.5rem;min-width:120px">Transitioning!</sd-card>
  </sd-transition>
`
  },
  {
    tag: 'sd-transition-easy',
    name: 'TransitionEasy',
    group: 'containers',
    description: 'Simplified transition wrapper with sensible defaults.',
    properties: [
      { name: 'state', type: 'Boolean', default: 'true', description: 'true for enter, false for leave' },
      { name: 'immediate', type: 'Boolean', default: 'false', description: 'execute the first transition' },
      { name: 'group', type: 'Boolean', default: 'false', description: 'use sd-transition-group instead of sd-transition' },
      { name: 'applyToFirstElement', type: 'Boolean', default: 'false', description: 'apply transition to first child element' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'content to transition' }
    ],
    demo: `
  <sd-button onclick="var t=this.nextElementSibling;t.state=!t.state">Toggle</sd-button>
  <sd-transition-easy>
    <sd-card style="padding:0.5rem;min-width:120px">Easy transition!</sd-card>
  </sd-transition-easy>
`
  },
  {
    tag: 'sd-transition-group',
    name: 'TransitionGroup',
    group: 'containers',
    description: 'A transition container that applies transitions to newly added slot elements.',
    properties: [
      { name: 'from', type: 'Object', default: "{opacity: '0'}", description: 'initial CSS properties' },
      { name: 'to', type: 'Object', default: "{opacity: '1'}", description: 'target CSS properties' },
      { name: 'transition', type: 'String', default: '"opacity ease-in var(--sd-time-normal)"', description: 'CSS transition string' },
      { name: 'immediate', type: 'Boolean', default: 'false', description: 'execute transition on first render' }
    ],
    events: [],
    cssprops: [],
    slots: [
      { name: 'default', description: 'slotted elements that will be transitioned' }
    ],
    demo: `
  <sd-transition-group style="display:flex;gap:0.5rem;flex-wrap:wrap;min-height:2.5em"></sd-transition-group>
  <sd-button onclick="var tg=this.previousElementSibling;var b=document.createElement('sd-button');b.textContent='Item '+(tg.children.length+1);tg.appendChild(b)">Add item</sd-button>
`
  },
  {
    tag: 'sd-tree',
    name: 'Tree',
    group: 'containers',
    description: 'A tree component for displaying recursive hierarchical content with expand/collapse.',
    properties: [
      { name: 'hasChild', type: 'Boolean', default: 'false', description: 'whether the element has child nodes' },
      { name: 'node', type: 'String', default: '""', description: 'the content of this node' },
      { name: 'expand', type: 'Boolean', default: 'false', description: 'whether the tree is expanded' }
    ],
    events: [
      { name: 'change', detail: '{expand: Boolean}', description: 'fired when tree expand state changes' }
    ],
    cssprops: [
      { name: '--triangle-size', default: '0.25em', description: 'size of the toggle triangle' }
    ],
    slots: [
      { name: 'node', description: 'custom HTML for node label' },
      { name: 'default', description: 'child sd-tree elements' }
    ],
    demo: `
  <sd-tree node="Root" has-child expand>
    <sd-tree node="Branch A" has-child>
      <sd-tree node="Leaf 1"></sd-tree>
      <sd-tree node="Leaf 2"></sd-tree>
    </sd-tree>
    <sd-tree node="Branch B"></sd-tree>
  </sd-tree>
`
  }
];

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const colClass: Record<string, string> = {
  name: 'td-name',
  type: 'td-type',
  default: 'td-default',
  description: 'td-desc',
  detail: 'td-type',
};

function tableRows(arr: object[], cols: string[]) {
  return arr.map(row => {
    const cells = cols.map(col => {
      const val = (row as Record<string, unknown>)[col];
      const cls = colClass[col] ? ` class="${colClass[col]}"` : '';
      return `<td${cls}>${escapeHtml(String(val ?? ''))}</td>`;
    }).join('');
    return `<tr>${cells}</tr>`;
  }).join('\n');
}

function tableSection(title: string, arr: object[], cols: string[], headers: string[]) {
  if (!arr || arr.length === 0) return '';
  const head = headers.map(h => `<th>${h}</th>`).join('');
  const body = tableRows(arr, cols);
  return `
<section class="doc-section">
  <h2>${title}</h2>
  <div class="table-wrap"><div class="table-scroll">
    <table>
      <thead><tr>${head}</tr></thead>
      <tbody>${body}</tbody>
    </table>
  </div></div>
</section>`;
}

function render(comp: ComponentDef) {
  const propsSection = tableSection(
    'Properties',
    comp.properties,
    ['name', 'type', 'default', 'description'],
    ['Name', 'Type', 'Default', 'Description']
  );

  const eventsSection = tableSection(
    'Events',
    comp.events,
    ['name', 'detail', 'description'],
    ['Name', 'Detail', 'Description']
  );

  const cssSection = tableSection(
    'CSS Custom Properties',
    comp.cssprops,
    ['name', 'default', 'description'],
    ['Name', 'Default', 'Description']
  );

  const slotsSection = tableSection(
    'Slots',
    comp.slots,
    ['name', 'description'],
    ['Name', 'Description']
  );

  let escaped = escapeHtml(comp.demo);
  if(escaped.startsWith("\n")) escaped = escaped.slice(1)

  return `
<div class="comp-header">
  <h1 class="comp-title">${comp.name}</h1>
  <code class="comp-tag">&lt;${comp.tag}&gt;</code>
</div>
<p class="comp-desc">${comp.description}</p>

<section class="doc-section">
  <h2>Demo</h2>
  <div class="demo-box">
    ${comp.demo}
  </div>
</section>
${propsSection}
${eventsSection}
${cssSection}
${slotsSection}
<section class="doc-section">
  <h2>Usage</h2>
  <div class="usage-block">
    <button class="copy-btn" onclick="(function(btn){navigator.clipboard.writeText(btn.parentElement.querySelector('code').innerText).then(function(){var t=btn.textContent;btn.textContent='Copied!';setTimeout(function(){btn.textContent=t;},1500);});})(this)">Copy</button>
    <pre><syntax-highlight language="html">${escaped}</syntax-highlight></pre>
  </div>
</section>
`;
}

document.addEventListener('DOMContentLoaded', function () {
  const navComponents = document.getElementById('nav-components')!;
  const navContainers = document.getElementById('nav-containers')!;
  const page = document.getElementById('page')!;
  const content = document.getElementById('content')!;
  const sidebarLinks: HTMLAnchorElement[] = [];

  registry.forEach(function (comp) {
    if (comp.group === '_hidden') return;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + comp.tag;
    a.textContent = comp.name;
    li.appendChild(a);
    sidebarLinks.push(a);
    if (comp.group === 'components') {
      navComponents.appendChild(li);
    } else {
      navContainers.appendChild(li);
    }
  });

  function getComp(): ComponentDef {
    const hash = window.location.hash.slice(1);
    return (
      registry.find(c => c.tag === hash && c.group !== '_hidden') ??
      registry.find(c => c.group !== '_hidden')!
    );
  }

  function setActive(tag: string) {
    sidebarLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + tag);
    });
  }

  function renderPage() {
    const comp = getComp();
    page.innerHTML = render(comp);
    setActive(comp.tag);
    content.scrollTop = 0;
  }

  renderPage();

  window.addEventListener('hashchange', renderPage);
});
