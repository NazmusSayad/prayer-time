Document.prototype.qs = function () {
  return this.querySelector.apply(this, arguments)
}

Element.prototype.qs = function () {
  return this.querySelector.apply(this, arguments)
}

Document.prototype.qsa = function () {
  return Array.from(this.querySelectorAll.apply(this, arguments))
}

Element.prototype.qsa = function () {
  return Array.from(this.querySelectorAll.apply(this, arguments))
}
Object.prototype.forEach = function (callback) {
  Object.keys(this).forEach(key => {
    callback(key, this[key], this)
  })
}
window.HTML = function (body = '<div></div>') {
  return new DOMParser().parseFromString(body, 'text/html').body.firstElementChild
}

window.fetchJSON = async function () {
  return await (await fetch.apply(this, arguments)).json()
}

window.fetchTEXT = async function () {
  return await (await fetch.apply(this, arguments)).text()
}

window.Wait = function (duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
