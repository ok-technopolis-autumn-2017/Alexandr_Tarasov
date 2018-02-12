const ExtendEventable = require('../utils/ExtendEventable');
const Filter = require('./Filter');

/**
 * @extends {EventListener}
 * @param root
 * @constructor
 */
function TodosActionbar(root) {
    this._initEventable();

    this._root = root;
    this._counter = root.querySelector('.todo-actionbar_left-items');
    this._clearCompletedButton = root.querySelector('.todo-actionbar_clear-completed');
    this._filters = new Filter(root.querySelector('.filter-button'));

    this._filters.on('filterSpecified', this._onFilterSpecified, this);

    this._clearCompletedButton.addEventListener('click', this);
}

ExtendEventable(TodosActionbar);

/**
 * @callback handleEvent
 * @private
 * @returns {Eventable}
 */
TodosActionbar.prototype._onFilterSpecified = function (filterName) {
    return this.trigger('filterSelected', filterName);
};

/**
 * @callback handleEvent
 * @private
 * @returns {Eventable}
 */
TodosActionbar.prototype._onClearCompleted = function () {
    return this.trigger('clearCompleted');
};

/**
 * @param {Number} number
 * @returns {TodosActionbar}
 */
TodosActionbar.prototype.setLeftItemsNumber = function (number) {
    this._counter.innerHTML = number + '&nbsp;' + (number === 1 ? 'item' : 'items') + '&nbsp;left';
    return this;
};

/**
 * @param {Boolean} isVisible
 * @returns {TodosActionbar}
 */
TodosActionbar.prototype.setClearCompletedVisibility = function (isVisible) {
    if (isVisible) {
        this._clearCompletedButton.classList.remove('__hide');
    } else {
        this._clearCompletedButton.classList.add('__hide');
    }
    return this;
};

TodosActionbar.prototype.handleEvent = function (e) {
    if (e.type === 'click') {
        this._onClearCompleted();
    }
};

module.exports = TodosActionbar;
