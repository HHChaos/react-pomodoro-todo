import React from 'react';
import './App.css';
import { Layout, Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import TodoList from './components/TodoList'
import PomodoroTimer from './components/PomodoroTimer'
import PomodoroControl from './components/PomodoroControl'

const { Footer, Sider, Content } = Layout;
function App() {
  return (
    <Layout className="App">
      <Layout>
        <Content style={{ padding: 24, margin: 24, overflow: 'initial', background: '#fff', height: 'calc(100vh-48)', textAlign: 'center' }}>
          <PomodoroTimer />
        </Content>
        <Footer>
          <Row>
            <Col span={12} style={{ textAlign: 'left' }} >
              <PomodoroControl/>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }} >
              <Button type="link">关于番茄钟工作法</Button>
              <Button type="link">关于此App</Button>
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

export default App;
