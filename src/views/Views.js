class Views {
  #root = document.getElementById(`root`)

  beforeRender() {}

  render() {
    this.beforeRender()
    this.#root.appendChild(this._element)
  }
}

export default Views
