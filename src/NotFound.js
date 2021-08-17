import React from 'react';
import {Card} from 'react-bootstrap';
const NotFound = () => {
    return (  
        <div>
            <br/>
            <Card bg='light'>
                <Card.Body>
                    <Card.Title>Not Found</Card.Title>
                    <Card.Text>The page you looking for doesn't seem to exist... </Card.Text>
                </Card.Body>
            </Card>
        </div>
      );
}
 
export default NotFound;