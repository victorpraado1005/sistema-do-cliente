"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useEffect, useRef } from "react";

interface Marker {
  latitude: number;
  longitude: number;
}

interface CardMapsInvestimentoProps {
  markers: Marker[];
}

export default function CardMapsInvestimento({
  markers,
}: CardMapsInvestimentoProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = "d8138f3d25da1348";
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
      : [{ lat: -23.55052, lng: -46.633308 }]; // Ponto padrão

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Remove marcadores antigos
    markerRefs.current.forEach((marker) => (marker.map = null));
    markerRefs.current = [];

    const bounds = new google.maps.LatLngBounds();

    activeMarkers.forEach(({ lat, lng }) => {
      const customMarker = document.createElement("div");
      customMarker.style.position = "absolute";
      customMarker.style.width = "20px";
      customMarker.style.height = "20px";
      customMarker.style.transform = "translate(-50%, -100%)";

      customMarker.innerHTML = `
              <img src="/rzk_logo_maps.png" 
                   width="20" height="20" 
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
    <div className="w-[270px] h-[250px] rounded-2xl overflow-hidden border border-rzk_ligth shadow-md">
      <LoadScript googleMapsApiKey={apiKey} libraries={["marker"]}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
          }}
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
