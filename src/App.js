import React from 'react';
import './App.css';
import { Layout, Button,Row, Col } from 'antd';
import 'antd/dist/antd.css';
import TodoList from './components/TodoList'

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Layout className="App">
      <Layout>
        <Content style={{ padding: 24,margin:24, overflow: 'initial', background: '#fff', height: 'calc(100vh-48)', textAlign: 'center'  }}>
          
        </Content>
        <Footer>
          <Row>
            <Col span={12} style={{ textAlign: 'left' }} >
              <Button size="large" type="primary" icon="caret-right" shape="round" >开始</Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }} >
              <Button type="link">关于番茄钟工作法</Button>
              <Button type="link">关于此App</Button>
            </Col>
          </Row>
        </Footer>
    </Layout>
    <Sider width="400" style={{ background: '#fff'}}>
      <TodoList/>
    </Sider>
    </Layout >
  );
}

export default App;
