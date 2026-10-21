// Keep the original registry used by the deployed event allow-list intact.
// Public editorial pages use this complete collection, including untracked guides.
import { GUIDES as ORIGINAL_GUIDES } from "../index";
import type { Guide } from "../types";
import weeklyReview from "../weekly-review";
import businessKpis from "../business-kpis";
import missedDeadlines from "../missed-deadlines";
import capacityPlanning from "../capacity-planning";
import firstOpsManager from "../first-ops-manager";
import hiringScorecard from "../hiring-scorecard";
import hireOrOutsource from "../hire-or-outsource";
import onboardManager from "../onboard-manager";
import sixMonthRunway from "../six-month-runway";
import cashForecast from "../cash-forecast";
import lateCustomer from "../late-customer";
import unprofitableCustomer from "../unprofitable-customer";
import shutProduct from "../shut-product";
import marketTest from "../market-test";
import quarterlyPriorities from "../quarterly-priorities";
import discountDeal from "../discount-deal";
import underperformingManager from "../underperforming-manager";
import ceoDecisionBottleneck from "../ceo-decision-bottleneck";
import salesOpsConflict from "../sales-ops-conflict";
import oneOnOnes from "../one-on-ones";

export type { Guide } from "../types";
export const NEW_GUIDES: Guide[] = [weeklyReview, businessKpis, missedDeadlines, capacityPlanning, firstOpsManager, hiringScorecard, hireOrOutsource, onboardManager, sixMonthRunway, cashForecast, lateCustomer, unprofitableCustomer, shutProduct, marketTest, quarterlyPriorities, discountDeal, underperformingManager, ceoDecisionBottleneck, salesOpsConflict, oneOnOnes];
export const GUIDES: Guide[] = [...ORIGINAL_GUIDES, ...NEW_GUIDES];

export function getGuide(slug: string): Guide | null {
  return GUIDES.find((guide) => guide.slug === slug) ?? null;
}
