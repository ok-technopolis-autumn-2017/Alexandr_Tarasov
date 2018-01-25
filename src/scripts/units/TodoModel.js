const ExtendEventable = require('../utils/ExtendEventable');

/**
 * @param {Object} data
 * @constructor
 */
function TodoModel(data) {
    this._initEventable();

    this._model = {
        id: data.id,
        isReady: data.isReady || false,
        text: data.text
    };
}

ExtendEventable(TodoModel);

/**
 * @param {String} field
 * @param {*} value
 * @returns {TodoModel}
 */
TodoModel.prototype.set = function (field, value) {
    this._model[field] = value;
    this.trigger('modelFieldChanged', {field: field, value: value});

    return this;
};

/**
 * @param {String} field
 * @returns {*}
 */
TodoModel.prototype.get = function (field) {
    return this._model[field];
};

/**
 * @param {String} field
 * @param {Function} handler
 * @param {Object} [ctx]
 * @returns {TodoModel}
 */
TodoModel.prototype.onChange = function (field, handler, ctx) {
    this.on('modelFieldChanged', function (data) {
        if (data.field === field) {
            handler.call(ctx, data);
        }
    }, this);

    return this;
};

/**
 * @param {Function} handler
 * @param {Object} [ctx]
 * @returns {TodoModel}
 */
TodoModel.prototype.onAnyChange = function (handler, ctx) {
    this.on('modelFieldChanged', function (data) {
        handler.call(ctx, data);
        this.trigger('modelChanged', this);
    }, this);

    return this;
};

module.exports = TodoModel;
