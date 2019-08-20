import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';

class TodoInput extends Component {
    constructor(props) {
        super(props);
    }
    handleSaveTodo = e => {
        if (this.input.state.value && this.input.state.value.length > 0) {
            this.props.onSaveTodo(this.input.state.value);
            this.input.setValue(null);
        }

    };
    render() {
        return (
            <Row>
                <Col span={21} style={{ textAlign: 'center' }} >
                    <Input placeholder="键入待办内容" ref={node => (this.input = node)} onPressEnter={this.handleSaveTodo} onBlur={this.handleSaveTodo} />
                </Col>
                <Col span={3} style={{ textAlign: 'right' }} >
                    <Button icon="plus" shape="circle" onClick={this.handleSaveTodo} />
                </Col>
            </Row>
        );
    }
}
export default TodoInput;