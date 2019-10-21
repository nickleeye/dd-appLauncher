const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import '@patternfly/patternfly/components/AppLauncher/app-launcher.css;
  </style>
  
  <div class="container">
    <button></button>
     
    <div class="content">
        <ul>
            <li>This is just some random content.</li>
            <li>This is just some random content.</li>
            <li>This is just some random content.</li>
            <li>This is just some random content.</li>
        </ul>
    </div>
  </div>
`;

class AppLauncher extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$container = this._shadowRoot.querySelector('.container');
        this.$button = this._shadowRoot.querySelector('button');
        this.$content = this._shadowRoot.querySelector('.content');

        this.$content.style.display = "none";

        this.$button.addEventListener('click', () => {
            this.expandCollapse()
        });
    }

    expandCollapse() {
        this.$content = this._shadowRoot.querySelector('.content');
        if (this.$content.style.display === "none") {
            this.$content.style.display = "block";
        } else {
            this.$content.style.display = "none";
        }
    }

    connectedCallback() {
        if (this.hasAttribute('as-atom')) {
            this.$container.style.padding = '0px';
        }
    }

    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render() {
        this.$button.innerHTML;
    }
}

window.customElements.define('app-launcher', AppLauncher);