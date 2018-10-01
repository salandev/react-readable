import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PostShow from '../container/PostShow'
import NewPost from '../container/NewPost'
import EditPost from '../container/EditPost'
import CategoriesList from '../container/CategoriesList'
import PostHeader from './PostHeader'
import PostList from '../container/PostList'
import NotFound from './NotFound'
import { Grid, Row, Col } from 'react-bootstrap'

const App = () => {
  return (
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={3}>
          <CategoriesList />
        </Col>
        <Col xs={12} md={9}>
            <Switch>
              <Route exact path='/' render={() => (
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <PostHeader />
                  </div>
                  <div className="panel-body">
                    <PostList />
                  </div>
                </div>
              )}/>
			  <Route exact path='/posts/new' component={ NewPost } />
			  <Route exact path="/:category/edit/:id" component={ EditPost } />
			  <Route exact path='/:category/:id' component={ PostShow } />
			  <Route  exact path='/:category' render={ () => (
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <PostHeader />
                  </div>
                  <div className="panel-body">
                    <PostList />
                  </div>
                </div>
              )}/>
			  <Route component={ NotFound } />
			</Switch>
        </Col>
      </Row>
    </Grid>
  )
}

export default App