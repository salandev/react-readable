import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Panel, FormGroup, FormControl, ButtonToolbar, Button } from 'react-bootstrap';
import { fetchPost, editPost } from '../actions';

class EditPost extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
    this.handleInitialize();
  }
    
  handleInitialize = () => {
    if (this.props.post) {
      const initData = {
        "title": this.props.post.title,
        "body": this.props.post.body
      };
      this.props.initialize(initData);
    }
  }

  renderField = (field) => {
    const { meta: { touched, error } } = field;
    const className = touched && error ? 'error': null;
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

  onSubmit = (values) => {
    const { editPost, history } = this.props;
    const { id, category } = this.props.match.params;
    editPost(id, values, () => {
      history.push(`/${category}/${id}`);
    });
  }
    
  render() {
    const { handleSubmit } = this.props
    return (
      <Panel>
        <Panel.Heading>
          <h4>Edit Post</h4>
        </Panel.Heading>
        <Panel.Body>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Title:"
              name="title"
              component={this.renderField}
            />
            <Field
              label="Content:"
              name="body"
              component={this.renderTextareaField}
            />
            <br />
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary">Update</Button>
              <Link className="btn btn-danger" to="/">
                   Cancel
              </Link>
            </ButtonToolbar>
            </form>
        </Panel.Body>
      </Panel>
      );
    }
 }

  const validate = values => {
    const errors = {};
    
    if (!values.title) {
        errors.title = "Enter a title!"
    }
    
    if (!values.body) {
        errors.body = "Enter some content!"
    }
    
    return errors;
  }

  const mapStateToProps = (state,ownProps) => (
    {
      post: state.posts[ownProps.match.params.id]
    }
  )

  export default reduxForm({
    form: 'PostEditForm',
    validate
  })(
    connect(mapStateToProps, { 
      editPost, fetchPost
    })(EditPost)
  )