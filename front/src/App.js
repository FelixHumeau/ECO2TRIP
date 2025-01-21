import './App.css';
import logo from './asset/Logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Sucez mon vier.fr .
        </p>
        <a
          className="App-link"
          href="https://ece.campusonline.me/fr-fr/Pages/home.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          ECE 
        </a>
      </header>
    </div>
  );
}

export default App;
