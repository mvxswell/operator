import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-decide-whether-to-drop-an-unprofitable-customer",
  skill: "financial",
  title: "How to Decide Whether to Drop an Unprofitable Customer",
  description: "Decide whether to keep, reprice, or exit an unprofitable customer. Separate avoidable costs from overhead and compare cash timing, capacity, and alternatives.",
  answer: "Calculate the contribution and operating burden of serving the customer, then compare realistic alternatives: change scope, improve the workflow, reprice, or exit. Distinguish costs that disappear from allocated overhead that remains, and account for contract obligations and the time needed to replace the revenue.",
  scenario: {
    industry: "Illustrative agency account",
    scenario: "Suppose a customer pays $8,000 monthly. Work directly attributable to the account costs $5,000. Another $4,000 of office and management overhead is allocated to it but would remain if the customer left. No replacement work is yet contracted.",
    prompt: "Which statement is the soundest basis for the decision?",
    choices: [
      {
        id: "a",
        text: "Dropping the account immediately saves the entire allocated loss"
      },
      {
        id: "b",
        text: "Keeping the account must always be right because revenue is positive"
      },
      {
        id: "c",
        text: "Allocated overhead is irrelevant to every long-term decision"
      },
      {
        id: "d",
        text: "Exit removes current contribution; compare changes and replacement timing"
      }
    ],
    correctChoiceId: "d",
    explanation: "The account contributes toward costs that remain. Evaluate scope, pricing, scarce capacity, and a transition before claiming an immediate saving from the allocated loss."
  },
  faqs: [
    {
      question: "Should you drop every customer with a negative allocated margin?",
      answer: "Not automatically. Identify which costs disappear, what capacity becomes available, and what alternative demand can use it. Fully allocated margin is useful context, but an exit decision also needs a cash and transition view. Some relationships should be repriced or redesigned rather than ended."
    },
    {
      question: "How do you account for a difficult customer's time burden?",
      answer: "Record the support, changes, escalation, rework, and collections effort they create over a representative period. Distinguish normal service from exceptional demands and internal defects. Use that evidence to change scope or pricing instead of relying only on whether the account feels difficult."
    },
    {
      question: "What if a customer rejects a price increase?",
      answer: "Use the exit scenario you prepared before making the proposal. Review contractual obligations, outstanding work, replacement demand, and near-term cash. You may choose a staged transition or narrower service, but avoid restoring an unsustainable arrangement without understanding which tradeoff you are accepting."
    }
  ],
  related: [
    "how-to-price-a-service-business",
    "how-to-handle-a-customer-who-pays-late",
    "how-to-plan-capacity-before-taking-on-more-work"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Define what unprofitable means in this decision"
    },
    {
      type: "p",
      text: "A customer may look poor after overhead allocation while still contributing cash toward fixed costs. Another may show attractive gross margin while consuming unpriced specialist time and repeated rework. Start by separating revenue, costs caused by serving the customer, and overhead that will remain if the relationship ends. The decision is not whether a spreadsheet label is red. It is whether the business becomes better off under a realistic alternative to the current arrangement."
    },
    {
      type: "h2",
      text: "Measure the service burden that pricing hides"
    },
    {
      type: "p",
      text: "Include support, expedited work, bespoke reporting, credits, collections effort, change requests, and senior attention when they are materially caused by the account. Use a defined observation period rather than one memorable bad week. Ask the team to record work in enough detail to identify a pattern without building a permanent administrative burden. Be careful not to count the same cost twice. The purpose is to understand the work the relationship creates, not to produce a more dramatic margin number."
    },
    {
      type: "h2",
      text: "Identify which costs would actually disappear"
    },
    {
      type: "p",
      text: "If a customer leaves, supplier charges tied to that work may stop, while rent and salaried capacity may remain. Some costs change only after a contractual or staffing decision with its own consequences. Write the timing of those changes explicitly. An exit that removes revenue immediately but saves little near-term cash can worsen a cash constraint. That does not mean the customer must stay forever; it means the transition needs a more honest economic plan."
    },
    {
      type: "h2",
      text: "Ask whether the problem is the customer or the offer"
    },
    {
      type: "p",
      text: "Unclear scope, weak onboarding, defects, and inconsistent account management can make many customers expensive. Before blaming a particular relationship, compare it with similar accounts and inspect the process. If the account buys a service the business no longer wants to provide, that is a portfolio choice. If it requires avoidable rework caused internally, fixing the workflow may be better than replacing the customer and recreating the same operating problem with someone new."
    },
    {
      type: "h2",
      text: "Test a specific change to the arrangement"
    },
    {
      type: "p",
      text: "Propose a revised price, defined service boundary, minimum order, lead time, or separate charge for exceptional work. Explain the business reason and the service the customer will receive. Do not promise that the customer will accept. Model the economics if they agree and the consequences if they decline. A reprice is a decision test: it reveals whether there is a sustainable relationship available, rather than merely expressing frustration through a larger invoice."
    },
    {
      type: "h2",
      text: "Compare the best alternative use of capacity"
    },
    {
      type: "p",
      text: "A burdensome account matters more when it occupies a scarce role that could serve a better opportunity. Confirm that the alternative is credible and account for the time needed to win, onboard, and collect from replacement work. An empty calendar is not the same as proven replacement demand. Conversely, retaining a low-value account because it contributes something can be costly if it blocks reliable higher-contribution work. Make both the capacity and demand assumptions visible in the decision."
    },
    {
      type: "h2",
      text: "Use a hypothetical margin bridge"
    },
    {
      type: "p",
      text: "Suppose an illustrative account pays $10,000 monthly and creates $7,000 of avoidable delivery costs. It is allocated another $4,000 of overhead that would remain after exit. Ending the relationship immediately removes $3,000 of contribution before replacement work arrives. That does not settle the decision, because scarce capacity or future obligations may change the answer. It shows why a fully allocated loss and an immediate cash saving are different claims that must be evaluated separately."
    },
    {
      type: "h2",
      text: "Plan an exit professionally when it is the best choice"
    },
    {
      type: "p",
      text: "Review notice, outstanding deliverables, data handoff, credits, and collection obligations under the actual agreement. Obtain appropriate legal or commercial advice when needed. Protect the team from an indefinite transition by naming owners and dates. Communicate a factual plan rather than a grievance list. After the exit, verify whether the expected capacity and cash benefits appeared. If they did not, investigate the assumptions so the next customer decision is based on better evidence rather than another broad label."
    },
    {
      type: "panel",
      items: [
        "Measure contribution and unpriced service work.",
        "Compare reprice, re-scope, process repair, and exit.",
        "Model what cash and capacity change, and when."
      ]
    },
    {
      type: "h2",
      text: "Try the decision"
    },
    {
      type: "p",
      text: "This fictional scenario makes the tradeoff concrete. Treat the details as a practice case and select the action that changes the relevant constraint."
    },
    {
      type: "scenario"
    }
  ]
};

export default guide;

