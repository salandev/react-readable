import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchCategoryPosts, postSortOrder, setCurrentCategory, deletePost, votePostUpDown } from '../actions'
import { Link } from 'react-router-dom'
import { calculateDate, capitalize } from '../utils/helper'
import { Well, Row, Col, Panel, ButtonToolbar, Button } from 'react-bootstrap'

class PostList extends Component {

  static propTypes = {
    posts: PropTypes.object.isRequired,
    fetchCategoryPosts: PropTypes.func.isRequired,
    postSortOrder: PropTypes.func.isRequired,
    setCurrentCategory: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    votePostUpDown: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchCategoryPosts(this.props.currentCategory)
  }

  deletePost = id => {
   window.confirm("Are you sure you want to remove this post?") &&
     this.props.deletePost(id, () => {})
  }

  render() {
    const { postSortOrder, postsort, posts, votePostUpDown } = this.props;
    const sortPosts = Object.values(posts)
    sortPosts.sort((a, b) => {
      return postsort === 'voteScore'
        ? b.voteScore > a.voteScore
        : a.timestamp > b.timestamp
    })

    if(!posts) {
      return <div>Loading.. </div>
    }
    
    const listSelect = (
      <Row className="show-grid">
        <Col xs={12} md={9}>
          <h3 style={{marginTop: 10}}>Posts</h3>
        </Col>
        <Col xs={12} md={3}>
          <div className="sortingHolder">
            <select
              defaultValue="none"
              onChange={event => postSortOrder(event.target.value)}
              className="form-control">
              <option value="none" disabled>Order Posts By...</option>
              <option value="voteScore">Vote</option>
              <option value="timestamp">Date</option>
            </select>
          </div>
        </Col>
      </Row>
    )

    return (
      <div>
        { Object.keys(posts).length === 0 ? null : listSelect } 

        { Object.keys(posts).length === 0
          ?
          <Well bsSize="large">There are no posts to display</Well> 
          :
          sortPosts.map((post, index) => (
            <Panel className="postcard" key={index}>
              <Panel.Body>
                <Row className="show-grid">
                  <Col xs={2} md={1}>
                    <div className="vote">
                      <div className="voteUp" onClick={() => votePostUpDown(post.id, 'upVote')}></div>
                      <div className="voteScore">{post.voteScore}</div>
                      <div className="voteDown" onClick={() => votePostUpDown(post.id, 'downVote')}></div>
                    </div>
                  </Col>
                  <Col xs={10} md={11}>
                    <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
                    <p>Posted: <span><strong>{calculateDate(post.timestamp)}</strong></span> by {post.author ? capitalize(post.author) : post.author}</p>
                    <h5>Category: <span className="label label-primary">{post.category ? capitalize(post.category) : post.category}</span> Comments: <span className="label label-primary">{post.commentCount}</span></h5>
                  </Col>
                </Row>
                <hr />
                <ButtonToolbar className="pull-right">
                  <Button
                    bsStyle="danger"
                    onClick={() => this.deletePost(post.id)}
                  >
                    Delete Post
                  </Button>
                  <Link className="btn btn-success" to={`/${post.category}/edit/${post.id}`}>
                     Edit Post
                  </Link>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
    postsort: state.postfilter.sortBy,
    currentCategory: state.postfilter.category
  }
)

export default connect( mapStateToProps, { fetchCategoryPosts, postSortOrder, setCurrentCategory, deletePost, votePostUpDown })(PostList)

