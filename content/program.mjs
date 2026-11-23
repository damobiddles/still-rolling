// All site content lives here. To add a new injury module (e.g. knee or lower back):
//   1. Add an entry to `niggles` below.
//   2. Add a rule for it to `rules` with `niggle: "<id>"`.
//   3. Tag exercises with that id in `for` and add a line under `swaps`.
// Then run `node build.mjs`.

export const site = {
  name: "Mat Ready",
  tagline: "Home strength for grapplers over 50",
  description:
    "A free, low-kit home strength plan for grapplers in their 50s with a dodgy hip or shoulder. Two short sessions a week, built to keep you on the mats.",
  updated: "2026-11-23",
};

export const niggles = [
  {
    id: "hip",
    label: "Hip",
    detail: "Pinching in deep guard, knee to chest, or getting out of the car.",
  },
  {
    id: "shoulder",
    label: "Shoulder",
    detail: "Pain reaching overhead, framing, posting a hand or sleeping on it.",
  },
];

export const comingSoon = ["Knee", "Lower back", "Neck"];

export const kit = [
  "A bit of floor",
  "A sturdy chair",
  "A rucksack you can fill with books or water bottles",
  "A resistance band (about £5 to £10, optional but useful)",
];

export const week = [
  { day: "Mon", main: "Train", extra: "Mat prep before class", time: "10 min + class", kind: "mat" },
  { day: "Tue", main: "Strength A", extra: "10 min walk after", time: "30 min", kind: "strength" },
  { day: "Wed", main: "Train", extra: "Mat prep before class", time: "10 min + class", kind: "mat" },
  { day: "Thu", main: "Strength B (lighter)", extra: "Mobility only if you're beaten up", time: "25 min", kind: "strength" },
  { day: "Fri", main: "Train", extra: "Mat prep before class", time: "10 min + class", kind: "mat" },
  { day: "Sat", main: "Train", extra: "Nothing else", time: "Class", kind: "mat" },
  { day: "Sun", main: "Easy walk", extra: "Weekly check-in", time: "30 to 45 min", kind: "rest" },
];

export const rules = [
  {
    title: "Use the traffic light for pain",
    body: "Score any pain from 0 to 10 while you work and again the next morning.",
    lights: [
      { colour: "green", range: "0 to 3", text: "and settled by next morning. Carry on." },
      { colour: "amber", range: "4 to 5", text: "Make it smaller, shallower or lighter." },
      { colour: "red", range: "6+", text: "or sharp, or any numbness. Stop that exercise and note it." },
    ],
  },
  {
    title: "The mats come first",
    body: "Strength days sit between mat days. Thursday is lighter so you're fresh for Friday. After a brutal Wednesday, Thursday becomes mobility only.",
  },
  {
    title: "Leave some in the tank",
    body: "Finish every set feeling you could do 3 or 4 more reps. Past 50 you get stronger from the work you recover from, not the work you do.",
  },
  {
    niggle: "hip",
    title: "Hip: stay out of the pinch",
    body: "Hip impingement usually hates deep bending with the knee turning in. Squats go to a chair that stays above the painful depth, lunges stay shallow, and the work builds the glutes and side of the hip that hold the joint well.",
  },
  {
    niggle: "shoulder",
    title: "Shoulder: below the line first",
    body: "No overhead pressing for now. The work is rotator cuff and shoulder-blade muscles with bands and holds, plus pushing at an incline you can control.",
  },
];

export const matPrep = {
  intro:
    "Ten minutes before every class. If you coach, run it as the class warm-up and you get four sessions a week for free.",
  moves: [
    { name: "90/90 breathing on your back", dose: "5 breaths" },
    { name: "Cat-cow", dose: "8 reps" },
    { name: "Glute bridge", dose: "10 reps", for: ["hip"] },
    { name: "Side-lying clamshell", dose: "10 each side", for: ["hip"] },
    { name: "Band pull-apart or wall slide", dose: "10 reps", for: ["shoulder"] },
    { name: "Gentle hip circles on all fours", dose: "5 each way", for: ["hip"] },
  ],
};

export const sessions = [
  {
    id: "a",
    name: "Strength A",
    day: "Tuesday",
    minutes: 30,
    focus: "Squat, row, shoulder",
    exercises: [
      {
        name: "Sit-to-stand from a chair",
        dose: "2 × 8",
        why: "Stand-ups, base, getting up from guard",
        easier: "Add a cushion so the chair is higher",
        for: ["hip"],
        swaps: { hip: "Set the chair height so you stop above the pinch. Knees track over toes, not inwards." },
      },
      {
        name: "Glute bridge, two legs",
        dose: "2 × 12",
        why: "Bridging, hip escapes, protects the hip",
        easier: "Smaller range, squeeze and hold 3 seconds",
        for: ["hip"],
      },
      {
        name: "Backpack row, one hand on the chair",
        dose: "2 × 10 each arm",
        why: "Grips, pulling, posture",
        easier: "Band row from a door anchor",
        for: ["shoulder"],
        swaps: { shoulder: "Pull the elbow to your hip, not up to your ear. Stop short of any pinch at the top." },
      },
      {
        name: "Band external rotation, elbow tucked",
        dose: "2 × 15 each arm",
        why: "Rotator cuff, safer framing",
        easier: "Press the back of your hand into a wall for 30 seconds",
        for: ["shoulder"],
      },
      {
        name: "Dead bug",
        dose: "2 × 6 each side",
        why: "Core under pressure, guard retention",
        easier: "Move legs only, arms stay still",
        swaps: { shoulder: "Keep arms at chest height rather than reaching overhead." },
      },
      {
        name: "Side plank on knees",
        dose: "2 × 20 s each side",
        why: "Side-on base, hip stability",
        easier: "Shorten to 10 seconds",
        for: ["hip"],
        swaps: { shoulder: "If the bottom shoulder grumbles, do a side-lying leg lift instead." },
      },
      {
        name: "Backpack or shopping-bag carry",
        dose: "2 × 30 m",
        why: "Grip and posture",
        easier: "Lighter load",
      },
    ],
  },
  {
    id: "b",
    name: "Strength B",
    day: "Thursday",
    minutes: 25,
    focus: "Hinge, push, carry. Lighter, so you're fresh for Friday",
    exercises: [
      {
        name: "Backpack Romanian deadlift",
        dose: "2 × 10",
        why: "Posture in closed guard, lifting partners",
        easier: "No load, hands sliding down your thighs",
        cue: "Hinge from the hips, soft knees, flat back.",
      },
      {
        name: "Split squat, back knee halfway down",
        dose: "2 × 6 each leg",
        why: "Shots, technical stand-ups",
        easier: "Hold a doorframe, go shallower",
        for: ["hip"],
        swaps: { hip: "Stay shallow. Front knee points over your middle toes, never caving in." },
      },
      {
        name: "Incline push-up on the kitchen worktop",
        dose: "2 × 8",
        why: "Framing, posting, pushing off",
        easier: "Higher surface, or a wall push-up",
        for: ["shoulder"],
        swaps: { shoulder: "Hands just outside shoulder width, elbows at about 45 degrees, not flared." },
      },
      {
        name: "Band pull-apart",
        dose: "2 × 15",
        why: "Shoulder blades, posture",
        easier: "Lighter band, or arms lower",
        for: ["shoulder"],
      },
      {
        name: "Side-lying hip abduction",
        dose: "2 × 12 each side",
        why: "Hip control, knee health",
        easier: "Smaller lift",
        for: ["hip"],
      },
      {
        name: "Bird dog",
        dose: "2 × 6 each side",
        why: "Back control, balance on all fours",
        easier: "Arm only or leg only",
        swaps: { shoulder: "Reach the arm forward only to shoulder height, or leave the arm out." },
      },
      {
        name: "Suitcase carry, one bag, one side",
        dose: "2 × 20 m each side",
        why: "Core and grip",
        easier: "Lighter bag",
      },
    ],
  },
];

export const sessionNotes = [
  "Rest 60 to 90 seconds between sets.",
  "Week 1 is 2 sets of everything. Go to 3 sets in week 2 if it all felt green.",
  "Start the rucksack at about 5 to 8 kg.",
  "That evening and the next morning, score your problem joints from 0 to 10.",
];

export const progression = [
  { week: "Week 1", text: "2 sets. Learn the moves, see how your joints react, build the habit." },
  { week: "Week 2", text: "3 sets if week 1 was all green. Anything amber stays at 2 sets." },
  { week: "Week 3", text: "Add a little weight to the rucksack or a few reps, one exercise at a time." },
  { week: "Week 4", text: "Easy week. Back to 2 sets, then build again." },
];

export const food = {
  intro:
    "The biggest win past 50 is enough protein, spread across the day, because muscle gets harder to keep as we age. Everything else is secondary at first.",
  items: [
    { title: "Protein at every meal", text: "About a palm-sized portion, 25 to 40 g each time. A daily target of roughly 1.6 g per kg of body weight works for most." },
    { title: "Cheap protein", text: "Eggs, tinned tuna or sardines, Greek yoghurt or skyr, cottage cheese, lentils and beans, chicken thighs, own-brand whey." },
    { title: "Half the plate veg or fruit", text: "Frozen counts, and it's cheaper." },
    { title: "Fuel the session", text: "Something with carbs and protein 1 to 2 hours before training, and a proper meal within a couple of hours after." },
    { title: "Water", text: "A big glass with each meal and a bottle at class." },
    { title: "Vitamin D", text: "The NHS advises 10 micrograms a day from October to March in the UK. It costs pennies." },
    { title: "Optional: creatine", text: "Creatine monohydrate, 3 to 5 g a day, is cheap and well studied for keeping strength in older adults. Check with your GP if you take other medication." },
  ],
  homework: "This week, jot down what you eat on two normal days. The easy changes usually jump out.",
};

export const social = [
  { title: "Find one training partner", text: "Plenty of over-40s at your club have a dodgy hip or shoulder too. Do a strength session together, before an open mat or on a video call." },
  { title: "Turn mat prep into the warm-up", text: "If you coach, run it with the class. You do it, they learn to look after their bodies early." },
  { title: "Start a small group chat", text: "Everyone posts a thumbs up after a session. A streak with three mates beats any app." },
  { title: "Walk with someone on Sunday", text: "A partner, a friend, a dog or a teammate." },
];

export const head = {
  intro:
    "Body and head are one thing. Training, the mats, the people and any support you get all pull in the same direction. Treat your mood the way you treat a sore joint: notice it, score it, adjust.",
  evidence: [
    {
      text: "Exercise is one of the best-supported things you can do for low mood. A 2023 review of over 1,000 trials found it reduced depression and anxiety symptoms across adults.",
      link: { label: "Singh et al., 2023", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10579187/" },
    },
    {
      text: "Walking, strength training and yoga were among the most effective types in a 2024 BMJ analysis. It works best alongside talking therapy, not instead of it.",
      link: { label: "Noetel et al., 2024", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10870815/" },
    },
    {
      text: "Relationships matter even more. Harvard's 80-year study found the quality of people's relationships predicted health and happiness in later life better than money or status.",
      link: { label: "Waldinger, TED", href: "https://www.ted.com/talks/robert_waldinger_what_makes_a_good_life_lessons_from_the_longest_study_on_happiness" },
    },
    {
      text: "The early-50s dip is real and common. Wellbeing tends to bottom out around this age and then climb. Feeling flat now does not mean it stays that way.",
      link: { label: "The Happiness Curve", href: "https://www.brookings.edu/events/the-happiness-curve-why-life-gets-better-after-50/" },
    },
  ],
  checkin: ["Energy", "Mood", "Connection", "Purpose"],
  checkinText:
    "On your Sunday walk, score four things from 1 to 5 and note one thing that went well. Two minutes, and it gives you something concrete to bring to a GP or therapist if you see one.",
};

export const redFlags = {
  intro:
    "Numbness that comes with hip pain can be the hip, but it can also be a nerve from the lower back, and the exercises are different for each. A GP or physio visit tells you which.",
  urgent:
    "If numbness ever comes with leg weakness, numbness in the groin or saddle area, or bladder or bowel changes, call 111 or go to A&E the same day.",
};

export const resources = [
  { name: "NHS Talking Therapies", href: "https://www.nhs.uk/service-search/mental-health/find-an-nhs-talking-therapies-service", type: "NHS service", why: "Self-refer, no GP needed.", cost: "Free" },
  { name: "Midlife MOT", href: "https://jobhelp.campaign.gov.uk/your-work", type: "Government check", why: "Built for people in their 50s: work, wellbeing and money in one place.", cost: "Free" },
  { name: "National Careers Service: later in life", href: "https://nationalcareers.service.gov.uk/managing-your-career-later-in-life", type: "Careers advice", why: "Real advisers for feeling aged out at work, including changing direction.", cost: "Free" },
  { name: "Andy's Man Club", href: "https://andysmanclub.co.uk/groups/", type: "Peer groups for men", why: "Turn up, talk or just listen. Most groups meet Monday evenings.", cost: "Free" },
  { name: "Men's Sheds", href: "https://menssheds.org.uk/find-a-shed/", type: "Community workshops", why: "Doing things side by side with others.", cost: "Free or small sub" },
  { name: "Every Mind Matters: Your Mind Plan", href: "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/your-mind-plan-quiz/how-the-quiz-works/", type: "NHS quiz", why: "Five questions, a short personal action plan.", cost: "Free" },
  { name: "Reading Well for mental health", href: "https://reading-well.org.uk/news/new-mental-health-booklist", type: "Book list", why: "Chosen by health professionals. Borrow from any library.", cost: "Free" },
  { name: "The Good Life, Waldinger and Schulz", href: "https://penguin.co.uk/books/442619/the-good-life-by-schulz-robert-waldinger-and-marc/9781846046766", type: "Book", why: "What 80 years of research says makes a life go well.", cost: "About £10" },
  { name: "The Happiness Lab", href: "https://drlauriesantos.com/happiness-lab-podcast", type: "Podcast", why: "A Yale psychologist on what the research shows. Good for a walk.", cost: "Free" },
  { name: "Mind: useful contacts", href: "https://www.mind.org.uk/information-support/guides-to-support-and-services/crisis-services/useful-contacts/", type: "Helplines", why: "Samaritans, CALM and others, for bad days.", cost: "Free" },
];
