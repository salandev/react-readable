import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPost, fetchCategories, setCurrentCategory } from '../actions'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { capitalize } from '../utils/helper'
import { Panel, FormGroup, FormControl,ButtonToolbar, Button } from 'react-bootstrap'

class NewPost extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.props.fetchCategories()
  }

  getCatName = (selectedCategory) => {
    this.props.setCurrentCategory(selectedCategory)     
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

  renderCategoryField = (field) => {
    const { categories } = this.props
    const { meta: { touched, error }} = field
    const className = touched && error ? 'error': null
    return (
      <FormGroup validationState={className}>
        <label>{field.label}</label>
        <select {...field.input} className="form-control">
            <option value="" className="disabled">Select Category...</option>
            {categories.filter((category) =>
              category.name !== "all").map((category) => (
                <option
                  value={category.name}
                  key={category.name}
                >
                  {capitalize(category.name)}
                </option>
            ))}
        </select>
        <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormGroup>
    );
  }

  onSubmit(values) { 
    // console.log(values)
    this.props.createPost(values, () => {
      this.props.history.push('/all')
      this.getCatName('all')
    })
  }
  
  render() {
    const { handleSubmit } = this.props
    return (
      <Panel>
        <Panel.Heading>
          <h4>Create A Post</h4>
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
            <Field
              label="Author:"
              name="author"
              component={this.renderField}
            />
            <Field
              label="Category"
              name="category"
              component={this.renderCategoryField}
            />
            <br />
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary">Publish</Button>
              <Link className="btn btn-danger" to="/">
                   Cancel
              </Link>
            </ButtonToolbar>
          </form>
        </Panel.Body>
      </Panel>
    )
  }
}

const validate = values => {

  const errors = {};

  if (!values.title) {
      errors.title = 'Enter a title!'
  }

  if (!values.author) {
      errors.author = 'Enter a name!'
  }

  if (!values.body) {
      errors.body = 'Enter some content!'
  }

  if (!values.category) {
      errors.category = 'Select a category'
  }

  return errors
}

const mapStateToProps = state => (
  {
    categories: state.categories
  }
)

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect( mapStateToProps, {
    fetchCategories, createPost, setCurrentCategory
  })(NewPost)
)
