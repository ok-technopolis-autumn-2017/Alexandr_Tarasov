/**
 * @param {HTMLElement} root
 * @constructor
 */
function TodosContainer(root) {
    this._root = root;
}

/**
 * @param {Boolean} isVisible
 * @returns {TodosContainer}
 */
TodosContainer.prototype.setVisibility = function (isVisible) {
    if (isVisible) {
        this._root.classList.remove('__empty');
    } else {
        this._root.classList.add('__empty');
    }
    return this;
};

/**
 * @returns {HTMLElement}
 */
TodosContainer.prototype.getRoot = function () {
    return this._root;
};

module.exports = TodosContainer;
