import type { Guide } from "./index";

export const bottleneckGuides: Guide[] = [
  {
    slug: "how-to-find-the-bottleneck", title: "How to find the bottleneck in your business",
    description: "Find the true constraint by measuring queues, throughput, and lead time at each step. Learn when to exploit, subordinate, and only then add capacity well.",
    skill: "bottleneck", minutes: 9,
    intro: "The bottleneck is the step where work queues up persistently and limits the output of the whole system. Measure work in progress, throughput, and lead time at each step before buying capacity or asking everyone to work faster.",
    steps: [
      { title: "Draw the path a unit of work follows", paragraphs: [
        "Choose one product, service, or customer journey and write the actual steps from request to delivery. Include approvals, waiting, rework, and handoffs. A process map does not need decorative boxes; it needs to show where a unit can wait and who releases it to the next step.",
        "Do not combine unlike work too early. A custom order and a standard order may share staff but have different paths and processing times. Follow a few real jobs, because the documented process can omit the workarounds that consume most of the day."
      ] },
      { title: "Measure queue, throughput, and lead time", paragraphs: [
        "For each step, count work waiting at the start and end of several days, units completed per day, and time from arrival to departure. A growing queue in front of one step is stronger evidence of a constraint than a calendar that looks full. A busy person may be processing work faster than the next step can accept it.",
        "Keep units consistent. If some jobs take ten times as long, convert to standard work-hours or segment them. Record demand as well as capacity, because a quiet week can hide a constraint that appears every time normal demand returns."
      ] },
      { title: "Distinguish a spike from a chronic constraint", paragraphs: [
        "A one-day pileup may come from an outage or a large customer order. A chronic bottleneck shows a queue that returns or grows across ordinary operating cycles. Check whether the queue moves to a different step on different days. If it does, variability and scheduling may be more important than permanent capacity.",
        "Look at downstream starvation too. If the final team frequently waits for work while an upstream queue grows, the upstream step is likely limiting completion. If finished work waits for customer approval, the customer handoff may be the constraint even though the internal team is busy."
      ] },
      { title: "Exploit the constraint before expanding it", paragraphs: [
        "Make the limiting step spend as much of its available time as possible on work that advances finished output. Remove avoidable setup, poor-quality inputs, interruptions, and low-value tasks. Put a small ready queue in front of it so it never waits for the next job, but do not flood the whole system with unfinished work.",
        "If the constrained machine loses an hour to missing parts, fixing staging can create more output without buying a machine. If an owner must approve every exception, preapprove a class of routine cases. These changes are often cheaper and faster than hiring."
      ] },
      { title: "Subordinate the rest of the system", paragraphs: [
        "Schedule upstream release to what the bottleneck can realistically process. Producing extra units before it only builds a queue, increases handling, and hides quality problems. Move quality checks upstream so defects do not consume scarce constraint time.",
        "Measure the whole system's delivered output, not each team's utilization in isolation. An upstream team that is temporarily idle can be doing the right thing if more work would only increase work in progress. This is counterintuitive, so explain the rule and show the queue data."
      ] },
      { title: "Elevate capacity only after the low-cost fixes", paragraphs: [
        "If the queue still grows after better staging, scheduling, quality, and delegation, consider overtime, cross-training, equipment, or a hire. Estimate how much additional finished output the investment will create and whether downstream steps can absorb it. A second shift at the constraint is valuable only if demand and the rest of the path support it.",
        "When capacity moves, measure again. The constraint may shift to shipping, sales, or another approval. Bottleneck work is a repeated decision cycle, not a one-time label attached to a department."
      ] },
    ],
    framework: { title: "Constraint sequence", items: ["Identify the step with a recurring growing queue and limited throughput.", "Exploit its existing time: eliminate avoidable downtime, rework, and interruptions.", "Subordinate upstream release and protect the constraint from bad inputs.", "Elevate capacity only when the queue still grows, then measure the new system."] },
    workedExample: { title: "Worked example: four steps on a line", paragraphs: [
      "A line can process 120 units per day at intake, 85 at assembly, 140 at finishing, and 100 at packing. If demand exceeds 85, assembly caps completed output at roughly 85 units per day. Intake may look productive at 120, but the extra 35 units become work in progress before assembly. Finishing may look underused, but it cannot finish what it does not receive.",
      "First check why assembly produces only 85: setups, missing materials, quality defects, or actual machine speed. Stage clean parts and shift nonessential tasks away from assembly. Release roughly what assembly can handle rather than celebrating intake's 120. If those fixes raise assembly to 105, packing at 100 may become the next constraint. Buying a faster intake station first would have increased inventory, not deliveries."
    ] },
    mistakes: ["Calling the busiest person the bottleneck without measuring waiting work and output.", "Adding upstream capacity that only creates more unfinished work.", "Buying equipment before recovering lost time at the actual constraint.", "Optimizing local utilization while on-time completed orders stay flat."],
    scenario: { text: "A four-step process can handle 120, 85, 140, and 100 units per day. Demand is 110. Work piles up before the second step while the third step often waits.", prompt: "Where should improvement start?", choices: ["Increase the first step above 120", "Make the second step's 85-unit capacity more effective", "Ask the third step to look busier", "Build more finished-goods storage"], correct: 1, explanation: "The second step limits throughput. Recover its lost time and align upstream release before investing elsewhere." },
    faq: [
      { question: "Is the busiest employee always the bottleneck?", answer: "No. The constraint is identified by sustained queue growth and its effect on delivered output, not by a full calendar alone." },
      { question: "What if the bottleneck keeps moving?", answer: "Separate ordinary variability from a chronic constraint, then repeat the measure-and-improve cycle after each change. A moving constraint may call for better scheduling or flexible capacity." },
      { question: "Should I hire at the bottleneck immediately?", answer: "First recover time lost to defects, missing inputs, setup, or approvals. Hire when the remaining capacity gap and return justify it." }
    ], related: ["why-is-my-business-not-growing", "scaling-operations-without-losing-quality", "where-to-invest-your-next-dollar"],
  },
  {
    slug: "why-is-my-business-not-growing", title: "Why is my business not growing?",
    description: "Diagnose stalled growth by checking demand, conversion, capacity, delivery, retention, and owner approvals in order—then fix the binding constraint first.",
    skill: "bottleneck", minutes: 8,
    intro: "A business stops growing when one stage cannot turn more demand into retained customers profitably. Diagnose demand, conversion, capacity, delivery, and retention in order; improve the stage where the numbers first break.",
    steps: [
      { title: "Define what growth should mean", paragraphs: [
        "Revenue can rise while margin and cash deteriorate. Decide whether the goal is more customers, more gross profit, better owner time, or a healthier recurring base. Choose a time period and compare like with like so seasonal changes do not masquerade as a broken channel.",
        "Write the growth equation for your business: qualified demand multiplied by conversion, purchase value, and repeat frequency, constrained by delivery capacity. This is not a perfect financial model. It is a map that tells you which question to ask next."
      ] },
      { title: "Check whether qualified demand changed", paragraphs: [
        "Track relevant inquiries or opportunities, not only website visits or impressions. If qualified demand is down, inspect channel mix, referrals, search visibility, and the offer's fit with current customer needs. Ask whether the target customer still recognizes the problem and can afford the solution.",
        "Do not jump to advertising until you know capacity and economics. More leads sent into a broken sales or delivery system increase cost and frustration. If inquiries are healthy, move to conversion instead of blaming awareness."
      ] },
      { title: "Find where prospects stop advancing", paragraphs: [
        "Measure the percentage moving from inquiry to qualified lead, proposal, and sale. If one stage fell, review a sample of lost and won deals. Look for response time, confusing scope, weak proof, price, or an approval delay. One conversation is a clue; the stage trend is evidence.",
        "A strong sales team can still be blocked by owner approvals on routine discounts or proposals. Time each handoff. A conversion problem may actually be a speed problem if prospects receive a response after they have chosen someone else."
      ] },
      { title: "Test whether capacity is the ceiling", paragraphs: [
        "Compare promised and actual lead time, backlog, utilization at the constraining step, and work turned away. If sales are steady but delivery dates stretch, the business may have reached an operating limit. Hiring more salespeople at this point can worsen lateness and refund risk.",
        "Locate the actual queue before adding headcount. The constraint may be a single specialized employee, quality rework, scheduling, or you. Extra staff in a nonbinding area will not raise completed output."
      ] },
      { title: "Inspect delivery and retention", paragraphs: [
        "Growth can leak out the back. Track on-time delivery, rework, complaints, repeat purchase, and cancellations by customer cohort. A decline in retention means every new customer has to replace one who left. Fixing service reliability may improve growth more cheaply than increasing top-of-funnel spend.",
        "Ask whether promises made in sales match what operations can deliver. If discounting or custom work wins deals but creates rework, growth may be destroying margin. Tighten the offer and handoffs before scaling the same mistake."
      ] },
      { title: "Check whether the owner is the constraint", paragraphs: [
        "List decisions waiting for you: quotes, hiring, refunds, purchasing, and exceptions. Measure their wait time. If work pauses even when the team has capacity, your approval queue is part of the operating system. Delegate a bounded class of decisions and review outcomes rather than touching every transaction.",
        "Pick one binding constraint for the next improvement cycle and one metric that should move. If you change marketing, staffing, pricing, and process at once, you will not know what worked. Recheck the full tree after the constraint moves."
      ] },
    ],
    framework: { title: "Growth diagnostic tree", items: ["Demand: qualified inquiries per week.", "Conversion: percentage reaching a paid sale and time between stages.", "Capacity and delivery: backlog, lead time, on-time completion, and rework.", "Retention: repeat purchase or cancellation rate; owner: pending approval hours."] },
    workedExample: { title: "Worked example: a company with plenty of leads", paragraphs: [
      "A service company spends more on ads, and inquiries rise 25%, yet monthly revenue stays flat. The owner assumes the new leads are poor. A simple stage review shows qualified inquiries and close rate are stable, but completed jobs have not increased. Backlog and promised lead time are both rising.",
      "The work queue grows at one installation crew while the sales team has spare time. The first improvement is not another campaign. The owner protects installation time, reduces rework caused by missing parts, and limits new promises to real capacity. Once completed jobs rise and service quality holds, demand generation can become useful again. The diagnosis avoids paying for leads the business cannot serve."
    ] },
    mistakes: ["Equating traffic or leads with growth while completed profitable sales stay flat.", "Using the loudest complaint as proof of the binding constraint.", "Adding demand before checking fulfillment and retention.", "Changing several variables at once and losing the ability to learn."],
    scenario: { text: "Qualified leads and close rate are unchanged, but revenue is flat. The delivery backlog has grown for six weeks and on-time completion is falling.", prompt: "Which branch of the growth tree needs attention first?", choices: ["Buy more ads", "Redesign the logo", "Find and improve the delivery constraint", "Increase every salesperson's target"], correct: 2, explanation: "Demand is not the current ceiling. More sales into a growing delivery queue can worsen lead times and retention." },
    faq: [
      { question: "What is the first number to check when growth stalls?", answer: "Start with the outcome you mean by growth, then inspect qualified demand and stage-by-stage conversion before assuming marketing is the problem." },
      { question: "Can a busy business still be stuck?", answer: "Yes. Teams can be busy building work in progress or redoing jobs while finished, profitable output stays flat." },
      { question: "How often should I repeat the diagnosis?", answer: "Review the key branch metrics weekly and repeat the full diagnosis after a meaningful change, because the constraint can move." }
    ], related: ["how-to-find-the-bottleneck", "why-are-sales-down", "scaling-operations-without-losing-quality"],
  },
];
