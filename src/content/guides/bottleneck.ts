import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-find-the-bottleneck",
  skill: "bottleneck",
  title: "How to Find the Bottleneck in Your Business",
    description:
      "The bottleneck is where the queue keeps growing, not the busiest person. Measure what each step finishes. Improve that step, pace the others, and spend last.",
  answer:
    "The bottleneck is the step where work piles up and waits, not the person who looks busiest. Measure how much each step finishes and how long work sits in front of it. Make that step better before you add people or tools anywhere else.",
  blocks: [
    { type: "h2", text: "Busyness is a bad compass" },
    {
      type: "p",
      text: "Every company has someone who is slammed. That feeling does not locate the constraint. A person can be busy on work that is not the limit, including rework, status meetings, and helping downstream because upstream overproduced. The constraint is the step that sets the pace of finished output. Everything faster than that step is building a pile or waiting on one.",
    },
    {
      type: "p",
      text: "You are looking for a step, not a personality. \"Sales is the bottleneck\" is useful only if you can point at the handoff: leads waiting for a first call, proposals waiting for a price, or signed jobs waiting for a crew. Name the queue.",
    },
    { type: "h2", text: "Measure the queue, the throughput, and the wait" },
    {
      type: "p",
      text: "For each step in the path from request to paid, write three numbers for a normal week. Throughput is how many units the step finishes. The queue is how many units are waiting at the start of the week and whether that pile is growing. Lead time is how long a typical unit sits there before the step starts, plus how long the step takes.",
    },
    {
      type: "p",
      text: "The bottleneck is where the queue keeps growing when demand is steady. A step can be fully occupied and still not be the constraint if the queue in front of it is stable and downstream is the one falling behind. Walk the work once. The pile is usually visible: an inbox, a whiteboard, a rack of half-finished jobs, a calendar with no open slots.",
    },
    { type: "h2", text: "A line that runs 120, 85, 140, and 100" },
    {
      type: "p",
      text: "Suppose a small install business moves jobs through four steps. These are example counts for a day, so you can see the shape. They are not a claim about your trade.",
    },
    {
      type: "table",
      columns: ["Step", "Finished per day"],
      rows: [
        ["Quote", "120"],
        ["Schedule", "85"],
        ["Install", "140"],
        ["Invoice", "100"],
      ],
    },
    {
      type: "p",
      text: "Quote can start 120 jobs. Schedule can only place 85. Install could do 140 if the jobs were there, and invoicing can bill 100. The line finishes 85, because nothing downstream can work on a job that was never scheduled. The queue of sold-but-unscheduled work will grow. Installers looking busy with side tasks does not move that queue. Hiring another quoter makes a bigger pile in front of schedule.",
    },
    {
      type: "p",
      text: "If schedule jumps to 110 after a process change, the next limit might be invoicing at 100, or demand, if quote falls below the rest. Recheck after you move one step. The constraint moves. Last month's answer is a hypothesis.",
    },
    {
      type: "panel",
      items: [
        "Throughput: how many units the step finishes in a normal week.",
        "Queue: how many units are waiting, and whether that pile is growing.",
        "Lead time: how long a unit sits before the step starts, plus the work itself.",
        "The constraint is the growing queue, which is also the slowest finished count.",
      ],
    },
    { type: "h2", text: "Separate a spike from a standing limit" },
    {
      type: "p",
      text: "A one-week surge, a flu, or a truck that is down will grow a queue that drains when the week ends. A constraint grows the queue in ordinary weeks, or the queue never quite clears before the next wave. Look at three ordinary weeks before you buy a permanent fix for a bad Tuesday. If the pile drains on its own, staff the spike with overtime or a temp and leave the system alone.",
    },
    {
      type: "p",
      text: "Seasonal businesses have a constraint that moves. The limit in peak may be crews. The limit in the quiet months may be the pipeline. Write which season you are diagnosing so you do not hire peak capacity you cannot feed in March.",
    },
    { type: "h2", text: "Exploit, then point everything at it, then spend" },
    {
      type: "p",
      text: "Change the constraint in that order. Spending is last because extra capacity on the wrong step only adds cost.",
    },
    {
      type: "ol",
      items: [
        "Exploit. Get more finished units from the step you already have. Cut the work that does not need to pass through it. Stop interrupting it. Put the best tools and the clearest priority on it.",
        "Subordinate. Pace the other steps to the constraint. Quoting faster than you can schedule creates promises you will miss. Start work when the constraint can take it.",
        "Elevate. Only then add hours, people, or machines at that step. Recheck the numbers after you do. The new constraint is somewhere else, and it deserves the same sequence.",
      ],
    },
    { type: "h2", text: "What to ignore while you do this" },
    {
      type: "p",
      text: "Ignore local efficiency scores that reward a step for staying busy. A quoter at 100% utilization who feeds a scheduler at capacity is manufacturing wait. Ignore improvements downstream of a starving step. Faster invoicing does not help if the invoices are waiting on installs that are waiting on the calendar.",
    },
    {
      type: "p",
      text: "If you are the queue — every approval, every exception, every price — the constraint may be the owner. That still gets measured: how many decisions wait on you, and how long. Delegation and a written limit move that step the same way a second scheduler would.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Print shop",
    scenario:
      "Orders are late and the floor feels frantic. In a normal week you take 90 new jobs, prepress finishes 90, the press finishes 50, and bindery can finish 80. The rack in front of the press is deeper every Friday. Prepress staff stay late to \"keep up.\" A vendor wants to sell you a faster cutter for bindery.",
    prompt: "Where is the bottleneck?",
    choices: [
      { id: "a", text: "Prepress, because those people are staying late" },
      { id: "b", text: "The press, because work piles up there and it finishes the fewest jobs" },
      { id: "c", text: "Bindery, because the vendor says the cutter is the weak machine" },
      { id: "d", text: "Sales, because 90 new jobs is too many" },
    ],
    correctChoiceId: "b",
    explanation:
      "The press finishes the least and the queue in front of it grows. Prepress staying late feeds a step that cannot take the work. A faster cutter speeds a step that is already waiting on the press.",
  },
  faqs: [
    {
      question: "How do you identify a bottleneck in a business?",
      answer:
        "Walk the path from request to paid work. At each step, note how many units finish and whether the queue in front of the step is growing. The bottleneck is the growing queue, which is also the step with the lowest throughput when demand is steady.",
    },
    {
      question: "Is the busiest person the bottleneck?",
      answer:
        "Often no. People get busy on rework, on feeding a step that is already behind, or on tasks that are not on the critical path. Locate the pile of waiting work. The person in front of a stable queue is not the constraint, even if they look tired.",
    },
    {
      question: "Should you hire as soon as you find the bottleneck?",
      answer:
        "Hiring is the last move. First get more finished work from the step you have, and slow the other steps so they stop overfeeding it. Add people or machines only if the queue still grows in ordinary weeks after that.",
    },
  ],
  related: ["why-is-my-business-not-growing", "how-to-scale-operations", "how-to-prioritize"],
};

export default guide;
