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
    
    <my-button></my-button>

  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    const element = this._shadowRoot.querySelector('my-button');
    element.label = 'Click Me';

    this._shadowRoot.querySelector('my-button').onClick = value => console.log(value);
  }
}

window.customElements.define('my-app', App);