import type { HTMLAttributes } from 'react';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';

export interface FareBreakdown {
  baseFare: number;
  distance: number;
  time: number;
  surge: number;
  total: number;
}

interface PriceAlertCardProps extends HTMLAttributes<HTMLDivElement> {
  amount: number;
  currency?: string;
  surgeMultiplier?: number;
  breakdown: FareBreakdown;
  className?: string;
}

function formatCurrency(currency: string, value: number): string {
  return `${currency}${value.toFixed(2)}`;
}

export function PriceAlertCard({
  amount,
  currency = '$',
  surgeMultiplier,
  breakdown,
  className = '',
  ...props
}: PriceAlertCardProps) {
  const showSurge = surgeMultiplier !== undefined && surgeMultiplier > 1;

  return (
    <Card className={className} {...props}>
      {/* Header: fare amount + optional surge badge */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span
          className="font-display text-4xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          {currency}{amount.toFixed(2)}
        </span>
        {showSurge && (
          <Badge variant="lime">{surgeMultiplier}x</Badge>
        )}
      </div>

      {/* Fare breakdown */}
      <dl className="space-y-0">
        <div className="flex justify-between py-1.5">
          <dt style={{ color: 'var(--text-secondary)' }}>Base fare</dt>
          <dd style={{ color: 'var(--text-primary)' }}>{formatCurrency(currency, breakdown.baseFare)}</dd>
        </div>
        <div className="flex justify-between py-1.5">
          <dt style={{ color: 'var(--text-secondary)' }}>Distance</dt>
          <dd style={{ color: 'var(--text-primary)' }}>{formatCurrency(currency, breakdown.distance)}</dd>
        </div>
        <div className="flex justify-between py-1.5">
          <dt style={{ color: 'var(--text-secondary)' }}>Time</dt>
          <dd style={{ color: 'var(--text-primary)' }}>{formatCurrency(currency, breakdown.time)}</dd>
        </div>
        {breakdown.surge > 0 && (
          <div className="flex justify-between py-1.5">
            <dt style={{ color: 'var(--text-secondary)' }}>Surge</dt>
            <dd style={{ color: 'var(--text-primary)' }}>{formatCurrency(currency, breakdown.surge)}</dd>
          </div>
        )}
        {/* Total row with separator */}
        <div
          className="flex justify-between py-1.5 border-t pt-2 mt-1 font-bold"
          style={{ borderColor: 'var(--border)' }}
        >
          <dt style={{ color: 'var(--text-secondary)' }}>Total</dt>
          <dd style={{ color: 'var(--text-primary)' }}>{formatCurrency(currency, breakdown.total)}</dd>
        </div>
      </dl>
    </Card>
  );
}
