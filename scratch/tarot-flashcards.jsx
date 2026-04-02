import { useState, useEffect, useCallback } from "react";

const TAROT_DECK = [
  // ── MAJOR ARCANA ──────────────────────────────────────────────────────────
  { id:0, term:"0 – The Fool", suit:"Major Arcana", category:"major", number:0,
    keywords:["beginnings","spontaneity","innocence","free spirit"],
    definition:"The Fool marks the soul's first breath upon a new journey — unburdened, trusting the winds of fate. He leaps before he looks, carrying only wonder. Signifies fresh starts, leaps of faith, and divine naivety.",
    reversed:"Recklessness, poor judgment, ignoring warnings, or paralysis at the threshold." },
  { id:1, term:"I – The Magician", suit:"Major Arcana", category:"major", number:1,
    keywords:["willpower","skill","resourcefulness","manifestation"],
    definition:"All four elemental tools lie upon the Magician's altar — wand, cup, sword, coin. He channels the infinite above into the finite below. Signifies mastery, concentration, and the will to manifest.",
    reversed:"Manipulation, untapped potential, wasted talent, or trickery." },
  { id:2, term:"II – The High Priestess", suit:"Major Arcana", category:"major", number:2,
    keywords:["intuition","mystery","subconscious","inner knowing"],
    definition:"She sits between the pillars of light and shadow, the veil of pomegranates behind her. She does not speak — she *knows*. Signifies hidden knowledge, dreams, and the voice beneath the voice.",
    reversed:"Repressed intuition, surface-level thinking, secrets withheld from self." },
  { id:3, term:"III – The Empress", suit:"Major Arcana", category:"major", number:3,
    keywords:["fertility","abundance","nature","nurturing"],
    definition:"Crowned with stars, robed in pomegranate silk, she rules the domain of living things. The Earth itself is her body. Signifies creativity, sensuality, motherhood, and material abundance.",
    reversed:"Creative block, dependence, smothering, or neglect of the natural self." },
  { id:4, term:"IV – The Emperor", suit:"Major Arcana", category:"major", number:4,
    keywords:["authority","structure","stability","control"],
    definition:"Throne of granite, armor of ambition — the Emperor holds dominion through order and will. He is the law before the court is built. Signifies fatherhood, governance, discipline, and earthly power.",
    reversed:"Tyranny, rigidity, domination, or loss of control." },
  { id:5, term:"V – The Hierophant", suit:"Major Arcana", category:"major", number:5,
    keywords:["tradition","conformity","morality","spiritual teaching"],
    definition:"He holds the triple cross and speaks in the language of institutions. The two acolytes at his feet await permission to think. Signifies established doctrine, mentorship, and the sacred within structure.",
    reversed:"Rebellion against convention, new approaches, challenging orthodoxy." },
  { id:6, term:"VI – The Lovers", suit:"Major Arcana", category:"major", number:6,
    keywords:["love","harmony","relationships","choices"],
    definition:"Beneath Raphael's wings, two souls stand naked at the crossroads of the garden. The choice is not merely who to love, but *who to be*. Signifies alignment of values, sacred union, and consequential decisions.",
    reversed:"Disharmony, imbalance, misalignment of values, or difficult choice evaded." },
  { id:7, term:"VII – The Chariot", suit:"Major Arcana", category:"major", number:7,
    keywords:["control","willpower","triumph","determination"],
    definition:"Two sphinxes — one dark, one light — pull in opposition, yet the charioteer's will holds them. Victory is not the absence of conflict but its mastery. Signifies focused drive, discipline, and hard-won success.",
    reversed:"Lack of direction, aggression, losing control, or scattered energy." },
  { id:8, term:"VIII – Strength", suit:"Major Arcana", category:"major", number:8,
    keywords:["courage","patience","compassion","inner strength"],
    definition:"She closes the lion's mouth with a gentle hand — no chains, no weapons. Courage here is tenderness applied with certainty. Signifies fortitude, soft power, endurance, and the taming of one's own nature.",
    reversed:"Self-doubt, weakness, cowardice, or uncontrolled impulse." },
  { id:9, term:"IX – The Hermit", suit:"Major Arcana", category:"major", number:9,
    keywords:["solitude","introspection","guidance","inner wisdom"],
    definition:"Alone at the peak, lantern raised — the Hermit lights the path for those who follow, but walks it himself first. Signifies withdrawal, soul-searching, and the light that only solitude can kindle.",
    reversed:"Isolation, loneliness, withdrawal that becomes exile, rejection of guidance." },
  { id:10, term:"X – Wheel of Fortune", suit:"Major Arcana", category:"major", number:10,
    keywords:["cycles","fate","change","luck"],
    definition:"The wheel turns regardless of who clings to the rim. Sphinx at the summit, serpent in descent. All things return; all things depart. Signifies fate, karma, turning points, and the eternal churn of circumstance.",
    reversed:"Bad luck, resistance to change, breaking cycles, or clinging to what has passed." },
  { id:11, term:"XI – Justice", suit:"Major Arcana", category:"major", number:11,
    keywords:["fairness","truth","cause & effect","law"],
    definition:"Scales in one hand, sword in the other — Justice neither flinches nor favors. She is the consequence of every action taken in shadow. Signifies objective truth, legal matters, accountability, and karmic balance.",
    reversed:"Unfairness, dishonesty, evasion of consequences, or bias clouding judgment." },
  { id:12, term:"XII – The Hanged Man", suit:"Major Arcana", category:"major", number:12,
    keywords:["suspension","sacrifice","new perspective","letting go"],
    definition:"He hangs by one foot, serene amid inversion — his halo glows. He has surrendered *to* see. Signifies deliberate pause, willing sacrifice, enlightenment through release, and the wisdom gained by stopping.",
    reversed:"Martyrdom without purpose, stalling, indecision, or resistance to necessary surrender." },
  { id:13, term:"XIII – Death", suit:"Major Arcana", category:"major", number:13,
    keywords:["endings","transformation","transition","change"],
    definition:"The pale rider comes — not to devour but to *clear*. The sun rises at the horizon beyond him. What dies feeds what is to come. Signifies profound endings, transition, metamorphosis, and the irreversible letting go.",
    reversed:"Fear of change, stagnation, clinging to the old, or a slow and painful ending." },
  { id:14, term:"XIV – Temperance", suit:"Major Arcana", category:"major", number:14,
    keywords:["balance","moderation","patience","purpose"],
    definition:"The angel pours water between two cups without losing a drop — one foot in the stream, one on the earth. Alchemy requires time. Signifies synthesis, moderation, long-term vision, and healing through balance.",
    reversed:"Imbalance, excess, lack of vision, or impatience fracturing the work." },
  { id:15, term:"XV – The Devil", suit:"Major Arcana", category:"major", number:15,
    keywords:["bondage","materialism","addiction","shadow self"],
    definition:"Two figures in chains — yet the chains hang loose. They stay by choice, by comfort, by habit. The Devil is not a captor; he is a mirror. Signifies entrapment, obsession, unhealthy patterns, and the shadow that demands acknowledgment.",
    reversed:"Freedom, release from chains, reclaiming power, or facing the shadow to dissolve it." },
  { id:16, term:"XVI – The Tower", suit:"Major Arcana", category:"major", number:16,
    keywords:["sudden change","upheaval","chaos","revelation"],
    definition:"Lightning cracks the crown; the proud tower crumbles and the people fall. What was built on false ground cannot stand. Signifies sudden disruption, ego collapse, catastrophic revelation, and violent but necessary change.",
    reversed:"Avoiding disaster, delayed collapse, fear of change, or resisting inevitable ruin." },
  { id:17, term:"XVII – The Star", suit:"Major Arcana", category:"major", number:17,
    keywords:["hope","renewal","serenity","inspiration"],
    definition:"Naked beneath the eight-pointed star, she pours the waters of life onto land and stream alike. After the Tower, she comes. Signifies hope rekindled, healing, divine guidance, and the serenity that follows the storm.",
    reversed:"Despair, lack of faith, disconnection from beauty, or hope that becomes delusion." },
  { id:18, term:"XVIII – The Moon", suit:"Major Arcana", category:"major", number:18,
    keywords:["illusion","fear","the unconscious","confusion"],
    definition:"The crayfish emerges from the deep; the dog and wolf howl at the same cold light. The path through the towers is unclear. Signifies illusion, anxiety, subconscious fears, and the landscapes that exist only after dark.",
    reversed:"Release of fear, clarity emerging, repressed emotion surfacing, confusion lifting." },
  { id:19, term:"XIX – The Sun", suit:"Major Arcana", category:"major", number:19,
    keywords:["joy","success","vitality","positivity"],
    definition:"The child rides naked beneath the blazing sun, sunflowers raising their faces beside him. Nothing is hidden; everything flourishes. Signifies radiant joy, clarity, achievement, and the world when the veil is lifted.",
    reversed:"Temporary depression, inner child wounded, pessimism obscuring genuine light." },
  { id:20, term:"XX – Judgement", suit:"Major Arcana", category:"major", number:20,
    keywords:["reflection","reckoning","awakening","absolution"],
    definition:"The angel's horn sounds above the risen dead — they lift their arms not in terror but in recognition. They have been called. Signifies a final reckoning, spiritual awakening, answering a higher call, and liberation through honest self-appraisal.",
    reversed:"Self-doubt blocking the call, refusing to forgive self, ignoring the moment of awakening." },
  { id:21, term:"XXI – The World", suit:"Major Arcana", category:"major", number:21,
    keywords:["completion","integration","accomplishment","wholeness"],
    definition:"She dances within the laurel wreath, four elemental guardians at the corners. The great cycle is whole. Signifies completion, triumph, cosmic integration, and the fulfillment earned through every card before.",
    reversed:"Incompletion, shortcuts, lack of closure, or refusing the final step." },

  // ── WANDS ─────────────────────────────────────────────────────────────────
  { id:22, term:"Ace of Wands", suit:"Wands", category:"minor", number:1,
    keywords:["inspiration","new beginnings","potential","spark"],
    definition:"A hand emerges from a cloud gripping a living wand, leaves budding from it. The fire of creation offered freely. Signifies creative spark, new ventures, enthusiasm, and raw potential.",
    reversed:"Delays, missed opportunity, creative block, or spark without direction." },
  { id:23, term:"Two of Wands", suit:"Wands", category:"minor", number:2,
    keywords:["planning","future","decisions","leaving comfort zone"],
    definition:"A figure surveys a vast horizon, globe in hand. The world can be claimed — but first, a plan. Signifies long-range thinking, ambition, and the moment before the leap.",
    reversed:"Fear of the unknown, lack of planning, staying small, or poor foresight." },
  { id:24, term:"Three of Wands", suit:"Wands", category:"minor", number:3,
    keywords:["expansion","foresight","enterprise","overseas"],
    definition:"The ships have set sail; the figure watches them go with confidence. The work has been done; now comes return. Signifies expansion, looking ahead, commerce, and patience with results.",
    reversed:"Delays, obstacles, disappointment, or enterprises that fail to launch." },
  { id:25, term:"Four of Wands", suit:"Wands", category:"minor", number:4,
    keywords:["celebration","harmony","homecoming","stability"],
    definition:"Garlands hang between four wands; figures dance and rejoice. A moment of earned peace and communal joy. Signifies milestones, homecoming, festivities, and the sweetness of foundations laid.",
    reversed:"Conflict at home, instability, cancelled celebrations, or lack of belonging." },
  { id:26, term:"Five of Wands", suit:"Wands", category:"minor", number:5,
    keywords:["conflict","competition","tension","struggle"],
    definition:"Five figures clash with wands — yet no one falls. This is contest, not war. Signifies competitive tension, petty conflict, and the friction that either forges or fractures.",
    reversed:"Avoiding conflict, inner tension, competition turning covert, or chaos subsiding." },
  { id:27, term:"Six of Wands", suit:"Wands", category:"minor", number:6,
    keywords:["victory","recognition","progress","self-confidence"],
    definition:"The victor rides through the crowd, wreath upon wand and brow. The world acknowledges the work. Signifies public success, acknowledgment, triumph after effort, and well-deserved acclaim.",
    reversed:"Egotism, fall from grace, disloyalty, or success that breeds arrogance." },
  { id:28, term:"Seven of Wands", suit:"Wands", category:"minor", number:7,
    keywords:["challenge","perseverance","defensiveness","conviction"],
    definition:"A figure stands on high ground, holding back six wands aimed upward. The position is precarious, but it is *held*. Signifies defending what is yours, standing firm, and the courage of high stakes.",
    reversed:"Giving up, overwhelmed, paranoia, or capitulating under pressure." },
  { id:29, term:"Eight of Wands", suit:"Wands", category:"minor", number:8,
    keywords:["swift action","movement","speed","air travel"],
    definition:"Eight wands fly through clear sky — no obstruction, all direction. The waiting is over; the motion is total. Signifies rapid progress, swift events, news arriving, and everything accelerating at once.",
    reversed:"Delays, frustration, scattered energy, or news that disrupts rather than propels." },
  { id:30, term:"Nine of Wands", suit:"Wands", category:"minor", number:9,
    keywords:["resilience","courage","persistence","test of faith"],
    definition:"Wounded but upright, the figure holds the final wand among eight others. He has endured. One more effort remains. Signifies perseverance, defensive posture, weary courage, and the last stretch before victory.",
    reversed:"Stubbornness, paranoia, refusing help, or giving up just before the end." },
  { id:31, term:"Ten of Wands", suit:"Wands", category:"minor", number:10,
    keywords:["burden","responsibility","hard work","completion"],
    definition:"A figure labors under the weight of ten wands, the town visible ahead. So much carried — so close. Signifies overextension, responsibility overload, approaching completion, and the cost of ambition.",
    reversed:"Doing too much, taking on others' burdens, or being unable to delegate." },
  { id:32, term:"Page of Wands", suit:"Wands", category:"minor", number:11,
    keywords:["enthusiasm","exploration","discovery","free spirit"],
    definition:"Young and wide-eyed, the Page stands in the desert, wand before him, learning to read the fire. Signifies a curious beginner, news of a creative venture, and the first flame of passion.",
    reversed:"Lack of direction, immaturity, delays to creative plans, or scattered excitement." },
  { id:33, term:"Knight of Wands", suit:"Wands", category:"minor", number:12,
    keywords:["energy","passion","adventure","impulsiveness"],
    definition:"The Knight charges across charred landscape, horse rearing, plume aflame. He moves before he thinks — and sometimes that is exactly what is required. Signifies bold action, charisma, and passionate but volatile energy.",
    reversed:"Recklessness, anger, lack of follow-through, or haste creating chaos." },
  { id:34, term:"Queen of Wands", suit:"Wands", category:"minor", number:13,
    keywords:["confidence","independence","courage","vibrancy"],
    definition:"Sunflower in hand, black cat at her feet, she rules through warmth and certainty. No one doubts her presence. Signifies bold self-expression, magnetic confidence, creative authority, and vibrant leadership.",
    reversed:"Demanding, self-centered, jealousy, or fiery energy turned inward as spite." },
  { id:35, term:"King of Wands", suit:"Wands", category:"minor", number:14,
    keywords:["leadership","vision","entrepreneur","honour"],
    definition:"The King of fire sits with a living salamander at his throne. He does not merely dream — he *builds*. Signifies visionary leadership, entrepreneurial power, and the mastery of creative will in action.",
    reversed:"Overbearing, impulsive authority, unrealistic expectations, or ego unchecked." },

  // ── CUPS ──────────────────────────────────────────────────────────────────
  { id:36, term:"Ace of Cups", suit:"Cups", category:"minor", number:1,
    keywords:["new love","compassion","creativity","intuition"],
    definition:"A chalice overflows beneath a descending dove; the hand of spirit offers the waters of the heart. Signifies new emotional beginnings, love offered, and the opening of the intuitive gates.",
    reversed:"Blocked emotions, emptiness, holding back love, or emotional stagnation." },
  { id:37, term:"Two of Cups", suit:"Cups", category:"minor", number:2,
    keywords:["unity","partnership","attraction","connection"],
    definition:"Two figures exchange cups in a sacred compact; the caduceus of Hermes rises between them. Signifies mutual attraction, harmonious partnership, and the formation of deep bonds.",
    reversed:"Imbalance in relationships, broken connection, disharmony, or one-sided love." },
  { id:38, term:"Three of Cups", suit:"Cups", category:"minor", number:3,
    keywords:["celebration","friendship","creativity","community"],
    definition:"Three maidens raise their cups in the garden of plenty. The harvest is shared. Signifies communal joy, sisterhood, creative collaboration, and celebration with those who matter.",
    reversed:"Overindulgence, gossip, an isolating third party, or surface-level socialization." },
  { id:39, term:"Four of Cups", suit:"Cups", category:"minor", number:4,
    keywords:["contemplation","apathy","re-evaluation","boredom"],
    definition:"A figure sits cross-armed beneath a tree; three cups before him, a fourth offered from the ether — and he does not see it. Signifies withdrawal, disillusionment, and gifts missed by inward fixation.",
    reversed:"Readiness to re-engage, motivation returning, seeing the new opportunity." },
  { id:40, term:"Five of Cups", suit:"Cups", category:"minor", number:5,
    keywords:["grief","loss","regret","mourning"],
    definition:"Three cups lie spilled; the figure in black mourns them. Yet two cups still stand behind him, unseen. Signifies grief, regret, and the sorrow that obscures what has survived the loss.",
    reversed:"Acceptance, moving on, finding peace, and turning toward the remaining cups." },
  { id:41, term:"Six of Cups", suit:"Cups", category:"minor", number:6,
    keywords:["nostalgia","memories","innocence","past"],
    definition:"A child offers flowers to another in a village of golden memory. The past glows here, warm and complete. Signifies childhood, nostalgia, reunion, innocence revisited, and the comfort of what once was.",
    reversed:"Living in the past, inability to move on, or idealizing what has already gone." },
  { id:42, term:"Seven of Cups", suit:"Cups", category:"minor", number:7,
    keywords:["fantasy","illusion","wishful thinking","options"],
    definition:"Seven cups float in the clouds, each filled with a different vision — treasure, serpent, castle, ghost. The mind conjures many futures. Signifies temptation, imagination overrunning reality, and choices yet ungrounded.",
    reversed:"Clarity of purpose, cutting through illusion, or decisive action after confusion." },
  { id:43, term:"Eight of Cups", suit:"Cups", category:"minor", number:8,
    keywords:["disappointment","abandonment","withdrawal","escapism"],
    definition:"Eight cups stand neatly arranged; a figure walks away from them by moonlight, toward the mountains. Enough was enough. Signifies walking away from what no longer fulfills, emotional withdrawal, and the quiet bravery of leaving.",
    reversed:"Fear of moving on, directionlessness, hopelessness, or drifting without intention." },
  { id:44, term:"Nine of Cups", suit:"Cups", category:"minor", number:9,
    keywords:["contentment","satisfaction","gratitude","luxury"],
    definition:"The merchant sits before nine cups arranged with satisfaction, arms folded, smiling. The wish is granted. Signifies emotional fulfillment, pleasure, and the contentment of material and personal desires met.",
    reversed:"Greed, dissatisfaction, wish unfulfilled, or joy dependent on external conditions." },
  { id:45, term:"Ten of Cups", suit:"Cups", category:"minor", number:10,
    keywords:["harmony","family","alignment","bliss"],
    definition:"A rainbow of ten cups arcs over a joyful family; the house in the green hills. Everything the heart wished for, realized together. Signifies lasting happiness, emotional completion, family harmony, and the life well lived.",
    reversed:"Dysfunctional relationships, broken home, values misaligned, or happiness deferred." },
  { id:46, term:"Page of Cups", suit:"Cups", category:"minor", number:11,
    keywords:["curiosity","creative beginnings","psychic messages","whimsy"],
    definition:"The Page stares, entranced, at the fish peering from his cup — an impossible, delightful messenger. Signifies imaginative youth, intuitive gifts, emotional openness, and news that surprises the heart.",
    reversed:"Immaturity, creative blockage, emotional manipulation, or refusing to feel." },
  { id:47, term:"Knight of Cups", suit:"Cups", category:"minor", number:12,
    keywords:["romance","idealism","charm","vision"],
    definition:"The Knight rides his white horse with calm assurance, cup offered before him — no fire, only feeling. Signifies romantic pursuit, artistic vision, invitation to emotional adventure, and the heart's ambassador.",
    reversed:"Moodiness, jealousy, unrealistic expectations, or charm masking shallowness." },
  { id:48, term:"Queen of Cups", suit:"Cups", category:"minor", number:13,
    keywords:["compassion","empathy","emotional security","intuition"],
    definition:"She holds an ornate, closed cup and gazes into the waters she commands. The sea is her domain, and the depths do not frighten her. Signifies deep empathy, emotional wisdom, intuitive power, and the safe harbor of the compassionate heart.",
    reversed:"Emotional insecurity, dependence, manipulation through feeling, or losing self in others." },
  { id:49, term:"King of Cups", suit:"Cups", category:"minor", number:14,
    keywords:["emotional balance","generosity","control","diplomacy"],
    definition:"He sits calmly on his throne amid the churning sea, yet remains unmoved. He has mastered the waves within. Signifies emotional authority, compassionate leadership, wisdom of the heart, and feeling fully without losing control.",
    reversed:"Emotional manipulation, moodiness, coldness, or instability masked as calm." },

  // ── SWORDS ────────────────────────────────────────────────────────────────
  { id:50, term:"Ace of Swords", suit:"Swords", category:"minor", number:1,
    keywords:["breakthrough","clarity","truth","intellect"],
    definition:"A crowned blade thrust from the ether, wreathed in laurel. The mind cuts cleanly through all confusion. Signifies intellectual power, sudden insight, truth revealed, and the beginning of clear thinking.",
    reversed:"Confusion, chaos, false clarity, or the sword turned against the self." },
  { id:51, term:"Two of Swords", suit:"Swords", category:"minor", number:2,
    keywords:["blocked emotions","indecision","stalemate","avoidance"],
    definition:"Blindfolded at the sea's edge, arms crossed holding two swords. The choice cannot be avoided; yet it is. Signifies deadlock, willful blindness, difficult decisions postponed, and the painful truce of avoidance.",
    reversed:"Indecision over, information revealed, choosing to see, or stalemate breaking." },
  { id:52, term:"Three of Swords", suit:"Swords", category:"minor", number:3,
    keywords:["heartbreak","grief","sorrow","pain"],
    definition:"A heart pierced by three swords, rain falling behind it. There is no metaphor here — it is exactly what it looks like. Signifies grief, betrayal, heartache, emotional pain, and the necessary sorrow that makes the heart tender.",
    reversed:"Recovery from grief, forgiveness, integration of pain, or sorrow releasing its grip." },
  { id:53, term:"Four of Swords", suit:"Swords", category:"minor", number:4,
    keywords:["rest","recuperation","contemplation","retreat"],
    definition:"A knight lies in effigy within the chapel, sword and stained glass above him. Even warriors must pause. Signifies withdrawal for healing, meditation, enforced rest, and the wisdom of stillness between battles.",
    reversed:"Restlessness, refusing to rest, burned out but still driving, or slowly awakening." },
  { id:54, term:"Five of Swords", suit:"Swords", category:"minor", number:5,
    keywords:["defeat","conflict","winning at all costs","loss"],
    definition:"A smirking victor gathers swords as two defeated figures walk away. He won — but at what price? Signifies hollow victory, moral defeat, conflict with lingering cost, and the emptiness of winning by deception.",
    reversed:"Reconciliation, moving past conflict, or the cost of defeat finally reckoned with." },
  { id:55, term:"Six of Swords", suit:"Swords", category:"minor", number:6,
    keywords:["transition","change","rite of passage","release"],
    definition:"A ferryman carries a woman and child across still water, six swords fixed in the prow. They move away from rough waters. Signifies necessary transition, mental calm after turmoil, rites of passage, and healing in motion.",
    reversed:"Resistance to change, unresolved baggage, or transition that carries old weight." },
  { id:56, term:"Seven of Swords", suit:"Swords", category:"minor", number:7,
    keywords:["deception","strategy","stealth","escape"],
    definition:"A figure steals away with five swords, glancing back with a grin. Two swords remain, unclaimed. Signifies deception, strategic thinking, operating alone, and choices that prioritize cunning over honor.",
    reversed:"Coming clean, conscience weighing in, exposure of deceit, or strategic failure." },
  { id:57, term:"Eight of Swords", suit:"Swords", category:"minor", number:8,
    keywords:["restriction","imprisonment","victim mentality","powerlessness"],
    definition:"Bound and blindfolded, eight swords surround a figure — yet none touch her, and the ground is clear beneath her feet. Signifies mental imprisonment, self-imposed limitations, and the cage of one's own beliefs.",
    reversed:"Freedom, self-acceptance, seeing the cage was open, or releasing the blindfold." },
  { id:58, term:"Nine of Swords", suit:"Swords", category:"minor", number:9,
    keywords:["anxiety","fear","nightmares","despair"],
    definition:"A figure sits bolt upright in the midnight dark, nine swords looming over them. The horrors are almost entirely mental. Signifies anxiety, nightmares, catastrophic thinking, and the unique cruelty of three-in-the-morning thoughts.",
    reversed:"Hope, help arriving, releasing worry, or beginning to see that fears were exaggerated." },
  { id:59, term:"Ten of Swords", suit:"Swords", category:"minor", number:10,
    keywords:["painful endings","loss","crisis","betrayal"],
    definition:"A figure lies face-down, ten swords in the back, golden light breaking at the horizon. Rock bottom has been reached — and behind it, dawn. Signifies total defeat, unavoidable endings, and the strange mercy of reaching the absolute nadir.",
    reversed:"Recovery, survival, refusing to be a victim, or the last blow finally spent." },
  { id:60, term:"Page of Swords", suit:"Swords", category:"minor", number:11,
    keywords:["curiosity","restlessness","mental agility","communication"],
    definition:"Alert and quick, the Page stands amid wind, sword raised — watching everything, saying little, for now. Signifies intellectual keenness, watchfulness, youthful directness, and the first edge of wit.",
    reversed:"Hasty speech, gossip, all words and no substance, or manipulation through cleverness." },
  { id:61, term:"Knight of Swords", suit:"Swords", category:"minor", number:12,
    keywords:["ambition","action","drive","impatience"],
    definition:"The Knight charges through storm clouds at full gallop — nothing slows him, nothing gives him pause. Signifies fierce intellect, decisive action, bold pursuit, and the energy that achieves at the cost of nuance.",
    reversed:"Burnout, recklessness, aggression, or all force and no aim." },
  { id:62, term:"Queen of Swords", suit:"Swords", category:"minor", number:13,
    keywords:["independence","unbiased judgment","clear thinking","directness"],
    definition:"Seated above the clouds, sword raised, one hand extended in welcome or warning — it is not yet clear which. Signifies sharp clarity, emotional independence, intellectual authority, and truth spoken without apology.",
    reversed:"Cold-heartedness, bitterness, cruelty dressed as honesty, or grief turned blade." },
  { id:63, term:"King of Swords", suit:"Swords", category:"minor", number:14,
    keywords:["authority","analytical mind","truth","intellectual power"],
    definition:"He sits with exacting posture, sword pointing skyward — judge, strategist, intellectual sovereign. Signifies mastery of thought, ethical leadership, rational authority, and the power of the mind deployed with precision.",
    reversed:"Tyranny of intellect, abuse of power, manipulation disguised as reason." },

  // ── PENTACLES ─────────────────────────────────────────────────────────────
  { id:64, term:"Ace of Pentacles", suit:"Pentacles", category:"minor", number:1,
    keywords:["new financial opportunity","manifestation","abundance","security"],
    definition:"A golden coin offered from the clouds over a garden in full bloom; an archway into the verdant world beyond. Signifies material beginnings, new prosperity, grounded opportunity, and the seed of tangible abundance.",
    reversed:"Lost opportunity, poor planning, greed blocking growth, or instability at the foundation." },
  { id:65, term:"Two of Pentacles", suit:"Pentacles", category:"minor", number:2,
    keywords:["balance","adaptability","time management","prioritization"],
    definition:"A figure juggles two pentacles bound in a lemniscate while ships rise and fall on wild waves. Balance is not stillness — it is constant adjustment. Signifies juggling priorities, financial flux, and the art of managing multiple demands.",
    reversed:"Imbalance, overwhelm, poor financial decisions, or losing control of the juggle." },
  { id:66, term:"Three of Pentacles", suit:"Pentacles", category:"minor", number:3,
    keywords:["teamwork","collaboration","learning","implementation"],
    definition:"An apprentice works on an arch while an architect and patron confer with the plans. All three are needed. Signifies skilled collaboration, mentorship, mastery in progress, and the value of working with others.",
    reversed:"Disharmony in work, poor collaboration, mediocrity, or undervaluing apprenticeship." },
  { id:67, term:"Four of Pentacles", suit:"Pentacles", category:"minor", number:4,
    keywords:["conservation","security","frugality","possessiveness"],
    definition:"A figure sits gripping a coin to his crown, one underfoot, two more clenched at his sides. The city sits behind him, unvisited. Signifies financial security achieved through control, but also the price of holding too tightly.",
    reversed:"Generosity unlocked, releasing control, financial insecurity, or overspending." },
  { id:68, term:"Five of Pentacles", suit:"Pentacles", category:"minor", number:5,
    keywords:["hardship","loss","poverty","isolation"],
    definition:"Two figures move through snow past a lit window, excluded or perhaps unaware of the warmth within. Signifies material lack, hardship, exclusion, and the feeling of being left out in the cold — whether or not help is available.",
    reversed:"Recovery from hardship, help accepted, the turn beginning, or old wounds healing." },
  { id:69, term:"Six of Pentacles", suit:"Pentacles", category:"minor", number:6,
    keywords:["generosity","charity","giving","receiving"],
    definition:"A merchant weighs coins on scales and distributes to two kneeling figures. The scale moves between give and receive. Signifies generosity, sharing resources, the power differential in charity, and the question: who holds the scales?",
    reversed:"Debt, strings attached, one-sided giving, or generosity offered to manipulate." },
  { id:70, term:"Seven of Pentacles", suit:"Pentacles", category:"minor", number:7,
    keywords:["hard work","perseverance","diligence","patience"],
    definition:"A farmer leans upon his hoe, surveying the pentacles ripening on the vine. The work is done — now comes the waiting. Signifies long-term investment, patience with results, and pausing to assess the work before harvest.",
    reversed:"Lack of reward for effort, impatience, poor planning, or investing in what will not grow." },
  { id:71, term:"Eight of Pentacles", suit:"Pentacles", category:"minor", number:8,
    keywords:["apprenticeship","repetition","skill","mastery"],
    definition:"An artisan hammers coins with devoted concentration, six complete and two to go. Practice is the ritual. Signifies diligent craftsmanship, dedication to skill, the satisfaction of mastery through repetition, and deliberate improvement.",
    reversed:"Perfectionism, lack of quality, grinding without purpose, or skills misapplied." },
  { id:72, term:"Nine of Pentacles", suit:"Pentacles", category:"minor", number:9,
    keywords:["abundance","luxury","self-sufficiency","refinement"],
    definition:"A robed figure walks in her vineyard, falcon on her wrist, nine pentacles arranged about her. She built this alone. Signifies hard-won independence, material abundance, refined pleasure, and the satisfaction of self-created security.",
    reversed:"Overindulgence, living beyond means, superficiality, or security that masks loneliness." },
  { id:73, term:"Ten of Pentacles", suit:"Pentacles", category:"minor", number:10,
    keywords:["legacy","wealth","family","permanence"],
    definition:"Three generations beneath a gate of ten pentacles; dogs at the feet of the patriarch. The work extends beyond the self. Signifies lasting wealth, family inheritance, permanence, and the legacy that outlives the one who built it.",
    reversed:"Financial failure, family disputes, instability, or a legacy squandered." },
  { id:74, term:"Page of Pentacles", suit:"Pentacles", category:"minor", number:11,
    keywords:["ambition","desire","diligence","new opportunities"],
    definition:"The Page holds the pentacle before him with focused reverence — studying it, promising himself what it represents. Signifies a student of the material world, new financial ventures, and the earnest beginning of practical mastery.",
    reversed:"Procrastination, lack of follow-through, missed opportunities, or daydreaming without effort." },
  { id:75, term:"Knight of Pentacles", suit:"Pentacles", category:"minor", number:12,
    keywords:["routine","conservatism","methodical","dependability"],
    definition:"His black horse is still — this Knight does not charge; he persists. The field turns because he does not stop. Signifies reliability, methodical effort, patience, and the slow power of steady commitment.",
    reversed:"Stubbornness, perfectionism blocking progress, boredom, or stagnation mistaken for stability." },
  { id:76, term:"Queen of Pentacles", suit:"Pentacles", category:"minor", number:13,
    keywords:["nurturing","practical","providing","security"],
    definition:"She sits in her garden, pentacle in her lap, a hare leaping at her feet. The land responds to her care. Signifies earthy abundance, practical wisdom, generous provision, and the sanctuary of the home well-tended.",
    reversed:"Smothering, financial insecurity, self-neglect, or practicality curdling into materialism." },
  { id:77, term:"King of Pentacles", suit:"Pentacles", category:"minor", number:14,
    keywords:["abundance","prosperity","security","ambition realized"],
    definition:"Robed in vines and coin, he sits on a throne of bulls and bounty — the king of what has been built and keeps on building. Signifies mastery of the material realm, financial acumen, generous authority, and the power of reliable, grounded success.",
    reversed:"Corruption, stubbornness, obsession with wealth, or leadership driven by greed." },
];

const SUIT_COLORS = {
  "Major Arcana": { bg:"#1a0a2e", accent:"#c9a84c", glyph:"★", label:"arcanum" },
  "Wands":        { bg:"#1f0d00", accent:"#e2631a", glyph:"🜂", label:"fire"    },
  "Cups":         { bg:"#00152e", accent:"#4db8e8", glyph:"🜄", label:"water"  },
  "Swords":       { bg:"#0e0e1f", accent:"#a0b8d0", glyph:"🜁", label:"air"    },
  "Pentacles":    { bg:"#0a1a0a", accent:"#7ec87e", glyph:"🜃", label:"earth"  },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SUITS = ["All", "Major Arcana", "Wands", "Cups", "Swords", "Pentacles"];

export default function TarotFlashcards() {
  const [filterSuit, setFilterSuit] = useState("All");
  const [deck, setDeck] = useState(TAROT_DECK);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState("study"); // study | quiz | json
  const [seen, setSeen] = useState(new Set());
  const [quizResult, setQuizResult] = useState(null); // null | "known" | "unknown"
  const [jsonVisible, setJsonVisible] = useState(false);

  useEffect(() => {
    const filtered = filterSuit === "All"
      ? TAROT_DECK
      : TAROT_DECK.filter(c => c.suit === filterSuit);
    setDeck(filtered);
    setIdx(0);
    setFlipped(false);
    setSeen(new Set());
    setQuizResult(null);
  }, [filterSuit]);

  const card = deck[idx] || null;
  const sc = card ? SUIT_COLORS[card.suit] : SUIT_COLORS["Major Arcana"];
  const progress = deck.length ? Math.round((seen.size / deck.length) * 100) : 0;

  const goNext = useCallback(() => {
    setFlipped(false);
    setQuizResult(null);
    setTimeout(() => {
      setIdx(i => (i + 1) % deck.length);
    }, 150);
  }, [deck.length]);

  const goPrev = () => {
    setFlipped(false);
    setQuizResult(null);
    setTimeout(() => setIdx(i => (i - 1 + deck.length) % deck.length), 150);
  };

  const doShuffle = () => {
    const s = shuffle(deck);
    setDeck(s);
    setIdx(0);
    setFlipped(false);
    setSeen(new Set());
    setQuizResult(null);
  };

  const handleFlip = () => {
    setFlipped(f => !f);
    if (card) setSeen(s => new Set([...s, card.id]));
  };

  const handleQuiz = (result) => {
    setQuizResult(result);
    setSeen(s => new Set([...s, card.id]));
    setTimeout(goNext, 800);
  };

  const exportJson = () => {
    const data = {
      deck_name: "Tarot: The 78 Gates",
      format: "flashcard",
      version: "1.0",
      description: "A complete 78-card tarot deck formatted for flashcard review.",
      suits: ["Major Arcana", "Wands", "Cups", "Swords", "Pentacles"],
      total: TAROT_DECK.length,
      cards: TAROT_DECK.map(c => ({
        id: c.id,
        term: c.term,
        suit: c.suit,
        category: c.category,
        number: c.number,
        keywords: c.keywords,
        definition: c.definition,
        reversed: c.reversed,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "tarot-flashcards.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const jsonPreview = JSON.stringify({
    deck_name: "Tarot: The 78 Gates",
    format: "flashcard",
    version: "1.0",
    total: 78,
    cards: TAROT_DECK.slice(0, 2).map(c => ({
      id: c.id, term: c.term, suit: c.suit,
      category: c.category, number: c.number,
      keywords: c.keywords, definition: c.definition, reversed: c.reversed,
    })),
  }, null, 2);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080810",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#c8bfa0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 16px 40px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* starfield */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        {Array.from({length:60}).map((_,i) => (
          <div key={i} style={{
            position:"absolute",
            width: i%5===0 ? 2 : 1,
            height: i%5===0 ? 2 : 1,
            background: `rgba(200,180,140,${0.1 + (i%7)*0.05})`,
            borderRadius:"50%",
            top: `${(i*37+13)%100}%`,
            left: `${(i*61+7)%100}%`,
            animation: `twinkle ${2+(i%4)}s ease-in-out infinite`,
            animationDelay: `${(i*0.3)%3}s`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%,100%{opacity:0.3} 50%{opacity:1}
        }
        @keyframes flipIn {
          0%{transform:rotateY(90deg);opacity:0}
          100%{transform:rotateY(0deg);opacity:1}
        }
        @keyframes fadeUp {
          0%{transform:translateY(12px);opacity:0}
          100%{transform:translateY(0);opacity:1}
        }
        @keyframes glowPulse {
          0%,100%{box-shadow:0 0 18px rgba(201,168,76,0.25)}
          50%{box-shadow:0 0 38px rgba(201,168,76,0.5)}
        }
        .flip-card { animation: flipIn 0.35s ease forwards; }
        .fade-up   { animation: fadeUp 0.4s ease forwards; }
        .glow-ring { animation: glowPulse 3s ease-in-out infinite; }
        .suit-btn:hover { opacity:1 !important; transform:scale(1.05); }
        .nav-btn:hover  { background: rgba(201,168,76,0.15) !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ position:"relative", zIndex:1, textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:11, letterSpacing:6, color:"#c9a84c", textTransform:"uppercase", marginBottom:6 }}>
          ✦ The Grimoire of Seventy-Eight Gates ✦
        </div>
        <h1 style={{ fontSize:26, fontWeight:"normal", letterSpacing:2, color:"#e8dfc0", margin:0 }}>
          Tarot Flashcards
        </h1>
        <div style={{ fontSize:11, color:"#6b6055", marginTop:4, letterSpacing:2 }}>
          {deck.length} card{deck.length!==1?"s":""} · {seen.size} revealed · {progress}% explored
        </div>
      </div>

      {/* ── Mode Tabs ── */}
      <div style={{ display:"flex", gap:4, marginBottom:20, zIndex:1 }}>
        {["study","quiz","json"].map(m => (
          <button key={m} onClick={() => { setMode(m); setFlipped(false); setQuizResult(null); }}
            style={{
              padding:"6px 18px", fontSize:11, letterSpacing:3, textTransform:"uppercase",
              border: mode===m ? `1px solid #c9a84c` : "1px solid #2a2520",
              background: mode===m ? "rgba(201,168,76,0.1)" : "transparent",
              color: mode===m ? "#c9a84c" : "#5a5040",
              cursor:"pointer", borderRadius:2, transition:"all 0.2s",
            }}>
            {m==="json" ? "⬇ JSON" : m}
          </button>
        ))}
      </div>

      {/* ── JSON Panel ── */}
      {mode === "json" && (
        <div style={{ zIndex:1, width:"100%", maxWidth:700, animation:"fadeUp 0.3s ease" }}>
          <div style={{
            background:"#0d0d18", border:"1px solid #2a2520", borderRadius:6,
            padding:20, marginBottom:16,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:11, letterSpacing:3, color:"#c9a84c", textTransform:"uppercase" }}>
                retro-tui JSON Schema
              </span>
              <button onClick={exportJson} style={{
                padding:"6px 16px", fontSize:11, letterSpacing:2, textTransform:"uppercase",
                border:"1px solid #c9a84c", background:"rgba(201,168,76,0.12)",
                color:"#c9a84c", cursor:"pointer", borderRadius:2,
              }}>
                ↓ Download Full JSON
              </button>
            </div>
            <pre style={{
              fontSize:11, lineHeight:1.7, color:"#7a9e7a", margin:0,
              overflowX:"auto", maxHeight:420, overflowY:"auto",
              fontFamily:"'Courier New', monospace",
            }}>
              {jsonPreview}
              {"\n  // ... 76 more cards"}
            </pre>
          </div>
          <div style={{
            fontSize:12, color:"#5a5040", lineHeight:1.8, textAlign:"center",
            border:"1px solid #1e1a15", borderRadius:4, padding:"12px 16px",
          }}>
            The full JSON contains <strong style={{color:"#c9a84c"}}>78 cards</strong> with{" "}
            <code style={{color:"#7a9e7a"}}>id · term · suit · category · number · keywords · definition · reversed</code>{" "}
            — ready for import into <strong style={{color:"#c9a84c"}}>retro-tui</strong>.
          </div>
        </div>
      )}

      {/* ── Suit Filter ── */}
      {mode !== "json" && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24, zIndex:1, justifyContent:"center" }}>
          {SUITS.map(s => {
            const sc2 = s === "All" ? { accent:"#c9a84c" } : SUIT_COLORS[s];
            return (
              <button key={s} className="suit-btn"
                onClick={() => setFilterSuit(s)}
                style={{
                  padding:"4px 14px", fontSize:10, letterSpacing:2, textTransform:"uppercase",
                  border: filterSuit===s ? `1px solid ${sc2.accent}` : "1px solid #1e1a15",
                  background: filterSuit===s ? `${sc2.accent}18` : "transparent",
                  color: filterSuit===s ? sc2.accent : "#3a3028",
                  cursor:"pointer", borderRadius:2, transition:"all 0.2s", opacity: filterSuit===s?1:0.7,
                }}>
                {s === "All" ? "All 78" : s}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Progress Bar ── */}
      {mode !== "json" && deck.length > 0 && (
        <div style={{
          width:"100%", maxWidth:560, height:2, background:"#1a1510",
          borderRadius:1, marginBottom:28, zIndex:1,
        }}>
          <div style={{
            height:"100%", width:`${progress}%`,
            background:`linear-gradient(90deg, ${sc.accent}80, ${sc.accent})`,
            borderRadius:1, transition:"width 0.5s ease",
          }} />
        </div>
      )}

      {/* ── Flashcard ── */}
      {mode !== "json" && card && (
        <div key={`${card.id}-${flipped}`}
          className={`flip-card ${mode==="study" ? "glow-ring" : ""}`}
          onClick={mode==="study" ? handleFlip : undefined}
          style={{
            width:"100%", maxWidth:560, minHeight:380,
            background: `linear-gradient(160deg, ${sc.bg} 0%, #080810 100%)`,
            border: `1px solid ${sc.accent}40`,
            borderRadius:8, padding:"36px 32px",
            cursor: mode==="study" ? "pointer" : "default",
            position:"relative", zIndex:1,
            display:"flex", flexDirection:"column",
          }}>

          {/* ornament corners */}
          {["top-left","top-right","bottom-left","bottom-right"].map(pos => (
            <span key={pos} style={{
              position:"absolute",
              top: pos.includes("top") ? 10 : "auto",
              bottom: pos.includes("bottom") ? 10 : "auto",
              left: pos.includes("left") ? 10 : "auto",
              right: pos.includes("right") ? 10 : "auto",
              color: `${sc.accent}50`, fontSize:16, lineHeight:1,
            }}>✦</span>
          ))}

          {/* suit label */}
          <div style={{ textAlign:"center", marginBottom:6 }}>
            <span style={{
              fontSize:10, letterSpacing:4, textTransform:"uppercase",
              color:`${sc.accent}90`,
            }}>
              {sc.glyph} {card.suit} {sc.glyph}
            </span>
          </div>

          {/* card name */}
          <h2 style={{
            fontSize: card.term.length > 20 ? 20 : 26,
            fontWeight:"normal", letterSpacing:2, color:sc.accent,
            textAlign:"center", margin:"0 0 20px",
          }}>
            {card.term}
          </h2>

          {!flipped ? (
            /* FRONT */
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <div style={{
                display:"flex", flexWrap:"wrap", gap:6,
                justifyContent:"center", marginBottom:24,
              }}>
                {card.keywords.map(k => (
                  <span key={k} style={{
                    fontSize:10, letterSpacing:2, textTransform:"uppercase",
                    padding:"3px 10px", border:`1px solid ${sc.accent}35`,
                    color:`${sc.accent}80`, borderRadius:2,
                  }}>
                    {k}
                  </span>
                ))}
              </div>
              {mode === "study" && (
                <div style={{ fontSize:11, color:"#3a3028", letterSpacing:2, textTransform:"uppercase" }}>
                  ∿ tap to reveal ∿
                </div>
              )}
              {mode === "quiz" && (
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:12, color:"#5a5040", marginBottom:16, letterSpacing:1 }}>
                    What does this card signify?
                  </div>
                  <button onClick={handleFlip} style={{
                    padding:"8px 24px", fontSize:11, letterSpacing:3, textTransform:"uppercase",
                    border:`1px solid ${sc.accent}60`, background:`${sc.accent}10`,
                    color:sc.accent, cursor:"pointer", borderRadius:2,
                  }}>
                    Reveal
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* BACK */
            <div className="fade-up" style={{ flex:1 }}>
              <p style={{
                fontSize:13, lineHeight:1.9, color:"#c8bfa0",
                margin:"0 0 18px", fontStyle:"italic",
              }}>
                {card.definition}
              </p>
              <div style={{
                borderTop:`1px solid ${sc.accent}20`, paddingTop:14, marginTop:4,
              }}>
                <div style={{ fontSize:10, letterSpacing:3, color:`${sc.accent}60`,
                  textTransform:"uppercase", marginBottom:6 }}>
                  Reversed
                </div>
                <p style={{ fontSize:12, lineHeight:1.7, color:"#6a6050", margin:0 }}>
                  {card.reversed}
                </p>
              </div>

              {mode === "quiz" && quizResult === null && (
                <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"center" }}>
                  {[["✓ Known","known","#4a8a4a"],["✗ Study More","unknown","#8a4a4a"]].map(([label,val,col])=>(
                    <button key={val} onClick={()=>handleQuiz(val)} style={{
                      padding:"7px 20px", fontSize:11, letterSpacing:2, textTransform:"uppercase",
                      border:`1px solid ${col}60`, background:`${col}18`,
                      color:col, cursor:"pointer", borderRadius:2,
                    }}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {quizResult && (
                <div style={{
                  textAlign:"center", marginTop:16, fontSize:12, letterSpacing:2,
                  color: quizResult==="known" ? "#4a8a4a" : "#8a6a3a",
                }}>
                  {quizResult==="known" ? "✦ Inscribed in memory ✦" : "∿ Return to the flame ∿"}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Navigation ── */}
      {mode !== "json" && deck.length > 0 && (
        <div style={{ display:"flex", gap:12, marginTop:24, zIndex:1, alignItems:"center" }}>
          <button className="nav-btn" onClick={goPrev} style={{
            width:42, height:42, borderRadius:"50%",
            border:"1px solid #2a2520", background:"transparent",
            color:"#5a5040", fontSize:18, cursor:"pointer", transition:"all 0.2s",
          }}>‹</button>

          <div style={{ fontSize:11, color:"#3a3028", letterSpacing:2, minWidth:80, textAlign:"center" }}>
            {idx + 1} / {deck.length}
          </div>

          <button className="nav-btn" onClick={goNext} style={{
            width:42, height:42, borderRadius:"50%",
            border:"1px solid #2a2520", background:"transparent",
            color:"#5a5040", fontSize:18, cursor:"pointer", transition:"all 0.2s",
          }}>›</button>

          <button className="nav-btn" onClick={doShuffle} style={{
            padding:"0 16px", height:42, borderRadius:21,
            border:"1px solid #2a2520", background:"transparent",
            color:"#5a5040", fontSize:11, letterSpacing:2,
            textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s",
            marginLeft:8,
          }}>⟳ Shuffle</button>
        </div>
      )}

      {/* ── Footer ── */}
      <div style={{ marginTop:36, fontSize:10, color:"#2a2520", letterSpacing:3,
        textTransform:"uppercase", zIndex:1, textAlign:"center" }}>
        {seen.size === deck.length && deck.length > 0
          ? `✦ All ${deck.length} gates opened ✦`
          : "The sigil closes, but the flame remains"}
      </div>
    </div>
  );
}
