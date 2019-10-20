import './components/my-button.js'

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>

  <div>
    <h1>A simple test</h1>
    
    <my-button label="This is Cool"></my-button>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this._shadowRoot.querySelector('input');
    this.$input.addEventListener('input', this._handleChange.bind(this));

    this.$allbuttons = this._shadowRoot.querySelectorAll('my-button');
  }

  _handleChange() {
    this.$allbuttons.forEach(element => {
      element.setAttribute('label', this.$input.value)
    });
  }
}

window.customElements.define('my-app', App);