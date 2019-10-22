const template = document.createElement('template');
template.innerHTML = `
<app-launcher id="app-launcher1">
    <nav class="app-launcher" aria-label="Application launcher">
      <button id="app-launcher-example-expanded-button" class="btn app-launcher-toggle" aria-expanded="true" aria-label="Application launcher">
        <i class="fas fa-th" aria-hidden="true"></i>
      </button>
      <ul class="app-launcher-menu" aria-labelledby="app-launcher-example-expanded-button">
        <li><a class="app-launcher-menu-item" href="#">
            Link
          </a>
        </li>
        <li><button class="app-launcher-menu-item">
            Action
          </button>
        </li>
        <li><a class="app-launcher-menu-item m-disabled" href="#" aria-disabled="true" tabindex="-1">
            Disabled link
          </a>
        </li>
      </ul>
    </nav>
</app-launcher>
`;

class AppLauncher extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._button = this.querySelector('.btn');
        let menu = this.querySelector('.app-launcher-menu');

        // Hide menu as default
        menu.style.display ='none'

        this._button.addEventListener('click', () => {
            this.toggle();
        });

        // ignore clicks on disabled
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('disabled')) {
                return false;
            } else {
                dispatchEvent(new CustomEvent('app-launcher-menu.itemClicked', {}));
            }
        });

        this.initialized = true;
        this.dispatchEvent(new CustomEvent('app-launchers.initialized', {}));
    }

    /**
     *Toggle the dropdown
     */
    toggle() {
        let menu = this.querySelector('.app-launcher-menu');
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }
}

window.customElements.define('app-launcher', AppLauncher);