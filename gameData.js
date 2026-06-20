// ============================================================
// GAME DATA — Plant Evolution Idle Game
// Real evolutionary science as the backbone. The trunk path
// (STAGES) follows the traditional plant kingdom groups —
// algae -> bryophytes -> pteridophytes -> gymnosperms -> angiosperms.
// After reaching Flowering Plant, the player picks ONE of three
// real angiosperm clades (Eudicots / Monocots / Magnoliids) and
// progresses through real plant FAMILIES within that clade.
// Speculative "what if" branches layer optional imagination on top.
// ============================================================

// --- TRUNK STAGES (shared by every player, before the fork) ---
const STAGES = [
  {
    id: "cyanobacteria",
    name: "Cyanobacteria",
    emoji: "🦠",
    threshold: 0,
    fact: "Cyanobacteria were among the first organisms to perform photosynthesis, around 2.7 billion years ago. They're responsible for the 'Great Oxidation Event' that filled Earth's atmosphere with oxygen.",
    flavor: "A single-celled photosynthesizer floating in ancient water. Humble beginnings."
  },
  {
    id: "algae",
    name: "Green Algae",
    emoji: "🟢",
    threshold: 50,
    fact: "Green algae (Charophyta) are the closest living relatives of land plants. All land plants descend from a freshwater algal ancestor.",
    flavor: "Multicellular now, drifting in sunlit shallows. The blueprint for everything green that follows."
  },
  {
    id: "moss",
    name: "Moss",
    emoji: "🌱",
    threshold: 250,
    fact: "Mosses were among the first plants to colonize land, around 470 million years ago. They have no true roots — just rhizoids — and no vascular tissue to move water internally.",
    flavor: "Land! No roots yet, no real stems — just a low green carpet hugging the wet ground."
  },
  {
    id: "fern",
    name: "Fern",
    emoji: "🌿",
    threshold: 1200,
    fact: "Ferns evolved vascular tissue (xylem and phloem), letting them grow taller by transporting water and nutrients internally. They reproduce via spores, not seeds.",
    flavor: "Real stems, real height. Water now travels inside the plant instead of just soaking through it."
  },
  {
    id: "conifer",
    name: "Conifer",
    emoji: "🌲",
    threshold: 6000,
    fact: "Conifers (gymnosperms) were the first plants to evolve seeds, around 350 million years ago. A seed protects the embryo and carries its own food supply — a huge survival upgrade over spores.",
    flavor: "Seeds change everything. An embryo wrapped in protection and rations, ready to wait out a bad season."
  },
  {
    id: "flowering",
    name: "Flowering Plant",
    emoji: "🌸",
    threshold: 30000,
    fact: "Angiosperms (flowering plants) appeared roughly 130 million years ago and now make up about 90% of all living plant species. Their success is tied to co-evolution with pollinators like insects.",
    flavor: "Flowers, fruit, color, scent — a plant that advertises and trades resources with animals to spread itself. From here, your lineage will specialize."
  }
];

// The trunk stage id after which the player must choose a clade.
const FORK_AFTER_STAGE_ID = "flowering";

// --- CLADES: the three real branches of flowering plants ---
const CLADES = [
  {
    id: "eudicots",
    name: "Eudicots",
    emoji: "🌿",
    shortFact: "About 75% of all flowering plant species are eudicots — roses, beans, sunflowers, oaks, tomatoes. Two seed leaves, netted leaf veins, vascular bundles arranged in a ring (which is why eudicots include almost all broadleaf trees).",
    familyStages: [
      {
        id: "rosaceae",
        name: "Rosaceae (Rose Family)",
        emoji: "🌹",
        threshold: 150000,
        fact: "The rose family includes roses, apples, pears, cherries, strawberries, and almonds. Most have five-petaled flowers and produce a pome or drupe — fleshy fruit types built around a protected seed.",
        flavor: "Showy flowers, edible fruit, and a five-petal blueprint reused across hundreds of beloved food crops."
      },
      {
        id: "fabaceae",
        name: "Fabaceae (Legume Family)",
        emoji: "🫘",
        threshold: 750000,
        fact: "Legumes host nitrogen-fixing bacteria (Rhizobium) in root nodules, converting atmospheric nitrogen gas into a usable form. This is why crop rotation with legumes naturally enriches soil — a real partnership farmers have exploited for thousands of years.",
        flavor: "Why wait for nitrogen to wash into the soil when the air is already 78% nitrogen — if you can just convince a bacterium to share?"
      },
      {
        id: "pitcher_plant",
        name: "Pitcher Plant Families",
        emoji: "🪤",
        threshold: 3500000,
        fact: "Carnivory in eudicots evolved independently at least twice: Sarraceniaceae (North American pitcher plants) and Nepenthaceae (Old World tropical pitcher plants) aren't closely related — they converged on the same slippery, nectar-lined trap strategy from different starting points.",
        flavor: "When the soil won't give you nitrogen, take it directly from whatever wanders in and can't climb back out."
      }
    ]
  },
  {
    id: "monocots",
    name: "Monocots",
    emoji: "🌾",
    shortFact: "About 23% of flowering plant species are monocots — grasses, orchids, palms, lilies. One seed leaf, parallel leaf veins, scattered (not ringed) vascular bundles, which is part of why true woody trees are rare among monocots.",
    familyStages: [
      {
        id: "poaceae",
        name: "Poaceae (Grass Family)",
        emoji: "🌾",
        threshold: 150000,
        fact: "Grasses appeared around 70 million years ago and didn't become widespread until roughly 30-40 million years ago. Their growth point sits near the soil rather than the tip, which is why grass survives grazing and mowing — something most other plants can't tolerate.",
        flavor: "Low, tough, and built to be eaten and bounce back. This family will go on to feed most of human civilization."
      },
      {
        id: "orchidaceae",
        name: "Orchidaceae (Orchid Family)",
        emoji: "🌺",
        threshold: 750000,
        fact: "Orchidaceae is one of the two largest plant families on Earth, with extraordinarily specialized flowers — some species mimic the exact shape and scent of a specific female insect to trick males into attempting to mate with the flower, pollinating it in the process.",
        flavor: "Extreme specialization: flowers that deceive, mimic, and lure a single very specific pollinator."
      },
      {
        id: "arecaceae",
        name: "Arecaceae (Palm Family)",
        emoji: "🌴",
        threshold: 3500000,
        fact: "Palms are unusual monocots: most monocots stay herbaceous, but palms grow tall and tree-like without true secondary wood growth, instead thickening their stem cells early and never branching from a single growing point at the crown.",
        flavor: "A monocot that found its own way to become a tree, without ever borrowing the eudicot playbook for wood."
      }
    ]
  },
  {
    id: "magnoliids",
    name: "Magnoliids",
    emoji: "🌼",
    shortFact: "Only about 2-3% of flowering plant species are magnoliids — magnolias, cinnamon, black pepper, avocado. They retain some ancestral traits that bridge toward earlier seed plants, like pollen with a single pore instead of the eudicot triaperturate (three-pore) pattern.",
    familyStages: [
      {
        id: "magnoliaceae",
        name: "Magnoliaceae (Magnolia Family)",
        emoji: "🌼",
        threshold: 150000,
        fact: "Magnolias are considered among the most ancestral-looking flowering plants alive: their large, simple flowers have numerous separate petal-like parts rather than the fused, specialized flower structures seen in most later angiosperms.",
        flavor: "A flower built the old way — broad, simple, and showing its evolutionary age in every petal."
      },
      {
        id: "lauraceae",
        name: "Lauraceae (Laurel Family)",
        emoji: "🍃",
        threshold: 750000,
        fact: "The laurel family includes cinnamon, bay laurel, and avocado. Many produce strong aromatic oils in their leaves and bark — a real chemical defense against herbivores and pathogens that also happens to make them valuable as spices.",
        flavor: "Chemistry as defense: aromatic oils that deter predators and, incidentally, flavor a thousand kitchens."
      },
      {
        id: "piperaceae",
        name: "Piperaceae (Pepper Family)",
        emoji: "🌶️",
        threshold: 3500000,
        fact: "Black pepper (Piper nigrum) produces piperine, an alkaloid that irritates predators' mucous membranes — a chemical defense so effective that humans now farm the plant specifically to harvest that irritant as a spice.",
        flavor: "A defense chemical so successful at deterring predators that it became one of the most traded substances in human history."
      }
    ]
  }
];

// --- Idle generators ---
const GENERATORS = [
  {
    id: "chlorophyll",
    name: "Chlorophyll Boost",
    emoji: "🟩",
    baseCost: 15,
    baseProduction: 0.1,
    unlockStage: 0,
    produces: "light",
    fact: "Chlorophyll absorbs red and blue light but reflects green — which is why plants look green to us."
  },
  {
    id: "rootlet",
    name: "Rootlet Cluster",
    emoji: "💧",
    baseCost: 20,
    baseProduction: 0.12,
    unlockStage: 1,
    produces: "water",
    fact: "Even simple algae absorb water and dissolved minerals directly across their cell membranes, with no roots required."
  },
  {
    id: "rhizoid",
    name: "Rhizoid Patch",
    emoji: "🕸️",
    baseCost: 100,
    baseProduction: 1,
    unlockStage: 2,
    produces: "water",
    fact: "Rhizoids are thread-like structures mosses use to anchor to surfaces — simpler than true roots, with no internal vascular tissue."
  },
  {
    id: "vascular",
    name: "Vascular Bundle",
    emoji: "🟫",
    baseCost: 600,
    baseProduction: 6,
    unlockStage: 3,
    produces: "light",
    costWater: 80,
    fact: "Xylem carries water upward from roots; phloem carries sugars made in leaves to the rest of the plant. Together they let plants grow far taller than mosses ever could."
  },
  {
    id: "true_root",
    name: "True Root System",
    emoji: "🌰",
    baseCost: 500,
    baseProduction: 5,
    unlockStage: 3,
    produces: "water",
    fact: "True roots, unlike rhizoids, contain vascular tissue and can branch extensively underground, dramatically increasing the surface area available for water absorption."
  },
  {
    id: "cone",
    name: "Seed Cone",
    emoji: "🌰",
    baseCost: 3500,
    baseProduction: 35,
    unlockStage: 4,
    produces: "light",
    fact: "A pine cone's scales open and close in response to humidity, releasing seeds mainly during dry, windy conditions when they'll travel farthest."
  },
  {
    id: "pollinator",
    name: "Pollinator Partnership",
    emoji: "🐝",
    baseCost: 20000,
    baseProduction: 200,
    unlockStage: 5,
    produces: "light",
    costWater: 2000,
    fact: "Roughly 80% of flowering plants rely on animal pollinators. This is one of the most successful co-evolutionary partnerships in the history of life."
  },
  {
    id: "transpiration",
    name: "Transpiration Stream",
    emoji: "💦",
    baseCost: 15000,
    baseProduction: 180,
    unlockStage: 5,
    produces: "water",
    fact: "Transpiration — water evaporating from leaf pores — creates negative pressure that pulls water upward from the roots, sometimes lifting it over 100 meters in tall trees."
  },

  // --- EUDICOTS clade generators ---
  {
    id: "showy_flower",
    name: "Showy Five-Petal Flower",
    emoji: "🌸",
    baseCost: 150000,
    baseProduction: 1100,
    produces: "light",
    cladeId: "eudicots",
    unlockFamilyStage: "rosaceae",
    fact: "Rosaceae flowers typically have five petals and five sepals arranged in a radial pattern — a structural template reused across apples, roses, cherries, and strawberries alike."
  },
  {
    id: "root_nodule",
    name: "Root Nodule Colony",
    emoji: "🫘",
    baseCost: 750000,
    baseProduction: 6000,
    produces: "light",
    cladeId: "eudicots",
    unlockFamilyStage: "fabaceae",
    fact: "Root nodules form when Rhizobium bacteria infect legume root hairs, triggering the plant to grow a protective nodule around them — a controlled infection that turns into a nutrient-sharing factory."
  },
  {
    id: "trap",
    name: "Slippery Pitcher Trap",
    emoji: "🪤",
    baseCost: 3500000,
    baseProduction: 32000,
    produces: "light",
    costWater: 400000,
    cladeId: "eudicots",
    unlockFamilyStage: "pitcher_plant",
    fact: "Pitcher plants use a passive carnivory strategy — a slippery, nectar-lined tube that insects fall into and can't climb back out of, no movement required."
  },

  // --- MONOCOTS clade generators ---
  {
    id: "rhizome",
    name: "Rhizome Spread",
    emoji: "🌾",
    baseCost: 150000,
    baseProduction: 1100,
    produces: "light",
    cladeId: "monocots",
    unlockFamilyStage: "poaceae",
    fact: "Many grasses spread via rhizomes — underground stems that send up new shoots, letting a single grass plant cover huge areas and recover quickly after being grazed or cut."
  },
  {
    id: "mimicry_flower",
    name: "Pollinator-Mimicry Flower",
    emoji: "🌺",
    baseCost: 750000,
    baseProduction: 6000,
    produces: "light",
    cladeId: "monocots",
    unlockFamilyStage: "orchidaceae",
    fact: "Some orchids produce flowers that visually and chemically mimic female insects so precisely that males attempt to mate with them, inadvertently pollinating the orchid — a strategy called pseudocopulation."
  },
  {
    id: "crown_growth",
    name: "Single Crown Growth Point",
    emoji: "🌴",
    baseCost: 3500000,
    baseProduction: 32000,
    produces: "light",
    cladeId: "monocots",
    unlockFamilyStage: "arecaceae",
    fact: "A palm tree has only one growing point at its crown — if that single point is damaged, the palm cannot branch or recover the way a typical tree can."
  },

  // --- MAGNOLIIDS clade generators ---
  {
    id: "ancestral_petal",
    name: "Ancestral Petal Whorl",
    emoji: "🌼",
    baseCost: 150000,
    baseProduction: 1300,
    produces: "light",
    cladeId: "magnoliids",
    unlockFamilyStage: "magnoliaceae",
    fact: "Magnolia flowers have numerous separate petal-like tepals arranged in a spiral rather than the fused, highly specialized floral parts seen in most later-evolving flowering plants — a real ancestral trait."
  },
  {
    id: "aromatic_oil",
    name: "Aromatic Oil Glands",
    emoji: "🍃",
    baseCost: 750000,
    baseProduction: 7200,
    produces: "light",
    cladeId: "magnoliids",
    unlockFamilyStage: "lauraceae",
    fact: "Laurel family plants store aromatic oils in their leaves and bark as a chemical defense against herbivores and pathogens — the same compounds we harvest as cinnamon, bay leaf, and camphor."
  },
  {
    id: "alkaloid_defense",
    name: "Alkaloid Defense Compound",
    emoji: "🌶️",
    baseCost: 3500000,
    baseProduction: 38000,
    produces: "light",
    cladeId: "magnoliids",
    unlockFamilyStage: "piperaceae",
    fact: "Piperine, the alkaloid that gives black pepper its bite, evolved as an irritant to deter animals from eating the plant's fruit — a defense mechanism humans repurposed as a global spice."
  }
];

// Speculative branches — optional, fantastical, clearly flagged as imagination.
// Once owned, branches survive every future Mass Extinction Event (prestige).
const SPECULATIVE_BRANCHES = [
  {
    id: "bioluminescent_moss",
    name: "Bioluminescent Moss",
    emoji: "✨",
    requiresStage: "moss",
    cost: 800,
    isSpeculative: true,
    description: "SPECULATIVE: What if moss evolved bioluminescence to attract nocturnal spore-dispersing insects, the way some fungi (like Mycena) actually do?",
    effect: "+5% global production",
    productionMultiplier: 1.05
  },
  {
    id: "giant_fern",
    name: "Towering Fern Revival",
    emoji: "🦕",
    requiresStage: "fern",
    cost: 4000,
    isSpeculative: true,
    description: "SPECULATIVE: Real tree-sized ferns (like Psaronius) existed 300 million years ago and went extinct. What if that lineage never died out?",
    effect: "+8% global production",
    productionMultiplier: 1.08
  },
  {
    id: "mobile_seeds",
    name: "Self-Propelled Seeds",
    emoji: "🚀",
    requiresStage: "conifer",
    cost: 25000,
    isSpeculative: true,
    description: "SPECULATIVE: What if seeds evolved a primitive muscular pulse, like a tumbleweed with intent, to actively seek better soil instead of waiting for wind?",
    effect: "+10% global production",
    productionMultiplier: 1.10
  },
  {
    id: "color_shift_flowers",
    name: "Color-Shifting Flowers",
    emoji: "🌈",
    requiresStage: "flowering",
    cost: 100000,
    isSpeculative: true,
    description: "SPECULATIVE: Some real flowers already shift UV patterns invisible to us. What if a lineage evolved full visible-spectrum color shifting to attract a wider range of pollinators across seasons?",
    effect: "+12% global production",
    productionMultiplier: 1.12
  },
  {
    id: "engineered_drought",
    name: "Engineered Drought-Resistant Lineage",
    emoji: "🧬",
    requiresClade: "monocots",
    requiresFamilyStage: "poaceae",
    cost: 2000000,
    isSpeculative: true,
    description: "GROUNDED SPECULATION: Real CRISPR gene-editing research is already underway to enhance drought tolerance in crops. This imagines that work succeeding dramatically sooner and more broadly than current science supports.",
    effect: "+10% global production",
    productionMultiplier: 1.10
  },
  {
    id: "active_trap_swarm",
    name: "Mobile Trap Swarm",
    emoji: "🦟",
    requiresClade: "eudicots",
    requiresFamilyStage: "pitcher_plant",
    cost: 10000000,
    isSpeculative: true,
    description: "WILD SPECULATION: No real plant can detach and move to hunt. This imagines carnivorous traps evolving limited independent mobility — a leap with no basis in current botany, included purely for fun.",
    effect: "+15% global production",
    productionMultiplier: 1.15
  },
  {
    id: "synthetic_nitrogen_organ",
    name: "Synthetic Nitrogen Organ",
    emoji: "⚗️",
    requiresClade: "eudicots",
    requiresFamilyStage: "fabaceae",
    cost: 18000000,
    costWater: 2000000,
    isSpeculative: true,
    description: "WILD SPECULATION: What if a plant evolved an internal organ that fixed atmospheric nitrogen directly, with no bacterial partner needed at all? No known plant does this — it's a genuine biochemical leap beyond anything in nature.",
    effect: "+15% global production",
    productionMultiplier: 1.15
  },
  {
    id: "mimicry_overdrive",
    name: "Universal Pollinator Mimicry",
    emoji: "🦋",
    requiresClade: "monocots",
    requiresFamilyStage: "orchidaceae",
    cost: 18000000,
    isSpeculative: true,
    description: "WILD SPECULATION: Real orchids mimic one specific pollinator species. This imagines a lineage that could shift its mimicry to match whichever pollinator is locally abundant — a flexibility no known orchid has.",
    effect: "+15% global production",
    productionMultiplier: 1.15
  },
  {
    id: "self_grafting_canopy",
    name: "Self-Grafting Canopy Network",
    emoji: "🌳",
    requiresClade: "monocots",
    requiresFamilyStage: "arecaceae",
    cost: 60000000,
    isSpeculative: true,
    description: "WILD SPECULATION: Real palms never branch from a single crown. This imagines a palm lineage whose crowns could fuse and share resources with neighboring palms underground — pure speculation.",
    effect: "+18% global production",
    productionMultiplier: 1.18
  },
  {
    id: "ultra_aromatic_defense",
    name: "Ultra-Aromatic Defense Cloud",
    emoji: "🍃",
    requiresClade: "magnoliids",
    requiresFamilyStage: "lauraceae",
    cost: 60000000,
    isSpeculative: true,
    description: "GROUNDED SPECULATION: Real laurel family plants release aromatic oils when damaged. This imagines a lineage that releases an airborne defensive cloud strong enough to also deter herbivores from nearby plants.",
    effect: "+15% global production",
    productionMultiplier: 1.15
  },
  {
    id: "extreme_alkaloid",
    name: "Extreme Alkaloid Lineage",
    emoji: "☢️",
    requiresClade: "magnoliids",
    requiresFamilyStage: "piperaceae",
    cost: 200000000,
    costWater: 20000000,
    isSpeculative: true,
    description: "WILD SPECULATION: Black pepper's piperine deters predators through irritation. This imagines a lineage evolving an alkaloid potent enough to be genuinely toxic to nearly anything that eats it — beyond anything in the real Piperaceae family.",
    effect: "+25% global production",
    productionMultiplier: 1.25
  }
];

// Prestige — "Mass Extinction Event"
const PRESTIGE_CONFIG = {
  unlockStage: "flowering",
  exponent: 0.5,
  divisor: 100,
  multiplierPerPoint: 0.02,
  fact: "Earth has experienced five major mass extinctions. Each time, surviving plant lineages didn't start over from nothing — they carried forward whatever adaptations let them survive, becoming the seed for everything that followed."
};

// Clade completion perks — reaching the FINAL family stage of a clade for
// the first time (in any run, ever) permanently unlocks a small head start
// toward that clade in all future runs, even if a different clade is chosen.
const CLADE_COMPLETION_PERKS = {
  eudicots: {
    description: "Future runs start with 3 free Showy Five-Petal Flower generators already owned, the moment Eudicots is chosen.",
    freeGeneratorId: "showy_flower",
    freeGeneratorCount: 3
  },
  monocots: {
    description: "Future runs start with 3 free Rhizome Spread generators already owned, the moment Monocots is chosen.",
    freeGeneratorId: "rhizome",
    freeGeneratorCount: 3
  },
  magnoliids: {
    description: "Future runs start with 3 free Ancestral Petal Whorl generators already owned, the moment Magnoliids is chosen.",
    freeGeneratorId: "ancestral_petal",
    freeGeneratorCount: 3
  }
};

if (typeof module !== "undefined") {
  module.exports = { STAGES, CLADES, FORK_AFTER_STAGE_ID, GENERATORS, SPECULATIVE_BRANCHES, PRESTIGE_CONFIG, CLADE_COMPLETION_PERKS };
}
