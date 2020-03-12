import React from 'react';
import './App.css';
import Header from './Header';
import {Route, BrowserRouter, NavLink} from 'react-router-dom';

const uri = "https://picsum.photos/v2/list";

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


    returnAllPhoto(){
        return this.state.images.map(item => 
                    <NavLink key={item.id} to={`/photo/${item.id}`}>
                    {console.log(item)}
                    <img id={item.id}
                        key={item.id}
                        alt="something"
                        className="part-of-photo-list"
                        src={item.download_url}
                        width="300"
                        height="200"
                    />
                    {console.log("End")}
                    </NavLink>)
    }
    // PhotoInf(){
    //     let item = document.querySelector(".part-of-photo-list")
    //     return <div>
    //     <img id={item.id}
    //          key={item.id}
    //          alt="something"
    //          className="part-of-photo-list"
    //          src={item.download_url}
    //          width="300"
    //          height="200" />
    //     <p>{item.author}</p>
    //     </div>
    // }

    render() {
        return (
            <BrowserRouter>
                <Header/> 
                <Route path="/home" Component={this.returnAllPhoto()}/>   
                {/* <Route path="/photo" Component={this.PhotoInf()}/> */}
            </BrowserRouter>
        )}}

export default App;