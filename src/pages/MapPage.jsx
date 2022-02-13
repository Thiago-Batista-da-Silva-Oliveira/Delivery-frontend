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



const MapPage = () => {
 const [confirm, setConfirm] = useState(false)
  const [manualOrigin, setManualOrigin] = useState(false);
  const [destinationAmount, setDestinationAmount] = useState([{id: uuidv4()},])

  const [destinationValues, setDestinationValues] = useState([])


  const [addStop, setAddStop] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
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


  const [data, setData] = useState([])




  const [destination, setDestination] =
    React.useState(null);

  const [response, setResponse] =
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

  const directionsServiceOptions =
    // @ts-ignore
    React.useMemo(() => {
      return {
        origin,
        destination,
        travelMode: "DRIVING",
      };
    }, [origin, destination]);

  const directionsCallback = React.useCallback((res) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
    } else {
      console.log(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo(() => {
    return {
      directions: response,
    };
  }, [response]);

  const handleMore = () => {
    setDestinationAmount([...destinationAmount, {id: uuidv4()}])
  }

  const handleFetch = async() => {
       const response = await axios.post('http://localhost:4000/distance', {pointA, destinationValues})
       
       setData(response.data)

  }

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
          <div className="address">
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
              <SearchDestinations points={points} setPoints={setPoints} setDestinationValues={setDestinationValues} destinationValues={destinationValues} />
             ))
           }

        
          <button onClick={() =>handleMore()}>+</button>
          
            <button onClick={() =>handleFetch()}>Traçar rota</button>
          </div>

          

          {!response && pointA && <Marker position={pointA} />}
          {!response && pointB && <Marker position={pointB} />}
         { data && (
          <div style={{display: 'flex', flexDirection: 'column', position:'absolute', top: '10px', left: '20px', height: '500px', width: '500px', background: 'white', justifyContent: 'space-around'}}>
         {data.map((info, index) => (
          
             <div style={{display: 'flex'}}>
                 <span>{index + 1}°</span> - <span>{info.destination}</span> - <span>{info.time} segundos</span>
             </div>
          
         ))}
          </div>
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
