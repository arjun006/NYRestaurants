import React, {useState, useEffect} from 'react';
import {Card,CardDeck} from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './index.css'


function Restaurant(props) {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const convertDate=((restaurant)=>{
        let date = new Date(restaurant.date)
        let fdate = date.toLocaleDateString();
        return fdate;
    })
    useEffect(() => {
        setLoading(true);
fetch(`https://obscure-mesa-81981.herokuapp.com/api/restaurants/${props.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLoading(false);

                if(data.hasOwnProperty('_id')) {
            setRestaurant(data);
                } else {
                    setRestaurant(null);
                }
            })
        }, [props.id]);

        if(!loading) {
            if(restaurant) {
    return (
        <div>
            <br/>
            <Card bg='light'>
               <Card.Body>
                <Card.Title> {restaurant.name} </Card.Title>
                <Card.Text>  {restaurant.address.building} {restaurant.address.street} </Card.Text>
               </Card.Body>
            </Card>
            <br/>
            <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={ [restaurant.address.coord[1], restaurant.address.coord[0]]}/>
            </MapContainer>
            <br/>
            <h3>Ratings</h3>
            <br/>
            <div className='rating-border'></div>
            <CardDeck>
            {restaurant.grades.map(restaurant=>(
                <Card key={restaurant.date}>
                    <Card.Header>Grade: {restaurant.grade}</Card.Header>
                    <Card.Body>
                        <Card.Text>Completed: {convertDate(restaurant)}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
            </CardDeck>
        </div>
)} else {
        return (
            <div>
                <br/>
            <Card bg='light'>
              <Card.Body>
                <Card.Text>We can't find the restaurant with id: <strong>{props.id}</strong></Card.Text>
                </Card.Body>
                </Card>
            </div>
)}} else return (
    <div>
    <Card bg='light'>
      <Card.Body>
        <Card.Text>Loading Restaurant Data...</Card.Text>
        </Card.Body>
        </Card>
    </div>
    )}
export default Restaurant;