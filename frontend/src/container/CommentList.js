import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchCommentsByPostId, voteForComment } from '../actions'
import NewComment from './NewComment'
import Comment from './Comment'

class CommentList extends Component {

  static propTypes = {
    voteForComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    fetchCommentsByPostId: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchCommentsByPostId(this.props.postId)
  }

  renderComments = () => {
    const { comments, voteForComment } = this.props
    const sortComments = Object.values(comments)
    sortComments.sort((a, b) => (b.voteScore - a.voteScore))
    return sortComments.map((comment) => (
       <Comment
          comment={comment}
          key={comment.id} 
          voteForComment={voteForComment}
        />
    ))
  }

  render() {
    const { postId } = this.props
    return (
      <div>
        <NewComment postId={postId} />
        { this.renderComments() }
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    comments: state.comments
  }
)

export default connect(mapStateToProps, { voteForComment, fetchCommentsByPostId })(CommentList)

