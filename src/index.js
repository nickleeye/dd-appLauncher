import './components/app-launcher/app-launcher.js'

const template = document.createElement('template');

template.innerHTML = `
  <style>
    @import './styles/app-launcher.css';
    @import './styles/patternfly-base.css';
  </style>
  
  <div>
    <h1>App-Launcher</h1>

    <app-launcher></app-launcher>

  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._shadowRoot.querySelector('app-launcher').addEventListener(
        'onClick', value => console.log(value));
  }
}

window.customElements.define('my-app', App);