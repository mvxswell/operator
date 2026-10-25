// Literal imports keep every worked solution in its own on-demand chunk.
import type { CaseSolution } from "./types";
export async function loadCaseSolution(slug: string): Promise<CaseSolution> {
  switch (slug) {
    case "meal-delivery-unit-economics": return (await import("./solutions/meal-delivery-unit-economics")).default;
    case "profit-vs-cash-working-capital": return (await import("./solutions/profit-vs-cash-working-capital")).default;
    case "revenue-growth-vs-operating-expenses": return (await import("./solutions/revenue-growth-vs-operating-expenses")).default;
    case "saas-cac-payback-vs-runway": return (await import("./solutions/saas-cac-payback-vs-runway")).default;
    case "cash-conversion-cycle-inventory": return (await import("./solutions/cash-conversion-cycle-inventory")).default;
    case "membership-business-break-even": return (await import("./solutions/membership-business-break-even")).default;
    case "price-discount-gross-profit": return (await import("./solutions/price-discount-gross-profit")).default;
    case "gross-margin-volume-discount": return (await import("./solutions/gross-margin-volume-discount")).default;
    case "idle-capacity-special-order-pricing": return (await import("./solutions/idle-capacity-special-order-pricing")).default;
    case "enterprise-pricing-cost-to-serve": return (await import("./solutions/enterprise-pricing-cost-to-serve")).default;
    case "price-objections-lost-deal-analysis": return (await import("./solutions/price-objections-lost-deal-analysis")).default;
    case "promotions-full-price-demand": return (await import("./solutions/promotions-full-price-demand")).default;
    case "warehouse-pick-pack-capacity": return (await import("./solutions/warehouse-pick-pack-capacity")).default;
    case "roastery-sequential-capacity": return (await import("./solutions/roastery-sequential-capacity")).default;
    case "freight-carrier-coverage-bottleneck": return (await import("./solutions/freight-carrier-coverage-bottleneck")).default;
    case "machine-upgrade-line-throughput": return (await import("./solutions/machine-upgrade-line-throughput")).default;
    case "job-mix-shifting-bottlenecks": return (await import("./solutions/job-mix-shifting-bottlenecks")).default;
    case "manufacturing-scrap-rate-step-change": return (await import("./solutions/manufacturing-scrap-rate-step-change")).default;
    case "unanswered-sales-calls": return (await import("./solutions/unanswered-sales-calls")).default;
    case "sales-appointments-unused-capacity": return (await import("./solutions/sales-appointments-unused-capacity")).default;
    case "ecommerce-conversion-vs-traffic": return (await import("./solutions/ecommerce-conversion-vs-traffic")).default;
    case "sales-funnel-delivery-capacity": return (await import("./solutions/sales-funnel-delivery-capacity")).default;
    case "customer-acquisition-vs-churn": return (await import("./solutions/customer-acquisition-vs-churn")).default;
    case "rising-cac-channel-saturation": return (await import("./solutions/rising-cac-channel-saturation")).default;
    case "compete-with-national-chain": return (await import("./solutions/compete-with-national-chain")).default;
    case "saas-segment-retention-focus": return (await import("./solutions/saas-segment-retention-focus")).default;
    case "local-density-vs-new-city-expansion": return (await import("./solutions/local-density-vs-new-city-expansion")).default;
    case "warehouse-build-vs-outsource": return (await import("./solutions/warehouse-build-vs-outsource")).default;
    case "sunk-cost-product-investment": return (await import("./solutions/sunk-cost-product-investment")).default;
    case "new-market-bounded-experiment": return (await import("./solutions/new-market-bounded-experiment")).default;
    case "hiring-payback-billable-time": return (await import("./solutions/hiring-payback-billable-time")).default;
    case "new-hire-onboarding-owner": return (await import("./solutions/new-hire-onboarding-owner")).default;
    case "key-person-dependency": return (await import("./solutions/key-person-dependency")).default;
    case "delegating-decisions-vs-checklists": return (await import("./solutions/delegating-decisions-vs-checklists")).default;
    case "hiring-lead-time-capacity": return (await import("./solutions/hiring-lead-time-capacity")).default;
    case "sales-incentives-customer-trust": return (await import("./solutions/sales-incentives-customer-trust")).default;
    case "scarce-asset-allocation": return (await import("./solutions/scarce-asset-allocation")).default;
    case "customer-acquisition-cost-allocation": return (await import("./solutions/customer-acquisition-cost-allocation")).default;
    case "marketing-diminishing-returns": return (await import("./solutions/marketing-diminishing-returns")).default;
    case "contribution-per-machine-hour": return (await import("./solutions/contribution-per-machine-hour")).default;
    case "senior-engineer-time-allocation": return (await import("./solutions/senior-engineer-time-allocation")).default;
    case "truck-purchase-vs-variable-carriers": return (await import("./solutions/truck-purchase-vs-variable-carriers")).default;
    case "checkout-outage-prioritization": return (await import("./solutions/checkout-outage-prioritization")).default;
    case "declining-reviews-demand-risk": return (await import("./solutions/declining-reviews-demand-risk")).default;
    case "expansion-single-trainer-risk": return (await import("./solutions/expansion-single-trainer-risk")).default;
    case "irreversible-lease-commitment": return (await import("./solutions/irreversible-lease-commitment")).default;
    case "supplier-concentration-outage-risk": return (await import("./solutions/supplier-concentration-outage-risk")).default;
    case "customer-concentration-renewal-risk": return (await import("./solutions/customer-concentration-renewal-risk")).default;
    default: throw new Error("Unknown case");
  }
}
