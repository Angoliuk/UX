import React from 'react';
import './App.css';
import Header from './Header';

const uri = "https://picsum.photos/v2/list";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    fetch(uri).then(result => result.json())
      .then(jsonImages => this.setState({
        images: jsonImages
      }))
  }

  render() {
     return (
    <div>
      <Header /> 
      {this.state.images.map(item => {
       return <img key={item.id}
        className="part-of-photo-list"
         src={item.download_url}
          id={item.id} 
          width="300"
          height="200"
          />
      })}
    </div>
    )
  }
 
}

export default App;