const DOMNodeCollection = require('./dom_node_collection.js');

// core function
function $l(selector) {
  let queue = [];
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      queue.forEach( (el) => {
        $l(el);
      });
    }
    else {
      queue.push(selector);
    }
  };

  if (typeof selector === "string") {
    let selected = document.querySelectorAll(`.${selector}`);
    let array = Array.from(selected);
    return new DOMNodeCollection(array);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }

  
}

window.$l = $l;