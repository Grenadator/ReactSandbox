/* eslint-disable no-script-url */
import React from 'react';
//import logo, { ReactComponent } from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const config = require('./config.json');
const spotify = new SpotifyWebApi();

// Header of the Sandbox
function Header() {
    return(
        <header className="container-large p-3">
            <h1>React Sandbox</h1>
        </header>
    );
}

function Login(props) {
    console.log(props);
    return(
        <div className="container-large p-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <a href={props.loginLink} className="btn btn-success">Se connecter à Spotify</a>
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
        
        // Here, we prepare our redirect link to Spotify
        let state = this.generateRandomString(16);
        document.cookie = "spotify_auth_state="+state;
        const loginLink = 'https://accounts.spotify.com/authorize?response_type=code&client_id='+config.client_id+"&scope="+config.scope+"&redirect_uri="+config.redirect_uri+"&state="+state;
        
        this.state = {
            loggedIn: token ? true : false,
            loginLink: encodeURI(loginLink),
            playing: { 
                name: 'Absolument rien, utilisateur non connecté', 
                albumName: '', 
                artists: '',
                albumPicture: '',
                trackLink: 'javascript:void(0)', 
                albumLink: 'javascript:void(0)'
            }
        }
    }

    getNowPlaying() {
        spotify.getMyCurrentPlaybackState().then((response) => {
            console.log(response);

            // Retrieving complete artists list
            let artists = [];
            response.item.artists.forEach(item => {
                artists.push(<a href={item.external_urls.spotify} rel="noopener noreferrer" target="_blank">{item.name}</a>)
            });
            this.setState({
                playing: {
                    name: response.item.name,
                    albumName: response.item.album.name,
                    albumPicture: response.item.album.images[0].url,
                    artists: artists,
                    trackLink: response.item.external_urls.spotify,
                    albumLink: response.item.album.external_urls.spotify,
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

    // We use this method to log in to Spotify
    generateRandomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Login loginLink={this.state.loginLink}/>
                <div className="container-large">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-12">
                                Écoute actuelle: <a href={this.state.playing.trackLink} rel="noopener noreferrer" target="_blank">{this.state.playing.name}</a><br/>
                                Album: <a href={this.state.playing.albumLink} rel="noopener noreferrer" target="_blank">{this.state.playing.albumName}</a><br/>
                                Artiste: {this.state.playing.artists}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <img src={this.state.playing.albumPicture} alt=""/>
                            </div>
                        </div>
                        { this.state.loggedIn &&
                            <button className="btn btn-primary mt-4" onClick={() => this.getNowPlaying()}>
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
