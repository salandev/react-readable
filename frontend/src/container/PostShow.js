import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { calculateDate, capitalize } from '../utils/helper'
import { fetchPost, deletePost, votePostUpDown, setCurrentCategory, fetchCommentsByPostId } from '../actions'
import { Row, Col, ButtonToolbar,  Button  } from 'react-bootstrap'
import CommentList from './CommentList'
import NotFound from '../components/NotFound'

class PostShow extends Component {

  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    votePostUpDown: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
  }

  getCatName = (selectedCategory) => {
    this.props.setCurrentCategory(selectedCategory)     
  }

  deletePost = id => {
   window.confirm("Are you sure you want to remove this post?") &&
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { post, votePostUpDown, comments } = this.props
    const commentsNum = Object.keys(comments).length

    if(!post) {
      return <NotFound />
    }

    return (
      <div className="panel panel-default postcard">
        <div className="panel-body clearfix">
          <nav aria-label="Go Back">
            <ul className="pager">
              <li className="previous"><Link to="/all" onClick={() => this.getCatName('all')}><span aria-hidden="true">&larr;</span> Go Back</Link></li>
            </ul>
          </nav> 
          <hr /> 
          <Row className="show-grid">
            <Col xs={2} md={1}>
              <div className="vote">
                <div className="voteUp" onClick={() => votePostUpDown(post.id, 'upVote')}></div>
                <div className="voteScore">{post.voteScore}</div>
                <div className="voteDown" onClick={() => votePostUpDown(post.id, 'downVote')}></div>
              </div>
            </Col>
            <Col xs={10} md={11}>
              <h3>{post.title}</h3>
              <p>Posted: <span><strong>{calculateDate(post.timestamp)}</strong></span> by {capitalize(post.author)}</p>
              <h5>Category: <span className="label label-primary">{capitalize(post.category)}</span> Comments: <span className="label label-primary">{commentsNum}</span></h5>
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
            </Col>
          </Row>
          <hr />
          <Row className="show-grid">
            <Col xs={2} md={1}></Col>
            <Col xs={10} md={11}>
              <p><strong>{post.body}</strong></p>
            </Col>
          </Row>
        </div>
        <hr /> 
        <CommentList postId={post.id} />
      </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => (
  {
    post: state.posts[ownProps.match.params.id],
    comments: state.comments
  }
)

export default connect( mapStateToProps, { fetchPost, deletePost, votePostUpDown, setCurrentCategory, fetchCommentsByPostId })(PostShow)