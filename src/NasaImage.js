import { LitElement, css, html } from 'lit';
import '@lrnwebcomponents/accent-card.js';

class NasaImage extends LitElement {
    constructor() {
      super();
      this.dates = [];
      this.loadData = false;
      this.view = 'card';
    }
}


customElements.define('nasa-image-search', NasaImage);