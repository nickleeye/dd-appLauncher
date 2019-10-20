const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import '~@patternfly/patternfly/components/Button/bitton.scss';
  </style>
  <div class="container">
    <button>Label</button>
  </div>
`;

class Button extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$button = this._shadowRoot.querySelector('button');
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;

        this.render();
    }

    render() {
        this.$button.innerHTML = this.label;
    }
}
window.customElements.define('my-button', Button);