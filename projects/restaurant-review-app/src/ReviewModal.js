import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FilterDropdown from './FilterDropdown';

export default class ReviewModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      selectedStars: null,
      text: '',
      displayErrors: 'none'
    };
  }
  render() {
    return (
      <>
        <Button variant="primary" size="sm" onClick={() => this.handleShow()}>
          Write a review
             </Button>
        <Modal
          show={this.state.show}
          onHide={() => this.handleHideModal()}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.restaurantName}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className='flex-container'>
                <FilterDropdown rangeStart={0} rangeEnd={5} placeholder='Select a rating' title='Selected' onUpdate={(numberOfStars) => this.handleUpdateStar(numberOfStars)} />
                <span className='invalid-feedback' style={{ display: this.state.displayErrors }} >Please select a rating.</span>
              </Form.Group>
              <Form.Group >
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" value={this.state.text}
                  rows={5} onChange={(event) => this.handleChange(event)} placeholder="Share details of your own experience at this place" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleHideModal()}>
              Cancel
                </Button>
            <Button variant="primary" onClick={() => this.handleSubmit()}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
  handleShow() {
    this.setState(
      {
        show: true
      }
    );
  }

  handleHideModal() {
    this.setState(
      {
        show: false,
        text: '',
        selectedStars: null,
      }
    );
  }

  handleUpdateStar(numberOfStars) {
    this.setState({
      selectedStars: numberOfStars,
      displayErrors: 'none'
    });

  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit() {
    if (this.state.selectedStars === null) {
      this.setState({
        displayErrors: 'inline'
      });
    }
    else {
      this.props.onUpdateReview(this.state.selectedStars, this.state.text);
      this.handleHideModal();
    }
  }
}
