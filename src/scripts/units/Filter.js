const ExtendEventable = require('../utils/ExtendEventable');
const Eventable = require('../utils/Eventable');

/**
 * @param {HTMLElement} root
 * @constructor
 */
function Filter(root) {
    this._initEventable();

    this._filters = root.querySelectorAll('.filter-button_item');
    this._activeFilter = null;

    for (let i = 0; i < this._filters.length; i++) {
        this._filters[i].addEventListener('click', this);

        if (this._filters[i].classList.contains('__active')) {
            this._activeFilter = this._filters[i];
        }
    }
}

ExtendEventable(Filter, Eventable);

/**
 * @param {HTMLElement} filter
 * @callback handleEvent
 * @private
 */
Filter.prototype._onSetFilter = function (filter) {
    if (this._activeFilter !== filter) {
        this._activeFilter.classList.remove('__active');
        filter.classList.add('__active');

        this._activeFilter = filter;
        this.trigger('filterSpecified', filter.dataset.filter);
    }
    return this;
};

Filter.prototype.handleEvent = function (e) {
    if (e.type === 'click') {
        this._onSetFilter(e.target);
    }
};

module.exports = Filter;
