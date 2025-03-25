import Routes from './routes';
import { Layout } from 'antd';
import { NotificationContainer } from 'react-notifications';
import AuthProvider from './hooks/AuthProvider';
import { ProviderGlobalTheme } from './context/ContextoTheme/ContextoTheme';



function App() {
  return (

    <div className='App'>
      <ProviderGlobalTheme>
        <AuthProvider>
          <Layout style={{
              minHeight: '100vh',
            }}>
              <NotificationContainer />
              <Routes/>
          </Layout>
        </AuthProvider>
      </ProviderGlobalTheme>
    </div>

   
);
   

}

export default App;
