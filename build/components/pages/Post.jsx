import React, { Component } from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';
import '../../styles/pages/post.css';

export default class Post extends Component {
    render() {
        const { post, content, currentImageRef, updateImageRef, addToCart } = this.props;
        if(!(content)) return <div></div>;

        return (
            <div className="post page">
                <div className="post-name"><span>{content.postName}</span></div>
                <div className="post-data-wrapper">
                    <div className="post-image-wrapper">
                        <ExifOrientationImg className="post-image" src={currentImageRef}/>
                        <div className="image-navigation">
                            {content.imageShowcase.map((val, index) => 
                                <span 
                                    className="image-nav-item" 
                                    key={index} 
                                    onClick={ () => updateImageRef(content.imageShowcase[index].fields.file.url) }></span> 
                            )}
                        </div>
                    </div>
                    <div className="post-text-wrapper">
                        <div className="post-description">{content.postDescription}</div>
                        {content.specs 
                            ?   <div className="post-specs">
                                    <br></br>
                                    <span className="post-specs-header">Specs</span>
                                    {Object.keys(content.specs).map(key => (
                                        <div className="specs-pair" key={key}>
                                            <span className="specs-key">{key}: </span>
                                            <span className="specs-value">{content.specs[key]}</span>
                                        </div>
                                    ))}
                                </div>
                            : ''}
                        <br></br>
                        <br></br>
                        <span className="post-actions" onClick={() => {addToCart({
                            name: content.postName,
                            description: content.postDescription,
                            price: content.salesPrice,
                            image: content.imageShowcase[0].fields.file.url
                        })} }>
                            <span className="add-to-cart"><i className="fas fa-cart-plus"></i></span>
                            <span className="post-sales-price">${content.salesPrice}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}