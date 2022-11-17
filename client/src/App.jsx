import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Layout from './components/Layout/Layout';

function App() {
  return (
    <EthProvider>
      <Layout />
    </EthProvider>
  );
}

export default App;