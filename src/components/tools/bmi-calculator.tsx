"use client";

import * as React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Units = "metric" | "imperial";
type Background = "" | "yes" | "no" | "unsure";

type FieldName = "cm" | "kg" | "ft" | "in" | "st" | "lb";

interface Category {
  label: string;
  range: string;
}

/** Rules for each numeric field. Optional fields default to 0 when empty. */
const FIELD_RULES: Record<FieldName, { min: number; max: number; optional?: boolean; label: string }> = {
  cm: { min: 50, max: 250, label: "Height in centimetres" },
  kg: { min: 20, max: 350, label: "Weight in kilograms" },
  ft: { min: 1, max: 8, label: "Height in feet" },
  in: { min: 0, max: 11.9, optional: true, label: "Inches" },
  st: { min: 2, max: 55, label: "Weight in stone" },
  lb: { min: 0, max: 13.9, optional: true, label: "Pounds" },
};

const METRIC_FIELDS: FieldName[] = ["cm", "kg"];
const IMPERIAL_FIELDS: FieldName[] = ["ft", "in", "st", "lb"];

function validateField(name: FieldName, raw: string): string | null {
  const rule = FIELD_RULES[name];
  const trimmed = raw.trim();
  if (trimmed === "") return rule.optional ? null : `Enter your ${rule.label.toLowerCase()}.`;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return `${rule.label} must be a number.`;
  if (value < rule.min || value > rule.max) return `${rule.label} must be between ${rule.min} and ${rule.max}.`;
  return null;
}

function num(raw: string): number {
  const v = Number(raw.trim());
  return Number.isFinite(v) ? v : 0;
}

/** NHS/NICE adult BMI categories. Uses the 1-decimal-place value so boundaries match the published ranges. */
export function bmiCategory(bmi: number, lowerThresholds: boolean): Category {
  if (bmi < 18.5) return { label: "Underweight", range: "below 18.5" };
  if (lowerThresholds) {
    if (bmi < 23) return { label: "Healthy weight", range: "18.5 to 22.9" };
    if (bmi < 27.5) return { label: "Overweight", range: "23 to 27.4" };
    return { label: "Obesity", range: "27.5 or above" };
  }
  if (bmi < 25) return { label: "Healthy weight", range: "18.5 to 24.9" };
  if (bmi < 30) return { label: "Overweight", range: "25 to 29.9" };
  if (bmi < 40) return { label: "Obesity", range: "30 to 39.9" };
  return { label: "Severe obesity", range: "40 or above" };
}

export function BmiCalculator() {
  const id = React.useId();
  const [units, setUnits] = React.useState<Units>("metric");
  const [values, setValues] = React.useState<Record<FieldName, string>>({
    cm: "",
    kg: "",
    ft: "",
    in: "",
    st: "",
    lb: "",
  });
  const [touched, setTouched] = React.useState<Partial<Record<FieldName, boolean>>>({});
  const [background, setBackground] = React.useState<Background>("");

  const activeFields = units === "metric" ? METRIC_FIELDS : IMPERIAL_FIELDS;
  const errors = React.useMemo(() => {
    const out: Partial<Record<FieldName, string>> = {};
    for (const f of activeFields) {
      const err = validateField(f, values[f]);
      if (err) out[f] = err;
    }
    return out;
  }, [activeFields, values]);

  const allValid = activeFields.every((f) => !errors[f]);

  const bmi = React.useMemo(() => {
    if (!allValid) return null;
    let heightM: number;
    let weightKg: number;
    if (units === "metric") {
      heightM = num(values.cm) / 100;
      weightKg = num(values.kg);
    } else {
      const inches = num(values.ft) * 12 + num(values.in);
      heightM = inches * 0.0254;
      const pounds = num(values.st) * 14 + num(values.lb);
      weightKg = pounds * 0.45359237;
    }
    if (heightM <= 0) return null;
    const raw = weightKg / (heightM * heightM);
    return Math.round(raw * 10) / 10;
  }, [allValid, units, values]);

  const lower = background === "yes";
  const category = bmi !== null ? bmiCategory(bmi, lower) : null;

  function update(name: FieldName, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function markTouched(name: FieldName) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const all: Partial<Record<FieldName, boolean>> = { ...touched };
    for (const f of activeFields) all[f] = true;
    setTouched(all);
    const firstInvalid = activeFields.find((f) => errors[f]);
    if (firstInvalid) document.getElementById(`${id}-${firstInvalid}`)?.focus();
  }

  function reset() {
    setValues({ cm: "", kg: "", ft: "", in: "", st: "", lb: "" });
    setTouched({});
    setBackground("");
  }

  function renderField(name: FieldName, labelText: string, suffix: string, step = "any") {
    const showError = touched[name] && errors[name];
    const inputId = `${id}-${name}`;
    const errorId = `${inputId}-error`;
    return (
      <div className="space-y-2">
        <Label htmlFor={inputId}>
          {labelText}
          {FIELD_RULES[name].optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
        </Label>
        <div className="relative">
          <Input
            id={inputId}
            name={name}
            type="number"
            inputMode="decimal"
            step={step}
            min={FIELD_RULES[name].min}
            max={FIELD_RULES[name].max}
            autoComplete="off"
            value={values[name]}
            onChange={(e) => update(name, e.target.value)}
            onBlur={() => markTouched(name)}
            aria-invalid={showError ? true : undefined}
            aria-describedby={showError ? errorId : undefined}
            className="pr-12"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground"
          >
            {suffix}
          </span>
        </div>
        {showError && (
          <p id={errorId} className="text-sm font-medium text-destructive">
            {errors[name]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm md:p-8">
      <form onSubmit={handleSubmit} noValidate aria-labelledby={`${id}-title`} className="space-y-6">
        <h2 id={`${id}-title`} className="font-serif text-2xl font-semibold tracking-tight">
          Calculate your BMI
        </h2>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Units</legend>
          <div className="inline-flex flex-wrap gap-2">
            {(
              [
                { value: "metric", label: "Metric (cm, kg)" },
                { value: "imperial", label: "Imperial (ft, in, st, lb)" },
              ] as const
            ).map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
                  units === opt.value ? "border-primary bg-secondary font-semibold" : "bg-background",
                )}
              >
                <input
                  type="radio"
                  name={`${id}-units`}
                  value={opt.value}
                  checked={units === opt.value}
                  onChange={() => {
                    setUnits(opt.value);
                    setTouched({});
                  }}
                  className="size-4 accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {units === "metric" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {renderField("cm", "Height", "cm")}
            {renderField("kg", "Weight", "kg")}
          </div>
        ) : (
          <div className="space-y-4">
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Height</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderField("ft", "Feet", "ft", "1")}
                {renderField("in", "Inches", "in")}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Weight</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderField("st", "Stone", "st", "1")}
                {renderField("lb", "Pounds", "lb")}
              </div>
            </fieldset>
          </div>
        )}

        <fieldset aria-describedby={`${id}-bg-hint`}>
          <legend className="text-sm font-medium">
            Is your family background South Asian, Chinese, other Asian, Middle Eastern, Black African or
            African-Caribbean? <span className="font-normal text-muted-foreground">(optional)</span>
          </legend>
          <p id={`${id}-bg-hint`} className="mt-1 text-sm text-muted-foreground">
            NICE recommends lower BMI thresholds for these groups because the risk of weight-related conditions
            such as type 2 diabetes rises at a lower BMI.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {(
              [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unsure", label: "Prefer not to say" },
              ] as const
            ).map((opt) => (
              <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={`${id}-background`}
                  value={opt.value}
                  checked={background === opt.value}
                  onChange={() => setBackground(opt.value)}
                  className="size-4 accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Calculate BMI</Button>
          <Button type="button" variant="outline" onClick={reset}>
            Clear
          </Button>
        </div>

        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <Lock aria-hidden className="mt-0.5 size-4 shrink-0" />
          Calculations run in your browser. Nothing you enter is sent to us or stored.
        </p>
      </form>

      <div aria-live="polite" aria-atomic="true" className="mt-6">
        {bmi !== null && category ? (
          <div className="rounded-xl border bg-info p-5 text-info-foreground">
            <p className="text-sm font-medium">Your BMI</p>
            <p className="mt-1 font-serif text-4xl font-semibold tabular-nums">{bmi.toFixed(1)}</p>
            <p className="mt-2 text-base">
              This is in the <strong>{category.label.toLowerCase()}</strong> range ({category.range})
              {lower ? ", using the lower thresholds NICE recommends for your family background." : "."}
            </p>
            {background === "unsure" || background === "" ? (
              <p className="mt-2 text-sm">
                This uses the standard thresholds. NICE recommends lower thresholds (overweight from 23, obesity from
                27.5) for people of South Asian, Chinese, other Asian, Middle Eastern, Black African or
                African-Caribbean family background.
              </p>
            ) : null}
            <p className="mt-3 text-sm">
              BMI is a screening measure, not a diagnosis. It is not suitable for children and young people under 18
              or during pregnancy. <strong>This is not a prescribing decision</strong>, and a BMI result alone does
              not mean any medicine is suitable for you.
            </p>
            <p className="mt-3 text-sm">
              Want to know what a prescriber might ask about?{" "}
              <Link href="/tools/eligibility-checker" className="font-semibold underline underline-offset-4">
                Try the suitability checker
              </Link>
              .
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter your height and weight to see your BMI. Your result will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
