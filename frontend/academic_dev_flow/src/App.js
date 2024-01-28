import './App.css';
import './App.css';
import Routes from './routes';
import MyHeader from './components/Header/Header';
import MyMenu from './components/Menu/Menu';
import { Layout } from 'antd';
import { NotificationContainer } from 'react-notifications';



function App() {
  return (

    <Layout style={{
      minHeight: '100vh',
    }}>
      <NotificationContainer />
      <MyMenu/>
      <Layout>
        <MyHeader/>
        <Routes/>
      </Layout>
    </Layout>
);
   

}

export default App;
