class DOMNodeCollection {

  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  empty() {
    this.HTMLElements.forEach( el => {
      console.log(el);
      el.innerHTML = "";
    });
  }

  append(element) {
    this.HTMLElements.forEach( el1 => {
      // el1.append(element.outerHTML);
      el1.innerHTML += element.outerHTML;
    });
  }

  attr(attrName, value) {
    if (value) {
      this.HTMLElements.forEach( el => {
        el.setAttribute(attrName, value);
      });
    } else {
      return this.HTMLElements[0].getAttribute(attrName);
    }
  }

  addClass(className) {
    this.HTMLElements.forEach(el => {
      let classes = el.getAttribute("class");
      classes += ` ${className}`;
      el.setAttribute("class", classes);
    });
  }

  removeClass(className) {
    if (className) {
      this.HTMLElements.forEach(el => {
        let classes = el.getAttribute("class");
        classes = classes.replace(className, '');
        el.setAttribute("class", classes);
      });
    } else {
      this.HTMLElements.forEach(el => {
        el.removeAttribute("class");
      });
    }
  }

  html(string) {
    if (string) {
      return this.HTMLElements.map(el => {
        el.innerHTML = string;
      });
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  find(selector) {
    let found = [];
    this.HTMLElements.forEach(el => {
      found.push(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(found);
  }

  children() {
    let children = [];
    this.HTMLElements.forEach( el => {
      children.push(el.children);
    });
    return new DOMNodeCollection(children);
  }

  parent() {
   let parents = [];
    this.HTMLElements.forEach(el => {
      parents.push(el.parentElement);
    });
    return new DOMNodeCollection(parents);
  }

  remove() {
    this.HTMLElements.forEach(el => {
      el.innerHTML = "";
    });
  }

  on(type, callback) {
    this.HTMLElements.forEach(el => {
      el.addEventListener(type, callback);
      el[type] = callback;
    });
  }

  off(type) {
    this.HTMLElements.forEach(el => {
      let callback = el[type];
      el.removeEventListener(type, callback);
    });
  }
}

module.exports = DOMNodeCollection;