"use client";

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

type mapProps = {
  data: any
}

function Map({
  data,
}: mapProps) {
  const googlemap = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
      version: 'weekly',
    });

    let map: google.maps.Map;
    loader.load().then(() => {
      map = new google.maps.Map(googlemap.current!, {
        disableDefaultUI: true,
        zoomControl: true,
        mapId: "ae147d5b6e3dc72"
      });

      const markers = data.map((location: any) => {
        // return a marker with a size and label

        new google.maps.Marker({
          position: { lat: location.Latitude, lng: location.Longitude },
          zIndex: 100,
          label: location.Location,
          map: map

        })

        new google.maps.Circle({
          center: { lat: location.Latitude, lng: location.Longitude },
          radius: location.measurements[0].visib * 1000,
          strokeColor: getHumidityColour(location.measurements[0].humidity),
          strokeWeight: 2,
          fillColor: getHumidityColour(location.measurements[0].humidity),
          fillOpacity: 0.4,
          strokeOpacity: 0.5,
          map: map
        });

        return { lat: location.Latitude, lng: location.Longitude };
      });

      let bounds = new google.maps.LatLngBounds();

      markers.map((c: any) => { bounds.extend(c) });

      map.fitBounds(bounds);
    });
  });

  return (
    <div id="map" style={{
      width: "100%",
      height: "400px"
    }} ref={googlemap} />
  );
}



function getHumidityColour(humidity: number): string {
  return `rgba(${Math.round((255 - humidity * 2.55))}, ${Math.round((humidity * 2.55))}, 0, 1)`;
}

export default Map;