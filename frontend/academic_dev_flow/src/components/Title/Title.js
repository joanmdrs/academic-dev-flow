import React from "react";
import './Title.css';

const Title = (props) => {
    return (
        <div className="component-title">
            <h3>{props.title}</h3>
            <p>{props.paragraph}</p>
        </div>
    );
}

export default Title;