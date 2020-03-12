import React, { useContext } from 'react';
import './App.css';
import context from './context';

class PhotoInf extends React.Component {
    constructor(props) {
        super(props)
        console.log(this)
        this.state = {

            item: {}
        }
    }
    static contextType = context;
    componentDidMount() {
        let item = this.context.images.filter(img => img.id === this.props.id)[0];
        if (item) {
            this.setState({ item })
        }
    }

    render() {
        return (<div>
            <img alt="something"
                className="part-of-photo-list"
                src={this.state.item.download_url}
                width="300"
                height="200" />
            <p>{this.state.item.author}</p>
        </div>)
    }

}
export default PhotoInf