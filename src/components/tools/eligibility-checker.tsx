"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, Info, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Age = "" | "under18" | "18to74" | "75plus";
type Background = "" | "yes" | "no" | "unsure";

type ConditionId = "t2d" | "prediabetes" | "bp" | "cholesterol" | "osa" | "heart";
type RedFlagId =
  | "pregnancy"
  | "mtc"
  | "pancreatitis"
  | "eating"
  | "t1d"
  | "gi"
  | "hypoglycaemic"
  | "surgery"
  | "allergy";

const CONDITIONS: { id: ConditionId; label: string }[] = [
  { id: "t2d", label: "Type 2 diabetes" },
  { id: "prediabetes", label: "Prediabetes (non-diabetic hyperglycaemia)" },
  { id: "bp", label: "High blood pressure" },
  { id: "cholesterol", label: "High cholesterol or dyslipidaemia" },
  { id: "osa", label: "Obstructive sleep apnoea" },
  { id: "heart", label: "Heart disease" },
];

const RED_FLAGS: { id: RedFlagId; label: string; title: string; explanation: string }[] = [
  {
    id: "pregnancy",
    label: "I am pregnant, breastfeeding or trying to conceive",
    title: "Pregnancy, breastfeeding or trying to conceive",
    explanation:
      "GLP-1 weight-loss medicines should not be used in pregnancy and are not recommended while breastfeeding. If you are planning a pregnancy, a prescriber will advise on stopping in advance. Speak to your GP.",
  },
  {
    id: "mtc",
    label: "I, or a close family member, have had medullary thyroid cancer or multiple endocrine neoplasia type 2 (MEN2)",
    title: "Medullary thyroid cancer or MEN2",
    explanation:
      "This is an important caution or contraindication for GLP-1 medicines. Your prescriber must know about it before any decision is made.",
  },
  {
    id: "pancreatitis",
    label: "I have had pancreatitis (inflammation of the pancreas)",
    title: "History of pancreatitis",
    explanation:
      "Pancreatitis has been reported with GLP-1 medicines. A previous episode is an important caution your prescriber must know about.",
  },
  {
    id: "eating",
    label: "I have, or have had, an eating disorder",
    title: "Eating disorder",
    explanation:
      "Weight-loss medicines may not be appropriate for people with a current or past eating disorder. Tell your prescriber, and speak to your GP if you would like support.",
  },
  {
    id: "t1d",
    label: "I have type 1 diabetes",
    title: "Type 1 diabetes",
    explanation:
      "GLP-1 weight-loss medicines are not a substitute for insulin. Your diabetes team or GP should be involved in any decision about weight management.",
  },
  {
    id: "gi",
    label: "I have a severe stomach or bowel condition, such as gastroparesis",
    title: "Severe gastrointestinal disease",
    explanation:
      "These medicines slow how quickly the stomach empties and commonly cause digestive side effects. They are not recommended in severe gastrointestinal disease. Tell your prescriber.",
  },
  {
    id: "hypoglycaemic",
    label: "I take insulin or a sulfonylurea (such as gliclazide)",
    title: "Taking insulin or a sulfonylurea",
    explanation:
      "Combining these with a GLP-1 medicine can increase the risk of low blood sugar (hypoglycaemia). Doses may need adjusting, so your prescriber and diabetes team must know.",
  },
  {
    id: "surgery",
    label: "I have surgery or a procedure needing an anaesthetic or sedation coming up",
    title: "Upcoming surgery or anaesthetic",
    explanation:
      "Because these medicines slow stomach emptying, they can matter for anaesthesia and sedation. Tell your prescriber and your surgical team.",
  },
  {
    id: "allergy",
    label: "I have had an allergic reaction to a GLP-1 medicine",
    title: "Previous allergic reaction",
    explanation:
      "A previous allergic reaction to a medicine in this group is important. Tell your prescriber before any treatment is considered.",
  },
];

const STEPS = ["Age", "BMI", "Family background", "Health conditions", "Other health questions", "Summary"] as const;
const QUESTION_STEPS = STEPS.length - 1;

interface Answers {
  age: Age;
  bmi: string;
  background: Background;
  conditions: ConditionId[];
  noConditions: boolean;
  redFlags: RedFlagId[];
  noRedFlags: boolean;
}

const EMPTY: Answers = {
  age: "",
  bmi: "",
  background: "",
  conditions: [],
  noConditions: false,
  redFlags: [],
  noRedFlags: false,
};

const BMI_MIN = 12;
const BMI_MAX = 90;

function parseBmi(raw: string): number | null {
  const t = raw.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n) || n < BMI_MIN || n > BMI_MAX) return null;
  return n;
}

function stepError(step: number, a: Answers): string | null {
  switch (step) {
    case 0:
      return a.age ? null : "Choose your age group to continue.";
    case 1:
      if (a.bmi.trim() === "") return "Enter your BMI to continue.";
      return parseBmi(a.bmi) === null ? `Enter a BMI between ${BMI_MIN} and ${BMI_MAX}.` : null;
    case 2:
      return a.background ? null : "Choose an option to continue.";
    case 3:
      return a.conditions.length > 0 || a.noConditions
        ? null
        : "Tick any conditions that apply, or choose “None of these”.";
    case 4:
      return a.redFlags.length > 0 || a.noRedFlags
        ? null
        : "Tick any that apply, or choose “None of these apply to me”.";
    default:
      return null;
  }
}

/** Joins element ids for aria-describedby. */
function ids(...parts: (string | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

type Outcome = "under18" | "discuss" | "notIndicated";

function getOutcome(a: Answers): Outcome {
  if (a.age === "under18") return "under18";
  const bmi = parseBmi(a.bmi) ?? 0;
  const lower = a.background === "yes";
  const hasCondition = a.conditions.length > 0;
  if (bmi >= 30 || (lower && bmi >= 27.5) || (bmi >= 27 && hasCondition)) return "discuss";
  return "notIndicated";
}

export function EligibilityChecker() {
  const id = React.useId();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>(EMPTY);
  const [error, setError] = React.useState<string | null>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const hasInteracted = React.useRef(false);

  React.useEffect(() => {
    // Move focus to the new step heading, but not on first page load.
    if (!hasInteracted.current) return;
    headingRef.current?.focus();
  }, [step]);

  function goTo(next: number) {
    hasInteracted.current = true;
    setError(null);
    setStep(next);
  }

  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = stepError(step, answers);
    if (err) {
      setError(err);
      const firstInput = e.currentTarget.querySelector<HTMLInputElement>("input");
      firstInput?.focus();
      return;
    }
    goTo(step + 1);
  }

  function restart() {
    setAnswers(EMPTY);
    goTo(0);
  }

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setError(null);
  }

  function toggleCondition(cid: ConditionId) {
    setAnswers((a) => {
      const has = a.conditions.includes(cid);
      return {
        ...a,
        noConditions: false,
        conditions: has ? a.conditions.filter((c) => c !== cid) : [...a.conditions, cid],
      };
    });
    setError(null);
  }

  function toggleRedFlag(rid: RedFlagId) {
    setAnswers((a) => {
      const has = a.redFlags.includes(rid);
      return {
        ...a,
        noRedFlags: false,
        redFlags: has ? a.redFlags.filter((r) => r !== rid) : [...a.redFlags, rid],
      };
    });
    setError(null);
  }

  const errorId = `${id}-error`;
  const isSummary = step === QUESTION_STEPS;
  const progressPct = Math.round((step / QUESTION_STEPS) * 100);

  const optionClass =
    "flex cursor-pointer items-start gap-3 rounded-lg border bg-background p-3 text-sm leading-snug hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring";
  const controlClass = "mt-0.5 size-4 shrink-0 accent-primary";

  function renderRadioGroup<T extends string>(
    name: string,
    value: T,
    options: readonly { value: T; label: string }[],
    onChange: (v: T) => void,
  ) {
    return (
      <div role="radiogroup" aria-invalid={error ? true : undefined} className="grid gap-2">
        {options.map((opt) => (
          <label key={opt.value} className={optionClass}>
            <input
              type="radio"
              name={`${id}-${name}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className={controlClass}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    );
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <fieldset aria-describedby={error ? errorId : undefined}>
            <legend className="mb-3 text-base font-medium">How old are you?</legend>
            {renderRadioGroup(
              "age",
              answers.age,
              [
                { value: "under18", label: "Under 18" },
                { value: "18to74", label: "18 to 74" },
                { value: "75plus", label: "75 or over" },
              ] as const,
              (v) => set("age", v),
            )}
          </fieldset>
        );
      case 1:
        return (
          <div className="space-y-2">
            <Label htmlFor={`${id}-bmi`} className="text-base">
              What is your BMI?
            </Label>
            <p id={`${id}-bmi-hint`} className="text-sm text-muted-foreground">
              Don&apos;t know it? Work it out with our{" "}
              <Link
                href="/tools/bmi-calculator"
                target="_blank"
                rel="noopener"
                className="font-medium text-primary underline underline-offset-4"
              >
                BMI calculator (opens in a new tab)
              </Link>
              , then come back and enter it here.
            </p>
            <Input
              id={`${id}-bmi`}
              type="number"
              inputMode="decimal"
              step="0.1"
              min={BMI_MIN}
              max={BMI_MAX}
              autoComplete="off"
              value={answers.bmi}
              onChange={(e) => set("bmi", e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={ids(`${id}-bmi-hint`, error ? errorId : null)}
              className="max-w-40"
            />
          </div>
        );
      case 2:
        return (
          <fieldset aria-describedby={ids(`${id}-bg-hint`, error ? errorId : null)}>
            <legend className="mb-2 text-base font-medium">
              Is your family background South Asian, Chinese, other Asian, Middle Eastern, Black African or
              African-Caribbean?
            </legend>
            <p id={`${id}-bg-hint`} className="mb-3 text-sm text-muted-foreground">
              NICE recommends lower BMI thresholds for these groups because the risk of weight-related conditions
              rises at a lower BMI.
            </p>
            {renderRadioGroup(
              "background",
              answers.background,
              [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unsure", label: "Prefer not to say" },
              ] as const,
              (v) => set("background", v),
            )}
          </fieldset>
        );
      case 3:
        return (
          <fieldset aria-describedby={error ? errorId : undefined}>
            <legend className="mb-3 text-base font-medium">
              Do you have any of these weight-related conditions? Tick all that apply.
            </legend>
            <div className="grid gap-2">
              {CONDITIONS.map((c) => (
                <label key={c.id} className={optionClass}>
                  <input
                    type="checkbox"
                    checked={answers.conditions.includes(c.id)}
                    onChange={() => toggleCondition(c.id)}
                    aria-invalid={error ? true : undefined}
                    className={controlClass}
                  />
                  <span>{c.label}</span>
                </label>
              ))}
              <label className={optionClass}>
                <input
                  type="checkbox"
                  checked={answers.noConditions}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAnswers((a) => ({ ...a, noConditions: checked, conditions: checked ? [] : a.conditions }));
                    setError(null);
                  }}
                  aria-invalid={error ? true : undefined}
                  className={controlClass}
                />
                <span>None of these</span>
              </label>
            </div>
          </fieldset>
        );
      case 4:
        return (
          <fieldset aria-describedby={error ? errorId : undefined}>
            <legend className="mb-3 text-base font-medium">Do any of these apply to you? Tick all that apply.</legend>
            <div className="grid gap-2">
              {RED_FLAGS.map((r) => (
                <label key={r.id} className={optionClass}>
                  <input
                    type="checkbox"
                    checked={answers.redFlags.includes(r.id)}
                    onChange={() => toggleRedFlag(r.id)}
                    aria-invalid={error ? true : undefined}
                    className={controlClass}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
              <label className={optionClass}>
                <input
                  type="checkbox"
                  checked={answers.noRedFlags}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAnswers((a) => ({ ...a, noRedFlags: checked, redFlags: checked ? [] : a.redFlags }));
                    setError(null);
                  }}
                  aria-invalid={error ? true : undefined}
                  className={controlClass}
                />
                <span>None of these apply to me</span>
              </label>
            </div>
          </fieldset>
        );
      default:
        return null;
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground">
          {isSummary ? "Summary" : `Step ${step + 1} of ${QUESTION_STEPS}`}
        </p>
        <div aria-hidden className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progressPct}%` }} />
        </div>
        <ol className="mt-3 hidden flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:flex">
          {STEPS.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={cn(i === step && "font-semibold text-foreground", i < step && "text-primary")}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>

      {!isSummary ? (
        <form onSubmit={handleNext} noValidate className="space-y-6">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-serif text-2xl font-semibold tracking-tight focus:outline-none"
          >
            {STEPS[step]}
          </h2>

          {renderStep()}

          {error && (
            <p id={errorId} role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => goTo(step - 1)}>
                Back
              </Button>
            )}
            <Button type="submit">{step === QUESTION_STEPS - 1 ? "See summary" : "Next"}</Button>
            {step > 0 && (
              <Button type="button" variant="ghost" onClick={restart} className="ml-auto">
                Start again
              </Button>
            )}
          </div>

          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Lock aria-hidden className="mt-0.5 size-4 shrink-0" />
            Your answers stay in your browser. Nothing is sent to us or stored.
          </p>
        </form>
      ) : (
        <Results
          answers={answers}
          headingRef={headingRef}
          onBack={() => goTo(step - 1)}
          onRestart={restart}
        />
      )}
    </div>
  );
}

function Results({
  answers,
  headingRef,
  onBack,
  onRestart,
}: {
  answers: Answers;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
  onRestart: () => void;
}) {
  const outcome = getOutcome(answers);
  const flags = RED_FLAGS.filter((r) => answers.redFlags.includes(r.id));
  const lower = answers.background === "yes";

  return (
    <div className="space-y-6">
      <h2 ref={headingRef} tabIndex={-1} className="font-serif text-2xl font-semibold tracking-tight focus:outline-none">
        Your summary
      </h2>

      <p className="text-sm text-muted-foreground">
        This summary is for information only. It is not a prescribing decision and does not tell you whether any
        medicine is safe or suitable for you.
      </p>

      {flags.length > 0 && (
        <section
          aria-labelledby="flags-heading"
          className="rounded-xl border border-warning-foreground/25 bg-warning p-5 text-warning-foreground"
        >
          <h3 id="flags-heading" className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle aria-hidden className="size-5" />
            Important: tell your prescriber about {flags.length === 1 ? "this" : "these"}
          </h3>
          <ul className="mt-3 space-y-3">
            {flags.map((f) => (
              <li key={f.id} className="text-sm leading-relaxed">
                <strong className="block">{f.title}</strong>
                {f.explanation}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="outcome-heading" className="rounded-xl border bg-info p-5 text-info-foreground">
        <h3 id="outcome-heading" className="flex items-center gap-2 text-lg font-semibold">
          <Info aria-hidden className="size-5" />
          What your answers suggest
        </h3>
        {outcome === "under18" && (
          <div className="mt-3 space-y-2 text-sm leading-relaxed">
            <p>
              In this context, these weight-loss medicines are licensed for adults. Please speak to your GP, who can
              talk through support and options suitable for your age.
            </p>
          </div>
        )}
        {outcome === "discuss" && (
          <div className="mt-3 space-y-2 text-sm leading-relaxed">
            <p className="text-base font-medium">
              You may wish to discuss weight-management options, including medicines, with a prescriber.
            </p>
            <p>
              A prescriber will consider your full medical history, current medicines and any cautions before deciding
              whether any treatment is appropriate. Medicines are one option alongside support with diet, physical activity and behaviour change.
            </p>
            {answers.age === "75plus" && (
              <p>As you are 75 or over, a prescriber will take particular care to consider your age and overall health.</p>
            )}
          </div>
        )}
        {outcome === "notIndicated" && (
          <div className="mt-3 space-y-2 text-sm leading-relaxed">
            <p className="text-base font-medium">
              Based on your answers, weight-loss medicines may not be appropriate. A prescriber can advise on other
              options.
            </p>
            {lower && (
              <p>
                NICE recommends lower BMI thresholds for people from your family background, so a prescriber may
                assess your BMI differently and can advise.
              </p>
            )}
            <p>Your GP can also tell you about NHS weight management support that does not involve medicines.</p>
          </div>
        )}
      </section>

      <section
        aria-labelledby="urgent-heading"
        className="rounded-xl border-2 border-destructive/60 bg-card p-5"
      >
        <h3 id="urgent-heading" className="flex items-center gap-2 text-lg font-semibold">
          <Phone aria-hidden className="size-5 text-destructive" />
          When to get urgent help
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          If you are taking a weight-loss medicine and get severe, persistent abdominal pain (with or without
          vomiting), contact NHS 111 straight away, or call 999 if it is an emergency. Call 999 for signs of a severe
          allergic reaction, such as swelling of the face or throat or difficulty breathing.
        </p>
      </section>

      <section aria-labelledby="next-heading">
        <h3 id="next-heading" className="text-lg font-semibold">
          Find out more
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
          <li>
            <Link href="/guides/who-can-get-weight-loss-injections" className="font-medium text-primary underline underline-offset-4">
              Who can get weight-loss injections
            </Link>
          </li>
          <li>
            <Link href="/guides/who-should-not-take-glp1s" className="font-medium text-primary underline underline-offset-4">
              Who should not take GLP-1 medicines
            </Link>
          </li>
          <li>
            <Link href="/providers" className="font-medium text-primary underline underline-offset-4">
              Compare regulated providers
            </Link>{" "}
            and how they carry out consultations
          </li>
          <li>
            <Link href="/medical-disclaimer" className="font-medium text-primary underline underline-offset-4">
              Medical disclaimer
            </Link>
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onRestart}>
          Start again
        </Button>
      </div>

      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Lock aria-hidden className="mt-0.5 size-4 shrink-0" />
        Your answers stay in your browser. Nothing is sent to us or stored.
      </p>
    </div>
  );
}
