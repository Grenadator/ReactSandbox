import React from 'react';
//import logo, { ReactComponent } from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

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
                        <a href='http://localhost:8888' className="btn btn-success">Se connecter à Spotify</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

class App extends React.Component {

    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if(token) {
            spotify.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            playing: { name: 'Absolument rien, utilisateur non connecté', album: '' }
        }
    }

    getNowPlaying() {
        spotify.getMyCurrentPlaybackState().then((response) => {
            this.setState({
                playing: {
                    name: response.item.name,
                    album: response.item.album.images[0].url
                }
            })
        });
    }

    // Function retrieved from Spotify exemple
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Login/>
                <div className="container-large">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                Écoute actuellement: {this.state.playing.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <img src={this.state.playing.album} alt=""/>
                            </div>
                        </div>
                        { this.state.loggedIn &&
                            <button className="btn btn-primary" onClick={() => this.getNowPlaying()}>
                                Contrôler l'écoute actuelle
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
