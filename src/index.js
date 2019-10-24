import './components/app-launcher/app-launcher.js'

const template = document.createElement('template');

template.innerHTML = `
  <div>
    <h1>App-Launcher</h1>

    <dd-app-launcher id="applauncher1">
     <nav class="pf-c-app-launcher pf-m-expanded" aria-label="Application launcher">
      <button id="app-launcher-example-expanded-button" class="pf-c-app-launcher__toggle" aria-expanded="false" aria-label="Application launcher">
        <i class="fas fa-th" aria-hidden="true"></i>
      </button>
      <ul class="pf-c-app-launcher__menu" aria-labelledby="app-launcher-example-expanded-button" >
        <li><a class="pf-c-app-launcher__menu-item" href="#">
            My link
          </a>
        </li>
        <li><a class="pf-c-app-launcher__menu-item" href="#">
            My link
          </a>
        </li>
        <li><button class="pf-c-app-launcher__menu-item">
            My Action
          </button>
        </li>
        <li><a class="pf-c-app-launcher__menu-item pf-m-disabled" href="#" aria-disabled="true" tabindex="-1">
            Disabled link
          </a>
        </li>
        <li><a class="pf-c-app-launcher__menu-item pf-m-disabled" href="#" aria-disabled="true" tabindex="-1">
            Disabled link
          </a>
        </li>
      </ul>
    </nav>
    </dd-app-launcher>

<!--    <dd-app-launcher id="applauncher2"></dd-app-launcher>-->
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