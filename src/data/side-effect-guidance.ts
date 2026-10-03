/**
 * General, conservative patient-information guidance per side effect.
 *
 * This is educational copy only. It deliberately avoids frequencies and
 * figures (those belong to the SmPC / Patient Information Leaflet) and always
 * routes readers to their prescriber, pharmacist, NHS 111 or 999.
 * Must be checked by the medical reviewer before any page is marked reviewed.
 */
export interface SideEffectGuidance {
  /** Plain-English description of the symptom in the context of GLP-1 treatment. */
  overview: string;
  /** General self-care measures commonly suggested in patient information. */
  selfCare: string[];
  /** Speak to your prescriber / pharmacist / NHS 111 if… */
  contactPrescriber: string[];
  /** Seek urgent care (999 / A&E) if… Empty when not applicable. */
  urgent: string[];
}

const GI_URGENT = [
  "you have severe, persistent pain in your stomach area that may spread to your back, with or without vomiting (possible pancreatitis)",
  "you cannot keep any fluids down, or have signs of dehydration such as dizziness, confusion or passing very little urine",
];

export const sideEffectGuidance: Record<string, SideEffectGuidance> = {
  nausea: {
    overview:
      "Feeling sick is one of the most commonly reported effects of GLP-1 medicines. These medicines slow how quickly the stomach empties, which can make you feel full or queasy, particularly when starting treatment or after a dose increase.",
    selfCare: [
      "Eat smaller meals and stop when you start to feel full",
      "Eat slowly and avoid lying down straight after eating",
      "Limit greasy, fried or very rich foods, which some people find make nausea worse",
      "Sip water or other non-fizzy fluids regularly through the day",
    ],
    contactPrescriber: [
      "nausea is stopping you eating or drinking normally",
      "it has not settled after the first few weeks on a dose",
      "you are thinking about increasing your dose while still feeling unwell",
    ],
    urgent: GI_URGENT,
  },
  vomiting: {
    overview:
      "Being sick can occur alongside nausea, most often around the start of treatment or a dose increase. Repeated vomiting can lead to dehydration, which can affect the kidneys.",
    selfCare: [
      "Take small, frequent sips of water or an oral rehydration solution",
      "Return to small, plain meals once you can keep fluids down",
      "Avoid large or high-fat meals",
    ],
    contactPrescriber: [
      "you have vomited more than once in a day, or vomiting keeps coming back",
      "you think vomiting may be affecting other medicines you take, including oral contraception",
    ],
    urgent: GI_URGENT,
  },
  diarrhoea: {
    overview:
      "Loose or more frequent stools are commonly reported with GLP-1 medicines and usually improve as the body adjusts. Persistent diarrhoea can cause dehydration.",
    selfCare: [
      "Drink plenty of fluids to replace what you lose",
      "Eat smaller meals and limit very fatty or spicy foods",
      "Ask a pharmacist about oral rehydration sachets",
    ],
    contactPrescriber: [
      "diarrhoea lasts more than a few days or is severe",
      "you notice blood in your stools",
      "you take oral contraception or other medicines whose absorption could be affected",
    ],
    urgent: [
      "you have signs of severe dehydration, such as confusion, fainting or passing very little urine",
    ],
  },
  constipation: {
    overview:
      "Slower movement of food through the gut and eating less can both make constipation more likely during GLP-1 treatment.",
    selfCare: [
      "Drink plenty of fluids through the day",
      "Include fibre from vegetables, fruit, pulses and wholegrains where you can",
      "Stay as physically active as you are able",
      "Ask a pharmacist before using a laxative",
    ],
    contactPrescriber: [
      "you have not opened your bowels for several days despite self-care",
      "constipation is painful or keeps coming back",
    ],
    urgent: [
      "you have severe stomach pain, a swollen tummy and are vomiting, or cannot pass wind (possible bowel obstruction)",
    ],
  },
  indigestion: {
    overview:
      "Indigestion, heartburn and acid reflux are reported with GLP-1 medicines, which keep food in the stomach for longer.",
    selfCare: [
      "Eat smaller meals and avoid eating late in the evening",
      "Keep your head and shoulders raised in bed if reflux is worse at night",
      "Notice and limit foods that trigger symptoms for you",
      "Ask a pharmacist whether an antacid is suitable alongside your other medicines",
    ],
    contactPrescriber: [
      "symptoms persist despite self-care",
      "you have difficulty or pain when swallowing",
    ],
    urgent: [
      "you have chest pain, especially if it spreads to your arm, jaw or back, or comes with breathlessness (call 999)",
      "you vomit blood or have black, tarry stools",
    ],
  },
  burping: {
    overview:
      "Burping and a feeling of trapped wind are reported by some people on GLP-1 medicines, related to slower stomach emptying.",
    selfCare: [
      "Eat and drink slowly",
      "Limit fizzy drinks and very large meals",
    ],
    contactPrescriber: ["burping comes with ongoing indigestion, pain or vomiting"],
    urgent: [],
  },
  fatigue: {
    overview:
      "Some people feel more tired, especially early in treatment. Eating much less than usual, poor sleep and dehydration can all contribute.",
    selfCare: [
      "Make sure meals still contain enough protein and nutrients, even if they are smaller",
      "Stay well hydrated",
      "Keep to a regular sleep routine",
    ],
    contactPrescriber: [
      "tiredness is severe, lasting, or affects daily life",
      "you also feel faint, breathless or notice a racing heartbeat",
    ],
    urgent: [],
  },
  headache: {
    overview:
      "Headaches are reported with some GLP-1 medicines and can be linked to dehydration or changes in eating patterns.",
    selfCare: [
      "Drink enough fluids through the day",
      "Avoid skipping meals entirely",
      "Ask a pharmacist which pain relief is suitable for you",
    ],
    contactPrescriber: ["headaches are frequent, severe or not helped by simple pain relief"],
    urgent: [
      "you have a sudden, severe headache, or a headache with a stiff neck, rash, confusion, weakness or problems with vision or speech (call 999)",
    ],
  },
  dizziness: {
    overview:
      "Dizziness can occur, sometimes related to dehydration, eating less, or low blood pressure as weight falls.",
    selfCare: [
      "Stand up slowly from sitting or lying",
      "Stay well hydrated and avoid long gaps without food",
    ],
    contactPrescriber: [
      "dizziness keeps happening",
      "you take blood pressure medicines, which may need reviewing as your weight changes",
    ],
    urgent: ["you faint, or dizziness comes with chest pain, palpitations or breathlessness (call 999)"],
  },
  "hair-loss": {
    overview:
      "Hair shedding has been reported during GLP-1 treatment. Rapid weight loss from any cause can trigger temporary shedding, and low intake of protein or certain nutrients may contribute.",
    selfCare: [
      "Aim for adequate protein and a varied diet even while eating less",
      "Be gentle with hair care; avoid tight styles and harsh treatments",
    ],
    contactPrescriber: [
      "hair loss is sudden, patchy or significant",
      "you are concerned about your nutrition or want your iron or other levels checked",
    ],
    urgent: [],
  },
  "injection-site-reactions": {
    overview:
      "Redness, itching, swelling or bruising where you inject can occur with injectable GLP-1 medicines and usually settles on its own.",
    selfCare: [
      "Rotate injection sites (stomach, thigh or upper arm, as your instructions allow)",
      "Use a new needle for every injection where your pen requires one",
      "Follow the injection technique in the Patient Information Leaflet",
    ],
    contactPrescriber: [
      "a reaction is spreading, very painful, hot or does not settle",
      "you notice lumps that persist at injection sites",
    ],
    urgent: [
      "you have signs of a serious allergic reaction, such as swelling of the face, lips or throat, difficulty breathing or a widespread rash (call 999)",
    ],
  },
  "gallbladder-problems": {
    overview:
      "Gallstones and gallbladder inflammation are recognised risks with GLP-1 medicines and with rapid weight loss generally. They are listed as a warning in the product information.",
    selfCare: [
      "There is no self-care for gallbladder problems: know the warning signs below",
    ],
    contactPrescriber: [
      "you get repeated pain in the upper right of your tummy, especially after eating",
    ],
    urgent: [
      "you have severe pain in the upper right of your tummy, a high temperature, or yellowing of your skin or the whites of your eyes",
    ],
  },
  pancreatitis: {
    overview:
      "Inflammation of the pancreas (acute pancreatitis) is a rare but serious risk listed in the product information for GLP-1 medicines.",
    selfCare: [
      "There is no self-care for pancreatitis: stop and seek medical help if you have the warning signs below",
    ],
    contactPrescriber: [
      "you have had pancreatitis before; make sure your prescriber knows before starting treatment",
    ],
    urgent: [
      "you have severe, persistent pain in your stomach area that may spread to your back, with or without vomiting. Stop taking the medicine and seek urgent medical help (NHS 111, A&E or 999)",
    ],
  },
  "low-blood-sugar": {
    overview:
      "Low blood sugar (hypoglycaemia) is uncommon with GLP-1 medicines alone but is more likely if you also take insulin or a sulfonylurea for diabetes.",
    selfCare: [
      "If you have diabetes, follow your diabetes team's advice on monitoring",
      "Know the signs: shakiness, sweating, hunger, confusion or a fast heartbeat",
    ],
    contactPrescriber: [
      "you take insulin or a sulfonylurea; your diabetes medicines may need adjusting",
      "you have repeated episodes of low blood sugar",
    ],
    urgent: ["someone with low blood sugar becomes drowsy, confused or unconscious (call 999)"],
  },
};

export function getSideEffectGuidance(slug: string): SideEffectGuidance | undefined {
  return sideEffectGuidance[slug];
}
