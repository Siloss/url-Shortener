import Api from "../api/api";

export class Link {
  constructor(props) {
    this.url = props.url;
    this.key = props.key;
    this.owner = props.owner;
  }

  save(token = "") {
    const api = new Api("/api/link", token);
    api.POST({
      url: this.url,
      key: this.key,
      owner: this.owner,
    });
  }
}
