import Link from "next/link";
import { reactionGuide, nBackGuide } from "@/lib/exercise-guides";
import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameRunner } from "@/components/games/game-runner";
import { PageShell } from "@/components/layout/page-shell";
import { gameConfigByType, gameSlugByType, gameTypeBySlug } from "@/lib/games";

const headingBySlug: Record<string, string> = {
  "quick-match": "Reaction Time Test",
  "n-back": "Take the N-Back Test",
  "stroop-test": "Try the Stroop Test",
  "number-memory": "Working Memory Test with Digit Recall"
};

const sectionBySlug: Record<string, string> = {
  "quick-match": "How reaction speed is measured in this test",
  "n-back": "How the N-back level is scored",
  "number-memory": "How digit span is scored",
  "stroop-test": "How the Stroop score is calculated",
  "task-switch": "When the sorting rule changes"
};

const titleBySlug: Record<string, string> = {
  "number-memory": "Working Memory Test – Free Number Recall Test Online",
  "quick-match": "Reaction Time Test – Free Online Reflex Speed Test",
  "n-back": "N-Back Test – Free Online Working Memory Test",
  "task-switch": "Task Switching Exercise for ADHD – Cognitive Flexibility",
  "stroop-test": "Stroop Test – Free Online Color-Word Test"
};

type GameSeoContent = {
  metaDescription: string;
  keywords: string[];
  intro: string;
  science: string;
  adhdRelation: string;
  howTo: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

const seoContentBySlug: Record<string, GameSeoContent> = {
  "number-memory": {
    metaDescription:
      "Take a free number memory test online. Recall digit sequences that grow each round, see your score instantly, and track working memory practice in about two minutes.",
    keywords: [
      "number memory test",
      "working memory test",
      "digit span test",
      "memory test",
      "brain training"
    ],
    intro:
      "Start this free working memory test immediately without signing up. Correct digits earn credit in their matching positions. For example, recalling four out of five positions earns 80 points. In this digit span test, a digit sequence flashes on screen, then you recall it in order. It works as a number memory test, a memory training game, and a quick daily brain training exercise for adults who want focused practice without a long setup. As the sequence grows, you practice holding information, resisting distraction, and checking accuracy under light time pressure.",
    science:
      "Digit-span tasks are commonly used to study short-term and working-memory performance because they require information to be held briefly and reproduced in order. Practice can improve familiarity and performance on similar recall tasks, but a browser exercise cannot establish a broad change in memory, intelligence, or everyday functioning.",
    adhdRelation:
      "Working-memory demands can feel especially noticeable when an adult with ADHD is interrupted or must keep several instructions active at once. This exercise offers narrow, task-specific practice and a structured workday transition; it does not assess ADHD, treat symptoms, or replace clinical care.",
    howTo: [
      "Watch the full number sequence before answering.",
      "Type the digits back in the same order.",
      "Submit your answer and review the accuracy score.",
      "Repeat the session as adaptive difficulty increases the sequence length."
    ],
    benefits: [
      "Supports working memory training through short recall practice.",
      "Builds attention control by requiring precise input after a brief delay.",
      "Fits into a daily cognitive training routine for work breaks."
    ],
    faqs: [
      {
        question: "Is Number Memory a working memory training game?",
        answer:
          "Yes. Number Memory targets working memory by asking you to hold and reproduce a sequence after a short visual presentation."
      },
      {
        question: "How long does the number memory test take?",
        answer:
          "A typical session takes about three minutes, making it easy to use as a short brain training exercise."
      }
    ]
  },
  "quick-match": {
    "metaDescription": "Take a free reaction time test online: 20 quick rounds, your average reaction time in milliseconds, and a score you can retake any time — no signup needed.",
    "keywords": [
      "reaction time test",
      "reaction time test online",
      "reflex test",
      "reaction speed test",
      "human reaction time"
    ],
    "intro": "This free online reaction time test takes about a minute for 20 self-paced visual choices, with no signup. Match the target, then compare your average in milliseconds with your accuracy.",
    "science": "Each decision combines visual search, comparison and movement.",
    "adhdRelation": "A short set can serve as a cue to begin a work session.",
    "howTo": [
      "Read the target shape and color.",
      "Find the option that matches both features.",
      "Click or tap the matching button.",
      "Complete twenty choices and compare time with accuracy."
    ],
    "benefits": [],
    "faqs": [
      {
        "question": "What is a normal reaction time?",
        "answer": "The often quoted 200–250 milliseconds describes a simple visual response. This game adds a search and a choice, plus display and input delays. Expect a different number here."
      },
      {
        "question": "What counts as a good score?",
        "answer": "Compare with a recent set on the same device. A faster average with equally high accuracy is more informative than a personal best achieved by guessing."
      },
      {
        "question": "Can I take the test on my phone?",
        "answer": "Yes. Tap the smaller shape that matches the target. Keep the screen orientation consistent and compare your phone sessions separately from sessions played with a mouse."
      },
      {
        "question": "Do I need to sign up?",
        "answer": "You can open the page, make all twenty choices and see the session result without an account. The result appears on the page after the last selection."
      },
      {
        "question": "How many attempts should I make?",
        "answer": "Use one set to learn the controls, then take two or three measured sets with short breaks. Record every result so a lucky attempt does not become your only reference."
      },
      {
        "question": "Is this the same as a reflex test?",
        "answer": "People often call this a reflex test. Choosing a matching shape is a voluntary response involving a decision. An involuntary reflex, such as a knee jerk, is a different measurement."
      },
      {
        "question": "Can I train my reaction time?",
        "answer": "Practice can improve your search pattern and familiarity with these controls. Track changes here over several days. Performance in a different game or activity requires its own measurement."
      },
      {
        "question": "Does attention affect the result?",
        "answer": "Yes. Looking away during a round extends its recorded time. Confusing a similar shape can lower accuracy. Read the two numbers together and note distractions when comparing sessions."
      }
    ]
  },
  "n-back": {
    metaDescription:
      "N Back Test online: practice working memory for free. Compare squares across 30 turns, move up as accuracy improves, and get your score instantly — no signup needed.",
    keywords: [
      "n back test",
      "n-back",
      "working memory test",
      "dual n-back",
      "brain training"
    ],
    intro:
      "Open this free N Back Test and start immediately. A set takes 30 self-paced decisions, roughly a minute or two, and your result shows the percentage correct. In this working memory test, you decide whether the current square matches the position shown N steps earlier. This n-back cognitive training game starts simple and becomes more demanding as the level rises. It is designed for adults who want structured brain training for attention control, mental updating, and sustained focus without needing a complex dual n-back setup.",
    science:
      "N-back tasks require continuous updating: each new item changes which earlier item is relevant. Research consistently finds improvement on the trained task and sometimes on closely related tasks, while evidence for broad transfer to intelligence, ADHD symptoms, or everyday performance remains uncertain.",
    adhdRelation:
      "Because working-memory updating is relevant to following a changing stream of information, n-back can be a focused challenge for adults with ADHD. FocusCoach uses a visual single n-back format rather than a clinical test or full dual n-back protocol, and results should remain task-specific.",
    howTo: [
      "Watch each square as it appears on the grid.",
      "Decide whether it matches the position from N turns ago.",
      "Choose Match or No match on every turn.",
      "Use the result to guide your next adaptive training session."
    ],
    benefits: [
      "Supports working memory training by requiring active mental updating.",
      "Improves attention control through repeated match and non-match decisions.",
      "Provides a focused alternative to longer dual n-back routines."
    ],
    faqs: [
      {
        question: "What does N-Back train?",
        answer:
          "N-Back trains working memory, attention control, and the ability to update information while new items appear."
      },
      {
        question: "Is this the same as dual n-back?",
        answer:
          "This game focuses on position-based n-back practice. It is simpler than dual n-back, which usually combines visual and audio streams."
      }
    ]
  },
  "task-switch": {
    metaDescription:
      "Try a free task switching exercise online. Practice cognitive flexibility training, multitasking test skills, and focus control.",
    keywords: [
      "task switching exercise",
      "cognitive flexibility training",
      "multitasking test",
      "focus games for work",
      "cognitive training"
    ],
    intro:
      "Task Switch is a task switching exercise for cognitive flexibility training. The rule changes between judging parity and judging number size, so you must notice the current instruction before answering. This online multitasking test style game helps adults practice mental shifting, focus control, and flexible decision-making in short sessions that fit naturally into a work break.",
    science:
      "Laboratory task-switching paradigms compare responses when a rule repeats with responses after the rule changes. Switch trials often take longer or produce more errors, a pattern called switch cost. A short game can demonstrate this effect but cannot measure every aspect of real-world cognitive flexibility.",
    adhdRelation:
      "Returning to work after email, a meeting, or an interruption can require a clear context shift. Adults with ADHD may use this exercise as a deliberate transition cue. The score is not an ADHD assessment and does not predict workplace performance.",
    howTo: [
      "Read the active rule before responding.",
      "Choose even or odd when the rule is parity.",
      "Choose small or large when the rule is magnitude.",
      "Adjust quickly when the rule changes between rounds."
    ],
    benefits: [
      "Builds cognitive flexibility by changing rules during play.",
      "Practices work-relevant task switching without a long exercise.",
      "Helps reveal accuracy drops that happen during multitasking."
    ],
    faqs: [
      {
        question: "What is a task switching exercise?",
        answer:
          "A task switching exercise asks you to change rules or response patterns, which practices cognitive flexibility and mental shifting."
      },
      {
        question: "Is Task Switch a multitasking test?",
        answer:
          "It is a focused multitasking-style test because it measures how accurately you respond when the active rule changes."
      }
    ]
  },
  "stroop-test": {
    metaDescription:
      "Take a free Stroop test online. Name the ink color, ignore the word, and see your reaction time and accuracy score instantly — no signup needed.",
    keywords: [
      "stroop test",
      "stroop test online",
      "color word test",
      "cognitive inhibition",
      "reaction time test"
    ],
    intro:
      "Accuracy contributes up to 70 points and average response speed contributes up to 30. Play 30 self-paced trials for free without signup, typically in a minute or two. The Stroop test is a classic color-word test: you name the ink color while ignoring the word meaning, and your score reflects both speed and accuracy. This Stroop test online combines reaction time test feedback with cognitive inhibition practice. It is useful for adults who want short brain training for self-control, selective attention, and mental speed during a focused workday routine.",
    science:
      "The Stroop effect occurs because reading a familiar word can compete with naming its ink color. Researchers use the difference between congruent and conflicting trials to study interference and response control. This simplified game offers practice, not a standardized neuropsychological score.",
    adhdRelation:
      "Inhibition and selective attention are often discussed in ADHD research, but one Stroop score cannot confirm a diagnosis or describe an individual’s complete attention profile. Use the exercise as a short warm-up and interpret changes only as performance within this game.",
    howTo: [
      "Look at the word and focus on the ink color.",
      "Ignore the meaning of the written word.",
      "Select the matching color as quickly and accurately as possible.",
      "Use your accuracy and speed score to repeat the session."
    ],
    benefits: [
      "Practices cognitive inhibition by separating color from word meaning.",
      "Supports attention control under distracting information.",
      "Pairs reaction time test feedback with short cognitive training."
    ],
    faqs: [
      {
        question: "What does the Stroop test measure?",
        answer:
          "The Stroop test measures attention control and cognitive inhibition by asking you to ignore word meaning and respond to ink color."
      },
      {
        question: "Can I use this Stroop test for brain training?",
        answer:
          "Yes. This online version is designed for short practice sessions, score tracking, and repeatable brain training."
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.values(gameSlugByType).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const gameType = gameTypeBySlug[params.slug];
  if (!gameType) {
    return {
      title: "Attention Training Game"
    };
  }

  const config = gameConfigByType[gameType];
  const keyword = titleBySlug[params.slug] ?? `${config.name} Attention Training Game`;
  const seoContent = seoContentBySlug[params.slug];

  const description = seoContent?.metaDescription ?? config.description;
  return {
    title: { absolute: keyword },
    description,
    keywords: seoContent?.keywords,
    alternates: {
      canonical: `/exercises/${params.slug}`
    },
    openGraph: shareMetadata(keyword, description, `/exercises/${params.slug}`)
  };
}

export default function GameSeoPage({ params }: { params: { slug: string } }) {
  const gameType = gameTypeBySlug[params.slug];
  if (!gameType) notFound();

  const config = gameConfigByType[gameType];
  const keyword = titleBySlug[params.slug] ?? `${config.name} Attention Training Game`;
  const seoContent = seoContentBySlug[params.slug];
  const guide = params.slug === "quick-match" ? reactionGuide : params.slug === "n-back" ? nBackGuide : [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Game",
        name: keyword,
        description:
          seoContent?.metaDescription ??
          `A short online focus training game for ${config.category.toLowerCase()} practice.`,
        genre: "Attention Training Game",
        applicationCategory: "ProductivityApplication",
        url: `/exercises/${params.slug}`,
        keywords: seoContent?.keywords?.join(", ")
      },
      {
        "@type": "HowTo",
        name: `How to play ${config.name}`,
        description: seoContent?.intro,
        step:
          seoContent?.howTo.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            text: step
          })) ?? []
      },
      {
        "@type": "FAQPage",
        mainEntity:
          seoContent?.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer
            }
          })) ?? []
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Games",
            item: "/games"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: config.name,
            item: `/exercises/${params.slug}`
          }
        ]
      }
    ]
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GameRunner gameType={gameType} seoTitle={headingBySlug[params.slug] ?? keyword} subtitle={params.slug === "quick-match" ? "Free online reflex and reaction speed test — 20 rounds, your average reaction time in milliseconds" : undefined} />
      {seoContent ? (
        <section className="mt-12 space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-normal">
              {sectionBySlug[params.slug]}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">{seoContent.intro}</p>
          </div>

          {guide.map(({ heading, paragraphs }) => (
            <section key={heading} className="max-w-3xl">
              <h2 className="text-2xl font-semibold">{heading}</h2>
              {paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 leading-7">{paragraph}</p>)}
            </section>
          ))}
          {params.slug === "quick-match" ? (
            <p className="max-w-3xl">Compare this visual choice task with the <Link className="underline" href="/exercises/stroop-test">Stroop test</Link> for conflicting cues, the <Link className="underline" href="/exercises/n-back">N-back test</Link> for updating positions, or the <Link className="underline" href="/exercises/number-memory">number memory test</Link> for digit recall. For a shorter activity try the <Link className="underline" href="/free-adhd-focus-test">60-second attention test</Link>.</p>
          ) : <>
          <div className="grid gap-8 md:grid-cols-2">
            <section>
              <h3 className="text-lg font-semibold">How to play</h3>
              <ol className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {seoContent.howTo.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-semibold">Benefits</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {seoContent.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <section className="max-w-3xl">
              <h3 className="text-lg font-semibold">How the exercise works</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{seoContent.science}</p>
            </section>

            <section className="max-w-3xl">
              <h3 className="text-lg font-semibold">How it relates to ADHD</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{seoContent.adhdRelation}</p>
            </section>
          </div>

          </>}
          <section className="max-w-3xl">
            <h3 className="text-lg font-semibold">FAQ</h3>
            <div className="mt-3 space-y-4">
              {seoContent.faqs.map((faq) => (
                <div key={faq.question}>
                  <h4 className="font-medium">{faq.question}</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      ) : null}
    </PageShell>
  );
}
