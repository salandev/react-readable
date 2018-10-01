import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPostComment } from '../actions'
import { Field, reduxForm } from 'redux-form'
import {reset} from 'redux-form';
import { Panel, Row, Col, FormGroup, FormControl,ButtonToolbar, Button } from 'react-bootstrap'

class NewComment extends Component {

  static propTypes = {
    addPostComment: PropTypes.func.isRequired
  }

  renderField = (field) => {
    const { meta: { touched, error } } = field
    const className = touched && error ? 'error': null
    return (
      <FormGroup validationState={className}>
        <label>{field.label}</label>
        <FormControl
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </FormGroup>
    );
  }

  renderTextareaField = (field) => {
    const { meta: { touched, error } } = field
    const className = touched && error ? 'error': null
    return (
      <FormGroup validationState={className}>
        <label>{field.label}</label>
        <div>
          <textarea
            className="form-control" 
            rows="3"
            type="text"
            {...field.input}
          />
        </div>
        <div className="text-help">
            {touched ? error : ''}
        </div>
      </FormGroup>
    );
  }

  onSubmit(values) {
    const { addPostComment, postId } = this.props
    return addPostComment(values, postId);
  }

  render() {
    const { handleSubmit} = this.props
    return (
      <Row>
        <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
          <Panel bsStyle="primary">
            <Panel.Heading>
              <h4>Add a comment</h4>
            </Panel.Heading>
            <Panel.Body>
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                  label="Author:"
                  name="author"
                  component={this.renderField}
                />
                <Field
                  label="Content:"
                  name="body"
                  component={this.renderTextareaField}
                />
                <ButtonToolbar>
                  <Button type="submit" bsStyle="primary">Publish</Button>
                </ButtonToolbar>
              </form>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    )
  }
}

const validate = values => {

  const errors = {};

  if (!values.author) {
      errors.author = 'Enter a name!'
  }

  if (!values.body) {
      errors.body = 'Enter some content!'
  }

  return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('CommentsNewForm'))


export default reduxForm({
  validate,
  form: 'CommentsNewForm',
  onSubmitSuccess: afterSubmit
})(
  connect( null, {
    addPostComment
  })(NewComment)
)