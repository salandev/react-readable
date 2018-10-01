import React from 'react'
import { Link } from 'react-router-dom'
import {Alert } from 'react-bootstrap'

const NotFound = () => {
    return (
		<Alert bsStyle="danger" style={{marginTop: 45, textAlign:"center"}}>
		  <h3>404 &ndash; Not Found</h3>
		  <p>We are sorry but the page you are looking for does not exist.</p>
		  <h5><Link to="/">Go to home page</Link></h5>
		</Alert>
    ) 
}

export default NotFound