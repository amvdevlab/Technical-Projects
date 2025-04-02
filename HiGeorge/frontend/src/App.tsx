import Chatbox from './components/chatbox';
import './App.css';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>HiGeorge</h1>
                <p>Your Questions Answered</p>
            </header>
            <main className="app-main">
                <Chatbox />
            </main>
        </div>
    );
}

export default App;
