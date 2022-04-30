import './App.css';
import { Comparison } from './comparison/Comparison';
import { Country } from './db/country';

function App() {
  return (
    <div className="App">
      <Comparison totalDistanceKm={200000} country={Country.France} />
    </div>
  );
}

export default App;
