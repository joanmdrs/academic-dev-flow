import './App.css';
import './App.css';
import Routes from './routes';
import MyHeader from './components/Header/Header';
import MyMenu from './components/Menu/Menu';
import { Layout, Flex } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  overflow: 'hidden',
  
};

function App() {
  return (

    <Layout>
      <MyHeader />
      <Layout>
        <Sider width={200}>
          <MyMenu/>
        </Sider>
        <Routes/>
      </Layout>
    </Layout>
);
   

}

export default App;
