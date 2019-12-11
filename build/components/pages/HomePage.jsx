import React, { Component } from 'react';
import '../../styles/pages/homePage.css';

export default class HomePage extends Component {
    render() {
        const { content, stateReadout, dispatch } = this.props;
        if( !content ) return <div></div>
        return (
            <div className="page">
                <div className="hero" style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${content.heroImage.fields.file.url})`,
                    backgroundPosition: 'fixed'
                }}>
                    <div className="hero-message">{content.quote}</div>
                </div>
            </div>
        )
    }
}