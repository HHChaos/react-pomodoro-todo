const initialState = {
    todos: [
        {
            id: generateUUID(),
            content: "这是一条示例待办",
            fulfilled: false
        },
        {
            id: generateUUID(),
            content: "勾选左侧选择框标记完成该待办",
            fulfilled: false
        },
        {
            id: generateUUID(),
            content: "这是一条已完成的示例待办",
            fulfilled: true
        },
        {
            id: generateUUID(),
            content: "在下面的输入框输入并添加新待办",
            fulfilled: false
        },
    ]
};

export const types = {
    ADD_TODO: "ADD_TODO",
    TOGGLE_FULLFILL_TODO: "TOGGLE_FULLFILL_TODO",
    DELETE_TODO: "DELETE_TODO",
};

export const actions = {
    addTodo: content => ({
        type: types.ADD_TODO,
        content: content
    }),
    toggleFulfillTodo: id => ({
        type: types.TOGGLE_FULLFILL_TODO,
        todoID: id
    }),
    deleteTodo: id => ({
        type: types.DELETE_TODO,
        todoID: id
    })
};

const reducer = (state = initialState, action) => {
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
        case types.TOGGLE_FULLFILL_TODO:
            let newTodos = state.todos.map(item => {
                if (item.id == action.todoID) {
                    item.fulfilled = !item.fulfilled;
                }
                return item;
            })
            return { todos: [...newTodos] };
        case types.DELETE_TODO:
            let newTodos = state.todos.filter(item => item.id != action.todoID)
            return { todos: [...newTodos] };
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