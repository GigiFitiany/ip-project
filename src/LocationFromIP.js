// dependencies / things imported
import { LitElement, html, css } from 'lit';
import { UserIP } from './UserIP.js';
import '@lrnwebcomponents/wikipedia-query/wikipedia-query.js';
//important the wikipedia-query from nowhere or a "bare importt"

export class LocationFromIP extends LitElement {
  static get tag() {
    return 'location-from-ip';
  }

  constructor() {
    super();
    this.UserIpInstance = new UserIP();
    this.locationEndpoint = 'https://freegeoip.app/json/';
    this.long = null;
    this.lat = null;
    this.country = null;
    this. city = null;
  }

  static get properties() {
    return {};
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.getGEOIPData();
  }

  async getGEOIPData() {
    const IPClass = new UserIP();
    const userIPData = await IPClass.updateUserIP();
    return fetch(this.locationEndpoint + userIPData.ip)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        return false;
      })
      .then(data => {
        console.log(data);
        this.long = data.longitude;
        this.lat = data.latitude;
        this.country = data.country;
        this.city = data.city;
        return data;
      });
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        iframe {
          height: 500px;
          width: 500px;
        }
      `,
    ];
  }

  render() {
    // this function runs every time a properties() declared variable changes
    // this means you can make new variables and then bind them this way if you like
    console.log(`lat: ${this.lat} long ${this.long}`)
    const url = `https://maps.google.com/maps?q=${this.long},${this.lat}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return html`<iframe title="Where you are" src="${url}"></iframe> 
    <a href="https://www.google.com/maps/@40.804,77.910,14z"><p style="text-align:left">Location on Google Maps</a></p>;
    <br>
      <script>window.__appCDN="https://cdn.webcomponents.psu.edu/cdn/";</script>
      <script src="https://cdn.webcomponents.psu.edu/cdn/build.js"></script>
      <wikipedia-query search="${this.city}"></wikipedia-query>
      <wikipedia-query search="${this.region}"></wikipedia-query>
      <wikipedia-query search="${this.city}, ${this.region}"></wikipedia-query> `;
  }
}

customElements.define(LocationFromIP.tag, LocationFromIP);
