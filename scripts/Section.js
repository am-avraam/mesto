class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderItems = data
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItem(element) {
    this._container.append(element)
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item)
    })
  }
}

export default Section
