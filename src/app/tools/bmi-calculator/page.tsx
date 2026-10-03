import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/content/prose";
import { FaqSection } from "@/components/content/faq-section";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { BmiCalculator } from "@/components/tools/bmi-calculator";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "BMI Calculator (UK): Metric and Imperial, With NICE Categories",
  description:
    "Calculate your BMI in cm and kg or feet, stone and pounds. See the NHS/NICE category, including lower thresholds for some family backgrounds.",
  path: "/tools/bmi-calculator",
});

const faqs = [
  {
    q: "How is BMI calculated?",
    a: "Body mass index is your weight in kilograms divided by your height in metres squared. If you enter imperial measurements, the calculator converts feet and inches to metres and stone and pounds to kilograms first. The result is rounded to one decimal place and compared with the adult categories used by the NHS and NICE.",
  },
  {
    q: "Why are the BMI thresholds lower for some ethnic groups?",
    a: "NICE recommends lower thresholds for people of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean family background, because the risk of conditions such as type 2 diabetes tends to rise at a lower BMI. For these groups, overweight starts at 23 and obesity at 27.5, rather than 25 and 30.",
  },
  {
    q: "Is BMI accurate for everyone?",
    a: "No. BMI does not distinguish between muscle and fat, so very muscular people can have a high BMI without carrying excess fat. It does not show where fat is stored, which also affects health risk. It is not used for children and young people under 18 or during pregnancy. A healthcare professional may use other measures, such as waist-to-height ratio, alongside BMI.",
  },
  {
    q: "Does my BMI mean I can have a weight-loss medicine?",
    a: "No. A BMI result is not a prescribing decision. Prescribers consider BMI alongside your medical history, other conditions, current medicines and possible risks. Only a registered prescriber, after a proper consultation, can decide whether any treatment is safe and suitable for you. Your GP can also discuss non-medicine options and NHS weight management services.",
  },
  {
    q: "Is my information stored when I use this calculator?",
    a: "No. The calculation runs entirely in your web browser. The height, weight and background details you enter are not sent to us, are not saved to your device and disappear when you leave or refresh the page. You can clear the form at any time using the Clear button.",
  },
];

export default function BmiCalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="BMI calculator"
        lead="Work out your body mass index using metric or imperial measurements, and see which NHS/NICE weight category it falls into. Informational only: this is not a prescribing decision."
        crumbs={[
          { name: "Tools", href: "/tools" },
          { name: "BMI calculator", href: "/tools/bmi-calculator" },
        ]}
      />
      <Container className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <BmiCalculator />

          <section aria-labelledby="bmi-categories" className="mt-12">
            <h2 id="bmi-categories" className="font-serif text-2xl font-semibold tracking-tight">
              Adult BMI categories
            </h2>
            <div className="mt-4 overflow-x-auto rounded-xl border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  NHS and NICE adult BMI categories, with the lower thresholds recommended for some family backgrounds
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Standard thresholds
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Lower thresholds*
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <th scope="row" className="px-4 py-3 font-medium">
                      Underweight
                    </th>
                    <td className="px-4 py-3">Below 18.5</td>
                    <td className="px-4 py-3">Below 18.5</td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="px-4 py-3 font-medium">
                      Healthy weight
                    </th>
                    <td className="px-4 py-3">18.5 to 24.9</td>
                    <td className="px-4 py-3">18.5 to 22.9</td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="px-4 py-3 font-medium">
                      Overweight
                    </th>
                    <td className="px-4 py-3">25 to 29.9</td>
                    <td className="px-4 py-3">23 to 27.4</td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="px-4 py-3 font-medium">
                      Obesity
                    </th>
                    <td className="px-4 py-3">30 to 39.9</td>
                    <td className="px-4 py-3">27.5 or above</td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="px-4 py-3 font-medium">
                      Severe obesity
                    </th>
                    <td className="px-4 py-3">40 or above</td>
                    <td className="px-4 py-3">&ndash;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              *For people of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean
              family background, as recommended by NICE.
            </p>
          </section>

          <Prose className="mt-4">
            <h2>What BMI is, and what it is not</h2>
            <p>
              Body mass index (BMI) compares your weight with your height. It is a quick, widely used way to screen
              for whether your weight may be affecting your health, and it is one of the measures the NHS and NICE use
              when talking about weight.
            </p>
            <p>BMI has important limitations:</p>
            <ul>
              <li>
                <strong>It does not distinguish muscle from fat.</strong> People with a lot of muscle can have a high
                BMI without carrying excess body fat, and older adults may have a &ldquo;healthy&rdquo; BMI while
                carrying more fat than it suggests.
              </li>
              <li>
                <strong>It does not show where fat is stored.</strong> Fat around the waist is linked with higher
                health risk, which is why a healthcare professional may also measure your waist.
              </li>
              <li>
                <strong>It is not for under-18s or pregnancy.</strong> Children and young people are assessed using
                age- and sex-specific charts, and BMI is not a reliable measure during pregnancy.
              </li>
              <li>
                <strong>Risk varies with ethnicity.</strong> NICE recommends lower thresholds for some family
                backgrounds because weight-related conditions tend to develop at a lower BMI. Read more in our guide to{" "}
                <Link href="/guides/bmi-thresholds-ethnicity">BMI thresholds and ethnicity</Link>.
              </li>
            </ul>

            <h2>How BMI is used for weight-management medicines</h2>
            <p>
              BMI is one of several factors considered when a prescriber decides whether a weight-management medicine
              might be appropriate. It is never the only factor.
            </p>
            <ul>
              <li>
                <strong>On the NHS,</strong> access to GLP-1 medicines for weight management follows NICE technology
                appraisals. These generally use higher BMI thresholds than the product licence, along with other
                criteria such as having one or more weight-related conditions. NICE reduces the BMI thresholds by 2.5 for people of South Asian, Chinese, other
                Asian, Middle Eastern, Black African or African-Caribbean family background.
              </li>
              <li>
                <strong>Private prescribers</strong> usually work within the product licence. At the time of writing,
                the licences for Mounjaro and Wegovy cover adults with a BMI of 30 or more, or 27 or more with at
                least one weight-related condition. Licences can change, so check the current Summary of Product
                Characteristics (SmPC).
              </li>
            </ul>
            <p>
              In every case, a prescriber decides. They will look at your full medical history, current medicines and
              any reasons a medicine might not be safe for you. For more detail, see our guide to{" "}
              <Link href="/guides/bmi-and-treatment-eligibility">BMI and treatment eligibility</Link>.
            </p>
          </Prose>

          <aside
            aria-label="Important"
            className="mt-8 rounded-xl border border-warning-foreground/20 bg-warning p-5 text-warning-foreground"
          >
            <p className="font-semibold">This is not a prescribing decision</p>
            <p className="mt-2 text-sm leading-relaxed">
              A BMI result does not mean that a medicine is suitable for you, or that you should take one. Weight-loss
              medicines are prescription-only and are not right for everyone. Speak to your GP, a pharmacist or
              another registered prescriber about your options, including support that does not involve medicines.
            </p>
          </aside>

          <Prose className="mt-8">
            <h2>Next steps</h2>
            <ul>
              <li>
                Use our <Link href="/tools/eligibility-checker">suitability checker</Link> to see what a prescriber is
                likely to ask about, including important cautions.
              </li>
              <li>
                Read <Link href="/guides/bmi-and-treatment-eligibility">BMI and treatment eligibility</Link> and{" "}
                <Link href="/guides/bmi-thresholds-ethnicity">BMI thresholds and ethnicity</Link>.
              </li>
              <li>
                If you are considering a private service, <Link href="/providers">compare regulated providers</Link>{" "}
                and how they carry out consultations.
              </li>
            </ul>
          </Prose>

          <FaqSection faqs={faqs} />
          <MedicalDisclaimer />
        </div>
      </Container>
    </>
  );
}
