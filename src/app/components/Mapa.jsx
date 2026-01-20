'use client';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// React Leaflet: https://react-leaflet.js.org/

//Para personalizar la imagen de <Marker> (en caso contrario no carga)
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png'
});

export default function Mapa({x,y,etiqueta}) {
    const coordenadas = [x, y];
    return (
        <MapContainer center={coordenadas} zoom={15} style={{ height: "200px", width: "100%" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={coordenadas}>
            <Popup>{etiqueta}</Popup>
        </Marker>
        </MapContainer>
  );
  
}
