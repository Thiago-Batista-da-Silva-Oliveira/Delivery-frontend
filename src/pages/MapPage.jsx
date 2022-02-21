
import React, {useState} from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
  DistanceMatrixService
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../App";
import "./MapPage.css";
import { SearchDestinations } from "../components/SearchDestinations";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { Box } from "@mui/material";



const MapPage = () => {
 const [confirm, setConfirm] = useState(false)
  const [manualOrigin, setManualOrigin] = useState(false);
  const [destinationAmount, setDestinationAmount] = useState([{id: uuidv4()},])

  const [destinationValues, setDestinationValues] = useState([])
  const [priorityDestinationValues, setPriorityDestinationValues] = useState([])
  const [lastPriorityDestinationValues, setLastPriorityDestinationValues] = useState([])

  const [lastValue, setLastValue] = useState(null)

  const [map, setMap] = React.useState();
  const [searchBoxA, setSearchBoxA] =
    React.useState();
  const [searchBoxB, setSearchBoxB] =
    React.useState();
  const [pointA, setPointA] = React.useState();
  const [pointB, setPointB] = React.useState();

  const [points, setPoints] = useState(null)

  const [originInfo, setOriginInfo] = useState(null)

  const [destinationInfo, setDestinationInfo] = useState(null)

  const [origin, setOrigin] = React.useState(
    null
  );


  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)




  const [destination, setDestination] =
    React.useState(null);


  const position = {
    lat: -27.590824,
    lng: -48.551262,
  };

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onLoadA = (ref) => {
    setSearchBoxA(ref);
  };

  const onLoadB = (ref) => {
    setSearchBoxB(ref);
  };


  const [searchBoxLast, setSearchBoxLast] = useState()

  const onLoadLast = (ref) => {
    setSearchBoxLast(ref);
  };

  const onPlacesChangedLast = () => {
    const places = searchBoxLast.getPlaces();
  
    const place = places[0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setLastValue(place.formatted_address);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
    map?.panTo(location);
  };

  const onPlacesChangedA = () => {
    const places = searchBoxA.getPlaces();
  
    const place = places[0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setPointA(place.formatted_address);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
    map?.panTo(location);
  };

  const onPlacesChangedB = () => {
    const places = searchBoxB.getPlaces();
    const place = places[0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setPointB(location);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
    map?.panTo(location);
  };

  const traceRoute =async () => {
    if (pointA && pointB) {
      setOrigin(pointA);
      setDestination(pointB);
    }
  };

  const handleMore = () => {
    setDestinationAmount([...destinationAmount, {id: uuidv4()}])
  }

  const [showSearchBox, setShowSearchBox] = useState(true)

  const handleFetch = async() => {
    setLoading(true)
    try{
     const response = await axios.post('http://localhost:4000/distance', {pointA, destinationValues, lastValues: lastPriorityDestinationValues, priorities: priorityDestinationValues})
     setData(response.data)
     setShowSearchBox(false)
   
    } catch(err) {
      console.log(err)
    }
     
    setLoading(false)
  }

  const [dest1, setDest1] = useState(null)
  const [dest2, setDest2] = useState(null)

  const handleDistinationClick = async(index) => {
    if(index !== 0) {
      setDest1(data[index - 1].destination.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    }

    if(index == 0) {
      setDest1(pointA.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    }
   
    setDest2(data[index].destination.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
  }

  const [response, setResponse ] = useState(null)

  const directionsServiceOptions =
  // @ts-ignore
  React.useMemo(() => {
    return {
      origin: dest1,
      destination: dest2,
      travelMode: "DRIVING",
    };
  }, [dest1, dest2]);

const directionsCallback = React.useCallback((res) => {
  if (res !== null && res.status === "OK") {
    setResponse(res);
  } 
}, []);

const directionsRendererOptions = React.useMemo(() => {
  return {
    directions: response,
  };
}, [response]);

const [searchLast, setSearchLast] = useState(false)

const handleLast = () => {
  setSearchLast(true)
}

const [priorities, setPriorities] = useState(false)
const [lastPriorities, setLastPriorities] = useState(false)

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
        >
                <Box className="address">
                  <StandaloneSearchBox
                    onLoad={onLoadA}
                    onPlacesChanged={onPlacesChangedA}
                    setManualOrigin={() => setManualOrigin(!manualOrigin)}
                    onChooseLocation={(data, { geometry }) => {
                      const {
                        location: { lat: latitude, lng: longitude },
                      } = geometry;
      
                      setOriginInfo({
                        latitude,
                        longitude,
                        address: data.description,
                      });
                    }}
                  >
                    <input
                      className="addressField"
                      placeholder="Digite o endereço inicial"
                    />
                  </StandaloneSearchBox>
                  
                 {
                   destinationAmount.map(() => (
                    <SearchDestinations lastPriorityDestinationValues={lastPriorityDestinationValues} setLastPriorityDestinationValues={setLastPriorityDestinationValues} setPriorityDestinationValues={setPriorityDestinationValues} priorityDestinationValues={priorityDestinationValues} points={points} setPoints={setPoints} setDestinationValues={setDestinationValues} destinationValues={destinationValues} />
                   ))
                 }
                
      
      {loading && <span >Carregando...</span>}
      
                 <Box style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <button style={{border: 'none', outline: 'none', padding: '5px', cursor: 'pointer', background: 'green', color: 'white', textTransform: 'uppercase', marginTop: '10px'}} onClick={() =>handleMore()}>Adicionar mais endereços</button>
                  <button style={{border: 'none', outline: 'none', padding: '5px', cursor: 'pointer', background: '#5F9EA0', color: 'white', marginTop: '10px', textTransform: 'uppercase'}} onClick={() =>handleFetch()}>Planejar rota</button>
                  </Box>
                </Box>
                
           

         
         {
           /*
           !showSearchBox && (
             <div style={{position: 'absolute', top: '20px', left: '50%'}}>
                <div onClick={() => setShowSearchBox(true) } style={{padding: '10px', background: 'green', color: 'white', cursor: 'pointer'}}>
                    <span style={{fontSize: '20px'}}>Buscar mais</span>
                </div>
             </div>
           )
           */
         }

          

          {!response && pointA && <Marker position={pointA} />}
          {!response && pointB && <Marker position={pointB} />}
          
         { data && (
          <div style={{display: 'flex', padding: '10px', flexDirection: 'column', position:'absolute', top: '10px', left: '20px', background: 'white', width: '400px', justifyContent: 'space-around'}}>
         {data.map((info, index) => (
          
             <div onClick={() => handleDistinationClick(index)}  key={index} style={{cursor: 'pointer',display: 'flex', padding: '10px', marginTop: '5px', border: '1px solid gray', alignItems: 'center', justifyContent: 'center'}}>
                 <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>{index + 1}°</div> - <span>{info.destination}</span><span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px'}}>{(info.time / 60).toFixed(2)} minutos</span>
             </div>
          
         ))}
          </div>
         )}

{dest1 && dest2 && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )} 
          

          {response && directionsRendererOptions && (
            <DirectionsRenderer options={directionsRendererOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;

