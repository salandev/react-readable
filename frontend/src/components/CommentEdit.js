import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormGroup, ButtonToolbar, Button } from 'react-bootstrap';

const renderTextareaField = (field) => {
  const { meta: { touched, error } } = field;
  const className = touched && error ? 'error': null;
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

const CommentEdit = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          label="Edit comment:"
          name="body"
          component={renderTextareaField}
        />
        <ButtonToolbar>
          <Button type="submit" bsStyle="primary">Update</Button>
        </ButtonToolbar>
      </form>
    </div>
  );
}

const validate = values => {
  const errors = {};
  
  if (!values.body) {
      errors.body = "Enter some content!"
  }
  
  return errors;
}

export default reduxForm({
    form: 'CommentEditForm',
    validate
})(CommentEdit)