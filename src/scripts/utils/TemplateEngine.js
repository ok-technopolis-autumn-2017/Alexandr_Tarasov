let divElement = document.createElement('div');

function getTemplateRootNode(scriptId) {
    let script = document.getElementById(scriptId);
    divElement.innerHTML = script.innerHTML;

    let result = divElement.children[0];
    divElement.removeChild(result);

    return result;
}

let templateEngine = {
    todoItem: function (data) {
        let root = getTemplateRootNode('itemTemplate');
        let readyMark = root.querySelector('.input-checkbox_target');
        let remove = root.querySelector('.todo-item_close');
        let text = root.querySelector('.todo-item_text');

        if (data.text) {
            text.innerText = data.text;
        }

        if (data.isReady) {
            readyMark.checked = true;
        }

        return {
            root: root,
            text: text,
            readyMark: readyMark,
            remove: remove
        };
    }
};

module.exports = templateEngine;
