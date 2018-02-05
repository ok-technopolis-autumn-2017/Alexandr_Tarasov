document.addEventListener('DOMContentLoaded', init);

const TodosListModel = require('./units/TodosListModel');
const TodosContainer = require('./units/TodosContainer');
const TodoAddbar = require('./units/TodosAddbar');
const TodosList = require('./units/TodosList');
const TodosActionbar = require('./units/TodosActionbar');
const viewState = require('./views/ViewState');

function init() {
    const mainWrapper = document.querySelector('.todo-main-wrapper');
    const todosContainer = new TodosContainer(mainWrapper.querySelector('.todo-container'));
    const todoAddbar = new TodoAddbar(mainWrapper.querySelector('.todo-add'));
    const todosList = new TodosList(mainWrapper.querySelector('.todo-items'));
    const todosActionbar = new TodosActionbar(mainWrapper.querySelector('.todo-actionbar'));
    const todosListModel = new TodosListModel([]);

    viewState.onChange(function (data) {
        todosList.filterItems(data['filter']);
    });

    todosListModel.onChange(function () {
        todosContainer.setVisibility(todosListModel.getList().length !== 0);

        let leftItemsNumber = todosListModel.getLeftItemsNumber();
        todosActionbar.setLeftItemsNumber(leftItemsNumber);

        todosActionbar.setClearCompletedVisibility(todosListModel.getList().length > leftItemsNumber);
    });

    todoAddbar
        .on('todoCreated', function (inputData) {
            todosListModel.add(inputData);
        })
        .on('selectAll', function () {
            todosListModel.getList()
                .filter(function (model) {
                    return !model.get('isReady');
                })
                .forEach(function (model) {
                    model.set('isReady', true);
                })
        });

    todosListModel
        .on('todoAdd', function (model) {
            todosList.addTodo(model);
        })
        .on('todoRemove', function (model) {
            todosList.remove(model);
        })
        .on('todoChange', function () {
            todosList.filterItems();
        });

    todosActionbar
        .on('clearCompleted', function () {
            todosListModel.clearCompleted();
        })
        .on('filterSelected', function (filter) {
            viewState.setFilter(filter);
        });
}
