const ExtendEventable = require('../utils/ExtendEventable');

/**
 * @extends {EventListener}
 * @param {HTMLElement} root
 * @constructor
 */
function TodosAddbar(root) {
    this._initEventable();

    this._root = root;
    this._input = root.querySelector('.todo-add_input');
    this._selectAllButton = root.querySelector('.todo-add_select-all');

    this._input.addEventListener('keypress', this);
    this._selectAllButton.addEventListener('click', this);
}

ExtendEventable(TodosAddbar);

/**
 * @callback handleEvent
 * @private
 * @returns {Eventable}
 */
TodosAddbar.prototype._onSelectAll = function () {
    return this.trigger('selectAll');
};

/**
 * @callback handleEvent
 * @private
 * @returns {Eventable}
 */
TodosAddbar.prototype._onTodoAdd = function () {
    let inputText = this._input.value.trim();

    if (inputText.length !== 0) {
        this._input.value = '';
        this._input.blur();

        return this.trigger('todoCreated', {text: inputText});
    }
};

/**
 * @returns {HTMLElement|*}
 */
TodosAddbar.prototype.getRoot = function () {
    return this._root;
};

TodosAddbar.prototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            this._onSelectAll();
            break;
        case 'keypress':
            if (e.keyCode === 13) {
                this._onTodoAdd();
            }
            break;
    }
};

module.exports = TodosAddbar;
