"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface CardMapsProps {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

export default function CardMaps({ latitude, longitude }: CardMapsProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <p>Erro: API Key não configurada.</p>;
  }

  return (
    <div className="w-full h-auto mb-2 rounded-2xl mt-4 overflow-hidden border border-rzk_ligth shadow-md">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={15}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {/* 📍 Adiciona um marcador no local */}
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
