import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentEdit from '../components/CommentEdit'
import { connect } from 'react-redux';
import { calculateDate } from '../utils/helper'
import { editPostComment, deleteComment } from '../actions'
import Modal from 'react-modal'
import { Row, Col, Panel, ButtonToolbar, Button } from 'react-bootstrap'
import './Comment.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

class Comment extends Component {
  static propTypes = {
    deleteComment: PropTypes.func.isRequired,
    editPostComment: PropTypes.func.isRequired
  }

  state = {
    commentModalOpen: false
  }

  openCommentModal = () => this.setState(() => ({ commentModalOpen: true }))
  closeCommentModal = () => this.setState(() => ({ commentModalOpen: false }))

  editComment = (values) => {
    this.props.editPostComment(values, () => {
      this.closeCommentModal()
    })
  }

  deleteComment = id => {
   window.confirm("Are you sure you want to remove this comment?") &&
     this.props.deleteComment(id, () => {})
  }

  render() {
    const { comment, voteForComment } = this.props
    const { commentModalOpen } = this.state

    if(!comment) {
      return <div>Loading..</div>
    }

    return (
      <div>
        <Row className="show-grid postcard">
          <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
            <Panel className="clearfix" style={{padding:20}}>
            <Row className="show-grid">
              <Col xs={2} md={1}>
                  <div className="vote" style={{marginTop:0}}>
                    <div className="voteUp" onClick={() => voteForComment(comment.id, 'upVote')}></div>
                    <div className="voteScore">{ comment.voteScore }</div>
                    <div className="voteDown" onClick={() => voteForComment(comment.id, 'downVote')}></div>
                  </div>
              </Col>
              <Col xs={10} md={11}>
                  <p>Comment by: <strong>{comment.author}</strong> made <strong>{calculateDate(comment.timestamp)}</strong></p>
                  <p>{comment.body}</p>
              </Col>
            </Row>
            <ButtonToolbar className="pull-right">
              <Button onClick={() => this.deleteComment(comment.id)} bsStyle="danger">Delete</Button>
              <Button onClick={this.openCommentModal} bsStyle="success">Edit</Button>
            </ButtonToolbar>
            </Panel>
          </Col>
        </Row>
        <Modal
          ariaHideApp={false}
          style={customStyles}
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
          <div className="close pull-right" onClick={this.closeCommentModal}>X</div>
          { commentModalOpen && <CommentEdit initialValues={comment} onSubmit={this.editComment} /> }
        </Modal>
      </div>
    )
  }
}

export default connect( null,{ editPostComment, deleteComment })(Comment)