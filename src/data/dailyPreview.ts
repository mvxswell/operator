// Public Daily teasers only, without choices or grading.
import { dailyPermutation, dailySlot, utcDayIndex } from "./dailyCycle";
const previews: { id: string; category: import("../lib/types").CategoryId; industry: string; teaser: string }[] = [
  {
    "id": "day-01",
    "category": "bottleneck",
    "industry": "Craft brewery",
    "teaser": "The taproom is full and a distributor wants twice the accounts, but the tanks are already maxed."
  },
  {
    "id": "day-02",
    "category": "financial",
    "industry": "Catering",
    "teaser": "A corporate contract would add about 30% of revenue at a fraction of your usual margin."
  },
  {
    "id": "day-03",
    "category": "sales",
    "industry": "Gym franchise",
    "teaser": "Trial signups jumped and conversion fell, so new members stayed roughly flat."
  },
  {
    "id": "day-04",
    "category": "people",
    "industry": "Architecture firm",
    "teaser": "You review every drawing, the queue is 11 days, and a real error shows up about 1 time in 20."
  },
  {
    "id": "day-05",
    "category": "strategy",
    "industry": "Packaging supplier",
    "teaser": "Your largest customer wants a price cut that would crush margin, and you have no other pipeline."
  },
  {
    "id": "day-06",
    "category": "operations",
    "industry": "Cosmetics manufacturing",
    "teaser": "One filling machine drives returns whose yearly cost is easy to compare with a replacement."
  },
  {
    "id": "day-07",
    "category": "prioritization",
    "industry": "Boutique fitness",
    "teaser": "You can open a second studio, launch a digital product, or fix the leak in the studio you have."
  },
  {
    "id": "day-08",
    "category": "resource",
    "industry": "Dental group",
    "teaser": "A crown mill and two new operatories both look profitable, and they use the same dentists."
  },
  {
    "id": "day-09",
    "category": "financial",
    "industry": "Landscaping",
    "teaser": "The largest contract you have won needs more cash to start than the operating account holds."
  },
  {
    "id": "day-10",
    "category": "operations",
    "industry": "Urgent care",
    "teaser": "Patients wait 52 minutes, and a third of the visit is paperwork that starts after they arrive."
  },
  {
    "id": "day-11",
    "category": "strategy",
    "industry": "Software",
    "teaser": "The free tier costs real money each month and also produces a large share of paid customers."
  },
  {
    "id": "day-12",
    "category": "people",
    "industry": "Staffing agency",
    "teaser": "Placements are up and 90-day retention is down, under a pay plan that rewards placements."
  },
  {
    "id": "day-13",
    "category": "prioritization",
    "industry": "Grocery chain",
    "teaser": "Sales are flat, a manager blames a new competitor, and the loyalty numbers say something narrower."
  },
  {
    "id": "day-14",
    "category": "bottleneck",
    "industry": "Boutique winery",
    "teaser": "Tasting-room traffic is up and wine-club signups are flat because nobody has time to offer the club."
  },
  {
    "id": "day-15",
    "category": "bottleneck",
    "industry": "CNC shop",
    "teaser": "The queue customers feel is at shipping, and the fix on the table is another machine upstream."
  },
  {
    "id": "day-16",
    "category": "financial",
    "industry": "Coffee roaster",
    "teaser": "A wholesale account wants volume, exclusivity, and 30-day terms at a much thinner bag price."
  },
  {
    "id": "day-17",
    "category": "sales",
    "industry": "HVAC company",
    "teaser": "Close rate fell after a financing offer, average ticket rose, and three-day cancellations jumped."
  },
  {
    "id": "day-18",
    "category": "people",
    "industry": "Law firm",
    "teaser": "Partners still edit every client email, and the senior associate who runs the best matters will not take a second group."
  },
  {
    "id": "day-19",
    "category": "strategy",
    "industry": "Boutique hotel group",
    "teaser": "A brand flag would fill quiet weekdays and rewrite the weekend rate you already sell out."
  },
  {
    "id": "day-20",
    "category": "operations",
    "industry": "Commercial laundry",
    "teaser": "The faster line produces most of the rewash, and supervisors want to run it more hours."
  },
  {
    "id": "day-21",
    "category": "prioritization",
    "industry": "Accounting firm",
    "teaser": "A software conversion, a marquee proposal, and an offsite are all asking for the same month."
  },
  {
    "id": "day-22",
    "category": "resource",
    "industry": "Veterinary hospital",
    "teaser": "A second surgical suite pays more per hour, but the doctors who would run it are on the phone."
  },
  {
    "id": "day-23",
    "category": "bottleneck",
    "industry": "Print shop",
    "teaser": "The large-format printer is idle most of the day, and customers still say you are slow."
  },
  {
    "id": "day-24",
    "category": "financial",
    "industry": "Equipment rental",
    "teaser": "A take-or-pay contract looks like guaranteed utilization on machines you already keep busy."
  },
  {
    "id": "day-25",
    "category": "sales",
    "industry": "Commercial cleaning",
    "teaser": "Outbound is booking more site walks, and those walks close at a third of the usual rate."
  },
  {
    "id": "day-26",
    "category": "people",
    "industry": "Restaurant group",
    "teaser": "Store profit is down on food cost, and three managers quietly dropped an item marketing is still advertising."
  },
  {
    "id": "day-27",
    "category": "strategy",
    "industry": "Apparel brand",
    "teaser": "A retailer wants 30% of next year's units, on a cancel clause, in the months you already cannot fill."
  },
  {
    "id": "day-28",
    "category": "operations",
    "industry": "Plumbing company",
    "teaser": "First-time fix is 63%, and purchasing wants truck stock down while callbacks trace to a short parts list."
  },
  {
    "id": "day-29",
    "category": "prioritization",
    "industry": "Bike shop",
    "teaser": "Friday can go to a loyalty email, a floor reset for a brand rep, or a candidate whose offer expires today."
  },
  {
    "id": "day-30",
    "category": "resource",
    "industry": "Cold storage",
    "teaser": "You turned away loads for lack of slots, and the system project would pull the supervisor off the floor for 10 weeks."
  },
  {
    "id": "day-31",
    "category": "bottleneck",
    "industry": "Injection molding",
    "teaser": "A contract would fill the last open press time and add a purge that takes more hours than the job itself."
  },
  {
    "id": "day-32",
    "category": "financial",
    "industry": "Medical billing service",
    "teaser": "Your largest clinic wants a rate cut and will not shorten 75-day terms that already strain payroll."
  },
  {
    "id": "day-33",
    "category": "sales",
    "industry": "Commercial roofing",
    "teaser": "Proposals now take 9 days instead of 3, win rate is flat, and the market is getting the blame."
  },
  {
    "id": "day-34",
    "category": "people",
    "industry": "Warehouse",
    "teaser": "You promoted the fastest picker, and they still pick most of the day while the team's rate falls."
  },
  {
    "id": "day-35",
    "category": "strategy",
    "industry": "Dental-lab software",
    "teaser": "A larger suite wants to bundle your core module, exclusively, at a fraction of the price labs pay you now."
  },
  {
    "id": "day-36",
    "category": "operations",
    "industry": "Wholesale bakery",
    "teaser": "The oven runs 18 hours, and a large share of late orders were already packed and waiting on a label."
  },
  {
    "id": "day-37",
    "category": "prioritization",
    "industry": "Contract manufacturer",
    "teaser": "A customer's line is down tomorrow, quotes still use last month's material cost, and a board deck is also due."
  },
  {
    "id": "day-38",
    "category": "resource",
    "industry": "Regional trucking",
    "teaser": "Both a tired fleet and a slow dock can explain overtime, and the last 20 hour-of-service overruns already say which."
  },
  {
    "id": "day-39",
    "category": "bottleneck",
    "industry": "Managed IT",
    "teaser": "The ticket backlog held after two new techs, and almost half the tickets are questions you have already written down."
  },
  {
    "id": "day-40",
    "category": "financial",
    "industry": "Snack brand",
    "teaser": "Forty new stores come with slotting fees and automatic deductions on a 22% gross margin."
  },
  {
    "id": "day-41",
    "category": "sales",
    "industry": "Ad agency",
    "teaser": "Project work is up, blended margin is down, and the team wants a new-business campaign at 92% utilization."
  },
  {
    "id": "day-42",
    "category": "people",
    "industry": "Commercial construction",
    "teaser": "After one public overrule, your best superintendent now routes every change through you."
  },
  {
    "id": "day-43",
    "category": "strategy",
    "industry": "Cafe group",
    "teaser": "A grocer wants the beans on 80 shelves, at about half the cafe price, this quarter."
  },
  {
    "id": "day-44",
    "category": "operations",
    "industry": "Retail pharmacy",
    "teaser": "A $220,000 robot would speed up counting, and techs are already idle waiting on the pharmacist's check."
  },
  {
    "id": "day-45",
    "category": "prioritization",
    "industry": "Consulting firm",
    "teaser": "You have six focus hours, a deal waiting on a case study, and a homepage that bothers you every Sunday."
  },
  {
    "id": "day-46",
    "category": "resource",
    "industry": "Airport hotel",
    "teaser": "Breakfast is the top complaint, and a suite renovation would dress rooms that already sell out only on weekends."
  },
  {
    "id": "day-47",
    "category": "bottleneck",
    "industry": "Insurance brokerage",
    "teaser": "Quotes take five days, and underwriting itself is forty minutes of that wait."
  },
  {
    "id": "day-48",
    "category": "financial",
    "industry": "Garden retailer",
    "teaser": "A volume rebate pays in August on units purchased, including the ones you have historically failed to sell through."
  },
  {
    "id": "day-49",
    "category": "sales",
    "industry": "Industrial distributor",
    "teaser": "Reps discount most invoices, and deals that have to be approved settle lower without losing the order."
  },
  {
    "id": "day-50",
    "category": "people",
    "industry": "Professional services",
    "teaser": "Your best technical performer criticizes colleagues in client meetings, and two strong people want off her projects."
  },
  {
    "id": "day-51",
    "category": "strategy",
    "industry": "Restaurant franchisee",
    "teaser": "Corporate wants breakfast in every store, and you already know which of your sites have a morning."
  },
  {
    "id": "day-52",
    "category": "operations",
    "industry": "E-commerce fulfillment",
    "teaser": "Mis-ships cost more each week than a few seconds of scanning, and the alternative on the table is cameras."
  },
  {
    "id": "day-53",
    "category": "prioritization",
    "industry": "B2B software",
    "teaser": "Eleven priorities are on the quarter list, and onboarding is twice as slow as your own best cohort."
  },
  {
    "id": "day-54",
    "category": "resource",
    "industry": "Clinic group",
    "teaser": "One recruiter, three sites that want a doctor, and only one of them is paying locums every month."
  },
  {
    "id": "day-55",
    "category": "bottleneck",
    "industry": "Restaurant commissary",
    "teaser": "The cafes are prepping on site because the commissary oven starts late, and the oven is waiting on a handwritten sheet."
  },
  {
    "id": "day-56",
    "category": "financial",
    "industry": "Subscription box",
    "teaser": "First-box contribution is below the cost to acquire a customer, and the retention curve is the rest of the argument."
  },
  {
    "id": "day-57",
    "category": "sales",
    "industry": "B2B parts",
    "teaser": "Your best rep is nearly a third of revenue, discounts almost every deal, and those prices stick at renewal."
  },
  {
    "id": "day-58",
    "category": "people",
    "industry": "Retail chain",
    "teaser": "Mystery shops say the greeting is skipped, and managers spend the peak shift on a count the system no longer needs."
  },
  {
    "id": "day-59",
    "category": "strategy",
    "industry": "Industrial software",
    "teaser": "The growing product is 20% of revenue, consumes your best engineers, and only moves when you throw services in free."
  },
  {
    "id": "day-60",
    "category": "operations",
    "industry": "Food plant",
    "teaser": "A sensor vendor wants $45,000 to predict failures your work order already named two weeks early."
  },
  {
    "id": "day-61",
    "category": "prioritization",
    "industry": "Property maintenance",
    "teaser": "A storm is forecast Thursday, and Wednesday can go to equipment, a next-season proposal, or a website."
  },
  {
    "id": "day-62",
    "category": "resource",
    "industry": "Light-industrial staffing",
    "teaser": "A sales hire looks affordable until you fund the extra payroll clients will not pay for fifty days."
  },
  {
    "id": "day-63",
    "category": "sales",
    "industry": "Wedding venue",
    "teaser": "Tours are fully booked and the booking rate has fallen, because the calendar no longer leaves time to follow up."
  },
  {
    "id": "day-64",
    "category": "resource",
    "industry": "Dental lab",
    "teaser": "Remakes cluster on one line, and the only person who can run it wants a scanner instead of a second set of hands."
  }
];
const order = dailyPermutation(previews.length);
export const dailyDecisionNumber = utcDayIndex;
export function dailyPreviewFor(date: string) { const day = utcDayIndex(date); return previews[order[day === null ? 0 : dailySlot(day, previews.length)]]; }
