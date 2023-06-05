import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';

type mapProps = {
    data: any
    center: { lat: number, lng: number }
    zoom?: number,
    maxZoom?: number,
    minZoom?: number,
    containerStyle?: { width: string, height: string }
}

function MyComponent({
    center,
    data,
    zoom = 5.5,
    maxZoom = 10,
    minZoom = 6,
    containerStyle = {
        width: '800px',
        height: '400px',
    }
}: mapProps) {


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    })

    const markers = data.map((location: any) => {
        // return a marker with a size and label
        return (
            <>
                <Circle
                    key={location.Location + ":visibility"}
                    center={{ lat: location.Latitude, lng: location.Longitude }}
                    radius={location.measurements[0].visib * 1000}
                    options={{
                        strokeColor: getHumidityColour(location.measurements[0].humidity),
                        strokeWeight: 2,
                        fillColor: getHumidityColour(location.measurements[0].humidity),
                        fillOpacity: 0.1,
                        strokeOpacity: 0.5,
                    }}
                />

                <Marker
                    key={location.Location + ":marker"}
                    position={{ lat: location.Latitude, lng: location.Longitude }}
                    label={location.Location}
                    zIndex={100}
                />
            </>
        );
    });

    console.log(center, zoom)
    const map = <GoogleMap
        mapContainerStyle={containerStyle}

        // onLoad={map => {
        //     // fit the map to the bounds of the markers
        //     let bounds = new window.google.maps.LatLngBounds();
        //     data.forEach((location: any) => {
        //         bounds.extend({ lat: location.Latitude, lng: location.Longitude });
        //     });
        //     map.fitBounds(bounds);
        // }}

        center={center}
        zoom={zoom}

        options={{
            disableDefaultUI: true,
            zoomControl: true,
            mapId: "ae147d5b6e3dc72"
        }
        }
    >
        {markers}
    </GoogleMap>

    return isLoaded ? (
        map
    ) : <></>
}

function getHumidityColour(humidity: number): string {
    return `rgba(${Math.round((255 - humidity * 2.55))}, ${Math.round((humidity * 2.55))}, 0, 1)`;
}

export default React.memo(MyComponent)
