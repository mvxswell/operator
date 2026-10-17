import type { Guide } from "./index";

export const operationsGuides: Guide[] = [
  {
    slug: "how-to-create-sops", title: "How to create SOPs that people actually use",
    description: "Create useful standard operating procedures by recording a real task, testing the instructions with another person, and assigning a clear review owner.",
    skill: "operations", minutes: 8,
    intro: "Create an SOP from work that happens repeatedly and pulls the owner in. Record one real execution, document the decisions and exceptions, then have someone else follow it without your help before calling it finished.",
    steps: [
      { title: "Start where repeated questions interrupt work", paragraphs: [
        "List the tasks that trigger the same call, correction, or approval every week. Choose a process with meaningful frequency, predictable inputs, and a visible finished result. A procedure for a rare edge case may be useful later, but it will not return owner hours quickly.",
        "Ask the people doing the work what changes between cases. A manager's idealized process can miss the workaround everyone uses. Make the actual workflow visible before standardizing it."
      ] },
      { title: "Record one complete live run", paragraphs: [
        "Capture the trigger, required inputs, systems used, decisions made, handoffs, and completion proof while a skilled person does the task. A screen recording can help for software steps, but it must be translated into searchable instructions. Include what to do when a required input is missing.",
        "Note the time and the most common exception. Do not attempt to document every possible branch on day one. A useful first version covers normal work and tells the reader when to escalate."
      ] },
      { title: "Write for the next person, not the expert", paragraphs: [
        "Use a short template: purpose, when to start, inputs, owner, steps, decision rules, quality check, exceptions, and where to record completion. Name buttons or documents exactly as they appear. Put the action first in each step and link to forms or examples rather than describing them vaguely.",
        "Explain why the critical checks exist. People follow a rule more reliably when they understand the failure it prevents. Keep the procedure short enough to use during work; background theory belongs in a separate training note."
      ] },
      { title: "Test with someone who did not write it", paragraphs: [
        "Give the draft and a real, low-risk task to another person. Observe silently until they stop, guess, or make a decision the document did not cover. Those moments are defects in the SOP, not proof that the reader lacks initiative. Fix the language or missing example and test again.",
        "A procedure is not finished because it looks polished. It is finished when the intended user can produce an acceptable outcome without hidden coaching. Record how long the task takes and whether the result passes the quality check."
      ] },
      { title: "Put the SOP where the work happens", paragraphs: [
        "Link it from the checklist, ticket, form, or system where someone starts the task. A document buried in a folder will be forgotten. Use a title that matches the question people ask, such as 'Approve a routine refund,' rather than an internal code.",
        "Give the process one owner who can approve edits and keep the current version clear. Archive obsolete copies so two conflicting instructions do not circulate. Tell the team what changed when a material step changes."
      ] },
      { title: "Review the procedure against outcomes", paragraphs: [
        "Set a review date based on how quickly the work changes. Watch error rate, rework, escalation frequency, and time to completion. If a step is routinely skipped, ask whether it is unnecessary, poorly placed, or too hard to perform—not merely why people are noncompliant.",
        "Treat SOPs as operating tools. Update the decision rule when a new exception becomes common, but resist adding pages of detail for one unusual case. The goal is reliable work with less dependence on memory."
      ] },
    ],
    framework: { title: "One-page SOP template", items: ["Trigger, owner, and expected finished result.", "Inputs, access, and numbered actions with exact system names.", "Decision boundaries, common exception, and escalation contact.", "Quality check, completion record, version owner, and review date."] },
    workedExample: { title: "Worked example: opening a new customer account", paragraphs: [
      "The owner is called every time a salesperson signs a new customer because billing details are often missing. The team records one successful setup and discovers that tax status and invoice contact are collected only after service starts. A one-page SOP moves those fields into the signed handoff form, identifies the service coordinator as owner, and includes a checklist before the first job is scheduled.",
      "A second coordinator tests it on a new account without help. She finds that the billing system uses a different field name than the draft. The SOP is corrected, then linked from the sales handoff. The owner now receives only cases with missing legal details or unusual terms. The document's value is the removal of a recurring decision bottleneck, not the existence of another file."
    ] },
    mistakes: ["Writing from memory without watching real work.", "Documenting clicks but omitting the decision and quality rule.", "Publishing before a new user tests it on a live case.", "Leaving several versions in circulation with no named owner."],
    scenario: { text: "A founder gets called on every new customer setup. A draft SOP lists software clicks, but the coordinator still has to ask who may approve nonstandard payment terms.", prompt: "What should the SOP owner add first?", choices: ["More screenshots of the same clicks", "A clear approval threshold and escalation rule", "A longer company history", "A rule to never ask questions"], correct: 1, explanation: "The missing decision boundary is the source of the interruption. An SOP must specify when the worker can act and when to escalate." },
    faq: [
      { question: "How long should an SOP be?", answer: "As short as the intended user can reliably follow. Include the decision and quality checks, but move background training to a separate resource." },
      { question: "Who should write an SOP?", answer: "The person closest to the work should demonstrate it; a named owner should approve the rule, and a different user should test the document." },
      { question: "How often should SOPs be updated?", answer: "Review on a cadence that matches process change and whenever errors, tools, or responsibilities materially shift." }
    ], related: ["how-to-delegate", "scaling-operations-without-losing-quality", "how-to-find-the-bottleneck"],
  },
  {
    slug: "scaling-operations-without-losing-quality", title: "Scaling operations without losing quality",
    description: "Scale operations without losing quality: standardize repeatable work, place checks at handoffs, track leading signals, and automate only stable processes.",
    skill: "operations", minutes: 8,
    intro: "Scale operations without losing quality by defining the few outcomes that must stay consistent, building checks into handoffs, and measuring early warning signals. Automate only after the underlying process works reliably by hand.",
    steps: [
      { title: "Define quality from the customer's side", paragraphs: [
        "List the defects customers actually notice: missed deadlines, incorrect work, inconsistent communication, or a failed outcome. Set a clear acceptance standard for each. Internal efficiency matters, but a team can move faster on paper while creating more callbacks and refunds.",
        "Separate nonnegotiable standards from legitimate customization. If every customer needs a slightly different promise, define the common core and the approved variants. Otherwise growth turns individual preference into hidden complexity."
      ] },
      { title: "Standardize the repeatable core", paragraphs: [
        "Document the normal path from order to delivery: inputs, ownership, decision rules, and completion proof. Use checklists where an omission is likely, not everywhere. The aim is to reduce variation that creates errors while preserving judgment where the situation genuinely differs.",
        "Train the process through live attempts. A new location or team cannot inherit a standard that only the original manager understands. Keep one current version and record why exceptions were made."
      ] },
      { title: "Put quality checks at handoffs", paragraphs: [
        "A final inspection catches defects after they are expensive. Check inputs before the next team accepts work: complete order information before scheduling, correct materials before production, and tested output before customer delivery. Name who can reject an incomplete handoff and how it gets repaired.",
        "Measure first-pass yield and rework by stage. If errors rise at one handoff, fix the upstream condition rather than adding a larger cleanup team. Make the check fast enough to be used under real volume."
      ] },
      { title: "Watch leading metrics before customer complaints", paragraphs: [
        "On-time completion and customer ratings are useful but late. Leading signals might be incomplete handoffs, queue age, missed preflight checks, rework hours, or new-hire certification. Choose a few signals connected to the failure you want to prevent.",
        "Set thresholds and an owner for action. A dashboard that turns red without changing a decision is decoration. Review a small sample of actual work so the numbers do not hide a new failure mode."
      ] },
      { title: "Increase capacity at the constraint", paragraphs: [
        "Map where work waits as volume increases. Protect the constraining step from missing inputs, avoidable interruptions, and rework. Add staffing or equipment only when the repeatable process still cannot meet demand. If the system is unstable, adding volume amplifies variation.",
        "Cross-train for predictable peaks and define when overflow work can be accepted. Growth plans should include the capacity and cash needed to honor the promised service level, not just the leads needed to fill the pipeline."
      ] },
      { title: "Automate only a stable rule", paragraphs: [
        "Automation is valuable when triggers, inputs, exceptions, and outcomes are known. If staff routinely override a rule, an automated version may spread the error faster. Fix the manual workflow and test the exception path before replacing it with software.",
        "After rollout, compare cycle time, error rate, and escalation volume. Keep a person accountable for the automated process. The tool can execute a rule, but someone must own whether the rule still serves the customer."
      ] },
    ],
    framework: { title: "Quality-at-scale check", items: ["Customer-visible quality standards are defined and measured.", "Each handoff has required inputs and a named accept/reject owner.", "Leading signals reveal defects before final delivery.", "Capacity and automation decisions use a stable process and a clear constraint."] },
    workedExample: { title: "Worked example: a second field crew", paragraphs: [
      "A repair company adds a second crew and sees callbacks rise. The owner assumes the new technicians need more supervision. A review shows both crews receive incomplete job notes, but the original crew knows customers well enough to fill gaps. The new crew exposes a weak handoff that growth made visible.",
      "The company adds a required diagnosis, parts list, and photo to the dispatch handoff. A lead checks the packet before scheduling. It tracks first-visit completion and callback hours weekly. Once that process is stable, it automates missing-field prompts in the scheduling tool. The quality gain comes from a clearer input rule, not from watching every technician all day.",
      "The owner also sets a simple stop rule: if incomplete packets exceed the agreed threshold for two weeks, the team pauses new service-area expansion until the handoff is repaired. That protects the promise while demand grows. The lead reviews five recent jobs with both crews each Friday, including one that went smoothly, to learn whether the checklist is catching the right things. If the new crew still struggles after receiving complete packets, training becomes the next hypothesis to test—not the first assumption."
    ] },
    mistakes: ["Scaling an undocumented workaround as if it were a process.", "Inspecting only at the end, after defects have passed through several teams.", "Choosing metrics because they are easy to count rather than predictive of quality.", "Automating an unstable workflow and multiplying its errors."],
    scenario: { text: "A service company doubles field crews. Callbacks increase, mainly on jobs with incomplete notes from sales. The original crew informally knew the missing context.", prompt: "What is the best first fix?", choices: ["Add a final apology script", "Require a complete job packet before dispatch accepts the work", "Buy automation for every step immediately", "Blame the new crew and stop measuring callbacks"], correct: 1, explanation: "The defect starts at the sales-to-dispatch handoff. A quality gate there prevents rework before the field team spends capacity." },
    faq: [
      { question: "Does standardization remove employee judgment?", answer: "No. Standardize routine inputs, checks, and boundaries so people can spend judgment on genuine exceptions." },
      { question: "Which quality metric should I watch first?", answer: "Pick the earliest measurable condition that predicts your most costly customer-visible failure, such as incomplete handoffs or first-pass yield." },
      { question: "When should a process be automated?", answer: "After the manual path, decision rules, and exception handling are stable enough that automation will repeat the right behavior." }
    ], related: ["how-to-create-sops", "how-to-find-the-bottleneck", "how-to-delegate"],
  },
];
