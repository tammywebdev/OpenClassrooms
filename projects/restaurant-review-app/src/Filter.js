import React, { Component } from 'react';
import './Filter.css';
import FilterDropdown from './FilterDropdown';

export default class Filter extends Component {

    constructor() {
        super();
        this.state = {
            selectedFromStar: 0,
            selectedToStar: 5
        };
    }

    render() {
        return (
            <div className="filter-container">
                <div> Filter:</div>
                <div>
                    <FilterDropdown title='From' rangeStart={0} rangeEnd={4}
                        onUpdate={(numberOfStars) => this.handleUpdateFromStar(numberOfStars)} />
                    {' '}
                    <FilterDropdown title='To' rangeStart={this.state.selectedFromStar + 1} rangeEnd={5}
                        onUpdate={(numberOfStars) => this.handleUpdateToStar(numberOfStars)}
                    />
                </div>
            </div>
        )
    }

    handleUpdateFromStar(numberOfStars) {
        this.setState({
            selectedFromStar: numberOfStars
        });
        this.props.onChange(numberOfStars, this.state.selectedToStar);
    }

    handleUpdateToStar(numberOfStars) {
        this.setState({
            selectedToStar: numberOfStars
        });

        this.props.onChange(this.state.selectedFromStar, numberOfStars);
    }
}
