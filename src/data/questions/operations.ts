import type { Question } from "@/lib/types";

export const OPERATIONS_QUESTIONS: Question[] = [
  {
    id: "ops-01",
    mode: "standard",
    category: "operations",
    subskill: "rework and root cause",
    industry: "Cabinet shop",
    difficulty: 1,
    scenario:
      "About 30% of finished cabinets come back for rework because measurements were taken wrong at the customer's home.",
    prompt: "What is the best fix?",
    choices: [
      { id: "a", text: "Add a second finishing crew to handle the rework faster" },
      { id: "b", text: "Fix how measurements are taken and verified" },
      { id: "c", text: "Build extra time into every schedule for rework" },
      { id: "d", text: "Offer customers a discount when rework is needed" },
    ],
    correctChoiceId: "b",
    explanation:
      "Rework is pure waste created upstream. Getting the measurement right removes the cost entirely instead of staffing up to absorb it.",
  },
  {
    id: "ops-02",
    mode: "standard",
    category: "operations",
    subskill: "non-productive time",
    industry: "Appliance repair",
    difficulty: 1,
    scenario:
      "Your eight technicians each spend about three hours a day driving because jobs are assigned in the order they were booked, not by location.",
    prompt: "What is the most valuable change?",
    choices: [
      { id: "a", text: "Hire two more technicians" },
      { id: "b", text: "Route each technician's day geographically" },
      { id: "c", text: "Extend the workday by an hour" },
      { id: "d", text: "Raise prices to cover the travel time" },
    ],
    correctChoiceId: "b",
    explanation:
      "You are paying for 24 technician-hours a day of driving. Routing recovers billable capacity you already own, at almost no cost.",
  },
  {
    id: "ops-03",
    mode: "standard",
    category: "operations",
    subskill: "inventory policy",
    industry: "Auto repair",
    difficulty: 2,
    scenario:
      "Twelve times last month a car sat on a lift for an extra day waiting for a $40 part. Each lift generates about $900 of revenue a day, and you have four lifts.",
    prompt: "What should you change?",
    choices: [
      { id: "a", text: "Stock the common parts even though it ties up cash" },
      { id: "b", text: "Negotiate faster delivery from your supplier" },
      { id: "c", text: "Charge customers a fee for parts delays" },
      { id: "d", text: "Add a fifth lift to absorb the delays" },
    ],
    correctChoiceId: "a",
    explanation:
      "Twelve lost lift-days cost roughly $10,800 in capacity to avoid holding a few hundred dollars of parts. Faster shipping helps, but carrying the cheap high-frequency parts removes the problem outright.",
  },
  {
    id: "ops-04",
    mode: "standard",
    category: "operations",
    subskill: "standardization",
    industry: "Veterinary clinic",
    difficulty: 2,
    scenario:
      "Four technicians each run intake their own way. Visit length varies from 20 to 55 minutes for the same appointment type, and chart completeness varies just as much.",
    prompt: "What is the right first move?",
    choices: [
      { id: "a", text: "Set an individual speed target for each technician" },
      { id: "b", text: "Define one documented intake process and train everyone to it" },
      { id: "c", text: "Schedule longer appointment slots to absorb the variation" },
      { id: "d", text: "Replace the slowest technician" },
    ],
    correctChoiceId: "b",
    explanation:
      "With four different processes you cannot tell whether the variation is the person or the method. Standardizing first makes performance comparable and improvement repeatable.",
  },
  {
    id: "ops-05",
    mode: "standard",
    category: "operations",
    subskill: "reading process data",
    industry: "Electronics assembly",
    difficulty: 3,
    scenario: "Output over four weeks after a new hire started on the test station:",
    data: {
      columns: ["", "Wk 1", "Wk 2", "Wk 3", "Wk 4"],
      rows: [
        { label: "Units started", values: ["2,000", "2,000", "2,050", "2,100"] },
        { label: "Units passing test", values: ["1,940", "1,930", "1,780", "1,690"] },
        { label: "Units scrapped", values: ["60", "70", "270", "410"] },
        { label: "Line hours", values: ["160", "160", "162", "165"] },
      ],
    },
    prompt: "What should you investigate?",
    choices: [
      { id: "a", text: "Whether the line is running too fast" },
      { id: "b", text: "What changed around week 3 to triple the scrap rate" },
      { id: "c", text: "Whether to add a second test station" },
      { id: "d", text: "Whether demand justifies the increased starts" },
    ],
    correctChoiceId: "b",
    explanation:
      "Starts barely moved while scrap went from 3% to 20%. A step change like that has a specific cause with a date attached, and finding it is far cheaper than adding capacity to a process producing defects.",
  },
  {
    id: "ops-06",
    mode: "standard",
    category: "operations",
    subskill: "work in progress",
    industry: "Marketing agency",
    difficulty: 3,
    scenario:
      "Your team of six has 34 projects open at once. Average delivery time has grown from three weeks to nine. Everyone is busy, nothing ships, and clients are frustrated.",
    prompt: "What is the most effective change?",
    choices: [
      { id: "a", text: "Hire two more people to work through the load" },
      { id: "b", text: "Limit how many projects are active at once and finish them in sequence" },
      { id: "c", text: "Ask the team to work longer hours until the backlog clears" },
      { id: "d", text: "Give each client a longer promised timeline" },
    ],
    correctChoiceId: "b",
    explanation:
      "Thirty-four simultaneous projects means constant context switching and nothing finishing. Capping active work shortens delivery time immediately without adding a single hour of labor.",
  },
  {
    id: "ops-07",
    mode: "standard",
    category: "operations",
    subskill: "measuring the wrong thing",
    industry: "Machine shop",
    difficulty: 4,
    scenario:
      "Management bonuses are tied to machine utilization, which is now 94%. Finished-goods inventory has tripled, on-time delivery has fallen from 92% to 71%, and the floor is crowded with partly finished work.",
    prompt: "What is going wrong?",
    choices: [
      { id: "a", text: "The machines are too old to sustain 94% utilization" },
      { id: "b", text: "The utilization target drives production of things customers have not ordered" },
      { id: "c", text: "Scheduling software needs to be upgraded" },
      { id: "d", text: "Delivery is a logistics problem unrelated to the shop floor" },
    ],
    correctChoiceId: "b",
    explanation:
      "Keeping every machine busy is not the same as producing what is due. Rewarding utilization converts cash into inventory and pushes late orders behind work nobody asked for.",
  },
  {
    id: "ops-08",
    mode: "standard",
    category: "operations",
    subskill: "automating a broken process",
    industry: "Property management",
    difficulty: 4,
    scenario:
      "Maintenance requests take an average of nine days to close. About 60% of that time is spent going back to tenants for missing details. A vendor is selling a $60,000 workflow system that automates ticket routing and technician dispatch.",
    prompt: "What should you do?",
    choices: [
      { id: "a", text: "Buy the system; automation will compress the nine days" },
      { id: "b", text: "Fix the intake form so requests arrive complete, then evaluate the system" },
      { id: "c", text: "Add a coordinator to chase tenants faster" },
      { id: "d", text: "Set a service-level target and hold technicians to it" },
    ],
    correctChoiceId: "b",
    explanation:
      "Automation speeds up routing, but routing is not where the nine days go. Capturing complete information at intake attacks 60% of the delay and costs almost nothing.",
  },
  {
    id: "ops-09",
    mode: "standard",
    category: "operations",
    subskill: "variability versus average",
    industry: "Hotel housekeeping",
    difficulty: 5,
    scenario:
      "Rooms are cleaned in 28 minutes on average, comfortably inside your 35-minute standard. But the spread runs from 18 to 70 minutes, and roughly one in eight guests waits past the 3pm check-in time.",
    prompt: "What should you work on?",
    choices: [
      { id: "a", text: "Lower the average to 25 minutes" },
      { id: "b", text: "Reduce the variation in cleaning time" },
      { id: "c", text: "Move check-in to 4pm" },
      { id: "d", text: "Add housekeeping staff across the board" },
    ],
    correctChoiceId: "b",
    explanation:
      "Guests do not experience your average; they experience the long tail. A healthy mean with a 52-minute spread is what produces late check-ins, so tightening the spread fixes the guest problem.",
  },
  {
    id: "ops-10",
    mode: "standard",
    category: "operations",
    subskill: "local optimization",
    industry: "Food manufacturing",
    difficulty: 5,
    scenario:
      "Your mixing department cut its cost per batch 18% by running much larger batches. Since then, changeovers on the packaging line have doubled, finished inventory is up 40%, and two products went out of date last month.",
    prompt: "How should you read this?",
    choices: [
      { id: "a", text: "Mixing improved; packaging needs to catch up" },
      { id: "b", text: "A local saving created larger costs downstream and overall" },
      { id: "c", text: "The inventory increase is a normal side effect of efficiency" },
      { id: "d", text: "Expiry losses are a demand forecasting problem" },
    ],
    correctChoiceId: "b",
    explanation:
      "Departmental savings that push cost onto the next step are not savings. Judge the change on total cost and total throughput, where this one is clearly negative.",
  },
  {
    id: "ops-11",
    mode: "standard",
    category: "operations",
    subskill: "adding a step to remove cost",
    industry: "Custom millwork",
    difficulty: 6,
    scenario:
      "A proposed 20-minute pre-production review on every order would add about 55 hours a month of labor. Roughly 15% of orders currently reach the shop with errors, and each one costs an average of nine hours to correct plus a delayed delivery. You run about 220 orders a month.",
    prompt: "What is the right call?",
    choices: [
      { id: "a", text: "Reject it — adding a step slows the process" },
      { id: "b", text: "Adopt it; the review should cost far less than the errors it prevents" },
      { id: "c", text: "Apply it only to orders over a certain dollar value" },
      { id: "d", text: "Adopt it only if it can be done in under 10 minutes" },
    ],
    correctChoiceId: "b",
    explanation:
      "About 33 defective orders a month cost roughly 297 hours to fix, against 55 hours of review. Adding a cheap step upstream to remove an expensive one downstream is usually the highest-return change available.",
  },
  {
    id: "ops-12",
    mode: "standard",
    category: "operations",
    subskill: "efficiency versus resilience",
    industry: "Contract manufacturing",
    difficulty: 6,
    scenario:
      "Consolidating to a single supplier would save 7% on materials, worth about $340,000 a year. That supplier is in one region and currently provides 45% of your input. A two-week outage last year, when they were one of three suppliers, cost you roughly $200,000.",
    prompt: "What is the strongest way to think about this?",
    choices: [
      { id: "a", text: "Take the savings; $340,000 a year outweighs a one-off $200,000 event" },
      { id: "b", text: "Weigh the savings against the larger loss an outage would now cause with no alternative" },
      { id: "c", text: "Reject consolidation on principle; never single-source" },
      { id: "d", text: "Consolidate and negotiate penalty clauses to cover outages" },
    ],
    correctChoiceId: "b",
    explanation:
      "The $200,000 figure came from a world where two other suppliers absorbed the shock. Removing them changes the size of the downside, so the savings must be compared against the new exposure, not the old one.",
  },
];
