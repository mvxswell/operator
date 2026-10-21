import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-write-a-hiring-scorecard",
  skill: "people",
  title: "How to Write a Hiring Scorecard",
  description: "Write a hiring scorecard around outcomes, evidence, and decision rights. Compare candidates consistently and separate essential capability from preferences.",
  answer: "Write the hiring scorecard before interviewing. Define the outcomes the person must own, the capabilities needed to deliver them, and the evidence that would demonstrate those capabilities. Score each candidate against the same standard before discussing who feels like the best fit.",
  scenario: {
    industry: "Illustrative operations hiring process",
    scenario: "Suppose an owner needs a manager who can resolve scheduling conflicts. Candidate A speaks confidently about leadership but gives no concrete operating example. Candidate B uses a fictional backlog exercise to identify missing capacity, propose a release rule, and explain the tradeoff to sales.",
    prompt: "Which evidence belongs most directly on the scorecard?",
    choices: [
      {
        id: "a",
        text: "How similar the candidate's hobbies are to the owner's"
      },
      {
        id: "b",
        text: "Whether the candidate used fashionable management terms"
      },
      {
        id: "c",
        text: "The demonstrated scheduling decision process against agreed criteria"
      },
      {
        id: "d",
        text: "The length of the candidate's presentation"
      }
    ],
    correctChoiceId: "c",
    explanation: "The role needs scheduling judgment. A comparable work sample provides evidence for that requirement; confidence and personal similarity do not establish the same capability."
  },
  faqs: [
    {
      question: "Should you use the same scorecard for every role?",
      answer: "Use a consistent structure, but write outcomes and evidence for the actual job. An operations manager, salesperson, and specialist need different capabilities. A generic list of personality traits can make the process look consistent while failing to test what each person will actually own."
    },
    {
      question: "Can you change a scorecard during a search?",
      answer: "Yes, when evidence shows that the role was misdefined. Make the change explicit, document why it matters, and reassess candidates against the same revised standard. Do not quietly add a preference after meeting someone and treat it as an original requirement."
    },
    {
      question: "How should interviewers handle missing evidence?",
      answer: "Mark it as unobserved and choose a focused follow-up if the requirement matters. Do not turn a lack of evidence into either a favorable assumption or an automatic accusation. A short additional exercise or reference question can resolve a material uncertainty before the decision."
    }
  ],
  related: [
    "when-to-hire-your-first-operations-manager",
    "how-to-onboard-a-new-manager",
    "when-to-hire-your-first-employee"
  ],
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  blocks: [
    {
      type: "h2",
      text: "Begin with the operating problem behind the vacancy"
    },
    {
      type: "p",
      text: "A job title is a poor starting point because the same title can describe very different work. Write what is failing or missing today and what should change after a successful hire. A service manager might need to restore scheduling reliability; a similar role elsewhere might need to build supervisors. If you cannot name the operating problem, decide whether the work needs redesign rather than a replacement person. The scorecard should describe a job the business actually needs done."
    },
    {
      type: "h2",
      text: "Specify a few observable outcomes"
    },
    {
      type: "p",
      text: "Choose outcomes a person could reasonably influence within the role and a sensible ramp period. Describe the baseline, desired change, and boundaries. Avoid promises that depend entirely on market growth or another team's decisions. For example, owning the weekly schedule and escalating capacity gaps before dates are promised is more useful than being proactive. Include how the work will be judged so an applicant can understand the role without having to guess what the founder means."
    },
    {
      type: "h2",
      text: "Separate capabilities from credentials"
    },
    {
      type: "p",
      text: "For each outcome, ask what the person must know or be able to do. Then distinguish an actual requirement from a convenient signal. A particular industry background may matter when judgment depends on that context; a particular employer name usually needs a stronger explanation. Do not use a long wish list to avoid making tradeoffs. Name which capabilities must exist on arrival, which can be learned, and which the team already provides through other roles."
    },
    {
      type: "h2",
      text: "Design evidence for each requirement"
    },
    {
      type: "p",
      text: "Use work-relevant questions, a bounded exercise, and reference checks matched to the role. A candidate for an operations role might diagnose a fictional backlog and explain a first intervention. Give every candidate equivalent information and time. Evaluate reasoning, assumptions, and communication as well as the recommendation. Avoid asking for unpaid productive work your business will use. A short fictional case can reveal the decision process without turning an interview into a free consulting project."
    },
    {
      type: "h2",
      text: "Describe what different scores mean"
    },
    {
      type: "p",
      text: "A numerical scale is only helpful when reviewers share its meaning. Write a plain-language anchor for insufficient evidence, adequate evidence, and strong evidence on each capability. Include a place for uncertainty or not observed. A confident score based on no evidence is worse than a clearly identified gap. Record the example that supports the rating. This makes it possible to compare assessments later without treating each interviewer's private interpretation of a number as equivalent."
    },
    {
      type: "h2",
      text: "Choose non-negotiables before meeting candidates"
    },
    {
      type: "p",
      text: "Some requirements are genuine gates: a necessary qualification, the availability the work demands, or the ability to make a core decision. Others are tradeoffs. Decide those distinctions in advance so a charismatic candidate does not move the standard mid-process. If you change the role after learning something, update the scorecard and apply the revised standard consistently. Do not hide a change of requirements inside a vague statement that a candidate lacked fit."
    },
    {
      type: "h2",
      text: "Make reviewers write before they discuss"
    },
    {
      type: "p",
      text: "Ask each interviewer to record evidence and a provisional assessment independently. Then compare disagreements in a debrief. One person may have seen a capability another never tested; that is a reason to investigate, not to average away the difference. Discuss the strongest and weakest evidence against the role's outcomes. Keep the hiring decision separate from whether the candidate was personally enjoyable to meet. Clear notes also help the eventual manager build an onboarding plan around known gaps."
    },
    {
      type: "h2",
      text: "Use the scorecard after the offer"
    },
    {
      type: "p",
      text: "Bring the promised outcomes and observed development needs into onboarding. Revisit whether the interview evidence predicted performance and whether the role was accurately described. A new hire who struggles may reveal a poor assessment, missing support, or a changed job. Do not rewrite the original scorecard retrospectively to make the hiring process look correct. Learning from a miss requires preserving what you expected, what you actually tested, and what changed once the person began doing the work."
    },
    {
      type: "panel",
      items: [
        "Outcome: what result will this role own?",
        "Capability: what must the person be able to do?",
        "Evidence: what observed behavior would demonstrate that ability?"
      ]
    },
    {
      type: "h2",
      text: "Try the decision"
    },
    {
      type: "p",
      text: "Use this fictional example to test the decision framework. All amounts and business details are illustrative; choose the action supported by the information provided."
    },
    {
      type: "scenario"
    }
  ]
};

export default guide;
