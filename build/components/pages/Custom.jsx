import React, { Component } from 'react';
import { GridWithContent } from '../reusables/hoc/GridWithContent'
import '../../styles/pages/custom.css';

export default class Custom extends Component {
    render() {
        const { content, posts, filterPostsByCategory } = this.props;
        if(!(content && posts)) return <div></div>

        return (
            <div className="shop page">
                <div className="hero" style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${content.heroImage.fields.file.url})`,
                }}>{content.customShopName}</div>
                {/* sections */}
                {content.categories.map(category => {
                    let categoryLabel = Object.keys(category),
                        categoryID = category[categoryLabel],
                        postsInCategory = filterPostsByCategory(categoryID)(posts);
                    if(postsInCategory.length > 0)
                        return (
                            <div key={categoryID}>
                                <div className="category-header"><span>{categoryLabel}</span></div>
                                <GridWithContent items={postsInCategory}/>
                            </div>
                        );
                })}
                
            </div>
        )
    }
}