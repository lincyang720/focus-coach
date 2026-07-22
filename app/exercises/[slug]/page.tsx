import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameRunner } from "@/components/games/game-runner";
import { PageShell } from "@/components/layout/page-shell";
import { gameConfigByType, gameSlugByType, gameTypeBySlug } from "@/lib/games";

const titleBySlug: Record<string, string> = {
  "number-memory": "Number Memory Exercise for ADHD – Improve Working Memory",
  "quick-match": "Quick Match Exercise for ADHD – Processing Speed Training",
  "n-back": "N-Back Training for ADHD – Dual N-Back Brain Training",
  "task-switch": "Task Switching Exercise for ADHD – Cognitive Flexibility",
  "stroop-test": "Stroop Test for ADHD – Cognitive Flexibility Training"
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
      "Try a free number memory test and working memory training game. Practice recall, attention control, and daily brain training in a short online session.",
    keywords: [
      "working memory training",
      "memory training game",
      "number memory test",
      "brain training",
      "cognitive training"
    ],
    intro:
      "Number Memory is a short working memory training game that asks you to recall a digit sequence after it flashes on screen. It works as a number memory test, a memory training game, and a quick daily brain training exercise for adults who want focused practice without a long setup. As the sequence grows, you practice holding information, resisting distraction, and checking accuracy under light time pressure.",
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
    metaDescription:
      "Take a free reaction time test online with Quick Match. Practice reaction speed training, visual attention, and cognitive training in short sessions.",
    keywords: [
      "reaction time test",
      "reaction speed training",
      "reflex test",
      "attention games",
      "cognitive training"
    ],
    intro:
      "Quick Match is a reaction time test and reaction speed training game built around fast visual comparison. Each round shows a target shape and color, then asks you to choose the matching option as quickly and accurately as possible. The game combines reflex test mechanics with cognitive training for visual attention, making it useful for adults who want short focus practice during the workday.",
    science:
      "Visual matching tasks combine selective attention, perceptual discrimination, and response selection. Faster responses are not automatically better: speed–accuracy tradeoffs mean a useful result must consider errors as well as reaction time. Repeated play mainly shows learning and consistency within this task.",
    adhdRelation:
      "Adults with ADHD may use a brief visual task as an external cue to leave passive browsing and begin deliberate work. Quick Match is designed for that transition. It cannot measure ADHD severity or prove that processing speed has changed outside the game.",
    howTo: [
      "Look at the target color and shape at the top of the round.",
      "Scan the answer choices and select the exact match.",
      "Balance speed with accuracy, because both affect your score.",
      "Keep practicing as time limits tighten with higher difficulty."
    ],
    benefits: [
      "Trains reaction speed with fast, measurable visual decisions.",
      "Strengthens selective attention by forcing exact color and shape matching.",
      "Works as a compact online cognitive test for focus and speed."
    ],
    faqs: [
      {
        question: "Can Quick Match be used as a reaction time test?",
        answer:
          "Yes. Quick Match records fast visual decisions and uses response speed as part of the final score."
      },
      {
        question: "Does this game train reflexes or attention?",
        answer:
          "It trains both. The task rewards quick responses, but accuracy depends on visual attention and careful matching."
      }
    ]
  },
  "n-back": {
    metaDescription:
      "Play free N-Back working memory training online. Practice n-back cognitive training, attention control, and adaptive brain training.",
    keywords: [
      "working memory training",
      "n-back cognitive training",
      "dual n-back",
      "brain training",
      "cognitive training app"
    ],
    intro:
      "N-Back is a working memory training exercise where you decide whether the current square matches the position shown N steps earlier. This n-back cognitive training game starts simple and becomes more demanding as the level rises. It is designed for adults who want structured brain training for attention control, mental updating, and sustained focus without needing a complex dual n-back setup.",
    science:
      "N-back tasks require continuous updating: each new item changes which earlier item is relevant. Research consistently finds improvement on the trained task and sometimes on closely related tasks, while evidence for broad transfer to intelligence, ADHD symptoms, or everyday performance remains uncertain.",
    adhdRelation:
      "Because working-memory updating is relevant to following a changing stream of information, n-back can be a focused challenge for adults with ADHD. FocusCoach uses a visual single n-back format rather than a clinical test or full dual n-back protocol, and results should remain task-specific.",
    howTo: [
      "Watch each square as it appears on the grid.",
      "Decide whether it matches the position from N turns ago.",
      "Mark matches and ignore non-matches.",
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
      "Take a free Stroop test online. Practice attention control, cognitive inhibition, reaction time, and short brain training.",
    keywords: [
      "stroop test online",
      "attention control test",
      "cognitive inhibition",
      "reaction time test",
      "brain training"
    ],
    intro:
      "The Stroop Test is a classic attention control test that asks you to identify the ink color while ignoring the word meaning. This Stroop test online combines reaction time test feedback with cognitive inhibition practice. It is useful for adults who want short brain training for self-control, selective attention, and mental speed during a focused workday routine.",
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

  return {
    title: { absolute: keyword },
    description:
      seoContent?.metaDescription ??
      `Play ${keyword} in Focus Coach. Practice ${config.category.toLowerCase()} with a short focus training game and adaptive difficulty.`,
    keywords: seoContent?.keywords,
    alternates: {
      canonical: `/exercises/${params.slug}`
    },
    openGraph: {
      title: `${keyword} | Focus Coach`,
      description: `Try this short online focus training game for ${config.category.toLowerCase()} practice.`,
      url: `/exercises/${params.slug}`
    }
  };
}

export default function GameSeoPage({ params }: { params: { slug: string } }) {
  const gameType = gameTypeBySlug[params.slug];
  if (!gameType) notFound();

  const config = gameConfigByType[gameType];
  const keyword = titleBySlug[params.slug] ?? `${config.name} Attention Training Game`;
  const seoContent = seoContentBySlug[params.slug];
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
      <GameRunner gameType={gameType} seoTitle={keyword} />
      {seoContent ? (
        <section className="mt-12 space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-normal">
              {keyword} for Daily Cognitive Training
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">{seoContent.intro}</p>
          </div>

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
