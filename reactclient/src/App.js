<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
=======
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeForm from './screens/HomeForm';
import FormClient from './screens/FormClient';
import AppRoutes from './routes';
>>>>>>> criacao-componentes

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
      <AppRoutes/>
>>>>>>> criacao-componentes
    </div>
  );
}

export default App;
