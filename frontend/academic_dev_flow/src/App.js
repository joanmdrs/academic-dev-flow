import './App.css';
import './App.css';
import Routes from './routes';
import { Layout } from 'antd';
import { NotificationContainer } from 'react-notifications';
import AuthProvider from './hooks/AuthProvider';



function App() {
  return (

    <div className='App'> 
      <AuthProvider>
        <Layout style={{
            minHeight: '100vh',
          }}>
            <NotificationContainer />
            <Routes/>
        </Layout>
      </AuthProvider>
    </div>

   
);
   

}

export default App;
