import React, { Component } from 'react';
import '../../styles/pages/navigation.css';

export default class Navigation extends Component {
    render() {
        const { content, linkTo, cart } = this.props;
        if(!content) return <div></div>
        
        return (
            <div className="navigation">
                <div className="title">{content.title}</div>
                <div className="menu-items">
                    {content.links.map(link => {
                        let key = Object.keys(link)[0];
                        return (
                            <div 
                                className="nav-link" 
                                key={key} 
                                onClick={() => { linkTo(link[key]) }}>
                                {key}
                            </div>
                        );
                    })}
                </div>
                <div className="cart" onClick={() => { linkTo('/cart') }}>
                    <i className="fas fa-shopping-cart"></i>
                    { cart.contents.length > 0 ? <div className="items-badge">{cart.contents.length}</div> : <div></div>}
                </div>
            </div>
        )
    }
}