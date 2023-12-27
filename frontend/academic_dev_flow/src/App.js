import './App.css';
import './App.css';
import Routes from './routes';
import Header from './components/Header/Header';
import MyMenu from './components/Menu/Menu';

function App() {
  return (

      <div>
        <Header />
        <div className="content">
          <MyMenu />
          <Routes />
        </div>

      </div>
   
    )
}

export default App;
