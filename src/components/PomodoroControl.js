import React, { Component } from 'react';
import { Button } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as pomodoroActions } from "../redux/reducers/pomodoro";

class PomodoroControl extends Component {
    constructor(props) {
        super(props);
    }
    handleToggleTimerTodo = () => {
        this.props.inPause ? this.props.startTimer() : this.props.pauseTimer();
    };
    render() {
        return (
            <Button size="large" type="primary" icon={this.props.inPause ? "caret-right" : "pause"} shape="round" onClick={this.handleToggleTimerTodo} >
                {this.props.inPause ? "开始" : "暂停"}
            </Button>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        ...props,
        ...state.pomodoro
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(pomodoroActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroControl);