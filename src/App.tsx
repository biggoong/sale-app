import logo from "./logo.svg";
import "./App.css";
import { ProductsList } from "./modules/ProductList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Sale Products</h1>
      </header>
      <main>
        <ProductsList />
      </main>
    </div>
  );
}

export default App;
