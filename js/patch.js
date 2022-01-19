// add removeAllChildren to Node object.
Node.prototype.removeAllChildren = function() {
  while(this.firstChild) {
    this.removeChild(this.firstChild);
  }
};

// give querySelectorAll the same forEach feature from Array.
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;
// mozilla bug that returns HTMLCollection instead of NodeList https://bugzilla.mozilla.org/show_bug.cgi?id-14869
