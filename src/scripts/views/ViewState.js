const ExtendEventable = require('../utils/ExtendEventable');

/**
 * @constructor
 */
function ViewState() {
    this._initEventable();

    this.filter = 'all';
}

ExtendEventable(ViewState);

ViewState.prototype.onChange = function (handler, ctx) {
    this.on('filterChanged', function (filterName) {
        handler.call(ctx, {filter: filterName});
    });
};

ViewState.prototype.setFilter = function (filterName) {
    this.filter = filterName;
    this.trigger('filterChanged', filterName);
    return this;
};

ViewState.prototype.getFilter = function () {
    return this.filter;
};

const viewState = new ViewState();

module.exports = viewState;
