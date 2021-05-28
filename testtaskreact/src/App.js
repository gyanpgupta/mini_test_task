import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesHandler from './Routes';

function App() {
  return (
    <BrowserRouter>
      <RoutesHandler />
    </BrowserRouter>
  );
}

export default App;
