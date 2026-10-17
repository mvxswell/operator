import type { Guide } from "./types";
import bestEmployee from "./best-employee";
import delegate from "./delegate";
import firstHire from "./first-hire";
import priceService from "./price-service";
import cashFlow from "./cash-flow";
import bottleneck from "./bottleneck";
import notGrowing from "./not-growing";
import prioritize from "./prioritize";
import salesDown from "./sales-down";
import moreCustomers from "./more-customers";
import sops from "./sops";
import scaleOperations from "./scale-operations";
import raisePrices from "./raise-prices";
import expand from "./expand";
import nextDollar from "./next-dollar";

export type { Guide, GuideBlock, GuideScenario } from "./types";

export const GUIDES: Guide[] = [
  bestEmployee,
  delegate,
  firstHire,
  priceService,
  cashFlow,
  bottleneck,
  notGrowing,
  prioritize,
  salesDown,
  moreCustomers,
  sops,
  scaleOperations,
  raisePrices,
  expand,
  nextDollar,
];

export function getGuide(slug: string): Guide | null {
  return GUIDES.find((guide) => guide.slug === slug) ?? null;
}
