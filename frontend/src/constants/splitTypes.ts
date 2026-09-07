export const SPLIT_TYPES = {
  EQUALLY: "EQUALLY",
  AMOUNT: "AMOUNT",
  PERCENTAGE: "PERCENTAGE",
} as const;

export type SPLIT_TYPES = (typeof SPLIT_TYPES)[keyof typeof SPLIT_TYPES];
