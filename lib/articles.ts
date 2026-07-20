export type Article = {
  slug: string; title: string; description: string; keyword: string; published: string;
  intro: string[]; sections: { heading: string; paragraphs: string[]; tips?: string[] }[];
  sources?: { title: string; url: string }[];
};

export const articles: Article[] = [
  {
    slug: "adhd-focus-tips-at-your-desk", title: "15 ADHD Focus Tips That Actually Work at Your Desk", keyword: "ADHD focus tips", published: "2026-07-20",
    description: "Fifteen practical ADHD focus tips for reducing friction, starting work, managing distractions, and resetting attention at your desk.",
    intro: ["ADHD focus tips are most useful when they change the environment around a task—not when they ask you to summon more willpower. The ideas below are small, visible, and easy to test at a desk.", "Choose two tips for one week. A smaller experiment gives you a better chance of noticing what helps than changing your entire routine at once."],
    sections: [
      { heading: "Reduce the friction before you begin", paragraphs: ["Make the first action unmistakably small. Open the document, write a rough heading, or place the source material beside the keyboard. Starting is a separate problem from finishing.", "Prepare tomorrow’s first task before ending today. A visible launch point reduces the decisions waiting for you in the morning."], tips: ["Write the next physical action on a sticky note", "Keep only the needed tab open", "Set materials out before a break"] },
      { heading: "Make distractions harder to reach", paragraphs: ["Move your phone beyond arm’s reach and turn off nonessential desktop alerts. Even ignoring a notification consumes attention.", "Use a separate browser profile for focused work. Keep entertainment logins and optional extensions out of that profile."], tips: ["Put the phone in a drawer", "Use full-screen mode", "Schedule two message-check windows"] },
      { heading: "Use time as a gentle boundary", paragraphs: ["Try a short commitment such as ten focused minutes instead of demanding an uninterrupted hour. Continue if momentum appears; stop and reset if it does not.", "A visible timer can externalize time, but treat it as a cue rather than a test you can fail."], tips: ["Start with 10 minutes", "Take a movement break", "Write the restart point before stopping"] },
      { heading: "Add stimulation without adding chaos", paragraphs: ["Some adults focus better with controlled stimulation: instrumental audio, a standing position, or a quiet fidget. Test one variable at a time.", "If stimulation starts competing with the task, simplify it. Lyrics, video, and frequent track changes can become new decisions."], tips: ["Try brown noise or instrumental music", "Alternate sitting and standing", "Keep water within reach"] },
      { heading: "Recover quickly when attention wanders", paragraphs: ["Losing focus is expected. Keep a capture note for unrelated thoughts, then return to the smallest visible action.", "End each block by marking progress and naming the next step. That creates a bridge back after lunch, a meeting, or an interruption."], tips: ["Use a distraction parking lot", "Take one slow breath", "Restart with a 60-second action"] }
    ]
  },
  {
    slug: "how-to-focus-with-adhd-10-minute-routine", title: "How to Focus With ADHD: 7 Evidence-Informed Tips", keyword: "how to focus with ADHD", published: "2026-07-20",
    description: "A practical 10-minute routine for adults learning how to focus with ADHD, with setup, attention practice, task selection, and review.",
    intro: ["Learning how to focus with ADHD is less about forcing concentration and more about designing a reliable path into a task. This ten-minute routine creates that path.", "Use it as a workday warm-up. It is a productivity routine, not medical treatment, and you can adapt every step to your circumstances."],
    sections: [
      { heading: "Minutes 0–2: clear the runway", paragraphs: ["Silence avoidable alerts, place your phone away, and close tabs unrelated to the next task. Do not reorganize the whole room.", "Write one outcome for the coming work block. Make it observable: draft three headings is clearer than work on report."] },
      { heading: "Minutes 2–4: wake up attention", paragraphs: ["Do a brief attention exercise or the free FocusCoach check. The goal is not a perfect score; it is a transition from reactive browsing into deliberate action.", "If a game feels overstimulating, replace it with slow breathing, stretching, or reading one paragraph on paper."] },
      { heading: "Minutes 4–6: shrink the task", paragraphs: ["Break the outcome into a first action that takes under two minutes. Open the file, find the relevant email, or write an intentionally rough sentence.", "Put later ideas in a parking-lot note so they do not compete for working memory."] },
      { heading: "Minutes 6–9: begin before motivation arrives", paragraphs: ["Work on the small first action for three minutes. Beginning provides information: you may discover the task is easier, or identify the exact blocker.", "When blocked, write the question you need answered. A named blocker is easier to route than a vague feeling of resistance."] },
      { heading: "Minute 10: create the next cue", paragraphs: ["Choose a realistic focus block and start a timer if it helps. Before any break, leave a one-line restart instruction.", "Review the routine weekly. Keep steps that reduce friction and remove steps that became ceremony."] }
    ]
  },
  {
    slug: "best-focus-apps-for-adhd-adults", title: "5 Best ADHD Focus Apps in 2026 (Plus 2 Useful Alternatives)", keyword: "best ADHD focus apps", published: "2026-07-20",
    description: "Compare seven useful focus apps for ADHD adults by use case, friction, feedback, flexibility, and privacy.",
    intro: ["The best focus app for ADHD is the one that solves your specific bottleneck with the least friction. A timer, blocker, task manager, and attention trainer solve different problems.", "This comparison uses product categories and well-known tools as examples. Features and pricing can change, so verify details on each product’s official site."],
    sections: [
      { heading: "1. FocusCoach: short attention practice", paragraphs: ["FocusCoach combines a free attention check, short exercises, adaptive difficulty, and weekly pattern summaries. It fits adults who want to practice attention as well as structure a workday.", "Choose it when progress feedback motivates you. It is a productivity and training tool, not an ADHD diagnostic or treatment product."] },
      { heading: "2. Forest: visible phone boundaries", paragraphs: ["Forest turns staying away from the phone into a visual commitment. The simple metaphor can make a focus interval feel concrete.", "It is best for phone distraction, but it does not break projects into actions or train attention skills."] },
      { heading: "3. Freedom: cross-device blocking", paragraphs: ["Freedom is designed to block distracting sites and apps across devices. It can help when automatic checking defeats softer reminders.", "Blocking works best with a prepared task; otherwise removing distraction may simply expose uncertainty about what to do next."] },
      { heading: "4. Todoist: externalize tasks", paragraphs: ["Todoist offers quick capture, recurring tasks, and flexible project views. It can reduce the burden of holding commitments in working memory.", "Keep the system shallow. Too many labels and filters can turn task management into another avoidance activity."] },
      { heading: "5. Structured: see the day", paragraphs: ["A visual timeline helps translate abstract plans into a sequence. Structured is useful for people who need to see when a task belongs.", "Leave buffer space. Packing every minute creates a schedule that collapses after one interruption."] },
      { heading: "6. Focusmate: body doubling", paragraphs: ["Focusmate provides scheduled virtual coworking sessions. The presence of another person can create a clear start and social commitment.", "It is less useful when your schedule changes frequently or camera-based sessions feel distracting."] },
      { heading: "7. Brain Focus: simple intervals", paragraphs: ["A straightforward interval timer can be enough when the main need is a visible boundary. Simplicity is often an advantage.", "Start with shorter intervals than a standard 25-minute Pomodoro if that makes beginning easier."] },
      { heading: "How to choose your ADHD focus app", paragraphs: ["Name the bottleneck first: starting, blocking, planning, accountability, or attention practice. Pick one primary app for that job.", "Test it for seven working days using one observable measure, such as sessions started or priority tasks completed. Keep the tool only if it makes work easier to begin or resume."] }
    ]
  },
  {
    slug: "attention-exercises-for-adults-with-adhd", title: "Focus Exercises for Adults With ADHD: 5 Short Practices", keyword: "focus exercises for ADHD", published: "2026-07-20",
    description: "Five short ADHD attention exercises for adults, including visual matching, working memory, inhibition, task switching, and mindful noticing.",
    intro: ["ADHD attention exercises can provide a structured warm-up before focused work. They should be brief, repeatable, and connected to a practical next task.", "These exercises are for productivity and skills practice. They do not diagnose ADHD or replace evidence-based professional care."],
    sections: [
      { heading: "1. Timed visual matching", paragraphs: ["Choose a target shape or symbol and identify matches from a small set. Work accurately before pushing speed.", "After one minute, transition directly into your planned task so the exercise functions as a cue."] },
      { heading: "2. Working-memory ladder", paragraphs: ["Read a short sequence of digits, hide it, and repeat it. Increase length only after consistent accuracy.", "Stop after a few rounds. The point is a focused warm-up, not exhausting working memory before real work."] },
      { heading: "3. Stroop inhibition practice", paragraphs: ["Name the ink color while ignoring the printed color word. This creates a small conflict between an automatic response and the requested response.", "Slow down after errors. Accuracy gives you a better practice signal than frantic speed."] },
      { heading: "4. Rule-switch drill", paragraphs: ["Sort items by color for one round and by shape for the next. Say the current rule aloud before beginning.", "This mirrors the need to reorient after switching tasks, although a game score cannot predict real-world functioning."] },
      { heading: "5. Five-sense reset", paragraphs: ["Name one thing you can see, hear, feel, smell, and taste. This can interrupt an unplanned attention loop and reconnect you with the present environment.", "Then write the next physical action and begin it immediately. The reset is a bridge, not another delay."] }
    ]
  },
  {
    slug: "why-regular-timers-fail-adhd-brains", title: "ADHD Productivity: Why Timers Alone Don’t Work", keyword: "ADHD productivity tips", published: "2026-07-20",
    description: "Why a regular focus timer for ADHD may not be enough, and how to add task clarity, visible time, flexible intervals, and restart cues.",
    intro: ["A focus timer for ADHD can help externalize time, but a countdown cannot decide what to do, reduce emotional friction, or make a vague project concrete.", "When timers fail, the problem is often the workflow around them—not a lack of effort."],
    sections: [
      { heading: "The timer starts before the task is ready", paragraphs: ["If the task says finish presentation, the first several minutes may disappear into deciding where to begin. Define a visible action before pressing start.", "Gather the needed file, source, and destination first. Preparation should be short and specific."] },
      { heading: "The interval is too ambitious", paragraphs: ["Twenty-five minutes is a convention, not a rule. A five- or ten-minute start may create less resistance.", "Extend an interval when momentum is useful, unless a hard stop protects another commitment."] },
      { heading: "The break becomes an exit", paragraphs: ["High-stimulation breaks can make returning harder. Prefer water, movement, or looking outside over opening an infinite feed.", "Before the break, leave the cursor and a short restart note exactly where work should resume."] },
      { heading: "The timer becomes a judgment", paragraphs: ["An interrupted block is information, not failure. Record the interruption, adjust the environment, and begin a smaller block.", "Track starts and returns rather than perfect streaks. Recovery is part of focused work."] },
      { heading: "Build a complete focus loop", paragraphs: ["A useful loop includes task selection, setup, a realistic interval, a low-friction break, and a restart cue.", "Attention exercises can serve as a transition, while blockers or body doubling may address different bottlenecks."] }
    ]
  },
  {
    slug: "adhd-productivity-hacks-remote-workers", title: "ADHD Productivity Hacks for Remote Workers", keyword: "ADHD productivity hacks", published: "2026-07-20",
    description: "Practical ADHD productivity hacks for remote workers: external cues, communication windows, body doubling, workspace zones, and shutdown routines.",
    intro: ["The most reliable ADHD productivity hacks change cues, visibility, and friction. Remote work offers flexibility, but it also removes many external transitions that once structured the day.", "Build a few deliberate boundaries instead of trying to reproduce an office perfectly."],
    sections: [
      { heading: "Create a visible start", paragraphs: ["Use a consistent opening sequence: water, one attention warm-up, and the day’s first physical action. Keep it under ten minutes.", "A calendar event or coworking appointment can supply an external start when internal intention feels weak."] },
      { heading: "Separate communication from creation", paragraphs: ["Choose specific windows for email and chat. Keep status visible so teammates know when to expect a reply.", "For urgent channels, define what urgent means. Otherwise every notification competes with planned work."] },
      { heading: "Give spaces one clear job", paragraphs: ["Even in a small room, a particular chair, lamp, or browser profile can signal focused work. Physical and digital context both matter.", "Leave the workspace during breaks when possible so returning becomes a meaningful transition."] },
      { heading: "Use body doubling deliberately", paragraphs: ["A quiet coworking partner can make beginning and returning more concrete. State the intended outcome at the start and report what happened at the end.", "The session should support the task rather than become a social meeting."] },
      { heading: "Close the day before it drifts", paragraphs: ["Use a short shutdown checklist: capture loose tasks, choose tomorrow’s first action, and close work apps.", "A defined end protects recovery and reduces the mental residue of unfinished work."] }
    ]
  },
  {
    slug: "adhd-deep-work-flow", title: "ADHD and Deep Work: How to Get Into Flow With a Distracted Brain", keyword: "ADHD deep work", published: "2026-07-20",
    description: "A practical ADHD deep work system built around clear outcomes, short entry ramps, controlled stimulation, and reliable recovery from distraction.",
    intro: ["ADHD deep work does not require a perfectly quiet mind. It requires a task clear enough to enter, an environment that protects it, and a way to recover when attention moves.", "Flow cannot be commanded, but the conditions around focused work can be designed."],
    sections: [
      { heading: "Choose a concrete finish line", paragraphs: ["Define what will exist at the end of the block: a draft, a decision, a tested function, or three analyzed sources.", "A concrete output reduces the ambiguity that often drives avoidance."] },
      { heading: "Build a short entry ramp", paragraphs: ["Use five to ten minutes for setup and a small focus exercise. Then perform the easiest meaningful action in the project.", "Do not wait for deep concentration before beginning. Concentration often follows contact with the task."] },
      { heading: "Protect one channel", paragraphs: ["Close unrelated windows and place communication tools on another desktop or device. Keep a capture note for thoughts that should be handled later.", "Controlled background sound can help some people, but choose audio that does not demand semantic attention."] },
      { heading: "Match the block to your energy", paragraphs: ["Schedule demanding work in a period when alertness is usually stronger. Use lower-energy periods for administrative tasks.", "Observe patterns without turning them into rigid rules; sleep, food, stress, and workload change day to day."] },
      { heading: "Practice returning", paragraphs: ["When distracted, note what happened and return to the next visible action. Avoid spending additional minutes criticizing the interruption.", "A strong deep-work system measures meaningful outputs and successful returns, not uninterrupted perfection."] }
    ]
  },
  {
    slug: "working-from-home-with-adhd", title: "Working From Home With ADHD: 9 Environment Tweaks", keyword: "ADHD work from home", published: "2026-07-20",
    description: "Nine low-cost environment tweaks for working from home with ADHD, covering visual clutter, sound, phones, lighting, movement, and transitions.",
    intro: ["An ADHD work-from-home setup should make the intended action visible and the easiest distraction slightly less convenient. Small environmental changes can reduce the number of decisions required.", "Test changes individually so you can tell which ones actually help."],
    sections: [
      { heading: "Tweak 1–3: simplify the visual field", paragraphs: ["Keep the current project visible and move unrelated materials into one temporary bin. Face the desk toward a calmer view if movement repeatedly captures attention.", "Use one written priority in your direct line of sight. A long list can become visual noise."], tips: ["One-project desktop", "Single capture tray", "Visible next action"] },
      { heading: "Tweak 4–5: control sound", paragraphs: ["Try headphones, steady background noise, or a quieter location. The right choice depends on whether silence feels calming or under-stimulating.", "Tell household members what a closed door or headphones mean, while providing a clear way to signal genuine urgency."] },
      { heading: "Tweak 6–7: create physical transitions", paragraphs: ["Use a lamp, overshirt, or short walk as a start cue. Take breaks away from the workstation so returning has a clear boundary.", "A standing surface can provide movement without requiring you to leave the task completely."] },
      { heading: "Tweak 8: park the phone", paragraphs: ["Charge the phone outside immediate reach. If it must remain available, use a focus mode that allows calls from selected people.", "Physical distance works because it inserts a decision between impulse and action."] },
      { heading: "Tweak 9: prepare the restart", paragraphs: ["Before lunch or a meeting, leave a short instruction for your future self. Keep the relevant file open and mark the exact sentence or step.", "A restart cue prevents every return from becoming a fresh planning session."] }
    ]
  },
  {
    slug: "body-doubling-for-adhd", title: "Body Doubling for ADHD: What It Is and How to Do It Alone", keyword: "body doubling ADHD", published: "2026-07-20",
    description: "Learn how body doubling for ADHD works, how to structure a session, and how to recreate accountability when no partner is available.",
    intro: ["Body doubling for ADHD means working in the presence of another person, in person or remotely. Their presence can provide a start cue, time boundary, and gentle accountability.", "It is a practical strategy, not a treatment, and it does not work equally well for everyone."],
    sections: [
      { heading: "Why presence can help", paragraphs: ["A scheduled session turns a private intention into an external commitment. Seeing another person work can also make returning to the task more salient.", "The partner does not need to supervise or perform the same task."] },
      { heading: "Structure a useful session", paragraphs: ["Begin by stating one concrete outcome. Agree on a block length and whether microphones stay muted.", "At the end, report what changed and name the next action. Keep check-ins brief so they do not replace work."] },
      { heading: "Choose the right partner", paragraphs: ["Pick someone who respects quiet boundaries and does not turn the session into conversation. A friend, coworker, study partner, or formal coworking service can work.", "Discuss camera preferences and privacy before sharing screens or work details."] },
      { heading: "Body double when you are alone", paragraphs: ["Use a prerecorded study-with-me video, an ambient coworking stream, or a scheduled message to a friend. A public workspace may also provide passive presence.", "Create a start-and-finish ritual so the session still has external structure."] },
      { heading: "When it becomes distracting", paragraphs: ["Reduce social interaction, turn off self-view, or switch to audio-only. If monitoring the partner consumes attention, a timer and written check-in may work better.", "The goal is lower friction, not adherence to a particular method."] }
    ]
  },
  {
    slug: "60-second-attention-span-test-score", title: "The 60-Second Attention Span Test: What Your Score Means", keyword: "attention span test", published: "2026-07-20",
    description: "Understand what a 60-second attention span test can and cannot show, how accuracy and speed interact, and how to track practice responsibly.",
    intro: ["A 60-second attention span test offers a quick snapshot of performance on one narrow task. It can be useful as a warm-up or personal trend, but it cannot measure your entire attention span.", "FocusCoach results are not diagnostic and should not be used to confirm or rule out ADHD or any health condition."],
    sections: [
      { heading: "What the test measures", paragraphs: ["The FocusCoach check asks you to match simple targets across several rounds. It records accuracy and elapsed time for that brief interaction.", "Those signals reflect the task, device, environment, and moment—not a fixed trait."] },
      { heading: "Read accuracy before speed", paragraphs: ["Fast answers with frequent errors may indicate that the pace was not useful. Slower accurate answers can provide a better baseline.", "There is no universal good score because the preview is not standardized against a clinical population."] },
      { heading: "Why scores change", paragraphs: ["Sleep, interruptions, familiarity, stress, screen size, and input method can affect a result. Repeating the same task also creates a practice effect.", "Compare only under reasonably similar conditions and avoid overinterpreting small changes."] },
      { heading: "Use the result as a transition", paragraphs: ["After the test, choose one work action and begin it. This makes the exercise a behavioral cue rather than a number to chase.", "If the test increases frustration, skip it and use a calmer warm-up."] },
      { heading: "When to seek professional guidance", paragraphs: ["If attention difficulties significantly affect work, relationships, safety, or daily life, consider speaking with a qualified healthcare professional.", "Only an appropriate clinician can assess symptoms in context and discuss diagnosis or treatment."] }
    ]
  },
  {
    slug: "adhd-task-initiation", title: "ADHD Task Initiation: 8 Ways to Make Starting Easier", keyword: "ADHD task initiation", published: "2026-07-20",
    description: "Eight practical ways to reduce task-initiation friction using smaller actions, launch cues, body doubling, and clearer definitions of done.",
    intro: ["ADHD task initiation can feel difficult even when a task matters and you know exactly why it should be done. Making the launch smaller and more external often helps more than repeating the deadline.", "These ideas are productivity strategies, not medical advice."],
    sections: [
      { heading: "Define done and define begun", paragraphs: ["Write the intended output, then write the first physical action. Draft budget becomes open last month’s spreadsheet and duplicate the template.", "A clear beginning reduces the need to mentally simulate the entire project."] },
      { heading: "Use a two-minute launch", paragraphs: ["Commit only to setup and two minutes of meaningful work. You may continue, but continuing is not required for the launch to count.", "This separates starting practice from endurance."] },
      { heading: "Borrow an external cue", paragraphs: ["Schedule a coworking session, send a start message, or attach the task to an existing event. External cues make time less abstract.", "Choose accountability that feels supportive rather than punitive."] },
      { heading: "Lower emotional stakes", paragraphs: ["Create an intentionally rough first version. Label it notes, sketch, or experiment so quality decisions come later.", "When perfectionism appears, set a quantity target such as three options rather than one ideal answer."] },
      { heading: "Prepare the next launch", paragraphs: ["Stop at a point that leaves a clear next step and write it down. Keep needed materials accessible.", "Reliable restarts turn a large project into a chain of smaller initiations."] }
    ]
  },
  {
    slug: "adhd-focus-at-work", title: "How to Focus at Work With ADHD: A Practical System", keyword: "focus at work with ADHD", published: "2026-07-20",
    description: "A practical system to focus at work with ADHD using priority filters, communication boundaries, meeting recovery, and end-of-day cues.",
    intro: ["To focus at work with ADHD, it helps to externalize priorities and protect the transitions between email, meetings, and project work. The goal is not to eliminate every distraction.", "Build a system that makes the important task easier to find again."],
    sections: [
      { heading: "Select one daily anchor", paragraphs: ["Choose one outcome that would make the day meaningfully successful. Keep other obligations visible, but do not give them equal visual weight.", "Confirm the anchor with your manager when priorities are genuinely unclear."] },
      { heading: "Batch shallow work", paragraphs: ["Handle email and routine administration in defined windows. Turn off previews outside those windows when your role permits.", "Use templates and checklists for repeated processes to reduce working-memory load."] },
      { heading: "Recover after meetings", paragraphs: ["Reserve five minutes after meetings to capture decisions and write the next action. Back-to-back calls can otherwise leave unresolved context behind.", "If no buffer exists, take one minute before switching applications."] },
      { heading: "Make progress visible", paragraphs: ["Break projects into deliverables small enough to mark complete. A visible sequence offers more feedback than one distant deadline.", "Share intermediate work when appropriate so corrections arrive before the final stage."] },
      { heading: "End with tomorrow’s start", paragraphs: ["Write tomorrow’s first action, clear unrelated windows, and capture unfinished concerns. This reduces morning setup friction.", "Protect recovery outside work; sustained attention is affected by the conditions around it."] }
    ]
  },
  {
    slug: "n-back-training-research", title: "N-Back Training: What the Research Actually Says", keyword: "n-back training benefits", published: "2026-07-20",
    description: "A careful review of n-back training benefits, near transfer, far transfer, limitations, and realistic ways to use an n-back exercise.",
    intro: ["Claims about n-back training benefits range from modest to spectacular. The research supports a more careful conclusion: practice reliably improves the trained task, can transfer to similar n-back tasks, and has much less certain effects on broad abilities or everyday performance.", "That distinction matters. FocusCoach includes n-back as one short working-memory exercise, not as a treatment for ADHD or a guaranteed way to raise intelligence."],
    sections: [
      { heading: "What an n-back task asks you to do", paragraphs: ["Items appear one at a time. You respond when the current item matches the one presented a specified number of steps earlier. As n increases, you must continually update what is relevant while discarding older information.", "Because the task combines maintenance, updating, and response decisions, it is commonly used in working-memory research. Becoming better at it demonstrates learning on that task; it does not by itself prove a broad change in cognition."] },
      { heading: "Near transfer is the clearest finding", paragraphs: ["A 2017 meta-analysis covering 33 randomized controlled trials found a medium transfer effect to untrained n-back tasks. This is called near transfer because the outcome resembles the trained activity.", "The same analysis found effects on other working-memory tasks, fluid intelligence, and cognitive control were very small. A large portion of improvement therefore appears task-specific."] },
      { heading: "Why far-transfer claims remain disputed", paragraphs: ["Some meta-analyses report small improvements on laboratory measures of fluid intelligence. Other analyses show that results weaken when studies use active control groups, which better account for expectation and engagement.", "A 2022 analysis proposed that improvement on untrained n-back tasks may mediate some broader transfer, but findings across its trials were mixed. This remains an active research question rather than a settled product promise."] },
      { heading: "How to use n-back responsibly", paragraphs: ["Treat n-back as a compact challenge and transition into work. Begin at a level where you can understand the rule, value accuracy over frantic responses, and stop before fatigue turns practice into guessing.", "Track your n-back score as a task-specific trend. Do not use it to estimate IQ, diagnose ADHD, or judge whether medication or therapy is working."] },
      { heading: "What FocusCoach claims—and does not claim", paragraphs: ["FocusCoach can show performance within its own exercises and help you establish a repeatable routine. It cannot establish that practice has changed your general intelligence, clinical symptoms, or real-world job performance.", "If you enjoy the exercise and it helps mark the beginning of a work block, that is a practical reason to use it without overstating the science."] }
    ],
    sources: [
      { title: "Soveri et al. (2017), multi-level meta-analysis of n-back training", url: "https://pubmed.ncbi.nlm.nih.gov/28116702/" },
      { title: "Dougherty et al. (2016), Bayesian reevaluation of transfer", url: "https://pubmed.ncbi.nlm.nih.gov/26082280/" },
      { title: "Pahor et al. (2022), near transfer and matrix reasoning", url: "https://pubmed.ncbi.nlm.nih.gov/35726054/" }
    ]
  },
  {
    slug: "adhd-working-memory", title: "ADHD and Working Memory: What You Need to Know", keyword: "ADHD working memory", published: "2026-07-20",
    description: "Understand ADHD and working memory, why everyday tasks can overload it, and how external supports reduce the need to hold everything in mind.",
    intro: ["ADHD and working memory are often discussed together because working memory helps keep information available while you use it. It supports following multi-step directions, returning after an interruption, and remembering the purpose of a task while details compete for attention.", "Not every adult with ADHD has the same profile. A group-level research finding cannot determine an individual’s ability, and a browser game cannot assess or diagnose a working-memory impairment."],
    sections: [
      { heading: "Working memory is a temporary workspace", paragraphs: ["Working memory is not the same as long-term memory. It is the limited mental workspace used to hold and manipulate information for a short period—for example, remembering a number while entering it or tracking the point of a paragraph.", "Capacity depends on the task and context. Stress, fatigue, interruptions, and unclear instructions can make the same activity feel more demanding."] },
      { heading: "What adult ADHD research finds", paragraphs: ["A meta-analytic review of 38 studies found moderate group-level differences in phonological and visuospatial working memory between adults with ADHD and control groups. Results varied with task methods and demands.", "This supports working memory as one relevant domain in adult ADHD, but it does not mean every person has the same difficulty or that working memory alone explains ADHD."] },
      { heading: "How overload appears at work", paragraphs: ["You may lose a step after a message arrives, forget why a tab was opened, or struggle to hold several verbal instructions while beginning the first. These experiences can also have many non-ADHD causes.", "The practical response is often to reduce what must remain internal: write the next action, keep source and destination visible, and capture interruptions without following them immediately."] },
      { heading: "External supports beat heroic memorizing", paragraphs: ["Checklists, calendar cues, templates, and visible restart notes move information into the environment. Breaking an assignment into deliverables also gives each work block a smaller mental footprint.", "During meetings, capture decisions and owners in a consistent location. Before switching tasks, write one sentence describing where to resume."] },
      { heading: "Training evidence needs careful interpretation", paragraphs: ["Computerized working-memory practice can improve performance on trained or similar tasks. Evidence that it produces broad, clinically meaningful changes is mixed, and ADHD studies include many more children than adults.", "Use FocusCoach as productivity practice and a routine cue. For assessment or treatment questions, consult a qualified clinician who can consider your full history and daily functioning."] }
    ],
    sources: [
      { title: "Alderson et al. (2013), adult ADHD working-memory meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/23688211/" },
      { title: "Computerized cognitive training in ADHD: randomized-trial meta-analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10208955/" }
    ]
  },
  {
    slug: "how-long-brain-training-takes", title: "How Long Does Brain Training Take to Work?", keyword: "brain training results timeline", published: "2026-07-20",
    description: "Why there is no universal brain-training results timeline, what research measures, and how to evaluate a focus routine without inflated promises.",
    intro: ["There is no universal brain-training results timeline. Studies use different exercises, schedules, control groups, and outcomes, while people begin with different goals and circumstances.", "The first question should be what “work” means: a higher score on the practiced game, improvement on a similar laboratory task, a broader cognitive change, or a noticeable difference in daily life. Those are not interchangeable outcomes."],
    sections: [
      { heading: "Task learning can appear first", paragraphs: ["Performance on a repeated game often changes as you learn its rules, timing, and response pattern. That can happen within several sessions, but it primarily shows practice on that activity.", "Early score changes may also reflect device familiarity, chance, sleep, or a quieter environment. A personal trend needs repeated observations under roughly similar conditions."] },
      { heading: "Research programs usually run for weeks", paragraphs: ["Working-memory studies often distribute multiple sessions across several weeks. One meta-analysis found small effects on fluid-intelligence tests after short-term programs, while later analyses questioned how well effects survive stronger controls.", "Duration alone does not guarantee transfer. The comparison group, outcome measure, adherence, and similarity between training and testing all influence results."] },
      { heading: "ADHD symptom claims require a higher bar", paragraphs: ["A large meta-analysis of randomized ADHD trials found no clear effect of computerized cognitive training on blinded measures of total ADHD symptoms, even though some trained cognitive processes may improve.", "That is why FocusCoach does not promise symptom reduction or a two-to-three-week transformation. It is not a treatment program."] },
      { heading: "Use a practical two-week experiment", paragraphs: ["Choose a behavioral goal such as beginning priority work with less setup, not a claim about changing your brain. Use one short routine on eight to ten workdays and record whether you started the intended task afterward.", "Also track friction: did the exercise make starting easier, add another delay, or become frustrating? That information is more actionable than chasing a universal score."] },
      { heading: "Decide what to keep", paragraphs: ["After two weeks, keep the routine if it supports a useful transition or makes progress visible. Change the time, exercise, or cue if adherence was low. Stop if it adds stress without practical value.", "For persistent attention problems that affect daily life, seek professional guidance rather than extending a self-directed training schedule indefinitely."] }
    ],
    sources: [
      { title: "Au et al. (2015), n-back training and fluid intelligence meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/25102926/" },
      { title: "Soveri et al. (2017), task-specific and broader transfer", url: "https://pubmed.ncbi.nlm.nih.gov/28116702/" },
      { title: "Computerized cognitive training in ADHD: blinded-outcome meta-analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10208955/" }
    ]
  }
];

export function getArticle(slug: string) { return articles.find(article => article.slug === slug); }
