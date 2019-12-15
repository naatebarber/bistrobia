import React, { Component } from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';
import '../../styles/pages/post.css';

export default class Post extends Component {
    render() {
        const { post, content } = this.props;
        if(!(content)) return <div></div>;

        console.log(content);

        return (
            <div className="post page">
                <div className="post-name"><span>{content.postName}</span></div>
                <div className="post-data-wrapper">
                    <div className="post-image-wrapper">
                        <ExifOrientationImg className="post-image" src={content.imageShowcase[0].fields.file.url}/>
                    </div>
                    <div className="post-text-wrapper">
                        <div className="post-description">{content.postDescription}</div>
                        {content.specs 
                            ?   <div className="post-specs">
                                    <br></br>
                                    <span className="post-specs-header">Specs</span>
                                    {Object.keys(content.specs).map(key => (
                                        <div className="specs-pair">
                                            <span className="specs-key">{key}: </span>
                                            <span className="specs-value">{content.specs[key]}</span>
                                        </div>
                                    ))}
                                </div>
                            : ''}
                        <br></br>
                        <br></br>
                        <span className="post-actions">
                            <span className="add-to-cart"><i className="fas fa-cart-plus"></i></span>
                            <span className="post-sales-price">${content.salesPrice}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}