import './App.css';
import Navigation from './shared/Nav/Navigation';
import { Provider } from 'react-redux';
import store from './Store'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Navigation/>
    </div>
    </Provider>
  );
}

export default App;
