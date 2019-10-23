const template = document.createElement('template');
template.innerHTML = `
<style>
  @import '@patternfly/patternfly/patternfly-base.css';
  @import '@patternfly/patternfly/components/AppLauncher/app-launcher.css';
</style>

<app-launcher id="appluancher1">
    <nav class="pf-c-app-launcher pf-m-expanded" aria-label="Application launcher">
      <button id="app-launcher-example-expanded-button" class="pf-c-app-launcher__toggle" aria-expanded="false" aria-label="Application launcher">
        <i class="fas fa-th" aria-hidden="true"></i>
      </button>
<!--      <slot name="items"></slot>-->
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
    </nav>
</app-launcher>
`;

export class AppLauncher extends HTMLElement {

    /**
     * Called every time the element is inserted into the DOM
     */
    connectedCallback() {
        this._button = this._shadowRoot.querySelector('.pf-c-app-launcher__toggle');
        this._disabled = /\bdisabled/.test(this._button.className);
        const menu = this._shadowRoot.querySelector('.pf-c-app-launcher__menu');

        this._button.addEventListener('click', () => {
            this.toggle();
        });

        this._shadowRoot.addEventListener('click', (event) => {
            //close dropdown if clicked outside menu
            if ((event.target !== menu && event.target !== this._button) &&
                (!menu.contains(event.target) && !this._button.contains(event.target))) {
                this.toggle()
                // this._menu.setAttribute('hidden', 'true');
            }
        });

        this._shadowRoot.addEventListener('keydown', (event) => {
            if (/input|textarea/.test(event.target.tagName)) {
                return;
            }
            if (this._disabled) {
                return;
            }
            const active = /\bopen/.test(this._button.parentNode.className);

            //check if dropdown is open
            if (active) {
                this._keyHandler(event);
            }
        });

        // disable click for disabled Items
        this.disableClick();
    }

    /**
     * An instance of the element is created or upgraded
     */
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        // hide dropdown at start
        const menu = this._shadowRoot.querySelector('.pf-c-app-launcher__menu');
        // const menu = this._shadowRoot.querySelector('nav slot'); <-- to use slots the CSS would need to change.
        menu !== null && menu.setAttribute('hidden', 'true');
    }

    /**
     *Toggle the dropdown
     */
    toggle() {
        const  menu = this._shadowRoot.querySelector('.pf-c-app-launcher__menu');
        // const menu = this._shadowRoot.querySelector('nav slot');
        if (menu === null) {
            return;
        }
        if (menu.hasAttribute('hidden')){
            menu.removeAttribute('hidden');
        } else {
            menu.setAttribute('hidden', 'true');
        }
    }

    /**
     * Disable click on disabled items
     */
    disableClick() {
        const self = this._shadowRoot;
        const items = this._shadowRoot.querySelectorAll('ul.pf-c-app-launcher__menu li a, ' +
            'pf-c-app-launcher__menu li button');
        for (let i = 0; i < items.length; i++) {
            items[i].onclick = function () {
                if (items[i].parentNode.classList.contains('disabled')) {
                    return false;
                }
                self.dispatchEvent(new CustomEvent('pf-c-app-launcher__menu.itemClicked', {}));
                return true;
            };
        }
    }

    /**
     *  get id attribute
     *
     * @returns {string} the components id
     */
    get id() {
        return this.getAttribute('id');
    }

    /**
     *  set id attribute
     *
     * @param {string} 'value' the components id
     */
    set id(value) {
        this.setAttribute('id', value);
    }

    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}

window.customElements.define('dd-app-launcher', AppLauncher);