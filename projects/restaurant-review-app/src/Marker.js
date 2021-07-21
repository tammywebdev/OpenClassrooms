import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Marker.css';

class Marker extends React.Component {
    constructor() {
        super();
    }

    render() {
        let computedClassName = " bg-dark marker-container";
        if (this.props.className) {
            computedClassName = this.props.className + computedClassName;
        } else {
            computedClassName = "text-danger" + computedClassName;
        }
        return (
            <div className={computedClassName}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <div className="font-weight-bold">{this.props.text}</div>
            </div>);
    }
}

export default Marker;
