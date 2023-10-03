import './App.css';
import Routes from './routes';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';


function App() {
  return (

      <div>
        <Header />
        <div className="content">
          <Menu />
          <Routes />
        </div>

      </div>
   
    )
}

export default App;
