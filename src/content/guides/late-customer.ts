import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-handle-a-customer-who-pays-late",
  skill: "financial",
  title: "How to Handle a Customer Who Pays Late",
  description: "Handle a late-paying customer by separating invoice errors, disputes, and cash problems. Set a clear collection plan and decide whether to extend more credit.",
  answer: "First establish why the payment is late and whether the invoice is valid and approved. Assign a collection owner, obtain a dated commitment, and decide separately whether to keep extending credit. Escalate based on evidence and your agreed terms rather than treating every delay as either harmless or hostile.",
  scenario: {
    industry: "Illustrative equipment service business",
    scenario: "Suppose a customer is late on two invoices and requests another installation. Accounts payable says both invoices lack a required acceptance document. Sales wants to continue shipping because the customer is important.",
    prompt: "What should the operator do first?",
    choices: [
      {
        id: "a",
        text: "Assume the customer will pay and increase the credit exposure"
      },
      {
        id: "b",
        text: "Send unrelated reminders to every customer contact"
      },
      {
        id: "c",
        text: "Correct the acceptance records, confirm payment timing, and review new credit"
      },
      {
        id: "d",
        text: "Treat the booked revenue as cash already available"
      }
    ],
    correctChoiceId: "c",
    explanation: "The current blocker is specific and correctable. Resolve it, obtain evidence about collection timing, and separately decide the terms for additional work rather than letting exposure grow by default."
  },
  faqs: [
    {
      question: "Should you stop work as soon as an invoice is late?",
      answer: "Review the agreement, the cause of delay, the amount at risk, and the consequences of continuing. A missing invoice reference may be resolved quickly; repeated broken promises may require stricter terms. Make a deliberate credit decision and obtain advice when a suspension could create contractual consequences."
    },
    {
      question: "Who should chase overdue invoices?",
      answer: "Use one collection owner with a clear record and escalation path. Sales or delivery may need to resolve relationship or acceptance questions, but someone must confirm the blocker, expected receipt date, and next action. Shared responsibility without a named owner often produces duplicated messages and missed follow-up."
    },
    {
      question: "Should you include a late payment in the cash forecast?",
      answer: "Include it with a supported expected date and visible uncertainty. Do not keep moving an unsupported receipt forward each week as if nothing changed. Test the effect of further delay, particularly when that receipt is needed to cover a near-term obligation."
    }
  ],
  related: [
    "how-to-build-a-13-week-cash-flow-forecast",
    "how-to-decide-whether-to-drop-an-unprofitable-customer",
    "how-to-improve-cash-flow"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Check the invoice before challenging the customer"
    },
    {
      type: "p",
      text: "Confirm the legal customer, amount, payment terms, purchase-order details, delivery evidence, and the address or portal used for submission. Ask whether the invoice was received and approved, not merely whether someone saw an email. A missing acceptance record or incorrect reference can prevent payment even when the customer intends to pay. Correct your own process promptly and record the new expected date. Do not assume the customer's payment clock began when your team first drafted an incomplete invoice."
    },
    {
      type: "h2",
      text: "Separate an administrative delay from a real dispute"
    },
    {
      type: "p",
      text: "Ask what specific condition prevents payment. Is approval missing, is part of the work disputed, or does the customer lack available cash? Request the name of the person who can resolve the condition. These causes require different actions. An invoice correction belongs with billing; a service dispute needs an accountable delivery owner; a cash problem requires a deliberate credit decision. Repeated reminders to the wrong contact can create activity without moving the payment any closer."
    },
    {
      type: "h2",
      text: "Keep one owner and a written collection record"
    },
    {
      type: "p",
      text: "Record the invoice, relevant terms, last contact, stated blocker, promised payment date, and next escalation. Give one person responsibility for follow-through while drawing on sales and delivery for context. Otherwise, three colleagues can send conflicting messages while nobody confirms that a promise was kept. The record should be factual and professional. It helps a replacement colleague continue the work and prevents a familiar customer from receiving indefinite informal extensions nobody else can see."
    },
    {
      type: "h2",
      text: "Ask for a specific next action"
    },
    {
      type: "p",
      text: "A promise to process the invoice soon is weaker than confirmation of approval, payment method, amount, and expected date. Ask what must happen before the customer can make that commitment. If they cannot provide a date, record that uncertainty in the cash forecast. Do not translate a friendly conversation into a certain receipt. When a commitment is missed, follow up using the agreed facts and decide the next step instead of restarting the same unspecific conversation."
    },
    {
      type: "h2",
      text: "Decide whether more work means more credit"
    },
    {
      type: "p",
      text: "Continuing delivery while old invoices remain unresolved is a new exposure decision, even if the sales relationship feels separate from collections. Review the outstanding balance, upcoming work, customer dependence, and the effect on your own cash commitments. Options may include a deposit, smaller milestones, a credit limit, or pausing additional work under the applicable agreement. Do not impose an unsupported remedy without reviewing the terms. The important point is to make the exposure explicit before it grows automatically."
    },
    {
      type: "h2",
      text: "Evaluate a payment plan as an operating choice"
    },
    {
      type: "p",
      text: "A realistic payment plan may preserve a valuable relationship and recover more cash than an empty demand for immediate settlement. It can also defer recognition of a serious collection problem. Clarify amounts, dates, new-work terms, and what happens if a payment is missed. Obtain appropriate approval within your business. When the amounts or legal consequences are material, get qualified advice on the actual agreement rather than relying on a generic collection script. Document what has been agreed and by whom."
    },
    {
      type: "h2",
      text: "Use an example to separate revenue from available cash"
    },
    {
      type: "p",
      text: "Suppose a fictional customer owes $18,000 and wants another $6,000 of work before settling the balance. The new work may be profitable on paper, but it increases exposure and consumes capacity before cash arrives. A deposit or staged delivery could change the tradeoff. These figures do not establish a universal credit limit. They illustrate why the decision should include the unpaid balance, the cost of additional work, and the reliability of the proposed collection plan."
    },
    {
      type: "h2",
      text: "Repair the process behind repeated late payment"
    },
    {
      type: "p",
      text: "Look for patterns across invoices. Late billing, unclear acceptance standards, missing purchase orders, or vague terms can create predictable delay. Fix the upstream issue and assign ownership for checking completeness before submission. Segment genuine customer credit problems from internal billing defects so one does not excuse the other. At the operating review, track promised payment dates and unresolved blockers alongside the aging balance. A smaller overdue total is useful, but a process that prevents the next avoidable delay is more durable."
    },
    {
      type: "panel",
      items: [
        "Validate: is the invoice complete, received, and approved?",
        "Resolve: who owns the blocker and the dated next action?",
        "Limit: should the business extend additional credit now?"
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

