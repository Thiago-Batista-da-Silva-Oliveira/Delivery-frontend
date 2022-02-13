import { useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function Search({ origin, onChooseLocation, placeOnTop, setManualOrigin }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder={origin == "Parada" ? "Parada" : origin ? "Origem" : "Destino"}
      placeholderTextColor="#999"
      autoCapitalize="none"
      autoCorrect={false}
      enablePoweredByContainer={false}
      enableHighAccuracyLocation={true}
      keyboardShouldPersistTaps="always"
      onPress={onChooseLocation}
      fetchDetails
      textInputProps={{
        onFocus: () => {
          setSearchFocused(true);
        },
        onBlur: () => {
          setSearchFocused(false);
        },
        autoCapitalize: "none",
        autoCorrect: false,
        inlineImageLeft: "ico",
        inlineImagePadding: 40,
      }}
      listViewDisplayed={searchFocused}
      renderRightButton={() => (
        <button
          style={{
            backgroundColor: "#fff",
            width: 54,
            height: 54,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: "#DDD",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setManualOrigin()}
        >
          teste
        </button>
      )}
      query={{
        key: "AIzaSyCwfiuPJuN8GyNAST2Sa1Yn6YnWxZW2dSY",
        language: "pt",
        components: "country:br",
      }}
      styles={{
      

        textInputContainer: {
          flex: 1,
          backgroundColor: "transparent",
          height: 60,
          marginHorizontal: 20,
          borderRadius: 9,
        },

        textInput: {
       
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 15,
          paddingRight: 20,
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          elevation: 8,
          shadowRadius: 15,
          borderWidth: 1,
          borderColor: "#DDD",
          fontSize: 18,
        },

        listView: {
          borderWidth: 1,
          borderColor: "#DDD",
          backgroundColor: "#FFF",
          marginHorizontal: 20,
          elevation: 5,
          shadowRadius: 15,
          marginTop: 10,
        },

        description: {
          fontSize: 16,
        },

        description: {
          fontSize: 15,
        },

        row: {
          padding: 20,
          height: 60,
        },
      }}
    />
  );
}
