const template = document.createElement('template');
template.innerHTML = `
<app-launcher id="appluancher1">
    <nav class="pf-c-app-launcher pf-m-expanded" aria-label="Application launcher">
      <button id="app-launcher-example-expanded-button" class="pf-c-app-launcher__toggle" aria-expanded="false" aria-label="Application launcher">
        <i class="fas fa-th" aria-hidden="true"></i>
      </button>
      <ul class="pf-c-app-launcher__menu" aria-labelledby="app-launcher-example-expanded-button">
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

    /*
     * Called every time the element is inserted into the DOM
     */
    connectedCallback() {
        this._button = this.querySelector('.pf-c-app-launcher__toggle');
        this._disabled = /\bdisabled/.test(this._button.className);
        let menu = this.querySelector('.pf-c-app-launcher__menu');

        this._button.addEventListener('click', () => {
            alert("button click 1")
            this._showDropdown();
        });

        document.addEventListener('click', (event) => {
            //close dropdown if clicked outside menu
            if ((event.target !== menu && event.target !== this._button) &&
                (!menu.contains(event.target) && !this._button.contains(event.target))) {
                this._clearDropdown();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (/input|textarea/.test(event.target.tagName)) {
                return;
            }
            if (this._disabled) {
                return;
            }
            let active = /\bopen/.test(this._button.parentNode.className);

            //check if dropdown is open
            if (active) {
                this._keyHandler(event);
            }
        });

        // disable click for disabled Items
        this.disableClick();

        this.initialized = true;
        this.dispatchEvent(new CustomEvent('pf-dropdown.initialized', {}));
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

    /*
     * An instance of the element is created or upgraded
     */
    constructor() {
        super();
    }

    /**
     *Toggle the dropdown
     */
    toggle() {
        this._showDropdown();
    }

    /**
     * Disable click on disabled items
     */
    disableClick() {
        let self = this;
        let items = this.querySelectorAll('ul.pf-c-app-launcher__menu li a, pf-c-app-launcher__menu li button');
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
     * Open the dropdown
     *
     */
    _showDropdown() {
        let button = this.querySelector('.pf-c-app-launcher__toggle');
        if (/\bdisabled/.test(button.className)) {
            return;
        }
        let active = /\bopen/.test(button.parentNode.className);
        if (!active) {
            // this._detectTouch();
            this.dispatchEvent(new CustomEvent('pf-c-app-launcher__menu.show', {}));
            button.focus();
            button.setAttribute('aria-expanded', 'true');
            button.parentNode.classList.toggle('open');
            this.dispatchEvent(new CustomEvent('pf-c-app-launcher__menu.shown', {}));
        }
        if (active) {
            this._clearDropdown();
        }
    }
    /**
     * Close the dropdown
     *
     */
    _clearDropdown() {
        let button = this.querySelector('.pf-c-app-launcher__toggle');
        let backdrop = this.querySelector('.dropdown-backdrop');
        if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
        }
        this.dispatchEvent(new CustomEvent('pf-c-app-launcher__menu.hide', {}));
        button.setAttribute('aria-expanded', 'false');
        button.parentNode.classList.remove('open');
        this.dispatchEvent(new CustomEvent('pf-c-app-launcher__menu.hidden', {}));
    }

    // /**
    //  * Support for phone browser
    //  *
    //  */
    // _detectTouch() {
    //     if ('ontouchstart' in document.documentElement) {
    //         let div = document.createElement('div');
    //         div.classList.add('dropdown-backdrop');
    //         this.insertBefore(div, this.querySelector('.pf-c-app-launcher__menu'));
    //         div.addEventListener('click', this._clearDropdown());
    //     }
    // }
    //
    // /**
    //  *Support for accessibility
    //  *
    //  * @param {Event} event
    //  */
    // _keyHandler(event) {
    //     let keycode = event.keyCode ? event.keyCode : event.which;
    //
    //     // escape key
    //     if (keycode === 27) {
    //         this._clearDropdown();
    //         this._button.focus();
    //     }
    //
    //     // up and down key
    //     if (keycode === 38 || keycode === 40) {
    //
    //         event.preventDefault();
    //         event.stopPropagation();
    //
    //         let menuItem = this.querySelectorAll('.dropdown-menu li:not(.disabled) a');
    //         // index: guide focus on menu items
    //         let index = Array.prototype.indexOf.call(menuItem, event.target);
    //
    //         if (keycode === 38 && index > 0) {
    //             index--;
    //         }
    //         if (keycode === 40 && index < menuItem.length - 1) {
    //             index++;
    //         }
    //         if (index < 0) {
    //             index = 0;
    //         }
    //         menuItem[index].focus();
    //     }
    // }
}

window.customElements.define('app-launcher', AppLauncher);