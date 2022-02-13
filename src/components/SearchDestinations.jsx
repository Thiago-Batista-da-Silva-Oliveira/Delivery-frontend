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
        <div style={{display: 'flex'}}>
 <StandaloneSearchBox
    onLoad={onLoadB}
    onPlacesChanged={onPlacesChangedB}
   >
    <input
    className="addressField"
    placeholder="Digite o endereço"
  />
</StandaloneSearchBox>
  <button onClick={() => handleClick() } style={{background: confirmed ? 'green' : 'gray', height: '20px' }}>X</button>
  </div>
        </>
    )
}