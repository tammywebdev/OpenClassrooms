import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Filter.css';
import StarContainer from './StarContainer';

export default class FilterDropdown extends Component {
    constructor() {
        super();
        this.state = {
            selectedStar: null
        };
    }

    render() {
        let range = [];
        for (let i = this.props.rangeStart; i <= this.props.rangeEnd; i++) {
            range.push(i);
        }
        const dropdownItems = range.map((number, index) => (
            <Dropdown.Item key={index} eventKey={number} onSelect={(eventKey, event) => {
                const eventKeyInt = parseInt(eventKey);
                this.setState({ selectedStar: eventKeyInt });
                if (this.props.onUpdate) {
                    this.props.onUpdate(eventKeyInt);
                }
            }}>
                <StarContainer numberOfStars={number} />
            </Dropdown.Item>
        ));

        let titleText;
        if ((this.state.selectedStar === null) || (this.state.selectedStar < this.props.rangeStart)) {
            if (this.props.placeholder) {
                titleText = this.props.placeholder;
            }
            else {
                titleText = this.props.title;
            }
        }
        else {
            if (this.state.selectedStar > 1) {
                titleText = this.props.title + ' ' + this.state.selectedStar + ' stars';
            }
            else {
                titleText = this.props.title + ' ' + this.state.selectedStar + ' star';
            }
        }

        return (
            <DropdownButton
                as={ButtonGroup}
                size="sm"
                variant="secondary"
                title={titleText}
            >
                {dropdownItems}
            </DropdownButton>
        )
    }
}
