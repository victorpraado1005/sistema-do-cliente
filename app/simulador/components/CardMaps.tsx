"use client";

import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSimulador } from "../context/SimuladorContext";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

const defaultMarker = { lat: -23.55052, lng: -46.633308 }; // RZK

export default function CardMaps() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = "fc7b1bc2a4b484cc";
  const { markers } = useSimulador();
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRefs = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

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
    if (mapRef.current) {
      // Remove marcadores antigos
      markerRefs.current.forEach((marker) => (marker.map = null));
      markerRefs.current = [];

      const bounds = new google.maps.LatLngBounds();

      activeMarkers.forEach(({ lat, lng }) => {
        // Criar um novo elemento para cada marcador
        const customMarker = document.createElement("div");
        customMarker.style.position = "absolute";
        customMarker.style.width = "40px";
        customMarker.style.height = "40px";
        customMarker.style.transform = "translate(-50%, -100%)";

        customMarker.innerHTML = `
          <img src="/rzk_logo_maps.png" 
               width="40" height="40" 
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

      // Ajusta o zoom e a posição para caber todos os pontos
      if (activeMarkers.length > 1) {
        mapRef.current.fitBounds(bounds);
      } else {
        // Se houver apenas um ponto, mantém o zoom padrão
        mapRef.current.setCenter(activeMarkers[0]);
        mapRef.current.setZoom(12);
      }
    }
  }, [markers]);

  return (
    <div className="w-full h-auto mb-2 rounded-2xl mt-4 overflow-hidden border border-rzk_ligth shadow-md">
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
          }}
        />
      </LoadScript>
    </div>
  );
}
