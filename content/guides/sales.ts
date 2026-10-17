import type { Guide } from "./index";

export const salesGuides: Guide[] = [
  {
    slug: "why-are-sales-down", title: "Why are sales down?",
    description: "Diagnose falling sales with traffic, conversion, order value, and repeat frequency. Find the factor that moved before spending on a costly, unproven fix.",
    skill: "sales", minutes: 8,
    intro: "When sales fall, break revenue into qualified traffic, conversion rate, average order value, and purchase frequency. Find which factor changed before you spend on ads, cut prices, or blame the sales team.",
    steps: [
      { title: "Compare equivalent periods", paragraphs: [
        "Start with the same weeks or months from a prior period, then account for known seasonality, holidays, pricing changes, and one-time deals. A month with fewer business days can look like a sales crisis when the daily run rate is stable. Separate new customers from returning ones, because a decline in either calls for a different response.",
        "Use revenue recognized from completed sales consistently. If a large order slipped across a reporting boundary, note it rather than treating the entire change as a trend. Your first job is to describe the decline accurately."
      ] },
      { title: "Write the sales equation", paragraphs: [
        "For a simple business, sales equal qualified traffic times conversion times average order value times purchase frequency. A B2B version might use leads, meetings, proposals, wins, and average contract value. Pick a version that matches how customers actually buy.",
        "Calculate each term for the current and comparison period. If visits are steady but qualified inquiries fall, the issue may be audience quality or the offer. If qualified leads hold but wins fall, examine the sales process. A single total cannot tell these stories apart."
      ] },
      { title: "Find the first stage that moved", paragraphs: [
        "Look upstream to downstream. Did the number of relevant prospects decline? Did fewer become opportunities? Did close rate fall? Did average sale size shrink? Did existing customers buy less often? The first meaningful break is usually where investigation should begin, even if a later metric also moved.",
        "Segment by channel, product, location, and customer type, but stop before tiny samples become noise. Check enough real orders and lost deals to validate the pattern. A salesperson's story is useful context, not a substitute for stage data."
      ] },
      { title: "Match the remedy to the broken term", paragraphs: [
        "If qualified traffic fell, test channel reach or referral generation. If conversion fell, inspect response time, sales conversations, proof, price, and competitor changes. If order value fell, examine mix, discounting, and package design. If frequency fell, look at customer experience and reactivation.",
        "Avoid the reflex to discount. A lower price can lift volume while shrinking gross profit. If the real problem is slower response, a discount treats the symptom and teaches customers to wait for deals."
      ] },
      { title: "Run one measurable experiment", paragraphs: [
        "Write the hypothesis in plain language: 'We are losing first-time customers because we respond to web inquiries after 24 hours.' Choose one action, such as a same-day callback rule, and a metric, such as inquiry-to-meeting conversion. Set the test period and the decision threshold before starting.",
        "Keep a comparison group or prior baseline when possible. A change made during a seasonal rebound can appear successful by coincidence. Record how much the experiment cost and whether the increase in contribution exceeds that cost."
      ] },
      { title: "Keep the diagnostic dashboard small", paragraphs: [
        "A weekly sheet with qualified leads, stage conversion, average order value, repeat sales, gross margin, and time to respond is enough for many small businesses. Show the trend and owner for each metric. Do not bury the team in dozens of activity counts that do not explain the sale.",
        "Once the first broken term improves, revisit the equation. The next constraint may move to fulfillment or retention. Sales diagnosis is a loop, not a one-time postmortem."
      ] },
    ],
    framework: { title: "Sales-decline worksheet", items: ["Qualified traffic or leads: current versus comparable period.", "Conversion at each buying stage and median response time.", "Average order value and discount rate by product or segment.", "Repeat purchase frequency and lost-customer reasons."] },
    workedExample: { title: "Worked example: a 20% revenue drop", paragraphs: [
      "A store had 10,000 qualified visits, a 4% conversion rate, and a $100 average basket: $40,000 in sales. This period it has 8,000 visits, the same 4% conversion, and the same $100 basket: $32,000. Revenue fell 20%, and the entire simplified gap is explained by traffic. Coaching cashiers to close harder is unlikely to restore the missing visits.",
      "Now segment traffic. Organic visits are stable; a local referral partner stopped sending customers. The team calls that partner, checks the underlying relationship, and starts one replacement referral test. It watches qualified visits and contribution, not raw impressions. If traffic recovers but conversion falls, the next diagnosis changes."
    ] },
    mistakes: ["Reacting to one large lost deal as if every channel failed.", "Blaming price without checking whether qualified traffic or response time changed.", "Buying more traffic while conversion or delivery is the binding issue.", "Reporting revenue alone while discounts make contribution worse."],
    scenario: { text: "Qualified visits fall from 10,000 to 8,000. Conversion stays 4% and average order value stays $100. Sales drop from $40,000 to $32,000.", prompt: "Where should the diagnosis start?", choices: ["Conversion training", "Traffic sources and lead quality", "A blanket 20% discount", "A larger checkout counter"], correct: 1, explanation: "The simplified equation points to traffic. Investigate which source changed before choosing a remedy." },
    faq: [
      { question: "Should I lower prices when sales are down?", answer: "Only after identifying price as the binding issue and checking margin. A discount cannot repair lost traffic or slow follow-up by itself." },
      { question: "What if revenue is down but leads are up?", answer: "Inspect lead quality, conversion by stage, average deal size, and delivery capacity. More leads can coexist with fewer profitable sales." },
      { question: "How much data do I need?", answer: "Use enough comparable periods and real customer examples to see a meaningful stage change. Treat very small segments as clues, not certainty." }
    ], related: ["how-to-get-more-customers", "why-is-my-business-not-growing", "should-i-raise-prices"],
  },
  {
    slug: "how-to-get-more-customers", title: "How to get more customers",
    description: "Choose a customer-acquisition channel that fits your offer, start with referrals and reactivation, then test one channel against CAC and customer value.",
    skill: "sales", minutes: 8,
    intro: "Get more customers by starting with a clear customer and offer, then choosing one channel that reaches that person at the right moment. Work referrals and existing-customer reactivation first; test paid channels only with a defined cost and conversion target.",
    steps: [
      { title: "Describe the customer you can serve profitably", paragraphs: [
        "List the customer segment, problem, buying trigger, average contribution, and the service level you can reliably deliver. 'Anyone who needs help' is too broad to choose a channel or write a useful message. Start with customers who already get a strong result and pay on time.",
        "Talk to recent buyers about what caused them to start looking and what alternatives they considered. The language they use is often more useful than the label you use internally. Channel fit begins with where the buying decision actually happens."
      ] },
      { title: "Make the offer easy to understand", paragraphs: [
        "State the outcome, the scope, a credible proof point, and the next action. A prospect should know whether the offer is for them without a long sales call. Remove unnecessary forms, vague packages, and hidden response times. A better message can raise conversion before acquisition spend rises.",
        "Check whether fulfillment can absorb new customers. If the team is already missing delivery dates, fix the capacity or promise first. Spending to create demand that turns into disappointment is expensive acquisition with poor retention."
      ] },
      { title: "Ask for specific referrals", paragraphs: [
        "Identify customers who recently received a good outcome. Ask whether they know someone facing the same problem, and provide a simple description they can forward. A vague 'send anyone our way' request asks the customer to do your segmentation for you.",
        "Track referred leads, close rate, and the time you spend maintaining the program. Referrals are not automatically free. Protect trust by making introductions easy, responding promptly, and never pressuring a customer to vouch for a result you cannot deliver."
      ] },
      { title: "Reactivate customers who already know you", paragraphs: [
        "Segment past customers by last purchase, problem, and likely next need. A timely, relevant check-in may be more effective than chasing a cold audience. Offer a useful reminder, service review, or new solution; do not send the same generic pitch to every old contact.",
        "Respect the communication permission and preferences you collected. Measure responses, repeat purchases, and gross margin. If customers left because the experience failed, repair that issue before sending a campaign."
      ] },
      { title: "Test one new channel with a cap", paragraphs: [
        "Choose a channel based on buying behavior: local search for urgent nearby needs, partnerships for trusted referrals, educational content for longer research cycles, or paid ads when intent and unit economics are clear. Set a fixed spend, time window, landing page, and definition of a qualified lead.",
        "Do not spread a small budget across five platforms and learn nothing. Record source through the sale, not just through the click. A cheap lead that never buys can be more expensive than a costly, high-intent referral."
      ] },
      { title: "Compare acquisition cost with customer value", paragraphs: [
        "Customer acquisition cost is the sales and marketing spend required to win a customer. Customer value should be based on contribution after direct costs, not gross revenue, and should use realistic repeat behavior. If the first sale loses money, you need evidence that later profitable purchases actually occur.",
        "Review by channel and cohort. Stop or change a test when it misses the prewritten threshold; expand only after a repeatable result. Keep enough cash and delivery capacity for the extra customers. Growth is useful when the next customer strengthens the system."
      ] },
    ],
    framework: { title: "One-channel test card", items: ["Target customer, buying trigger, and offer in one sentence.", "Channel, spend cap, test dates, and source tracking.", "Qualified leads, conversion, contribution per customer, and acquisition cost.", "Decision date and a written continue, revise, or stop rule."] },
    workedExample: { title: "Worked example: a local maintenance firm", paragraphs: [
      "A maintenance company wants more commercial clients. Its best accounts come from property managers and stay for recurring work. Instead of buying broad consumer ads, the owner asks happy managers for a specific introduction to one peer with a similar building portfolio. The team prepares a one-page service promise and a fast inspection booking path.",
      "In parallel, it tests one local search campaign with a small cap. It tracks qualified requests, visits, signed contracts, and contribution after service costs. A channel with many calls but few suitable buildings is revised or stopped. The referrals may take longer to scale, but if they produce better-fit recurring accounts, they deserve more attention than the cheaper clicks."
    ] },
    mistakes: ["Buying traffic before knowing the ideal customer and delivery capacity.", "Calling raw leads customers, or measuring clicks without sales.", "Assuming lifetime value without observing retention and contribution.", "Running too many small tests to learn which channel worked."],
    scenario: { text: "A service firm has a small marketing budget. Its most profitable clients are property managers who usually come through introductions. Broad social ads generate many low-fit inquiries.", prompt: "What should the owner test next?", choices: ["Double broad ad spend because lead count is high", "Ask satisfied managers for specific peer introductions and track signed accounts", "Stop measuring source after the first call", "Offer every prospect a steep discount"], correct: 1, explanation: "The known best-fit channel deserves a focused, measurable test. The decision should use signed profitable accounts, not lead volume alone." },
    faq: [
      { question: "What is the cheapest way to get customers?", answer: "There is no universal cheapest channel. Referrals and reactivation often deserve early tests because the audience already has context, but measure time and contribution as well as spend." },
      { question: "What is a good customer acquisition cost?", answer: "One that leaves adequate contribution and cash after realistic retention, service, and sales costs. The threshold varies with your model." },
      { question: "When should I increase ad spend?", answer: "After a bounded test shows repeatable qualified sales at acceptable economics and the operation can fulfill the added demand." }
    ], related: ["why-are-sales-down", "why-is-my-business-not-growing", "how-to-price-a-service-business"],
  },
];
