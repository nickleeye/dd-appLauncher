import './components/dd-app-launcher.js'

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>

  <div>
    <h1>App-Launcher</h1>
    
    <dd-app-launcher></dd-app-launcher>

  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    //const element = this._shadowRoot.querySelector('my-button');
    //element.label = 'Click Me';

    this._shadowRoot.querySelector('dd-app-launcher').addEventListener(
        'onClick', value => console.log(value));
  }
}

window.customElements.define('my-app', App);