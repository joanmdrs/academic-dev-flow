import './App.css';
import './App.css';
import Routes from './routes';
import MyHeader from './components/Header/Header';
import MyMenu from './components/Menu/Menu';
import { Layout } from 'antd';



function App() {
  return (

    <Layout style={{
      minHeight: '100vh',
    }}>
      <MyMenu/>
      <Layout>
        <MyHeader/>
        <Routes/>
      </Layout>
    </Layout>
);
   

}

export default App;
