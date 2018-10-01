import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { capitalize } from '../utils/helper'
import { fetchCategories, fetchCategoryPosts, setCurrentCategory } from '../actions' 
import { Link } from 'react-router-dom'
import { PageHeader } from 'react-bootstrap'
import './CategoriesList.css'

class CategoriesList extends Component {
  
  static propTypes = {
    categories: PropTypes.array.isRequired,
    fetchCategoryPosts: PropTypes.func.isRequired,
    setCurrentCategory: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.props.fetchCategories()
  }

  getCatName = (selectedCategory) => {
    this.props.fetchCategoryPosts(selectedCategory);
    this.props.setCurrentCategory(selectedCategory);     
  }

  render() {
    const { categories, currentCategory } = this.props
    return (
      <div>
          <PageHeader>
            Readable
          </PageHeader>
          <div className="navbar-default">
            <ul className="nav navbar-stacked">
              {categories && categories.map(category => (
                <li 
                  className={ currentCategory === category.name ? "catBtn activeCat" : "catBtn"}
                  key={category.name}><Link
                  onClick={() => this.getCatName(category.name)}
                  to={`/${category.path}`}
                  >
                    {capitalize(category.name)}</Link></li>
              ))}
            </ul>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    categories: state.categories,
    currentCategory: state.postfilter.category
  }
)

export default connect(mapStateToProps, {fetchCategories, fetchCategoryPosts, setCurrentCategory})(CategoriesList)