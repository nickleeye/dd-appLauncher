import './components/app-launcher/app-launcher.js'

const template = document.createElement('template');

template.innerHTML = `
  <style>
    <link rel="base" href="/patternfly-base.css" />
    <link rel="app-launcher" href="/app-launcher.css" />
  </style>
  
  <div>
    <h1>App-Launcher</h1>

    <dd-app-launcher id="dd-app-launcher"></dd-app-launcher>

  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

  }
}

window.customElements.define('my-app', App);