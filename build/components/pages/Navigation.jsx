import React, { Component } from 'react';
import '../../styles/pages/navigation.css';

export default class Navigation extends Component {
    render() {
        const { content, linkTo } = this.props;
        console.log(this.props);
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
                        )
                    })}
                </div>
            </div>
        )
    }
}