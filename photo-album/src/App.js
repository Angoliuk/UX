import React from 'react';
import './App.css';
import Header from './Header';
import {Route, BrowserRouter, NavLink, Switch} from 'react-router-dom';
import context from './context';
import PhotoInf from './photoinfo'

const uri = "https://picsum.photos/v2/list";

function Home({images}){
    return (images.map(item =>
                <NavLink  key={item.id} to={`/photo/${item.id}`}>
                    <img id={item.id}
                        key={item.id}
                        alt="something"
                        className="part-of-photo-list"
                        src={item.download_url}
                        width="300"
                        height="200"
                    />
                </NavLink>))
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          images:[]
        };
    }

    componentDidMount() {
        fetch(uri)
            .then(result => result.json())
            .then(jsonImages => this.setState({images: jsonImages}))
    }
    

    render() {
        return (
            <context.Provider value={this.state}>
            <BrowserRouter>
                <Header/>  
                
                <Switch>
                    < Route path = "/photo/:id" render={({match}) => {
                        return <PhotoInf id={match.params.id}/>
                    }}></Route>
                     
                    < Route path = "/home" > <Home images={this.state.images} /> </Route>
                     
                 </Switch>
            </BrowserRouter>
            </context.Provider>
        )}}

export default App;