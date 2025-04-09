"use client";

import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSimulador } from "../context/SimuladorContext";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

const defaultMarker = { lat: -23.5970804, lng: -46.688371 }; // RZK

export default function CardMaps() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = "d8138f3d25da1348";
  const { markers } = useSimulador();
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRefs = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  if (!apiKey || !mapId) {
    return <p>Erro: API Key ou Map ID não configurado.</p>;
  }

  const activeMarkers =
    markers?.length > 0
      ? markers.map(({ latitude, longitude }) => ({
          lat: latitude,
          lng: longitude,
        }))
      : [defaultMarker];

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Remove marcadores antigos
    markerRefs.current.forEach((marker) => (marker.map = null));
    markerRefs.current = [];

    const bounds = new google.maps.LatLngBounds();

    activeMarkers.forEach(({ lat, lng }) => {
      const customMarker = document.createElement("div");
      customMarker.style.position = "absolute";
      customMarker.style.width = "30px";
      customMarker.style.height = "30px";
      customMarker.style.transform = "translate(-50%, -100%)";

      customMarker.innerHTML = `
            <img src="/rzk_logo_maps.png" 
                 width="23" height="23" 
                 style="display: block; position: absolute; left: 50%; top: 100%; transform: translate(-50%, -100%);" />
          `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current!,
        position: { lat, lng },
        content: customMarker,
      });

      markerRefs.current.push(marker);
      bounds.extend(new google.maps.LatLng(lat, lng));
    });

    if (activeMarkers.length > 1) {
      mapRef.current.fitBounds(bounds);
    } else {
      mapRef.current.setCenter(activeMarkers[0]);
      mapRef.current.setZoom(12);
    }
  }, [markers, mapLoaded]);

  return (
    <div className="w-full h-auto mb-2 rounded-2xl mt-2 overflow-hidden border border-rzk_ligth shadow-md">
      <LoadScript googleMapsApiKey={apiKey} libraries={["marker"]}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={activeMarkers[0] as google.maps.LatLngLiteral}
          zoom={12}
          options={{
            mapId: mapId,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
          onLoad={(map) => {
            mapRef.current = map;
            setMapLoaded(true);
          }}
        />
      </LoadScript>
    </div>
  );
}
