import {
    GoogleMap,
    Marker,
    LoadScript,
    StandaloneSearchBox,
    DirectionsService,
    DirectionsRenderer,
    DistanceMatrixService
  } from "@react-google-maps/api";
  import {useState} from 'react'
  import "../pages/MapPage.css"

export const SearchDestinations = ({setDestinationValues, destinationValues,points,setPoints}) => {
    const [searchBox, setSearchBox] = useState(null)
    const [confirmed, setConfirmed] = useState(false) 
    const onLoadB = (ref) => {
        setSearchBox(ref);
      };

      const onPlacesChangedB = () => {
        const places = searchBox.getPlaces();
        const place = places[0];

        const location = {
          lat: place?.geometry?.location?.lat() || 0,
          lng: place?.geometry?.location?.lng() || 0,
        };
         setPoints(place.formatted_address);
       
       
      };

      const handleClick = () => {
       
        setDestinationValues([...destinationValues, {points}])
        setConfirmed(true)
       
      }

      
    
    return (
        <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
 <StandaloneSearchBox
    onLoad={onLoadB}
    onPlacesChanged={onPlacesChangedB}
   >
    <input
    className="addressField"
    style= {{width: '305px'}}
    placeholder="Digite o endereço"
  />
</StandaloneSearchBox>
  <button onClick={() => handleClick() } style={{background: confirmed ? 'green' : 'gray', border: 'none', outline: 'none', padding: '5px', cursor: 'pointer', borderRadius: '50%', color: 'white' }}><i class="fa-solid fa-check"></i></button>
  </div>
        </>
    )
}
