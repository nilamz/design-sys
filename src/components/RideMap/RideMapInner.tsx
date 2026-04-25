import { APIProvider, Map, AdvancedMarker, Pin, Polyline } from '@vis.gl/react-google-maps';
import type { LatLng, RideMapProps } from './RideMap';

interface RideMapInnerProps extends Omit<RideMapProps, 'className'> {
  className: string;
  containerStyle: React.CSSProperties;
}

export function RideMapInner({ apiKey, pickup, dropoff, driver, className, containerStyle }: RideMapInnerProps) {
  const center: LatLng = {
    lat: (pickup.lat + dropoff.lat) / 2,
    lng: (pickup.lng + dropoff.lng) / 2,
  };

  return (
    <div className={className} style={containerStyle}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={13}
          mapId="truf-ride-map"
          style={{ width: '100%', height: '100%' }}
          streetViewControl={false}
          mapTypeControl={false}
          colorScheme="DARK"
          styles={[{ featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'off' }] }]}
        >
          <AdvancedMarker position={pickup}>
            <Pin background="#2DD653" borderColor="#061A13" glyphColor="#061A13" />
          </AdvancedMarker>

          <AdvancedMarker position={dropoff}>
            <Pin background="#2DD653" borderColor="#061A13" glyphColor="#061A13" />
          </AdvancedMarker>

          {driver && (
            <AdvancedMarker position={driver}>
              <Pin background="#34E06A" borderColor="#061A13" glyphColor="#061A13" />
            </AdvancedMarker>
          )}

          <Polyline
            path={[pickup, dropoff]}
            strokeColor="#2DD653"
            strokeWeight={3}
            strokeOpacity={0.85}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
