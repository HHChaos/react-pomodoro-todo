import React, { Component } from 'react';
import './App.css';
import { Layout, Button, Row, Col, Modal } from 'antd';
import 'antd/dist/antd.css';
import TodoList from './components/TodoList'
import PomodoroTimer from './components/PomodoroTimer'
import PomodoroControl from './components/PomodoroControl'
import AboutPomodoro from './components/AboutPomodoro'
import AboutApp from './components/AboutApp'

const { Footer, Sider, Content } = Layout;
class App extends Component {
  state = {
    aboutPomodoroVisible: true,
    aboutAppVisible: false,
  };

  showAboutPomodoroModal = () => {
    this.setState({
      aboutPomodoroVisible: true,
    });
  };
  showAboutAppModal = () => {
    this.setState({
      aboutAppVisible: true,
    });
  };
  handleModelCancel = e => {
    this.setState({
      aboutPomodoroVisible: false,
      aboutAppVisible: false,
    });
  };

  render() {
    return (
      <Layout className="App">
        <Layout>
          <Content style={{ padding: 24, margin: 24, overflow: 'initial', background: '#fff', height: 'calc(100vh-48)', textAlign: 'center' }}>
            <PomodoroTimer />
          </Content>
          <Footer>
            <Row>
              <Col span={12} style={{ textAlign: 'left' }} >
                <PomodoroControl />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }} >
                <Button type="link" onClick={this.showAboutPomodoroModal}>关于番茄钟工作法</Button>
                <Modal
                  centered
                  title="关于番茄钟工作法"
                  visible={this.state.aboutPomodoroVisible}
                  onCancel={this.handleModelCancel}
                  okButtonProps={{ hidden: true }}
                  cancelButtonProps={{ hidden: true }}>
                  <AboutPomodoro/>
                </Modal>
                <Button type="link" onClick={this.showAboutAppModal}>关于此App</Button>
                <Modal
                  centered
                  title="关于此App"
                  visible={this.state.aboutAppVisible}
                  onCancel={this.handleModelCancel}
                  okButtonProps={{ hidden: true }}
                  cancelButtonProps={{ hidden: true }}>
                  <AboutApp/>
                </Modal>
              </Col>
            </Row>
          </Footer>
        </Layout>
        <Sider width="400" style={{ background: '#fff' }}>
          <TodoList />
        </Sider>
      </Layout >
    );
  }
}

export default App;
