import type { Guide } from "./index";

export const financialGuides: Guide[] = [
  {
    slug: "how-to-price-a-service-business", title: "How to price a service business",
    description: "Learn to price services from true delivery cost, market alternatives, and customer value. Includes a margin example and a practical price-test plan today.",
    skill: "financial", minutes: 9,
    intro: "Price a service by knowing your fully loaded delivery cost, then checking the market and the value of the outcome. Set a margin floor before testing packages or raising rates; revenue alone does not tell you whether a job is worth taking.",
    steps: [
      { title: "Calculate the true cost of an hour", paragraphs: [
        "Start with wages, payroll burden, benefits, supplies, travel, software, supervision, and the share of overhead needed to deliver the work. Divide by billable hours, not all hours on the clock. A technician paid for forty hours may spend only thirty on customer work; scheduling, rework, and travel still cost money.",
        "Use actual recent jobs to check the estimate. If a quoted four-hour job regularly takes six, the issue may be scope, training, or process rather than the posted rate. Record both quoted and actual hours so a profitable-looking service cannot hide an execution problem."
      ] },
      { title: "Set a floor with target margin", paragraphs: [
        "Gross margin is (price minus direct delivery cost) divided by price. If direct cost is $180 and you need a 40% gross margin, the price floor is $180 divided by 0.60, or $300. Adding 40% to cost gives $252, which produces only a 28.6% margin. Markup and margin are not the same thing.",
        "The floor is a filter, not always the final price. It must leave room for overhead, sales costs, risk, and a reasonable return. If the market will not support your floor, revisit the service design and cost structure before buying more demand for an unprofitable offer."
      ] },
      { title: "Compare cost-plus, market, and value", paragraphs: [
        "Cost-plus tells you whether the work can pay for itself. Market pricing tells you what alternatives customers see. Value-based pricing asks what the outcome is worth to a specific buyer. Use all three as constraints rather than choosing a single slogan. A high-value emergency service can command more than routine work even when labor hours are similar.",
        "Ask customers what they are buying: faster turnaround, fewer failures, certainty, convenience, or compliance. Describe the result clearly in the proposal. If you cannot explain the difference between your offer and a cheaper alternative, raising the number on the quote may only lower conversion."
      ] },
      { title: "Package the scope before changing the price", paragraphs: [
        "A fixed package can make comparison easier and protect against scope creep when inclusions and exclusions are explicit. A retainer suits recurring work with predictable access or volume; it should state response times, usage limits, and what happens when demand exceeds them. An hourly quote is often better when scope is genuinely uncertain.",
        "Make each package operationally deliverable. A premium tier that promises same-day service without spare capacity creates a quality problem. Price the extra capacity and exceptions, then make the tradeoff visible to customers."
      ] },
      { title: "Test a change on a defined segment", paragraphs: [
        "Raise the quote for a narrow set of new customers or one service line. Track inquiries, close rate, average price, gross margin, refunds, and the reason deals are lost. A lower close rate can still produce more gross profit, but only if the remaining volume covers fixed costs and capacity is used well.",
        "A near-100% close rate can be a warning that the price is too low, especially if demand exceeds capacity. It is not proof by itself; a warm referral channel may also convert unusually well. Use the margin and capacity numbers before making the call."
      ] },
      { title: "Review by contribution, not by headline revenue", paragraphs: [
        "Some large clients demand so much custom work that a smaller standard job contributes more after delivery costs. Compare price, direct cost, time to payment, rework, and the scarce capacity each job consumes. If a service blocks your constraint for little contribution, raising its price or narrowing its scope can improve the business even if sales count falls.",
        "Revisit prices when input costs, service levels, or the mix of work change. Keep a simple price decision log: what changed, who approved it, when it took effect, and what metric will tell you whether it worked."
      ] },
    ],
    framework: { title: "Pricing worksheet", items: ["Estimate billable hours and all direct delivery costs from real jobs.", "Divide direct cost by (1 minus target margin) to set the floor.", "Compare alternatives and the customer's value of the outcome.", "Test one price or package change; monitor gross profit, not only close rate."] },
    workedExample: { title: "Worked example: a maintenance visit", paragraphs: [
      "A service visit uses three billable labor hours at a fully loaded $45 per hour, plus $45 of parts and travel. Direct cost is $180. At a 40% target gross margin, the floor is $300. A competitor advertises $275, but excludes follow-up support. You test a $325 fixed package that includes one follow-up call and clearly excludes additional parts.",
      "If ten prospects previously bought at $275 and eight buy at $325, compare contribution: at the original price, ten jobs each contribute $95, or $950; at the new price, eight contribute $145, or $1,160, before any change in acquisition cost. The test is favorable only if your capacity, lead flow, and fixed costs make the lower volume acceptable. Keep measuring rework and payment speed too."
    ] },
    mistakes: ["Using paid hours as the denominator instead of realistic billable hours.", "Confusing a 40% markup with a 40% gross margin.", "Copying a competitor's price while selling a different scope or service level.", "Judging a price test only by conversion and ignoring gross profit and capacity."],
    scenario: { text: "A maintenance job costs $180 in direct labor, travel, and parts. You need a 40% gross margin before overhead. A manager suggests adding 40% to cost and quoting $252.", prompt: "What is the correct minimum price?", choices: ["$252, because markup and margin are identical", "$300, because $180 must be 60% of price", "$220, to match the cheapest competitor", "$180, to keep the crew busy"], correct: 1, explanation: "Divide $180 by 0.60. A 40% markup on cost is not a 40% margin on revenue." },
    faq: [
      { question: "What is the difference between markup and margin?", answer: "Markup divides profit by cost; margin divides profit by selling price. A 40% margin requires price = cost / 0.60, not cost × 1.40." },
      { question: "Should service businesses charge hourly or fixed fees?", answer: "Use fixed fees when scope and delivery are predictable, with explicit exceptions. Use hourly or staged pricing when the work cannot yet be scoped reliably." },
      { question: "Does a lower close rate mean a price increase failed?", answer: "Not necessarily. Compare total contribution, acquisition cost, capacity use, and repeat business. Fewer jobs at healthier margins may outperform more low-margin work." }
    ], related: ["should-i-raise-prices", "how-to-improve-cash-flow", "where-to-invest-your-next-dollar"],
  },
  {
    slug: "how-to-improve-cash-flow", title: "How to improve cash flow in a small business",
    description: "A practical cash-flow plan covering receivables, deposits, inventory, payables, and a 13-week forecast without cutting the capacity that earns revenue.",
    skill: "financial", minutes: 9,
    intro: "Improve cash flow by shortening the time between doing work and collecting cash, while planning payments against a rolling 13-week forecast. A profitable sale can still create a cash crisis when payroll and suppliers are due before the customer pays.",
    steps: [
      { title: "Separate profit from cash", paragraphs: [
        "Profit records revenue and expenses for work earned during a period. Cash tracks when money actually enters and leaves the bank. A large invoice can improve reported profit today while the cash will not arrive for sixty days. That gap matters when payroll is due Friday.",
        "Start with bank balance, expected collections, committed payments, and the minimum operating buffer. Reconcile this simple view to your accounting records, but do not wait for a perfect financial model before seeing the next two payroll cycles."
      ] },
      { title: "Collect faster without surprising customers", paragraphs: [
        "Invoice promptly and accurately, with the purchase order, contact, and acceptance details the customer needs. Confirm the payment date before a balance becomes overdue. If collections are slow, classify invoices by age and reason: disputed work, missing paperwork, customer process, or genuine inability to pay.",
        "Change terms for new work where appropriate. Deposits, milestones, or payment on completion can shorten the gap, especially when you buy materials up front. Do not quietly change an agreed term after work begins; price the financing burden into future quotes instead."
      ] },
      { title: "Release cash trapped in work in progress", paragraphs: [
        "Inventory and unfinished work consume cash before they produce an invoice. Find jobs waiting for one part, approval, or quality check. Finish and bill those before starting another batch. Reduce slow-moving stock only after checking whether it protects an essential service promise.",
        "Track days from job start to invoice and days from invoice to payment. Improving either number releases cash. Cutting inventory blindly can create stockouts and expensive rush orders, so use demand and lead time rather than an arbitrary percentage reduction."
      ] },
      { title: "Time payables deliberately", paragraphs: [
        "Use agreed supplier terms fully, but do not pay late by accident. Put due dates in the forecast and communicate early if a temporary change is needed. Losing a critical supplier over an avoidable surprise can cost far more than a few extra days of cash.",
        "Review recurring subscriptions, unused capacity, and discretionary projects. Postpone spending that does not protect sales or delivery. Preserve the people and inputs that turn current orders into cash, unless the economics show those orders themselves are a loss."
      ] },
      { title: "Build a 13-week cash forecast", paragraphs: [
        "List opening cash for each week, expected customer receipts, payroll, rent, taxes, debt, supplier payments, and planned investments. Calculate closing cash, then carry it into the next week. Mark uncertain receipts separately; a promised payment is not the same as money in the bank.",
        "Update actuals weekly and move misses forward. The purpose is to expose the lowest cash week early enough to act. If week six turns negative, you can accelerate a milestone invoice, negotiate timing, defer a nonessential purchase, or arrange financing before the crisis day arrives."
      ] },
      { title: "Choose changes that keep the engine working", paragraphs: [
        "Rank cash actions by speed, durability, and damage. Collecting an overdue undisputed invoice may help immediately with little harm. Cutting the only trained dispatcher could save salary this month while delaying every future invoice. Label one-time cash releases separately from permanent improvements.",
        "Check whether growth itself is creating the gap. More orders with long payment terms can require more working capital even at a healthy margin. If the forecast worsens as sales rise, solve the financing cycle rather than celebrating revenue and hoping cash catches up."
      ] },
    ],
    framework: { title: "Weekly cash meeting", items: ["Opening bank cash and minimum required buffer.", "Receipts by customer and confidence level, not one optimistic total.", "Committed payments by due week, including taxes and debt.", "Lowest projected cash week and one owner for each corrective action."] },
    workedExample: { title: "Worked example: profitable but short on payroll", paragraphs: [
      "A contractor earns $30,000 gross profit on a project but pays $25,000 for labor and materials in the first month. The customer pays $60,000 at completion in eight weeks. On paper the project looks attractive; in week four the company may lack the cash to pay its crew.",
      "A 25% deposit brings $15,000 forward. A milestone invoice after the first deliverable brings another portion into the middle of the job. The company also schedules material orders closer to use and checks supplier terms. The economics of the project did not change much, but the peak cash need did. A 13-week forecast shows whether those terms are enough before the owner signs another similar job."
    ] },
    mistakes: ["Treating an unpaid invoice as spendable cash.", "Forecasting receipts at their due dates without considering real collection history.", "Cutting the capacity needed to finish and invoice existing work.", "Solving a recurring cash-cycle problem with a one-time delay in supplier payments."],
    scenario: { text: "A profitable project requires payroll and materials this month, but the customer pays 60 days after completion. The cash forecast dips below payroll in week five.", prompt: "Which move addresses the actual constraint?", choices: ["Accept more identical projects immediately", "Offer a discount with no change to payment timing", "Negotiate a deposit or milestone billing and update the weekly cash forecast", "Stop tracking cash because the project is profitable"], correct: 2, explanation: "The timing gap is the constraint. Deposits or milestones pull cash toward the costs, while the forecast shows whether the change is sufficient." },
    faq: [
      { question: "Can a profitable business run out of cash?", answer: "Yes. Payroll, materials, taxes, and debt can come due before customers pay, especially during growth." },
      { question: "Why use a 13-week cash forecast?", answer: "Thirteen weeks shows near-term low points in enough detail to act, while remaining short enough to update weekly from actual receipts and payments." },
      { question: "Should I always delay paying suppliers?", answer: "No. Use agreed terms and communicate. Habitual late payment can disrupt essential supply and harm cash generation later." }
    ], related: ["how-to-price-a-service-business", "should-i-raise-prices", "where-to-invest-your-next-dollar"],
  },
];
