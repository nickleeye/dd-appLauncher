import './components/app-launcher/app-launcher.js'

const template = document.createElement('template');

template.innerHTML = `
  <div>
    <h1>App-Launcher</h1>

    <dd-app-launcher id="dd-app-launcher">
      <ul class="pf-c-app-launcher__menu" aria-labelledby="app-launcher-example-expanded-button" >
        <li><a class="pf-c-app-launcher__menu-item" href="#">
            Link
          </a>
        </li>
        <li><button class="pf-c-app-launcher__menu-item">
            Action
          </button>
        </li>
        <li><a class="pf-c-app-launcher__menu-item pf-m-disabled" href="#" aria-disabled="true" tabindex="-1">
            Disabled link
          </a>
        </li>
      </ul>
    </dd-app-launcher>
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