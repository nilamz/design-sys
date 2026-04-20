import { APIProvider, Map, AdvancedMarker, Pin, Polyline } from '@vis.gl/react-google-maps';

export interface LatLng {
  lat: number;
  lng: number;
}

interface RideMapProps {
  apiKey: string;
  pickup: LatLng;
  dropoff: LatLng;
  driver?: LatLng;
  className?: string;
}

export function RideMap({ apiKey, pickup, dropoff, driver, className = '' }: RideMapProps) {
  const center: LatLng = {
    lat: (pickup.lat + dropoff.lat) / 2,
    lng: (pickup.lng + dropoff.lng) / 2,
  };

  const containerStyle: React.CSSProperties = {
    borderColor: 'var(--border)',
    height: '320px',
    width: '100%',
  };

  const routePath = [pickup, dropoff];

  if (!apiKey) {
    return (
      <div
        className={['rounded-lg overflow-hidden border shadow-md flex items-center justify-center', className]
          .filter(Boolean)
          .join(' ')}
        style={containerStyle}
      >
        <span style={{ color: 'var(--text-secondary)' }}>Map requires API key</span>
      </div>
    );
  }

  return (
    <div
      className={['rounded-lg overflow-hidden border shadow-md', className]
        .filter(Boolean)
        .join(' ')}
      style={containerStyle}
    >
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={center} defaultZoom={13} mapId="truf-ride-map" style={{ width: '100%', height: '100%' }}>
          {/* Pickup marker — lime accent */}
          <AdvancedMarker position={pickup}>
            <Pin background="#2DD653" borderColor="#061A13" glyphColor="#061A13" />
          </AdvancedMarker>

          {/* Dropoff marker — lime accent */}
          <AdvancedMarker position={dropoff}>
            <Pin background="#2DD653" borderColor="#061A13" glyphColor="#061A13" />
          </AdvancedMarker>

          {/* Driver marker (conditional) — slightly different lime shade */}
          {driver && (
            <AdvancedMarker position={driver}>
              <Pin background="#34E06A" borderColor="#061A13" glyphColor="#061A13" />
            </AdvancedMarker>
          )}

          {/* Route polyline */}
          <Polyline
            path={routePath}
            strokeColor="#2DD653"
            strokeWeight={3}
            strokeOpacity={0.85}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
