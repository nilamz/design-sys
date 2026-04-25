import { lazy, Suspense } from 'react';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface RideMapProps {
  apiKey: string;
  pickup: LatLng;
  dropoff: LatLng;
  driver?: LatLng;
  className?: string;
}

const containerBase = 'rounded-lg overflow-hidden border shadow-md';

const containerStyle: React.CSSProperties = {
  borderColor: 'var(--border)',
  height: '320px',
  width: '100%',
};

const RideMapInner = lazy(() =>
  import('./RideMapInner').then((m) => ({ default: m.RideMapInner }))
);

export function RideMap({ apiKey, pickup, dropoff, driver, className = '' }: RideMapProps) {
  const cls = [containerBase, className].filter(Boolean).join(' ');

  if (!apiKey) {
    return (
      <div className={`${cls} flex items-center justify-center`} style={containerStyle}>
        <span style={{ color: 'var(--text-secondary)' }}>Map requires API key</span>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className={`${cls} flex items-center justify-center`} style={containerStyle}>
          <span style={{ color: 'var(--text-secondary)' }}>Loading map...</span>
        </div>
      }
    >
      <RideMapInner
        apiKey={apiKey}
        pickup={pickup}
        dropoff={dropoff}
        driver={driver}
        className={cls}
        containerStyle={containerStyle}
      />
    </Suspense>
  );
}
