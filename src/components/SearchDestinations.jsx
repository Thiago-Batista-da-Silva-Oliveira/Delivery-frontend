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
  import { Tooltip, IconButton, Box } from '@mui/material';
  import CheckIcon from '@mui/icons-material/Check';
  import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
  import BoltIcon from '@mui/icons-material/Bolt';

export const SearchDestinations = ({setDestinationValues,
   destinationValues,
   points,setPoints,
   lastPriorityDestinationValues,
   setLastPriorityDestinationValues,
   priorityDestinationValues,
   setPriorityDestinationValues
  }) => {
    const [searchBox, setSearchBox] = useState(null)
    const [confirmed, setConfirmed] = useState(false) 
    const [priority, setPriority] = useState(false) 
    const [last, setLast] = useState(false) 
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

      const handleConfirm = () => {
        setDestinationValues([...destinationValues, {points}])
        setConfirmed(true)
      }

      const handlePriority = () => {
        setPriorityDestinationValues([...priorityDestinationValues, {points}])
        setPriority(true)
      }

      const handleLast = () => {
        setLastPriorityDestinationValues([...lastPriorityDestinationValues, {points}])
        setLast(true)
      }

      
    
    return (
        <>
        <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Box sx={{display: 'flex'}}>
 <StandaloneSearchBox
    onLoad={onLoadB}
    onPlacesChanged={onPlacesChangedB}
   >
    <input
    className="addressField"
    style= {{width: '355px'}}
    placeholder="Digite o endereço"
  />
</StandaloneSearchBox>
  
 
  <Tooltip title="Confirmar">
   <IconButton  disabled={last || priority}  style={{color: confirmed ? 'green' : 'black'}} onClick={() => handleConfirm() }>
     <CheckIcon />
   </IconButton>
   </Tooltip>
  <Tooltip title="Prioridade">
   <IconButton disabled={confirmed || last} onClick={() => handlePriority()} style={{color: priority ? 'orange' : 'black'}}>
     <BoltIcon />
   </IconButton>
  </Tooltip>
  <Tooltip title="Último">
   <IconButton  disabled={confirmed || priority} onClick={() => handleLast() } style={{color: last ? 'red' : 'black'}}>
     <PriorityHighIcon />
   </IconButton>
  </Tooltip>
    </Box>
  </Box>
        </>
    )
}
