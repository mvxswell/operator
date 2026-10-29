import type { Guide } from "./types";

const guide: Guide = {
  slug: "how-to-get-more-customers",
  skill: "sales",
  title: "How to Get More Customers for a Small Business",
    description:
      "Win customers through the channel they already use. Ask for referrals, contact lapsed buyers, then test one new channel. Keep it if they are worth the cost.",
  answer:
    "Pick a channel that fits how your buyers already search, ask, or get referred. Wake up past customers and ask for referrals before you fund a new channel. Test one channel at a time, and keep it only if the customers are worth more than they cost.",
  blocks: [
    { type: "h2", text: "Fit the channel to the buying habit" },
    {
      type: "p",
      text: "Customers do not arrive \"from marketing.\" They arrive from a specific place: a neighbor's recommendation, a search at the moment something breaks, a walk past the door, a list of past buyers. A channel works when it sits in that habit. A channel fails when it is fashionable and your buyer is not there. A plumber's buyer is often searching because a pipe failed. A studio's buyer is often referred because taste is hard to judge from an ad. Start from the last ten good customers and ask, in their words, how they found you.",
    },
    {
      type: "p",
      text: "If you cannot serve more customers this month, do not buy more of them. A full calendar, a late crew, or a delivery step that already reworks jobs means the next customer makes the business worse. Fix capacity or narrow the offer first. More demand on a broken constraint is a louder complaint line.",
    },
    { type: "h2", text: "Ask the people who already trust you" },
    {
      type: "p",
      text: "Referrals are the default first channel for a service business because the trust is borrowed from someone the buyer knows. Ask after a job went well, not in a newsletter six months later. Make the ask specific: who they know with the same problem you just solved, and whether you may use their name. Give them a sentence they can forward so they do not have to invent your pitch.",
    },
    {
      type: "p",
      text: "Track it. A referral that you cannot count will get forgotten the week you get busy. A simple note of who sent whom, and whether that person bought, tells you if the ask is real or polite. Thank the referrer in a way that fits the relationship. A cash bounty can cheapen a recommendation that was based on trust. A handwritten note or a useful favor often fits better. Use money if your buyers already expect it and it does not attract the wrong jobs.",
    },
    { type: "h2", text: "Reactivate people who already bought" },
    {
      type: "p",
      text: "A lapsed customer has already decided you were acceptable once. List people who should have bought again by now, given how your work repeats. Contact them with a concrete reason: a season, a maintenance interval, a new version of what they bought. Offer a next step with a date. \"Just checking in\" is easy to ignore. \"Your filters are due in March; here are two appointment windows\" is a decision.",
    },
    {
      type: "p",
      text: "Read the replies. If they left because of price, delivery, or a person, you learned something a new ad will not tell you. Fix a repeated reason before you spend to replace the people it drove off. Reactivation is both a channel and a diagnostic.",
    },
    { type: "h2", text: "Run one test channel" },
    {
      type: "p",
      text: "After referrals and reactivation have a rhythm, add one new channel. One. A search campaign, a partnership with a business that serves the same customer earlier in the job, a local event, a single platform where your buyers already pay attention. Write the test before you spend: the audience, the offer, the weekly budget you can lose, and the number of qualified conversations that would make it worth continuing.",
    },
    {
      type: "panel",
      items: [
        "Who the message is for, in one sentence a stranger could use to include or exclude a lead.",
        "The offer and the next step, so a click has somewhere to go besides your homepage.",
        "The spend cap and the end date.",
        "The count you will watch: qualified conversations, then paid jobs, not impressions.",
      ],
    },
    {
      type: "p",
      text: "Judge the test on qualified conversations that match customers you can serve, then on how many of those pay. A cheap lead that never buys is not cheap. A channel that produces ten lookers and one good job may still be the right channel if that job is worth it. Do the worth part on purpose.",
    },
    { type: "h2", text: "Compare what a customer costs with what they are worth" },
    {
      type: "p",
      text: "Cost to acquire is what you spent, including your time if the channel is you on the phone, divided by the new paying customers from that effort. Worth is the gross profit you expect from the relationship, not the first invoice alone, if they actually come back. If you do not know repeat behavior yet, use the first job's gross profit and stay conservative.",
    },
    {
      type: "p",
      text: "A channel that costs more to win a customer than that customer returns will not improve with a bigger budget. It will scale the loss. A channel that returns more than it costs can take a larger budget in a second test, still with a cap, until you see the cost rise. Costs often rise as you leave the easiest slice of the audience.",
    },
    { type: "h2", text: "Keep a scoreboard for each experiment" },
    {
      type: "p",
      text: "Each live channel gets a line: spend, conversations, paying customers, revenue, and gross profit if you can see it. Review it on the same day you review cash. Kill a test that misses its conversation count after the window you set. Keep a test that hits it, and change one variable next time, not the audience, the offer, and the page together. If you change three things, you will not know which one paid.",
    },
    {
      type: "p",
      text: "When sales are already down, diagnose which term moved before you add a channel. The [sales slump guide](/guides/why-are-sales-down/) is that split. Buying traffic into a broken conversion step is how a test looks busy and the bank account does not.",
    },
    { type: "h2", text: "Try the call" },
    { type: "scenario" },
  ],
  scenario: {
    industry: "Residential electrical",
    scenario:
      "You want more customers. The crew can take about five extra jobs a week. Your last ten good jobs came from past customers and neighbors they told. You have a list of 140 households you served more than eighteen months ago and have not called. An agency pitched a broad social campaign across three neighborhoods you do not usually work in.",
    prompt: "What should you do first?",
    choices: [
      { id: "a", text: "Fund the three-neighborhood campaign and see what sticks" },
      { id: "b", text: "Call the 140 past customers with a specific maintenance offer, and ask recent jobs for a referral" },
      { id: "c", text: "Redesign the logo so the new ads look sharper" },
      { id: "d", text: "Discount every new job by 20% to fill the five slots" },
    ],
    correctChoiceId: "b",
    explanation:
      "You have spare capacity and a list of people who already hired you, plus a referral pattern in the last ten jobs. A broad campaign in unfamiliar neighborhoods skips the channel that already fits.",
  },
  faqs: [
    {
      question: "What is the best way for a small business to get customers?",
      answer:
        "Start with the way your last good customers actually arrived. For many services that is a referral or a past buyer. Ask specifically, then test one new channel with a spend cap and a count of qualified conversations. Keep it only if those customers are worth more than they cost.",
    },
    {
      question: "How many marketing channels should you run?",
      answer:
        "One new test at a time, on top of the referral or repeat motion you already understand. Changing audience, offer, and creative together leaves you with activity and no lesson. Kill the test on the date you set if the conversations are not there.",
    },
    {
      question: "What is the difference between a cheap lead and a good customer?",
      answer:
        "A cheap lead is a low cost per name. A good customer is someone you can serve who pays enough, often more than once, to cover that cost and leave gross profit. Divide spend by paying customers, and compare it with the profit you expect from the relationship.",
    },
  ],
  related: ["why-are-sales-down", "where-to-invest-next-dollar", "how-to-price-a-service-business"],
};

export default guide;
