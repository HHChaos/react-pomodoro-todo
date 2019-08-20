import React, { Component } from 'react';
import { Statistic, Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as pomodoroActions } from "../redux/reducers/pomodoro";
import './PomodoroTimer.css';

const { Countdown } = Statistic;

class PomodoroTimer extends Component {
    constructor(props) {
        super(props);
        this.deadline = Date.now() + this.props.workTimer + 500;
        this.interval = this.props.workTimer;
    }
    componentDidMount() {
        this.timer.stopTimer();
    }
    componentWillUnmount() {
        this.timer.stopTimer();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.inBreak != this.props.inBreak) {
            let interval = 0;
            if (nextProps.inBreak) {
                if (nextProps.completedRings > 0 && (nextProps.completedRings + 1) % 4 == 0) {
                    interval = nextProps.longBreak;
                } else {
                    interval = nextProps.shortBreak;
                }
            } else {
                interval = nextProps.workTimer;
            }
            this.deadline = Date.now() + interval + 500;
            this.interval = interval;
            return true;
        } else if (nextProps.inPause != this.props.inPause) {
            if (!nextProps.inPause)
                this.deadline = Date.now() + this.interval;
            return true;
        } else {
            return false;
        }
    }

    componentDidUpdate() {
        if (this.props.inPause) {
            this.timer.stopTimer();
        } else {
            this.timer.startTimer();
        }
    }

    handleOnFinish = () => {
        this.props.pauseTimer();
    }
    render() {
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Countdown title={this.props.inBreak ? "Take a Break" : "In Work"} ref={node => (this.timer = node)} onFinish={this.handleOnFinish} value={this.deadline} format="mm:ss" />
                </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroTimer);