import React, { Component } from 'react';
import { Statistic, Layout, Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as pomodoroActions } from "../redux/reducers/pomodoro";
import './PomodoroTimer.css';
import QueueAnim from 'rc-queue-anim';

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
        const inBreak = this.props.inBreak;
        this.props.pauseTimer();
        if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission(status => {
                if (status === 'granted') {
                    var n = new Notification('时间到啦！', {
                        body: inBreak ? '休息时间结束了，继续工作吧！' : '工作久了，休息一下！',
                        icon: './logo512.png',
                        requireInteraction: true
                    });
                }
            });
        }
    }
    render() {
        return (
            <div>
                <div style={{ height: 200 }}>
                    <Row>
                        <Col span={10} style={{ textAlign: 'left' }} >
                            <QueueAnim
                                animConfig={[
                                    { opacity: [1, 0], translateX: [0, -100] },
                                    { opacity: [1, 0], translateX: [-100, 100] }
                                ]}>
                                {this.props.inBreak ?
                                    null
                                    : <div key='a' class="pomodoro-title-left">In Work</div>}
                            </QueueAnim>
                        </Col>
                        <Col span={14} style={{ textAlign: 'right' }} >
                            <QueueAnim
                                animConfig={[
                                    { opacity: [1, 0], translateX: [0, -100] },
                                    { opacity: [1, 0], translateX: [-100, -200] }
                                ]}>
                                {this.props.inBreak ?
                                    <div key='a' class="pomodoro-title-right">Take a Break</div>
                                    : null}
                            </QueueAnim>
                        </Col>
                    </Row>
                </div>
                <Countdown key='a' ref={node => (this.timer = node)} onFinish={this.handleOnFinish} value={this.deadline} format="mm:ss" />
            </div>
        );
    };

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