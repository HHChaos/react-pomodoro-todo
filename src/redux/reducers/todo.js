const initialState = {
    todos: [
        {
            id: generateUUID(),
            content: "这是一条示例待办",
            fulfilled: false
        },
        {
            id: generateUUID(),
            content: "勾选/取消勾选左侧选择框，可以更改该待办的完成状态",
            fulfilled: false
        },
        {
            id: generateUUID(),
            content: "点击待办内容可以编辑",
            fulfilled: false
        },
        {
            id: generateUUID(),
            content: "这是一条已完成的示例待办",
            fulfilled: true
        },
        {
            id: generateUUID(),
            content: "已完成的可以直接点击右侧删除，未完成的删除前需要二次确认",
            fulfilled: false
        },
        {
            id: generateUUID(),
            content: "在下面的输入框输入待办内容添加新待办",
            fulfilled: false
        },
        {
            id: generateUUID(),
            content: "暂无保存功能，所以请勿刷新界面，将导致数据丢失",
            fulfilled: false
        },
    ]
};

export const types = {
    ADD_TODO: "ADD_TODO",
    FULFILL_TODO: "FULFILL_TODO",
    UNFULFILL_TODO: "UNFULFILL_TODO",
    DELETE_TODO: "DELETE_TODO",
    EDIT_TODO: "EDIT_TODO"
};

export const actions = {
    addTodo: content => ({
        type: types.ADD_TODO,
        content: content
    }),
    fulfillTodo: id => ({
        type: types.FULFILL_TODO,
        todoID: id
    }),
    unfulfillTodo: id => ({
        type: types.UNFULFILL_TODO,
        todoID: id
    }),
    deleteTodo: id => ({
        type: types.DELETE_TODO,
        todoID: id
    }),
    editTodo: (id, content) => ({
        type: types.EDIT_TODO,
        todoID: id,
        content: content
    })
};

const reducer = (state = initialState, action) => {
    //console.log("action " + JSON.stringify(action));
    switch (action.type) {
        case types.ADD_TODO:
            return {
                todos: [...state.todos,
                {
                    id: generateUUID(),
                    content: action.content,
                    fulfilled: false
                }]
            };
        case types.FULFILL_TODO:
            return {
                todos: [...state.todos.map(item => {
                    if (item.id === action.todoID) {
                        item.fulfilled = true;
                    }
                    return item;
                })]
            };
        case types.UNFULFILL_TODO:
            return {
                todos: [...state.todos.map(item => {
                    if (item.id === action.todoID) {
                        item.fulfilled = false;
                    }
                    return item;
                })]
            };
        case types.DELETE_TODO:
            return { todos: [...state.todos.filter(item => item.id !== action.todoID)] };
        case types.EDIT_TODO:
            return {
                todos: [...state.todos.map(item => {
                    if (item.id === action.todoID) {
                        item.content = action.content;
                    }
                    return item;
                })]
            };
        default:
            return state;
    }
};

export default reducer;

function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}