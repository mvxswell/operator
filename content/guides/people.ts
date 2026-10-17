import type { Guide } from "./index";

export const peopleGuides: Guide[] = [
  {
    slug: "what-to-do-when-your-best-employee-quits",
    title: "What to do when your best employee quits",
    description: "A practical first-48-hours plan for when a key employee resigns: protect critical work, handle the handoff, and decide what role to build next safely.",
    skill: "people", minutes: 8,
    intro: "When your best employee quits, do not negotiate or redesign the company on the spot. Protect clients and deadlines in the first 48 hours, then decide what work truly needs a new owner.",
    steps: [
      { title: "Make room for a second conversation", paragraphs: [
        "Thank the employee for telling you, ask for the proposed final day, and arrange a calm follow-up. Your first response sets the tone for the handoff. A surprised owner may promise money, criticize the decision, or ask the employee to keep the news secret. None of those moves makes the next two weeks easier.",
        "In the follow-up, learn whether the decision is final and what a professional transition would look like. Ask what work they believe is most vulnerable when they leave. Do not make them responsible for fixing the whole operation; you own that plan. Write down the commitments you make, including references, communication timing, and handoff meetings."
      ] },
      { title: "Decide whether a counteroffer solves the real problem", paragraphs: [
        "A counteroffer makes sense only if the reason for leaving is both specific and fixable, the role remains important, and you can offer the same terms consistently to comparable people. If someone wants a different career, manager, or lifestyle, a last-minute raise may buy a short delay while trust erodes.",
        "Set a ceiling before discussing numbers. Compare the cost of a vacancy with the cost of changing compensation permanently. Do not make a promise that forces a second, unplanned negotiation with the rest of the team. If you cannot meet the underlying need, say so plainly and shift to a respectful exit."
      ] },
      { title: "Build a critical-work register", paragraphs: [
        "List every client, deadline, recurring process, system, and approval that depends on this person. For each item record the next due date, the consequence of a miss, where the current information lives, and who can act as a backup. Prioritize items that could interrupt revenue, payroll, customer service, or compliance before polishing internal documentation.",
        "This register should be a working sheet, not a long biography of the employee's job. Ask: what would break next Monday if they disappeared today? The answer reveals the work you must secure first and the knowledge you cannot wait until the final afternoon to capture."
      ] },
      { title: "Assign temporary owners by the next business day", paragraphs: [
        "Give each critical item one named temporary owner and one escalation path. Splitting responsibility across a group often means nobody makes the call. Tell clients only what they need to know: who their contact is, when continuity begins, and what will not change. If coverage requires slowing new work, make that tradeoff explicit.",
        "Check the load on the people receiving work. Moving every task to your second-best employee can create a second resignation. Separate must-do work from work you can pause, simplify, or decline for a month. A temporary plan can be intentionally imperfect; it must be reliable and visible."
      ] },
      { title: "Transfer knowledge before changing access", paragraphs: [
        "Schedule short handoff sessions around actual workflows: a live client issue, the next payroll cycle, an approval, and a routine exception. Have the new owner perform the task while the departing employee observes. A document that only its author understands is not a transfer.",
        "Inventory account access and company devices with your normal security process. Remove access at the appropriate exit time, not before necessary handoff, and never share passwords as a shortcut. Keep a record of what was transferred and what remains uncertain so the incoming owner can ask the right questions."
      ] },
      { title: "Close the exit correctly, then redesign the work", paragraphs: [
        "Use an exit conversation to find patterns, not to litigate the employee's decision. Confirm final pay, benefits, property return, and applicable state requirements with qualified payroll or legal help; rules vary. Communicate the departure respectfully and avoid speculating about motives.",
        "Once the immediate risk is covered, choose among replacing, promoting, redesigning, outsourcing, or stopping the work. Start with the bottleneck: which responsibilities create the most value and which existed only because this particular person was capable of doing them? Write the future role from required outcomes, not by copying an old job description."
      ] },
    ],
    framework: { title: "The 48-hour continuity check", items: [
      "Name the five highest-risk commitments and their next due dates.",
      "Assign one temporary owner and escalation route to each commitment.",
      "Schedule the first live handoff before discussing a permanent replacement.",
      "Pause or re-scope work that the remaining team cannot cover safely."
    ] },
    workedExample: { title: "Worked example: the operations manager", paragraphs: [
      "Your top operations manager gives two weeks' notice on Monday. She handles three large customers, approves vendor orders, and knows the exceptions in the scheduling system. Hiring an identical replacement will take six weeks. The wrong first move is to post the job and hope two weeks of shadowing will be enough.",
      "By Tuesday, you list the next customer deliverables, identify a senior coordinator to own scheduling, and retain vendor approvals yourself temporarily. You and the manager walk through one live order and one exception with the new owners driving. You defer a low-margin project that would overload the team. Only after those moves do you decide whether the permanent solution is an operations lead, a promoted coordinator with better systems, or a narrower role plus outside support. The resignation exposed a single-person dependency; fixing that dependency matters more than replacing a title."
    ] },
    mistakes: [
      "Making a counteroffer in the first emotional conversation without knowing why the person is leaving.",
      "Treating a job posting as a continuity plan while active clients and approvals have no owner.",
      "Removing access before essential handoff, or leaving access active after the exit without a documented reason.",
      "Putting all departed work onto one strong teammate without removing anything from that teammate's plate."
    ],
    scenario: { text: "Your operations manager gives two weeks' notice. She owns key client updates, vendor approvals, and the scheduling exceptions no one else understands. A replacement would take at least six weeks.", prompt: "What should you do first?", choices: ["Post the same job today and wait for applicants", "Promise a raise before learning why she is leaving", "Map critical commitments, assign temporary owners, and schedule live handoffs", "Give all her work to the most experienced teammate"], correct: 2, explanation: "Continuity is the immediate constraint. A register, owners, and real handoffs protect the business while you decide whether the role should be replaced or redesigned." },
    faq: [
      { question: "Should I counteroffer a top employee?", answer: "Only when the reason for leaving is clear and fixable, the role still matters, and the offer is sustainable and fair to the rest of the team. A reflexive raise rarely fixes a role or relationship problem." },
      { question: "When should I tell customers?", answer: "Once you can name the new contact and describe continuity. Customers need a dependable handoff, not a detailed account of an internal personnel decision." },
      { question: "Do I need to replace the same position?", answer: "No. Stabilize the work first, then decide whether to replace, promote, redesign, outsource, or stop parts of the role based on current needs." }
    ],
    related: ["how-to-delegate", "when-to-hire-your-first-employee", "how-to-create-sops"],
  },
  {
    slug: "how-to-delegate",
    title: "How to delegate without losing control",
    description: "A practical delegation ladder, handoff checklist, and review rhythm for owners who need to free time without creating confusion or micromanaging work.",
    skill: "people", minutes: 8,
    intro: "Delegate an outcome, a decision boundary, and a check-in point—not just a task. Start with frequent, low-risk work you understand well, then widen the person's authority as their judgment becomes reliable.",
    steps: [
      { title: "Find the work you are hoarding", paragraphs: [
        "Owners often keep tasks because they can do them faster today. That may be true for one instance and false for the next fifty. Track one week of interruptions and mark work that repeats, has a clear finish line, and does not require your unique authority. The best first delegation is usually routine, visible, and reversible.",
        "Do not start with a chaotic, high-stakes exception merely because it consumes the most time. First transfer a stable slice of that workflow. If every request still needs your approval, you moved the keystrokes but kept the bottleneck."
      ] },
      { title: "Choose a rung on the delegation ladder", paragraphs: [
        "Use five levels: do exactly as told; research and recommend; decide after approval; decide and inform; own the outcome within agreed limits. State the current rung aloud. Someone asked to recommend options should not be criticized for waiting, while someone empowered to decide should not be forced to request permission on every routine case.",
        "Move one rung at a time. Granting full autonomy with no context creates risk; keeping a capable person at the first rung wastes capacity. The correct level depends on consequence, experience, and how easy the decision is to reverse."
      ] },
      { title: "Describe success and boundaries", paragraphs: [
        "A useful handoff answers six questions: what result is needed, by when, what quality standard applies, what resources are available, which decisions the person can make, and what triggers an escalation. Include a real example of a good outcome and one failure mode. Ask the new owner to explain the plan back to you.",
        "Be precise where mistakes are costly and flexible where method is personal. For a customer reply, you might define response time, refund authority, and brand tone without dictating every sentence. That protects the outcome while leaving space to think."
      ] },
      { title: "Transfer the process with a live attempt", paragraphs: [
        "Show one example, let the new owner do the next example, and review what happened. A written procedure helps, but observation reveals hidden judgment: which exception matters, which metric is misleading, and when to ask for help. Record these discoveries in the process itself so the next transfer is easier.",
        "If they struggle, diagnose the handoff before blaming effort. Was the goal unclear? Did they lack access? Did you leave an approval bottleneck? Repair the system and rerun the task. Training is an investment with a short-term time cost and a long-term capacity return."
      ] },
      { title: "Inspect outcomes, not every movement", paragraphs: [
        "Set a review cadence matched to risk: daily for a new, consequential process; weekly for a stable one. Review output, exceptions, and leading indicators rather than hovering over every action. Ask what decision was difficult and what rule would make the next one easier.",
        "The goal is not to disappear. Keep a clear escalation channel and intervene when a boundary is crossed. Otherwise let the owner finish the work, including ordinary recoverable mistakes. Repeated mid-task overrides teach the team that the real owner is still you."
      ] },
      { title: "Expand authority when the evidence supports it", paragraphs: [
        "After several reliable cycles, move the person up one rung and remove a corresponding approval from your calendar. If performance is inconsistent, narrow the scope and improve the feedback loop rather than taking the whole task back indefinitely. Delegation is a controlled transfer of decision rights, not a one-time announcement.",
        "Measure the effect in owner hours returned, turnaround time, quality, and escalations. If your hours fall but rework rises sharply, the handoff was incomplete. If both improve, document the new boundary and choose the next repeatable task."
      ] },
    ],
    framework: { title: "Handoff checklist", items: ["Outcome and deadline are written in one sentence.", "Quality bar and an example are available.", "Decision authority, budget, and escalation triggers are explicit.", "The new owner performs one live attempt and knows the review date."] },
    workedExample: { title: "Worked example: customer refunds", paragraphs: [
      "A founder handles every refund request and is interrupted ten times a week. Most requests are under $100, fit a published policy, and have no fraud signal. The founder hands routine requests to a service lead with authority to approve up to $100, requires a note in the customer record, and asks for escalation only for repeated claims or policy exceptions.",
      "For the first week, the lead recommends decisions and the founder reviews them daily. In week two, the lead decides and informs the founder in a short digest. The company measures resolution time, repeat complaints, and dollars refunded. If the numbers hold, the founder stops approving ordinary cases. The gain is not merely saved clicks; customers get faster answers and the lead develops judgment."
    ] },
    mistakes: ["Delegating a vague instruction such as 'handle customers' without limits or a success standard.", "Giving responsibility without the access, budget, or authority needed to act.", "Taking work back after the first recoverable error instead of improving the rule or training.", "Checking every step so thoroughly that the owner remains the approval bottleneck."],
    scenario: { text: "You approve every routine refund. A service lead knows the policy and handles the customer conversation, but still waits for your signature on requests under $100.", prompt: "What is the best next move?", choices: ["Keep approving all refunds until the lead is perfect", "Give the lead written limits and let them decide routine cases, with a weekly review", "Stop tracking refunds entirely", "Ask the lead to draft replies but keep all decisions yourself"], correct: 1, explanation: "A clear authority limit and review loop transfers routine judgment without removing oversight. The founder retains exceptions rather than every transaction." },
    faq: [
      { question: "What should I delegate first?", answer: "Choose repeated, lower-risk work with a clear result and a process you can teach. Avoid starting with a rare, irreversible decision." },
      { question: "How do I delegate without micromanaging?", answer: "Agree on the outcome, authority, escalation rules, and review date. Inspect the result and exceptions at that cadence rather than every action." },
      { question: "What if the employee makes a mistake?", answer: "Separate a recoverable learning error from a boundary violation. Repair unclear instructions, missing access, or weak checkpoints before pulling all authority back." }
    ], related: ["what-to-do-when-your-best-employee-quits", "how-to-create-sops", "scaling-operations-without-losing-quality"],
  },
];
