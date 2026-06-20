// ============================================================
// GAME DATA — Plant Evolution Idle Game
// Real evolutionary science as the backbone, with optional
// speculative "what if" branches layered on top.
// ============================================================

const STAGES = [
  {
    id: "cyanobacteria",
    name: "Cyanobacteria",
    emoji: "🦠",
    threshold: 0, // light energy required to BE here (stage 0 = start)
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
    flavor: "Flowers, fruit, color, scent — a plant that advertises and trades resources with animals to spread itself."
  },
  {
    id: "specialized",
    name: "Specialized Modern Plant",
    emoji: "🌳",
    threshold: 150000,
    fact: "Modern plants show extreme specialization: C4 photosynthesis (like corn) evolved independently dozens of times as a more efficient carbon-fixing pathway in hot, dry climates. Carnivorous plants like Venus flytraps evolved to get nitrogen from prey instead of soil.",
    flavor: "The cutting edge of 400+ million years of plant evolution. Every adaptation here exists for a precise reason."
  },
  {
    id: "grasses",
    name: "Grasses",
    emoji: "🌾",
    threshold: 750000,
    fact: "Grasses appeared around 70 million years ago and didn't become widespread until roughly 30-40 million years ago. Their growth point sits near the soil rather than the tip, which is why grass survives grazing and mowing — something trees and most other plants can't tolerate.",
    flavor: "Low, tough, and built to be eaten and bounce back. This lineage will go on to feed most of human civilization."
  },
  {
    id: "carnivorous",
    name: "Carnivorous Plant",
    emoji: "🪤",
    threshold: 3500000,
    fact: "Carnivorous plants evolved independently at least six separate times. The Venus flytrap's snap-trap leaves close in under a second when trigger hairs are touched twice within about 20 seconds — a safeguard against wasting energy on false alarms like raindrops.",
    flavor: "When the soil won't give you nitrogen, take it directly from whatever wanders close enough."
  },
  {
    id: "mycorrhizal",
    name: "Mycorrhizal Partner",
    emoji: "🍄",
    threshold: 16000000,
    fact: "Around 90% of land plant species form mycorrhizal partnerships with fungi. The fungal network extends a plant's effective root reach enormously, trading sugars for water and minerals the fungus is far better at finding.",
    flavor: "Roots alone were never the whole story. Underground, a fungal network does half the work."
  },
  {
    id: "nitrogen_fixing",
    name: "Nitrogen-Fixer",
    emoji: "🫘",
    threshold: 80000000,
    fact: "Legumes host nitrogen-fixing bacteria (Rhizobium) in root nodules, converting atmospheric nitrogen gas into a usable form. This is why crop rotation with legumes naturally enriches soil — it's a real partnership farmers have exploited for thousands of years.",
    flavor: "Why wait for nitrogen to wash into the soil when the air is already 78% nitrogen — if you can just convince a bacterium to share?"
  },
  {
    id: "extremophile",
    name: "Extremophile Plant",
    emoji: "🌵",
    threshold: 400000000,
    fact: "Desert succulents use CAM photosynthesis, opening their pores only at night to minimize water loss. Some resurrection plants can lose over 95% of their water content and survive, rehydrating and resuming photosynthesis within hours of rain.",
    flavor: "Heat, drought, frost, salt — the harshest environments on land, and something green still found a way to grow there."
  }
];

// Idle generators — each themed to real plant biology.
// cost scales with count owned; each produces lightPerSecond.
const GENERATORS = [
  {
    id: "chlorophyll",
    name: "Chlorophyll Boost",
    emoji: "🟩",
    baseCost: 15,
    baseProduction: 0.1,
    unlockStage: 0,
    fact: "Chlorophyll absorbs red and blue light but reflects green — which is why plants look green to us."
  },
  {
    id: "rhizoid",
    name: "Rhizoid Patch",
    emoji: "🕸️",
    baseCost: 100,
    baseProduction: 1,
    unlockStage: 2,
    fact: "Rhizoids are thread-like structures mosses use to anchor to surfaces — simpler than true roots, with no internal vascular tissue."
  },
  {
    id: "vascular",
    name: "Vascular Bundle",
    emoji: "🟫",
    baseCost: 600,
    baseProduction: 6,
    unlockStage: 3,
    fact: "Xylem carries water upward from roots; phloem carries sugars made in leaves to the rest of the plant. Together they let plants grow far taller than mosses ever could."
  },
  {
    id: "cone",
    name: "Seed Cone",
    emoji: "🌰",
    baseCost: 3500,
    baseProduction: 35,
    unlockStage: 4,
    fact: "A pine cone's scales open and close in response to humidity, releasing seeds mainly during dry, windy conditions when they'll travel farthest."
  },
  {
    id: "pollinator",
    name: "Pollinator Partnership",
    emoji: "🐝",
    baseCost: 20000,
    baseProduction: 200,
    unlockStage: 5,
    fact: "Roughly 80% of flowering plants rely on animal pollinators. This is one of the most successful co-evolutionary partnerships in the history of life."
  },
  {
    id: "c4",
    name: "C4 Carbon Pathway",
    emoji: "⚙️",
    baseCost: 120000,
    baseProduction: 1100,
    unlockStage: 6,
    fact: "C4 photosynthesis concentrates CO2 before fixing it, dramatically reducing water loss. It evolved independently in over 60 plant lineages — a textbook case of convergent evolution."
  },
  {
    id: "rhizome",
    name: "Rhizome Spread",
    emoji: "🌾",
    baseCost: 750000,
    baseProduction: 6000,
    unlockStage: 7,
    fact: "Many grasses spread via rhizomes — underground stems that send up new shoots, letting a single grass plant cover huge areas and recover quickly after being grazed or cut."
  },
  {
    id: "trap",
    name: "Snap Trap",
    emoji: "🪤",
    baseCost: 4000000,
    baseProduction: 32000,
    unlockStage: 8,
    fact: "Pitcher plants use a different carnivory strategy than Venus flytraps — a slippery, nectar-lined tube that insects fall into and can't climb back out of, no movement required."
  },
  {
    id: "fungal_network",
    name: "Fungal Network",
    emoji: "🍄",
    baseCost: 18000000,
    baseProduction: 150000,
    unlockStage: 9,
    fact: "Mycorrhizal fungal networks can physically connect multiple separate plants underground, sometimes nicknamed the 'Wood Wide Web' — though scientists still debate how much real information transfer happens versus simple nutrient exchange.",
    synergyWith: ["mycorrhizal", "nitrogen_fixing"], // production boosted by these stages being unlocked
    synergyBonusPerStage: 0.25
  },
  {
    id: "root_nodule",
    name: "Root Nodule Colony",
    emoji: "🫘",
    baseCost: 90000000,
    baseProduction: 750000,
    unlockStage: 10,
    fact: "Root nodules form when Rhizobium bacteria infect legume root hairs, triggering the plant to grow a protective nodule around them — a controlled infection that turns into a nutrient-sharing factory.",
    synergyWith: ["mycorrhizal", "nitrogen_fixing"],
    synergyBonusPerStage: 0.25
  },
  {
    id: "cam_pathway",
    name: "CAM Photosynthesis",
    emoji: "🌵",
    baseCost: 450000000,
    baseProduction: 3800000,
    unlockStage: 11,
    fact: "CAM (Crassulacean Acid Metabolism) photosynthesis stores CO2 at night and uses it during the day, the reverse timing of most plants — a direct adaptation to minimize water loss in arid environments.",
    synergyWith: ["carnivorous", "mycorrhizal", "nitrogen_fixing", "extremophile"],
    synergyBonusPerStage: 0.15
  }
];

// Speculative branches — optional, fantastical, clearly flagged as imagination.
// Each unlocks once you reach a certain stage, costs light energy, and grants
// a fun (non-essential) bonus or cosmetic change.
const SPECULATIVE_BRANCHES = [
  {
    id: "bioluminescent_moss",
    name: "Bioluminescent Moss",
    emoji: "✨",
    requiresStage: "moss",
    cost: 800,
    isSpeculative: true,
    description: "SPECULATIVE: What if moss evolved bioluminescence to attract nocturnal spore-dispersing insects, the way some fungi (like Mycena) actually do?",
    effect: "+10% light energy generation at night-themed milestones (flavor bonus: +5% global production)",
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
    effect: "+8% global light production",
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
    effect: "+10% global light production",
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
    effect: "+12% global light production",
    productionMultiplier: 1.12
  },
  {
    id: "future_plant",
    name: "The Far-Future Plant",
    emoji: "🪐",
    requiresStage: "specialized",
    cost: 600000,
    isSpeculative: true,
    description: "SPECULATIVE: A purely imaginative leap beyond today's science — a plant adapted for extreme environments we associate with science fiction (low light, high radiation, minimal water). Pure speculation, not a real prediction.",
    effect: "+20% global light production",
    productionMultiplier: 1.20
  },
  {
    id: "engineered_drought",
    name: "Engineered Drought-Resistant Lineage",
    emoji: "🧬",
    requiresStage: "grasses",
    cost: 2000000,
    isSpeculative: true,
    description: "GROUNDED SPECULATION: Real CRISPR gene-editing research is already underway to enhance drought tolerance in crops. This imagines that work succeeding dramatically sooner and more broadly than current science supports.",
    effect: "+10% global light production",
    productionMultiplier: 1.10
  },
  {
    id: "active_trap_swarm",
    name: "Mobile Trap Swarm",
    emoji: "🦟",
    requiresStage: "carnivorous",
    cost: 10000000,
    isSpeculative: true,
    description: "WILD SPECULATION: No real plant can detach and move to hunt. This imagines carnivorous traps evolving limited independent mobility — a leap with no basis in current botany, included purely for fun.",
    effect: "+15% global light production",
    productionMultiplier: 1.15
  },
  {
    id: "fungal_communication",
    name: "Enhanced Fungal Communication Network",
    emoji: "📡",
    requiresStage: "mycorrhizal",
    cost: 40000000,
    isSpeculative: true,
    description: "GROUNDED SPECULATION: Real research explores whether mycorrhizal networks let plants share warning signals about pests or drought. This imagines that signaling becoming far more sophisticated and reliable than current evidence shows.",
    effect: "+12% global light production",
    productionMultiplier: 1.12
  },
  {
    id: "synthetic_nitrogen_organ",
    name: "Synthetic Nitrogen Organ",
    emoji: "⚗️",
    requiresStage: "nitrogen_fixing",
    cost: 180000000,
    isSpeculative: true,
    description: "WILD SPECULATION: What if a plant evolved an internal organ that fixed atmospheric nitrogen directly, with no bacterial partner needed at all? No known plant does this — it's a genuine biochemical leap beyond anything in nature.",
    effect: "+15% global light production",
    productionMultiplier: 1.15
  },
  {
    id: "radiation_tolerant_extremophile",
    name: "Radiation-Tolerant Extremophile",
    emoji: "☢️",
    requiresStage: "extremophile",
    cost: 900000000,
    isSpeculative: true,
    description: "WILD SPECULATION: Some real organisms (like Deinococcus radiodurans bacteria) tolerate extreme radiation. This imagines a plant lineage evolving comparable tolerance — well beyond what any known plant can survive.",
    effect: "+25% global light production",
    productionMultiplier: 1.25
  }
];

if (typeof module !== "undefined") {
  module.exports = { STAGES, GENERATORS, SPECULATIVE_BRANCHES };
}
