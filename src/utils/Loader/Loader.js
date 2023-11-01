import React, { Component } from 'react';
import './loader.scss';

class Loader extends Component {
    render() {
        return (
            <div className='loader-container'>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
}

export default Loader;
