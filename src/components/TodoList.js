import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Divider, Button, Popconfirm, Form } from 'antd';
import { actions as todoActions } from "../redux/reducers/todo";
import { EditableFormRow, EditableCell } from "./EditableCell"
import './TodoList.css';
import TodoInput from './TodoInput'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'To-Do',
                dataIndex: 'content',
                key: 'content',
                editable: true,
                onCell: record => ({
                    record,
                    editable: true,
                    title: '待办内容',
                    dataIndex: 'content',
                    handleSave: this.handleEditTodo,
                }),
            },
            {
                dataIndex: 'operation',
                width: '10%',
                render: (text, item) =>
                    item.fulfilled ?
                        <Button size="small" type="danger" icon="delete" shape="circle" onClick={() => this.handleDeleteTodo(item.id)} />
                        : (
                            <Popconfirm
                                title="该待办尚未完成，确认删除?"
                                placement="leftTop"
                                okText="删除"
                                cancelText="取消" onConfirm={() => this.handleDeleteTodo(item.id)}>
                                <Button size="small" type="danger" icon="delete" shape="circle" />
                            </Popconfirm>
                        )
            },
        ];
        this.handleAddTodo=this.handleAddTodo.bind(this);
    }
    handleAddTodo = content => {
        this.props.addTodo(content);
    };

    handleToggleFulfillTodo = (id, fulfilled) => {
        fulfilled ? this.props.fulfillTodo(id) : this.props.unfulfillTodo(id);
    };

    handleDeleteTodo = id => {
        this.props.deleteTodo(id);
    };

    handleEditTodo = (item) => {
        this.props.editTodo(item.id, item.content);
    };

    render() {
        const { todos } = this.props;

        let selectedKeys = todos.filter(item => item.fulfilled).map(o => o.id);
        const rowSelection = {
            onSelect: (record, selected) => {
                this.handleToggleFulfillTodo(record.id, selected);

            },
            selectedRowKeys: selectedKeys
        };
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        return (
            <div>
                <div style={{ margin:20, textAlign: 'left' }}>
                    <h2>今日待办</h2>
                </div>
                <Table
                    style={{borderWidth: '1px 0px 0px 0px',borderColor:'#e8e8e8', borderStyle:'solid'}}
                    showHeader={false}
                    components={components}
                    rowKey={item => item.id}
                    rowSelection={rowSelection}
                    rowClassName={() => 'editable-row'}
                    dataSource={todos}
                    columns={this.columns}
                    footer={() => <TodoInput onSaveTodo={this.handleAddTodo}/>} />
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        ...props,
        todos: state.todo.todos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(todoActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);