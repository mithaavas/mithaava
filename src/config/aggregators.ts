export type AggregatorId = 'swiggy' | 'zomato';

export type AggregatorConfig = {
  id: AggregatorId;
  label: string;
  /** Empty until the owner provides a store URL */
  url: string;
  brandColor: string;
};

export const aggregators: Record<AggregatorId, AggregatorConfig> = {
  swiggy: {
    id: 'swiggy',
    label: 'Swiggy',
    /** TODO(owner): set Swiggy store URL */
    url: '',
    brandColor: '#FC8019',
  },
  zomato: {
    id: 'zomato',
    label: 'Zomato',
    /** TODO(owner): set Zomato store URL */
    url: '',
    brandColor: '#E23744',
  },
};

export const aggregatorList: AggregatorConfig[] = [
  aggregators.swiggy,
  aggregators.zomato,
];

/** True when the aggregator has a real (non-empty) URL. */
export function isConfigured(aggregator: AggregatorConfig): boolean {
  return aggregator.url.trim().length > 0;
}

export function getConfiguredAggregators(): AggregatorConfig[] {
  return aggregatorList.filter(isConfigured);
}
