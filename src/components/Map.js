import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import '../Map.css';
import propertiesBuy from '../data/listingsData.js';

import styled from 'styled-components';

const StyleMapHomePrice = styled.div`
    font-size: 1.3rem;
    border: 3px solid navy;
    color: white;
    background-color: navy;
    width: fit-content;
`;



const getInfoWindowString = place => `
    <div class="house-info-wrapper">      
      <img src=${place.image} height="150px" width="180px" />

      <div class="house-info">
         <strong class="priceColor"> ${place.price} </strong> <br /><br />
          ${place.bedrooms} <br />
          ${place.bathrooms} <br />
          ${place.size} <br />
          ${place.address}
      </div>
    </div>`;

const PopulateMarkers = ({home_price}) => (
    <StyleMapHomePrice>{home_price}</StyleMapHomePrice>
)

let isOpened = false;

const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];
    const currInfoWindow = [];
  
    places.forEach((place, i) => {
        if(i < places.length){
            markers.push(new maps.Marker({
                position: {
                  lat: place.lat,
                  lng: place.lng,                  
                },

                // hide the defualt icon in order to price as the label on the map
                icon: {
                  // url: '../images/cottage.png',
                  url: '',
                  size: new maps.Size(80,50),
                  anchor: new maps.Point(5,58)

                },                
                label: {
                  text: place.price,
                  color: 'red',
                  fontSize: '20px',                  
                  fontWeight: "bold",                  
                },
                
                
                map,
            }));
        }
  

      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowString(place),
      }));
      currInfoWindow.push(new maps.InfoWindow({
        content: getInfoWindowString(place),
      }));
    });
  


    markers.forEach((marker, i) => {        

      marker.addListener('click', () => {

        if(isOpened !== true)
        {
          // create a separate currInfoWindow so that when marker is hovered or clicked, it doesn't conflict each other's event handling.
          currInfoWindow[i].setContent({
            content: getInfoWindowString      
          });

          if(infowindows[i] != null){
              infowindows[i].setContent({
                  content: ''      
              });
              infowindows[i].close();
          }

          currInfoWindow[i].open(map, marker);
          isOpened = true;

        }          
        else{
          currInfoWindow[i].setContent({content: ''});
          currInfoWindow[i].close();
          isOpened = false;
        }      
        
      });

      

      
      marker.addListener('mouseover', () => {
        infowindows[i].setContent({
            content: getInfoWindowString      
        });                
        infowindows[i].open(map, marker);
      });

      marker.addListener('mouseout',()=>{
        infowindows[i].setContent({
            content: ''      
        });
        infowindows[i].close();
      })

    });

    // currInfoWindow = infowindows;
    // console.log(currInfoWindow);

  };

export class Map extends Component {

    static defaultProps = {
        center: {
          lat: 30.26,
          lng: -97.74
        },
        
        zoom: 15
      };
    

      
    
    render() {
        return (
            // Important! Always set the container height explicitly
            <div className="style-map" style={{ height: '100vh', width: '60%' }}>

                <GoogleMapReact                    
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAP_KEY}` }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, propertiesBuy)}
                >

                  {/* {PopulateMarkers({})} */}


                {/* inject new markers here. */}
                {/* {
                    propertiesBuy.map((entry, i)=>{
                        if(i < 5){
                            return <PopulateMarkers 
                                lat={entry.lat}
                                lng={entry.lng}
                                home_price={entry.price}
                            />
                        }
                    })
                } */}
                
                {/* calls google map */}
                </GoogleMapReact>
                
            </div>
        )
    }
}

export default Map
