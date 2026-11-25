export type GuideSection = { heading: string; paragraphs: string[] };

export const reactionGuide: GuideSection[] = [
  { heading: "What this reaction time test measures", paragraphs: [
    "Suppose the target is a blue circle. A blue square shares its color and a red circle shares its outline. Neither is the answer. Your time includes seeing the target, comparing those features, finding the right button and moving to it. That makes this a choice reaction task. Someone who responds immediately to a single green light still has extra work to do here.",
    "Read the average time beside the accuracy percentage. If you answer 18 of 20 correctly, your accuracy is 90 percent. If you cut a tenth of a second from your average but miss six matches, you changed your approach as well as your speed. A more convincing improvement would be a shorter average with the same number of correct answers across several attempts.",
    "The score gives up to 70 points for accuracy and up to 30 for speed. An average of one second earns 15 speed points. At two seconds or longer the speed contribution reaches zero, but you still earn credit for correct answers. The average includes mistakes. It also includes time spent reading the instructions once the first target is on screen."
  ] },
  { heading: "How to take the test", paragraphs: [
    "First, choose a quiet moment and put the whole playing area in view. If you are reading these instructions after the game has loaded, use that first set to learn the controls. For a timed attempt, start with your pointer or thumb in a comfortable position where you can see every choice.",
    "Second, identify the color and outline of the large target. Third, find the smaller shape that matches both features. Click it with a mouse or tap its button on a phone. If you use a keyboard, move focus between buttons with Tab and activate your choice with Enter or Space. Moving keyboard focus takes time and affects the result.",
    "Fourth, follow the new target immediately after each answer. There is no separate submit step. Fifth, after the twentieth choice, read the result before beginning another set. Note the input method, accuracy and mean time together. A note such as ‘laptop trackpad, 19 correct, 810 milliseconds’ gives you a meaningful reference for your next attempt."
  ] },
  { heading: "What is a normal reaction time?", paragraphs: [
    "Around 200 to 250 milliseconds is a rough reference often used for a simple visual response: one expected signal, one prepared movement. Picture resting your finger on a button and pressing as soon as a light comes on. Here you must identify two features and select among alternatives. Using that simple response figure as a pass mark for this task would compare two different experiments.",
    "The clock also measures part of the trip through your device. The browser needs to draw the target, the display needs to show the frame, and the input device needs to report your choice. The game does not separately measure or subtract those delays. Your displayed average can therefore be higher than a laboratory measurement even before accounting for the extra decision.",
    "Build a reference from your own attempts on the same setup. Suppose you usually finish between 700 and 850 milliseconds with one error. A single result of 690 milliseconds with four errors is weak evidence of a change. Several sessions near 700 milliseconds with one error would tell you more. No single cutoff here assigns a percentile or grades your attention."
  ] },
  { heading: "What affects your reaction time", paragraphs: [
    "Sleep, fatigue, distractions and familiarity with the task can affect how steadily you respond. Caffeine use and time of day can also differ between attempts. Age is another reason that results from different groups are difficult to compare. If an alert interrupts round nine, the clock continues while you look away. Record that interruption before interpreting a slower average.",
    "A mouse click, a trackpad press and a tap across a phone screen involve different movements. A phone may require less travel but your thumb can cover a choice. A higher refresh rate can draw the next frame sooner, while other software may delay rendering. Try changing one condition at a time if you want to explore how much your setup matters."
  ] },
  { heading: "Can you train reaction time?", paragraphs: [
    "You can learn to scan these choices more efficiently. Early on, you may name every color to yourself. Later you may rule out the wrong outlines in a single glance. That is a real improvement at this particular task, and it can happen without any change in the time it takes your finger to press a button.",
    "To test a strategy, play one familiarization set, then use a consistent approach for two scored sets. Compare both accuracy and time. On another day, try the same routine before drawing a conclusion. Evidence that practice transfers broadly across unrelated tasks is limited. A better score here cannot tell you how quickly you would brake in traffic or respond to an opponent in a game."
  ] },
  { heading: "Reaction time and ADHD", paragraphs: [
    "Attention matters because each round asks you to pick out relevant details while ignoring close alternatives. If you lose your place, look back at the large target before choosing. Adults with ADHD who find it difficult to begin a work session may use the twenty decisions as a short starting cue. Choose the next work action before opening the game so the end of the set has a clear purpose.",
    "The score describes choices made on this screen during this attempt. One slow answer might reflect a notification, uncertainty between two shapes, or a hand repositioning on the mouse. The game cannot distinguish those explanations. It has no diagnostic threshold and cannot measure symptoms or establish that a treatment is working."
  ] }
];

export const nBackGuide: GuideSection[] = [
  { heading: "Follow a five-position example", paragraphs: [
    "Imagine a five-turn sequence on the grid: top left, center, top left, bottom right, top left. At two back, you begin with two No match answers because there are no positions two turns earlier yet. The third square matches the first square. The fourth square differs from the second. The fifth square matches the third, even though a different square appeared immediately before it.",
    "Now read exactly the same sequence at one back. None of the five turns is a match, because neighboring positions are always different. At three back the fourth position is compared with the first, and the fifth with the second. Neither comparison matches. A familiar sequence can have completely different answers depending on the number shown above the grid. Check that label before pressing either button."
  ] },
  { heading: "Keep track of the oldest position", paragraphs: [
    "For two back, hold two short location names in order, such as left corner and center. When the next square appears, compare it with the older name first. Make your decision, drop that older name and add the current location at the end. The location you just compared may have been a perfect match, but it still needs to enter the new pair as the newest item.",
    "If words slow you down, picture two marks on a blank grid and mentally move from the older mark to the newer one. A row alone is insufficient because two squares can share a row while sitting in different columns. Try naming a location once as upper middle or lower right. Use the same names on the next attempt so learning new labels does not become an extra task."
  ] },
  { heading: "Distinguish recognition from a match", paragraphs: [
    "A square you remember seeing recently can feel like the right answer even when it appeared at the wrong distance. Consider center, top right, bottom left, center. The final center is familiar. At two back its comparison square is top right, so the answer is No match. At three back it is a genuine match. Ask which earlier turn counts before deciding whether a location feels familiar.",
    "Consecutive repeats are another instructive case. In the sequence left, left, right, the second left is a one-back match. In a two-back session it is still too early for a comparison. If the same square appears three times in a row, the third occurrence matches at both distances. The program asks only about the distance currently displayed, so one button press is sufficient."
  ] },
  { heading: "What the letters on the grid mean", paragraphs: [
    "Each highlighted square contains a letter. The answer here depends on where the square appears. Two different letters in the same position can form a match. The same letter shown in two different places cannot form a position match. To see the distinction, imagine an A in the center followed by a B in the center during one back. Match is correct even though the character changed.",
    "In a dual n-back task a player tracks two streams and may need to report a match in either stream independently. This version asks for one spatial decision per turn. If you try to remember the letters as well, you add work that the score never rewards. Watching the outline of the active cell can help you keep your attention on the information that counts."
  ] },
  { heading: "Read accuracy and difficulty together", paragraphs: [
    "A set consists of thirty decisions. Both a correctly identified match and a correctly rejected non-match count as one correct answer. For example, twenty-four correct decisions out of thirty produce 80 percent accuracy and a score of 80. There is no speed bonus in the N-back score. Taking a moment to reconstruct the comparison can therefore be more helpful than pressing the first button that feels right.",
    "After a completed set, accuracy of at least 80 percent raises the difficulty level by one, up to level ten. Below 60 percent it falls one level, down to level one. Between those thresholds the level stays the same. The level number and the memory distance are different: levels one through three use one back, four through six use two back, and seven through ten use three back. Read the distance on the board for the current sequence."
  ] },
  { heading: "Compare sessions at the same distance", paragraphs: [
    "Write down the distance and number correct together. A result of twenty-six correct at one back answers a different question from twenty-three correct at two back. The second set required you to maintain an additional location through every comparison. If you only record the percentage, an increase in task demands can look like a sudden decline in your ability to concentrate.",
    "The board generates a fresh sequence, so a repeat attempt does not contain exactly the same opportunities for mistakes. You may encounter a cluster of nearby but incorrect repeats in one set and several obvious matches in another. Look at several sessions before treating a small difference as meaningful. One decision changes accuracy by a little over three percentage points in a thirty-turn set."
  ] },
  { heading: "Recover after losing your place", paragraphs: [
    "When a notification or conversation interrupts a session, the next comparison may depend on a location you no longer remember. Guessing your way through every remaining turn is unnecessary. Start recording locations again as soon as you return. After two new observations during two back, you have the information needed for the following decision. A brief interruption need not spoil the rest of the sequence.",
    "If maintaining the sequence feels effortful, slow the next few decisions and check one feature at a time. Find the current cell, recall the comparison cell, decide, then update. The board advances when you answer. You can use that control to understand the rule before trying to respond fluently. When comparing results later, note an interruption alongside the score so you remember what happened."
  ] },
  { heading: "Choose a useful stopping point", paragraphs: [
    "Before you begin, decide whether you want to learn the rule, practice a new distance, or collect one typical result. For learning, a handful of carefully explained examples can be more informative than repeatedly chasing a higher level. For a baseline, finish a full set under ordinary conditions and record it even if the result is lower than you hoped.",
    "For a work break, choose the next activity before starting. You might finish thirty decisions, write the distance and accuracy on a note, and return to the paragraph you were drafting. That gives the exercise a definite ending. An improving score tells you about performance on this spatial updating task. It does not establish a change in intelligence, everyday memory, or the severity of ADHD symptoms."
  ] }
];
