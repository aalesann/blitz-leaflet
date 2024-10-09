import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const DEFAULT_CENTER: LatLngTuple = [-26.1775300, -58.1781400]

function AddMarkerToClick() {
  const [markers, setMarkers] = useState<LatLngTuple[]>([])

  const map = useMapEvents({
    click(e) {
      const newMarker: LatLngTuple = [e.latlng.lat, e.latlng.lng]
      setMarkers([...markers, newMarker])
    },
  })

  return (
    <>
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            Marker {idx + 1}<br />
            Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

function App() {
  return (
    <div className="h-screen w-full">
      <MapContainer center={DEFAULT_CENTER} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick />
      </MapContainer>
    </div>
  )
}

export default App