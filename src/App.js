import Header from './Header';
import NewsFeed from './NewsFeed';
import './App.css';
import Stats from './Stats';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header></Header>
      </div>

      <div className="app__body">
        <div className="app__container">
          <NewsFeed></NewsFeed>
          <Stats/>
        </div>
      </div>
    </div>
  );
}

export default App;
