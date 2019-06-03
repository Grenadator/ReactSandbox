import React from 'react';
//import logo, { ReactComponent } from './logo.svg';
import './App.css';

// Header of the Sandbox
function Header() {
    return(
        <header className="container-large p-3">
            <h1>React Sandbox</h1>
        </header>
    );
}

function Login() {
    return(
        <div className="container-large p-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-success">Se connecter</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Login/>
            </div>
        );
    }
}

export default App;
