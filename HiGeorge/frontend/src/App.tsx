import Chatbox from './components/chatbox';
import smile from './assets/smile.png';
import './App.css';

function App() {
    return (
        <div className="app">
            <main className="app-main">
                <img src={smile} alt="Smiling Face" className="app-smile" />
                <h1 className="app-title">Hi, I'm George! How can I help you today?</h1>
                <Chatbox />
            </main>
        </div>
    );
}

export default App;
