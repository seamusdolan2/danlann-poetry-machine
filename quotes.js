// FL718 Quotes — Flaneur 718
// Full quote data array for the scrolling quote experience
// v2 — updated & expanded master list
//
// Fields: id, text, attribution, source, mood, length, animation, font, layout
//
// mood:      dark-raw | tender-literary | defiant-political | contemplative-ancient | wild-electric
// length:    short | standard | long
// animation: smoke-dissolve | etch-a-sketch | letterpress | data-dissolve | pond-ripple |
//            marquee-bulb | paint-drip | string-stitch | card-shuffle | darkroom-develop |
//            ikea-assembly | navigation-map
// entrance:  optional override for entrance animation
// font:      fl718-font-literary | fl718-font-brutal | fl718-font-archival | fl718-font-system | fl718-font-expressive
// layout:    left | center | display
//   left     — full width, left-aligned. Default for prose, lyrics, longer passages.
//   center   — max-width 65ch, centered. Short lyric quotes, poems with intentional short lines.
//   display  — full width, centered, oversized type. Very short power statements.

var fl718Quotes = [

  // ── ANNIE DILLARD ─────────────────────────────────────────────────────────
  {
    id: 1,
    text: "How we spend our days is, of course, how we spend our lives.",
    attribution: "— Annie Dillard",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "display"
  },

  // ── DAVID WHYTE ───────────────────────────────────────────────────────────
  {
    id: 2,
    text: "The parts of you you thought were foolish — the wisest voice of all.",
    attribution: "— David Whyte",
    source: null,
    mood: "tender-literary",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "center"
  },
  {
    id: 3,
    text: "Gratitude is the understanding that many millions of things come together and live together and mesh together and breathe together in order for us to take even one more breath of air, that the underlying gift of life and incarnation as a living, participating human being is a privilege; that we are miraculously part of something, rather than nothing. Even if that something is temporarily pain or despair, we inhabit a living world, with real faces, real voices, laughter, the color blue, the green of the fields, the freshness of a cold wind, or the tawny hue of a winter landscape.",
    attribution: "— David Whyte",
    source: "On Gratitude",
    mood: "tender-literary",
    length: "long",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 107,
    text: "To see the full miraculous essentiality of the color blue is to be grateful with no necessity for a word of thanks. To see fully, the beauty of a daughter's face is to be fully grateful without having to seek a God to thank him. To sit among friends and strangers, hearing many voices, strange opinions; to intuit inner lives beneath surface lives, to inhabit many worlds at once in this world, to be a someone amongst all other someones, and therefore to make a conversation without saying a word, is to deepen our sense of presence and therefore our natural sense of thankfulness that everything happens both with us and without us, that we are participants and witnesses all at once.",
    attribution: "— David Whyte",
    source: "On Gratitude",
    mood: "tender-literary",
    length: "long",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── HERMANN HESSE ─────────────────────────────────────────────────────────
  {
    id: 4,
    text: "Learn what is to be taken seriously and laugh at the rest.",
    attribution: "— Hermann Hesse",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "etch-a-sketch",
    font: "fl718-font-archival",
    layout: "center"
  },
  {
    id: 5,
    text: "So you find yourself surrounded by death and horror in the world, and you escape it into lust. But lust has no duration; it leaves you again in the desert.",
    attribution: "— Hermann Hesse",
    source: "Narcissus and Goldmund",
    mood: "dark-raw",
    length: "standard",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 6,
    text: "When I have neither pleasure nor pain and have been breathing for a while the lukewarm insipid air of these so called good and tolerable days, I feel so bad in my childish soul that I smash my moldering lyre of thanksgiving in the face of the slumbering god of contentment and would rather feel the very devil burn in me than this warmth of a well-heated room. A wild longing for strong emotions and sensations seethes in me, a rage against this toneless, flat, normal and sterile life. I have a mad impulse to smash something, a warehouse, perhaps, or a cathedral, or myself, to commit outrages, to pull off the wigs of a few revered idols.",
    attribution: "— Hermann Hesse",
    source: "Steppenwolf",
    mood: "dark-raw",
    length: "long",
    animation: "darkroom-develop",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 7,
    text: "You are willing to die, you coward, but not to live.",
    attribution: "— Hermann Hesse",
    source: "Steppenwolf",
    mood: "defiant-political",
    length: "short",
    animation: "marquee-bulb",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 8,
    text: "You should not take old people who are already dead seriously. It does them injustice. We immortals do not like things to be taken seriously. We like joking. Seriousness, young man, is an accident of time. It consists, I don't mind telling you in confidence, in putting too high a value on time. I, too, once put too high a value on time. For that reason I wished to be a hundred years old. In eternity, however, there is no time, you see. Eternity is a mere moment, just long enough for a joke.",
    attribution: "— Hermann Hesse",
    source: "Steppenwolf",
    mood: "contemplative-ancient",
    length: "long",
    animation: "smoke-dissolve",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── SÉAMUS DOLAN ─────────────────────────────────────────────────────────
  {
    id: 9,
    text: "I showed up dressed in drugs.",
    attribution: "— Séamus Dolan",
    source: null,
    mood: "dark-raw",
    length: "short",
    animation: "paint-drip",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 10,
    text: "What the pigeon doesn't take today,\nthe rat will crown tomorrow.",
    attribution: "— Séamus Dolan",
    source: null,
    mood: "dark-raw",
    length: "short",
    animation: "etch-a-sketch",
    font: "fl718-font-brutal",
    layout: "center"
  },
  {
    id: 11,
    text: "Each new sun brings an old moon as each promise will have to bring a lie.",
    attribution: "— Séamus Dolan",
    source: null,
    mood: "dark-raw",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-brutal",
    layout: "center"
  },
  {
    id: 12,
    text: "The method is not free until the mechanism follows.",
    attribution: "— Séamus Dolan",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "data-dissolve",
    entrance: "smoke-dissolve",
    font: "fl718-font-system",
    layout: "display"
  },
  {
    id: 13,
    text: "The salacious solitude of substance.",
    attribution: "— Séamus Dolan",
    source: null,
    mood: "dark-raw",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-expressive",
    layout: "display"
  },
  {
    id: 14,
    text: "You are round, but real, brother.",
    attribution: "— Séamus Dolan",
    source: null,
    mood: "wild-electric",
    length: "short",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 15,
    text: "I have the clarity of a glacier.",
    attribution: "— Séamus Dolan",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "display"
  },

  // ── GEORGE R.R. MARTIN ────────────────────────────────────────────────────
  {
    id: 16,
    text: "Reality is the strip malls of Burbank, the smoke stacks of Cleveland, a parking garage in Newark.",
    attribution: "— George R.R. Martin",
    source: null,
    mood: "dark-raw",
    length: "short",
    animation: "etch-a-sketch",
    font: "fl718-font-system",
    layout: "left"
  },
  {
    id: 17,
    text: "The best fantasy is written in the language of dreams. It is alive as dreams are alive, more real than real — for a moment at least — that long magic moment before we wake.",
    attribution: "— George R.R. Martin",
    source: null,
    mood: "wild-electric",
    length: "standard",
    animation: "smoke-dissolve",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── WILLIAM HUTCHINSON MURRAY ─────────────────────────────────────────────
  {
    id: 18,
    text: "Boldness has genius, power, and magic in it.",
    attribution: "— William Hutchinson Murray",
    source: null,
    mood: "wild-electric",
    length: "short",
    animation: "letterpress",
    font: "fl718-font-expressive",
    layout: "display"
  },

  // ── HOMER ─────────────────────────────────────────────────────────────────
  {
    id: 19,
    text: "There is the heat of love, the pulsing rush of longing, the lover's whisper, irresistible — magic to make the sanest man go mad.",
    attribution: "— Homer",
    source: "The Iliad",
    mood: "tender-literary",
    length: "standard",
    animation: "paint-drip",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 20,
    text: "Sing, O muse, of the rage of Achilles, son of Peleus, that brought countless ills upon the Achaeans.",
    attribution: "— Homer",
    source: "The Iliad",
    mood: "contemplative-ancient",
    length: "short",
    animation: "navigation-map",
    font: "fl718-font-archival",
    layout: "center"
  },

  // ── TV ON THE RADIO ───────────────────────────────────────────────────────
  {
    id: 21,
    text: "I know it's strange another way to get to know you\nYou'll never know unless we go so let me show you\nI know it's strange another way to get to know you\nWe've got till noon, here comes the moon\nSo let it show you\n\nMy mind has changed\nMy body's frame, but, God, I like it\nMy heart's aflame\nMy body's strained, but, God, I like it",
    attribution: "— TV on the Radio",
    source: "Wolf Like Me",
    mood: "wild-electric",
    length: "standard",
    animation: "marquee-bulb",
    font: "fl718-font-expressive",
    layout: "left"
  },

  // ── HAKUIN EKAKU ──────────────────────────────────────────────────────────
  {
    id: 22,
    text: "Not knowing how near the truth is, people seek it far away.",
    attribution: "— Hakuin Ekaku",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-archival",
    layout: "center"
  },

  // ── FRANZ KAFKA ───────────────────────────────────────────────────────────
  {
    id: 23,
    text: "Paths are made by walking.",
    attribution: "— Franz Kafka",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "etch-a-sketch",
    font: "fl718-font-archival",
    layout: "display"
  },

  // ── HENRY DAVID THOREAU ───────────────────────────────────────────────────
  {
    id: 24,
    text: "The question is not what you look at, but what you see.",
    attribution: "— Henry David Thoreau",
    source: "Journal, 5 August 1851",
    mood: "contemplative-ancient",
    length: "short",
    animation: "darkroom-develop",
    font: "fl718-font-literary",
    layout: "center"
  },

  // ── RAGE AGAINST THE MACHINE ──────────────────────────────────────────────
  {
    id: 25,
    text: "The main attraction, distraction\nGot ya number than number than numb\nEmpty ya pockets, son, they got you thinkin' that\nWhat ya need is what they selling\nMake you think that buying is rebelling\nFrom the theaters to malls on every shore\nThe thin line between entertainment and war\nThe frontline is everywhere\nThere be no shelter here\nSpielberg, the nightmare works so push it far\nAmistad was a whip, the truth was feathered and tarred\nMemories erased, burned and scarred\nTrade in ya history for a VCR\nCinema, simulated life, ill drama\nFourth Reich culture, Americana\nChained to the dream they got you searchin' for\nThe thin line between entertainment and war",
    attribution: "— Rage Against the Machine",
    source: "No Shelter",
    mood: "defiant-political",
    length: "long",
    animation: "data-dissolve",
    entrance: "smoke-dissolve",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 26,
    text: "There's a mass without roofs\nA prison to fill\nA country's soul that reads post no bills\nA strike and a line of cops outside of tha mill\nThere's a right to obey\nAnd a right to kill",
    attribution: "— Rage Against the Machine",
    source: "Calm Like a Bomb",
    mood: "defiant-political",
    length: "standard",
    animation: "letterpress",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── BRAND NEW ─────────────────────────────────────────────────────────────
  {
    id: 27,
    text: "Well if we take all these things\nand we bury them fast\nAnd we'll pray that they turn into seeds,\nto roots and then grass\nIt'd be all right, it's all right,\nit'd be easier that way.\nOr if the sky opened up and started pouring rain\nLike he knew it was time\nto start things over again\nIt'd be all right, it's all right,\nit'd be easier that way.",
    attribution: "— Brand New",
    source: "Daisy",
    mood: "dark-raw",
    length: "long",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 28,
    text: "Hey hey hey, Mr. Hangman\nGo get your rope\nYour daughters weren't careful\nI fear that I am a slippery slope\nNow even if I lay my head down at night\nAfter a day I got perfectly right\nShe won't know\nShe won't know",
    attribution: "— Brand New",
    source: "You Won't Know",
    mood: "dark-raw",
    length: "standard",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── PEARL JAM ─────────────────────────────────────────────────────────────
  {
    id: 29,
    text: "Alone, listless\nBreakfast table in an otherwise empty room\nYoung girl, violence\nCenter of her own attention\nThe mother reads aloud, child tries to understand it\nTries to make her proud\nThe shades go down, it's in her head\nPainted room, can't deny there's something wrong\nDon't call me daughter, not fit to\nThe picture kept will remind me\nDon't call me daughter, not fit to\nThe picture kept will remind me\nDon't call me",
    attribution: "— Pearl Jam",
    source: "Daughter",
    mood: "dark-raw",
    length: "long",
    animation: "smoke-dissolve",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 30,
    text: "I'm ahead, I'm a man\nI'm the first mammal to wear pants\nI'm at peace with my lust\nI can kill 'cause in god I trust\nIt's evolution, baby\n\nAdmire me, admire my home\nAdmire my son, he's my clone\nThis land is mine, this land is free\nI'll do what I want but irresponsibly\nIt's evolution, baby",
    attribution: "— Pearl Jam",
    source: "Do the Evolution",
    mood: "defiant-political",
    length: "standard",
    animation: "marquee-bulb",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── EMILY DICKINSON ───────────────────────────────────────────────────────
  {
    id: 31,
    text: "Forever is composed of nows.",
    attribution: "— Emily Dickinson",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-literary",
    layout: "display"
  },

  // ── SEAN PRICE ────────────────────────────────────────────────────────────
  {
    id: 32,
    text: "You can catch me in ya tenement, doing too much drugs\nStraight Jimi Hendrexin', pop's was the drinker, my mom's on dope\nPick up they bad habit, now the God do both\nPoppin' some pills, sniffin' a line, drinkin' some wine\nUp in the club, grabbin' my gun, fucking wit shine",
    attribution: "— Sean Price",
    source: "Boom Bye Yeah",
    mood: "dark-raw",
    length: "standard",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── DEFTONES ──────────────────────────────────────────────────────────────
  {
    id: 33,
    text: "You slowly enter\ncause you know my room\nand then you crawl your knees off\nbefore you shake my tomb",
    attribution: "— Deftones",
    source: "You've Seen the Butcher",
    mood: "dark-raw",
    length: "short",
    animation: "darkroom-develop",
    font: "fl718-font-expressive",
    layout: "center"
  },
  {
    id: 34,
    text: "Roll the windows down this cool night air is curious\nLet the whole world look in\nWho cares who sees what tonight?\nRoll these misty windows\nDown to catch my breath and then\nGo and go and go, just drive me home and back again",
    attribution: "— Deftones",
    source: null,
    mood: "tender-literary",
    length: "standard",
    animation: "pond-ripple",
    font: "fl718-font-expressive",
    layout: "left"
  },

  // ── DYLAN THOMAS ──────────────────────────────────────────────────────────
  {
    id: 35,
    text: "Of doubt and dark they feed their nerves;\nThe signal moon is zero in their voids.",
    attribution: "— Dylan Thomas",
    source: "I See the Boys of Summer",
    mood: "dark-raw",
    length: "short",
    animation: "darkroom-develop",
    font: "fl718-font-literary",
    layout: "center"
  },
  {
    id: 36,
    text: "And death shall have no dominion.\nDead men naked they shall be one\nWith the man in the wind and the west moon;\nWhen their bones are picked clean and the clean bones gone,\nThey shall have stars at elbow and foot;\nThough they go mad they shall be sane,\nThough they sink through the sea they shall rise again;\nThough lovers be lost love shall not;\nAnd death shall have no dominion.",
    attribution: "— Dylan Thomas",
    source: "And Death Shall Have No Dominion",
    mood: "dark-raw",
    length: "long",
    animation: "letterpress",
    font: "fl718-font-archival",
    layout: "left"
  },
  {
    id: 37,
    text: "Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light.",
    attribution: "— Dylan Thomas",
    source: "Do Not Go Gentle into That Good Night",
    mood: "defiant-political",
    length: "short",
    animation: "letterpress",
    font: "fl718-font-brutal",
    layout: "center"
  },

  // ── CHARLES CHAPLIN ───────────────────────────────────────────────────────
  {
    id: 38,
    text: "The trouble is you won't fight: you've given in, continually dwelling on sickness and death. But, there is something just as inevitable as death — and that's life! life! life! Think of the power that's in the universe, moving the earth, growing the trees, and that's the same power within you — if you only have courage and the will to use it!",
    attribution: "— Charles Chaplin",
    source: "Limelight (1952)",
    mood: "wild-electric",
    length: "standard",
    animation: "marquee-bulb",
    font: "fl718-font-expressive",
    layout: "left"
  },

  // ── DOGEN ─────────────────────────────────────────────────────────────────
  {
    id: 39,
    text: "Flowers fall even though we love them;\nWeeds grow even though we dislike them.",
    attribution: "— Dogen",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-archival",
    layout: "center"
  },
  {
    id: 40,
    text: "If you are unable to find the truth right where you are, where else do you expect to find it?",
    attribution: "— Eihei Dogen",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-archival",
    layout: "center"
  },

  // ── NINE INCH NAILS ───────────────────────────────────────────────────────
  {
    id: 41,
    text: "Still feel it all slipping away but it doesn't matter anymore\nEverybody's still chipping away but it doesn't matter anymore\nLook through these blackened eyes\nYou'll see ten thousand lies\nMy lips may promise but my heart is a whore",
    attribution: "— Nine Inch Nails",
    source: "Last",
    mood: "dark-raw",
    length: "standard",
    animation: "data-dissolve",
    entrance: "smoke-dissolve",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── CANIBUS ───────────────────────────────────────────────────────────────
  {
    id: 42,
    text: "My circularized third eye sees all,\nAtlantis was surrounded by four sea walls,\nI read one fourth of the Library of Alexandria,\nBefore it was burned to the floor,\nI wish I could have learned more,\nAbout the shapes of the Sacred Geometry they used to draw,",
    attribution: "— Canibus",
    source: "Master Thesis",
    mood: "contemplative-ancient",
    length: "standard",
    animation: "navigation-map",
    font: "fl718-font-system",
    layout: "left"
  },

  // ── GEORGE ORWELL ─────────────────────────────────────────────────────────
  {
    id: 43,
    text: "Who controls the past controls the future.\nWho controls the present controls the past.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "short",
    animation: "etch-a-sketch",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 44,
    text: "Sanity is not statistical.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "short",
    animation: "marquee-bulb",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 45,
    text: "To know and not to know, to be conscious of complete truthfulness while telling carefully constructed lies, to hold simultaneously two opinions which cancelled out, knowing them to be contradictory and believing in both of them, to use logic against logic, to repudiate morality while laying claim to it, to believe that democracy was impossible and that the Party was the guardian of democracy, to forget whatever it was necessary to forget, then to draw it back into memory again at the moment when it was needed, and then promptly to forget it again: and above all, to apply the same process to the process itself — that was the ultimate subtlety: consciously to induce unconsciousness, and then, once again, to become unconscious of the act of hypnosis you had just performed.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "long",
    animation: "string-stitch",
    font: "fl718-font-archival",
    layout: "left"
  },
  {
    id: 46,
    text: "Until they become conscious they will never rebel, and until they have rebelled they cannot become conscious.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "standard",
    animation: "card-shuffle",
    font: "fl718-font-archival",
    layout: "left"
  },
  {
    id: 47,
    text: "Power is in tearing human minds to pieces and putting them together again in new shapes of your own choosing.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "standard",
    animation: "letterpress",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 48,
    text: "Perhaps a lunatic was simply a minority of one.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "short",
    animation: "marquee-bulb",
    font: "fl718-font-archival",
    layout: "display"
  },
  {
    id: 49,
    text: "It is a beautiful thing, the destruction of words.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "short",
    animation: "data-dissolve",
    entrance: "smoke-dissolve",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 50,
    text: "Power is not a means, it is an end. One does not establish a dictatorship in order to safeguard a revolution; one makes the revolution in order to establish the dictatorship. The object of persecution is persecution. The object of torture is torture. The object of power is power.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "standard",
    animation: "letterpress",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 51,
    text: "Reality exists in the human mind, and nowhere else.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-archival",
    layout: "display"
  },
  {
    id: 52,
    text: "War is peace.\nFreedom is slavery.\nIgnorance is strength.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "short",
    animation: "data-dissolve",
    entrance: "smoke-dissolve",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 53,
    text: "If you want to keep a secret, you must also hide it from yourself.",
    attribution: "— George Orwell",
    source: "1984",
    mood: "defiant-political",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-archival",
    layout: "display"
  },

  // ── ANTOINE DE SAINT-EXUPÉRY ──────────────────────────────────────────────
  {
    id: 54,
    text: "\u201CWhere are the people?\u201D resumed the little prince at last. \u201CIt\u2019s a little lonely in the desert\u2026\u201D\n\u201CIt is lonely when you\u2019re among people, too,\u201D said the snake.",
    attribution: "— Antoine de Saint-Exupéry",
    source: "The Little Prince",
    mood: "contemplative-ancient",
    length: "short",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "center"
  },

  // ── DONNA TARTT ───────────────────────────────────────────────────────────
  {
    id: 55,
    text: "When we are sad — at least I am like this — it can be comforting to cling to familiar objects, to the things that don't change. Your descriptions of the desert — that oceanic, endless glare — are terrible but also very beautiful. Maybe there's something to be said for the rawness and emptiness of it all. The light of long ago is different from the light of today and yet here, in this house, I'm reminded of the past at every turn. But when I think of you, it's as if you've gone away to sea on a ship — out in a foreign brightness where there are no paths, only stars and sky.",
    attribution: "— Donna Tartt",
    source: "The Goldfinch",
    mood: "tender-literary",
    length: "long",
    animation: "darkroom-develop",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 57,
    text: "Only here's what I really, really want someone to explain to me. What if one happens to be possessed of a heart that can't be trusted--? What if the heart, for its own unfathomable reasons, leads one willfully and in a cloud of unspeakable radiance away from health, domesticity, civic responsibility and strong social connections and all the blandly-held common virtues and instead straight toward a beautiful flare of ruin, self-immolation, disaster?...If your deepest self is singing and coaxing you straight toward the bonfire, is it better to turn away? Stop your ears with wax? Ignore all the perverse glory your heart is screaming at you? Set yourself on the course that will lead you dutifully towards the norm, reasonable hours and regular medical check-ups, stable relationships and steady career advancement the New York Times and brunch on Sunday, all with the promise of being somehow a better person? Or...is it better to throw yourself head first and laughing into the holy rage calling your name?",
    attribution: "— Donna Tartt",
    source: "The Goldfinch",
    mood: "wild-electric",
    length: "long",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "left"
  },
  {
    id: 58,
    text: "When you feel homesick, just look up. Because the moon is the same wherever you go.",
    attribution: "— Donna Tartt",
    source: "The Goldfinch",
    mood: "tender-literary",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "center"
  },
  {
    id: 59,
    text: "Some things are too terrible to grasp at once. Other things — naked, sputtering, indelible in their horror — are too terrible to really grasp ever at all. It is only later, in solitude, in memory that the realization dawns: when the ashes are cold; when the mourners have departed; when one looks around and finds oneself — quite to one's surprise — in an entirely different world.",
    attribution: "— Donna Tartt",
    source: "The Secret History",
    mood: "contemplative-ancient",
    length: "standard",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── RABINDRANATH TAGORE ───────────────────────────────────────────────────
  {
    id: 60,
    text: "Where the mind is without fear\nand the head is held high;\nWhere knowledge is free;\nWhere the world has not been broken up\ninto fragments by narrow domestic walls;\nWhere words come out from the depth of truth;\nWhere tireless striving stretches its arms toward perfection;\nWhere the clear stream of reason has not lost its way\ninto the dreary desert sand of dead habit;\nWhere the mind is led forward by Thee\ninto ever-widening thought and action —\nInto that heaven of freedom,\nmy Father, let my country awake.",
    attribution: "— Rabindranath Tagore",
    source: "Where the Mind is Without Fear",
    mood: "defiant-political",
    length: "long",
    animation: "navigation-map",
    font: "fl718-font-archival",
    layout: "left"
  },

  // ── STEPHEN CRANE ─────────────────────────────────────────────────────────
  {
    id: 61,
    text: "In the desert\nI saw a creature, naked, bestial,\nWho, squatting upon the ground,\nHeld his heart in his hands,\nAnd ate of it.\nI said, \u201CIs it good, friend?\u201D\n\u201CIt is bitter \u2014 bitter,\u201D he answered;\n\u201CBut I like it\nBecause it is bitter,\nAnd because it is my heart.\u201D",
    attribution: "— Stephen Crane",
    source: "In the Desert",
    mood: "dark-raw",
    length: "standard",
    animation: "darkroom-develop",
    font: "fl718-font-archival",
    layout: "left"
  },

  // ── CHARLES BAUDELAIRE ────────────────────────────────────────────────────
  {
    id: 62,
    text: "An oasis of horror in a desert of boredom.",
    attribution: "— Charles Baudelaire",
    source: "Le Voyage",
    mood: "dark-raw",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-expressive",
    layout: "display"
  },

  // ── T.S. ELIOT ────────────────────────────────────────────────────────────
  {
    id: 63,
    text: "You neglect and belittle the desert.\nThe desert is not remote in southern tropics\nThe desert is not only around the corner,\nThe desert is squeezed in the tube-train next to you,\nThe desert is in the heart of your brother.",
    attribution: "— T.S. Eliot",
    source: "Choruses from The Rock (1934)",
    mood: "contemplative-ancient",
    length: "standard",
    animation: "etch-a-sketch",
    font: "fl718-font-archival",
    layout: "left"
  },

  // ── POLISH PROVERB ────────────────────────────────────────────────────────
  {
    id: 64,
    text: "Not my circus, not my monkeys.",
    attribution: "— Polish proverb",
    source: null,
    mood: "wild-electric",
    length: "short",
    animation: "card-shuffle",
    font: "fl718-font-system",
    layout: "display"
  },

  // ── DR. SEUSS ─────────────────────────────────────────────────────────────
  {
    id: 65,
    text: "It's fun to have fun, but you have to know how.",
    attribution: "— Dr. Seuss",
    source: null,
    mood: "wild-electric",
    length: "short",
    animation: "marquee-bulb",
    font: "fl718-font-expressive",
    layout: "display"
  },

  // ── AESOP ROCK ────────────────────────────────────────────────────────────
  {
    id: 66,
    text: "Just a little bruise in the back of the pews\nActing amused with a mask and them Vatican blues\nFor in the eyes of the organization I was raised in\nAes' is just another sinning brick in Hell's basement\nCubicle adjacent to the killers and rapists\nFor what? Drugs and fucking, it's part of growing up\nLike cuffs over dumb shits is better than the schools\nI'm not an asshole I'm just a little confused\nJust a lit fuse in the back of the pews\nWatching a thousand flavors of the same God feud\nI figure ultimate-peace is the common theme\nSo it's a no-brainer \u201Cpeace\u201D when the blood hit the screen\nGot a basic good and evil sensibility born\nGood neighbor know a halo wouldn't fit over horns\nI'm more science than faith, I'm more karma than bread and booze\nI'm not an asshole I'm just a little confused",
    attribution: "— Aesop Rock",
    source: "Holy Smoke",
    mood: "defiant-political",
    length: "long",
    animation: "data-dissolve",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 67,
    text: "Roving packs of elusive young become\nChoke-lore writers over boosted drums\nIn the terrifying face of a future tongue\nDown down from a huntable surplus to one",
    attribution: "— Aesop Rock",
    source: "Zero Dark Thirty",
    mood: "dark-raw",
    length: "short",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 68,
    text: "When a king is a whore who comply and conform\nMiles outside of the eye of the storm\nWith a siphon to lure and a prize and award\nWhile avoiding the vile and bizarre that is violence and war",
    attribution: "— Aesop Rock",
    source: "None Shall Pass",
    mood: "defiant-political",
    length: "standard",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 69,
    text: "I can bang my head against any wall you build.",
    attribution: "— Aesop Rock",
    source: null,
    mood: "defiant-political",
    length: "short",
    animation: "etch-a-sketch",
    font: "fl718-font-brutal",
    layout: "display"
  },
  {
    id: 70,
    text: "Yo change the fuckin channel\nI burn a Coma candle\nWhen the flame fades, consider my flatline a soldier's sample\nWe them cats talkin' noise behind that New York trash heap\nWhere the stench of commuter briefcase replaces a bad sleep",
    attribution: "— Aesop Rock",
    source: "Battery",
    mood: "dark-raw",
    length: "standard",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 71,
    text: "There's smoke in my iris\nBut I painted a sunny day on the insides of my eyelids\nSo I'm ready now\nI'm ready for life in this city\nAnd my wings have grown almost enough to lift me",
    attribution: "— Aesop Rock",
    source: "Battery",
    mood: "wild-electric",
    length: "standard",
    animation: "smoke-dissolve",
    font: "fl718-font-expressive",
    layout: "left"
  },
  {
    id: 72,
    text: "I'm not trying to graduate to life with a personalized barstool\nHead in a jar on the desk, feet dangling in a shark pool",
    attribution: "— Aesop Rock",
    source: null,
    mood: "dark-raw",
    length: "short",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 73,
    text: "Well it appears the scars of learning have spoken\nSome are burning, some are frozen\nSome deserve tall tales, some have wrote them\nSome are just a brutal repercussion of devotion\nMine are all of the above 'cause everything leads to erosion",
    attribution: "— Aesop Rock",
    source: "Battery",
    mood: "dark-raw",
    length: "standard",
    animation: "string-stitch",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 74,
    text: "And I ain't getting any younger\nMy knuckles wear their bruises well\nI've yet to lose that hunger\nBut only time can tell",
    attribution: "— Aesop Rock",
    source: "Battery",
    mood: "dark-raw",
    length: "short",
    animation: "smoke-dissolve",
    font: "fl718-font-brutal",
    layout: "center"
  },

  // ── LEO TOLSTOY ───────────────────────────────────────────────────────────
  {
    id: 75,
    text: "Everyone thinks of changing the world, but no one thinks of changing himself.",
    attribution: "— Leo Tolstoy",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "etch-a-sketch",
    font: "fl718-font-archival",
    layout: "center"
  },

  // ── SENECA ────────────────────────────────────────────────────────────────
  {
    id: 76,
    text: "Laughter, and a lot of it, is the right response to the things which drive us to tears.",
    attribution: "— Seneca",
    source: null,
    mood: "wild-electric",
    length: "short",
    animation: "marquee-bulb",
    font: "fl718-font-expressive",
    layout: "center"
  },

  // ── ANTONIO PORCHIA ───────────────────────────────────────────────────────
  {
    id: 77,
    text: "He who makes a paradise of his bread makes a hell of his hunger.",
    attribution: "— Antonio Porchia",
    source: "Voices",
    mood: "contemplative-ancient",
    length: "short",
    animation: "ikea-assembly",
    font: "fl718-font-archival",
    layout: "display"
  },

  // ── CORMAC McCARTHY ───────────────────────────────────────────────────────
  {
    id: 78,
    text: "The jagged mountains were pure blue in the dawn and everywhere birds twittered and the sun when it rose caught the moon in the west so that they lay opposed to each other across the earth, the sun whitehot and the moon a pale replica, as if they were the ends of a common bore beyond whose terminals burned worlds past all reckoning.",
    attribution: "— Cormac McCarthy",
    source: "Blood Meridian",
    mood: "contemplative-ancient",
    length: "standard",
    animation: "darkroom-develop",
    font: "fl718-font-archival",
    layout: "left"
  },
  {
    id: 79,
    text: "The wrath of God lies sleeping. It was hid a million years before men were and only men have the power to wake it. Hell aint half full. Hear me. Ye carry war of a madman's making onto a foreign land. Ye'll wake more than the dogs.",
    attribution: "— Cormac McCarthy",
    source: "Blood Meridian",
    mood: "dark-raw",
    length: "standard",
    animation: "navigation-map",
    font: "fl718-font-archival",
    layout: "left"
  },
  {
    id: 80,
    text: "The truth about the world, he said, is that anything is possible. Had you not seen it all from birth and thereby bled it of its strangeness it would appear to you for what it is, a hat trick in a medicine show, a fevered dream, a trance bepopulate with chimeras having neither analogue nor precedent, an itinerant carnival, a migratory tentshow whose ultimate destination after many a pitch in many a mudded field is unspeakable and calamitous beyond reckoning. The universe is no narrow thing and the order within it is not constrained by any latitude in its conception to repeat what exists in one part in any other part. Even in this world more things exist without our knowledge than with it and the order in creation which you see is that which you have put there, like a string in a maze, so that you shall not lose your way. For existence has its own order and that no man's mind can compass, that mind itself being but a fact among others.",
    attribution: "— Cormac McCarthy",
    source: "Blood Meridian",
    mood: "wild-electric",
    length: "long",
    animation: "navigation-map",
    font: "fl718-font-archival",
    layout: "left"
  },

  // ── NAJWA ZEBIAN ──────────────────────────────────────────────────────────
  {
    id: 81,
    text: "These mountains that you are carrying,\nyou were only supposed to climb.",
    attribution: "— Najwa Zebian",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "center"
  },

  // ── MARY SHELLEY ──────────────────────────────────────────────────────────
  {
    id: 82,
    text: "I have love in me the likes of which you can scarcely imagine and rage the likes of which you would not believe. If I cannot satisfy the one, I will indulge the other.",
    attribution: "— Mary Shelley",
    source: "Frankenstein",
    mood: "dark-raw",
    length: "standard",
    animation: "paint-drip",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── ALBERT CAMUS ──────────────────────────────────────────────────────────
  {
    id: 83,
    text: "It was as if that great rush of anger had washed me clean, emptied me of hope, and, gazing up at the dark sky spangled with its signs and stars, for the first time, the first, I laid my heart open to the benign indifference of the universe.",
    attribution: "— Albert Camus",
    source: "The Stranger",
    mood: "contemplative-ancient",
    length: "standard",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── WILLIAM BLAKE ─────────────────────────────────────────────────────────
  {
    id: 84,
    text: "I was angry with my friend;\nI told my wrath, my wrath did end.\nI was angry with my foe:\nI told it not, my wrath did grow.\nAnd I watered it in fears,\nNight & morning with my tears:\nAnd I sunned it with smiles,\nAnd with soft deceitful wiles.\nAnd it grew both day and night.\nTill it bore an apple bright.\nAnd my foe beheld it shine,\nAnd he knew that it was mine.\nAnd into my garden stole,\nWhen the night had veiled the pole;\nIn the morning glad I see;\nMy foe outstretched beneath the tree.",
    attribution: "— William Blake",
    source: "A Poison Tree",
    mood: "dark-raw",
    length: "long",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── EURIPIDES ─────────────────────────────────────────────────────────────
  {
    id: 85,
    text: "The fiercest anger of all, the most incurable,\nis that which rages in the place of dearest love.",
    attribution: "— Euripides",
    source: "Medea",
    mood: "dark-raw",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-archival",
    layout: "display"
  },

  // ── ARUNDHATI ROY ─────────────────────────────────────────────────────────
  {
    id: 86,
    text: "She wore flowers in her hair and carried magic secrets in her eyes. She spoke to no one. She spent hours on the riverbank. She smoked cigarettes and had midnight swims.",
    attribution: "— Arundhati Roy",
    source: "The God of Small Things",
    mood: "tender-literary",
    length: "standard",
    animation: "paint-drip",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── FYODOR DOSTOYEVSKY ────────────────────────────────────────────────────
  {
    id: 87,
    text: "Since man cannot live without miracles, he will provide himself with miracles of his own making. He will believe in witchcraft and sorcery, even though he may otherwise be a heretic, an atheist, and a rebel.",
    attribution: "— Fyodor Dostoyevsky",
    source: "The Brothers Karamazov",
    mood: "wild-electric",
    length: "standard",
    animation: "smoke-dissolve",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── KHALED HOSSEINI ───────────────────────────────────────────────────────
  {
    id: 88,
    text: "That same night, I wrote my first short story. It took me thirty minutes. It was a dark little tale about a man who found a magic cup and learned that if he wept into the cup, his tears turned into pearls. But even though he had always been poor, he was a happy man and rarely shed a tear. So he found ways to make himself sad so that his tears could make him rich. As the pearls piled up, so did his greed grow. The story ended with the man sitting on a mountain of pearls, knife in hand, weeping helplessly into the cup with his beloved wife's slain body in his arms.",
    attribution: "— Khaled Hosseini",
    source: "The Kite Runner",
    mood: "dark-raw",
    length: "long",
    animation: "darkroom-develop",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── FRANCES HODGSON BURNETT ───────────────────────────────────────────────
  {
    id: 89,
    text: "Of course there must be lots of Magic in the world, but people don't know what it is like or how to make it. Perhaps the beginning is just to say nice things are going to happen until you make them happen.",
    attribution: "— Frances Hodgson Burnett",
    source: "The Secret Garden",
    mood: "wild-electric",
    length: "standard",
    animation: "paint-drip",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── LAO TZU ───────────────────────────────────────────────────────────────
  {
    id: 90,
    text: "Doing nothing is better than being busy doing nothing.",
    attribution: "— Lao Tzu",
    source: null,
    mood: "contemplative-ancient",
    length: "short",
    animation: "pond-ripple",
    font: "fl718-font-archival",
    layout: "center"
  },

  // ── TERENCE McKENNA ───────────────────────────────────────────────────────
  {
    id: 91,
    text: "Nature loves courage. You make the commitment and nature will respond to that commitment by removing impossible obstacles. Dream the impossible dream and the world will not grind you under, it will lift you up. This is the trick. This is what all these teachers and philosophers who really counted, who really touched the alchemical gold, this is what they understood. This is the shamanic dance in the waterfall. This is how magic is done. By hurling yourself into the abyss and discovering it's a feather bed.",
    attribution: "— Terence McKenna",
    source: null,
    mood: "wild-electric",
    length: "long",
    animation: "navigation-map",
    font: "fl718-font-expressive",
    layout: "left"
  },

  // ── BEASTIE BOYS ──────────────────────────────────────────────────────────
  {
    id: 92,
    text: "I got money, I got juice\nI got to the party and I got loose\nI got rhythms, I got rhymes\nI got the girlies with the def behinds\nI got ill, I got busted\nI got dust and I got dusted\nI got gold, I got funky\nI got the new dance they call the Brass Monkey",
    attribution: "— Beastie Boys",
    source: "Brass Monkey",
    mood: "wild-electric",
    length: "standard",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── EL-P ──────────────────────────────────────────────────────────────────
  {
    id: 93,
    text: "Why should I be sober if god is clearly dusted out of his head?",
    attribution: "— El-P",
    source: "Smithereens (Stop Cryin')",
    mood: "wild-electric",
    length: "short",
    animation: "card-shuffle",
    font: "fl718-font-brutal",
    layout: "display"
  },

  // ── THE CHIEFTAINS ────────────────────────────────────────────────────────
  {
    id: 94,
    text: "There armed lines of marching men\nIn squadrons passed me by\nNo pipe did hum\nNo battle drum did sound its loud tattoo\nBut the Angelus Bells o'er the Liffey swells\nRang out in the foggy dew",
    attribution: "— The Chieftains",
    source: "Foggy Dew (traditional)",
    mood: "contemplative-ancient",
    length: "standard",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── BAD RELIGION ──────────────────────────────────────────────────────────
  {
    id: 95,
    text: "Hey, brother Christian with your high and mighty errand\nYour actions speak so loud, I can't hear a word you're saying\nHey, sister Bleeding Heart with all of your compassion\nYour labors soothe the hurt, but can't assuage temptation",
    attribution: "— Bad Religion",
    source: "I Want to Conquer the World",
    mood: "defiant-political",
    length: "standard",
    animation: "etch-a-sketch",
    font: "fl718-font-archival",
    layout: "left"
  },

  // ── ZACK HEMSEY ───────────────────────────────────────────────────────────
  {
    id: 96,
    text: "Am I seeing something real or is it smoke?\nAm I on the ground or am I hung without a rope?\nAnd this is fantasy or from the dream have I awoke?\nAm I steady on the path or am I clinging onto hope?\n\nTo mean something, we live and we strive for it\nTo feel something, we fight and survive for it\nTo love something, we scream out and cry for it\nBut tell me now, are you willing to die for it?\n\nGiving is the levee that will bound a man's greed\nPrison is the dwelling when you take no leave\nFaster than a sparrow flies, trap the cupid by surprise\nGrab his bow and arrow and shoot straight into the empty sky\n\nYou can spend eternity immersed in what's inside\nBut if you're searching for a purpose, then no purpose will you find",
    attribution: "— Zack Hemsey",
    source: "Lessons from a Nomad",
    mood: "contemplative-ancient",
    length: "long",
    animation: "string-stitch",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── SAMUEL JOHNSON ────────────────────────────────────────────────────────
  {
    id: 97,
    text: "No summons mocked by chill delay,\nNo petty gain disdained by pride,\nThe modest wants of every day\nThe toil of every day supplied.",
    attribution: "— Samuel Johnson",
    source: "On the Death of Dr. Robert Levet",
    mood: "contemplative-ancient",
    length: "short",
    animation: "ikea-assembly",
    font: "fl718-font-archival",
    layout: "left"
  },

  // ── THOMAS GRAY ───────────────────────────────────────────────────────────
  {
    id: 98,
    text: "These shall the fury Passions tear,\nThe vultures of the mind —\nDisdainful Anger, pallid Fear,\nAnd Shame that skulks behind;\nOr pining Love shall waste their youth,\nOr Jealousy with rankling tooth,",
    attribution: "— Thomas Gray",
    source: "Ode on a Distant Prospect of Eton College",
    mood: "dark-raw",
    length: "standard",
    animation: "string-stitch",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── CHARLES BUKOWSKI ──────────────────────────────────────────────────────
  {
    id: 99,
    text: "If you're going to try, go all the way.\nOtherwise, don't even start.\nThis could mean losing girlfriends, wives, relatives and maybe even your mind.\nIt could mean not eating for three or four days.\nIt could mean freezing on a park bench.\nIt could mean jail.\nIt could mean derision.\nIt could mean mockery — isolation.\nIsolation is a gift.\nAll the others are a test of your endurance,\nof how much you really want to do it.\nAnd, you'll do it, despite rejection and the worst odds.\nAnd it will be better than anything else you can imagine.\nIf you're going to try, go all the way.\nThere is no other feeling like that.\nYou will be alone with the gods,\nand the nights will flame with fire.\nYou will ride life straight to perfect laughter.\nIt's the only good fight there is.",
    attribution: "— Charles Bukowski",
    source: "Roll the Dice",
    mood: "dark-raw",
    length: "long",
    animation: "letterpress",
    font: "fl718-font-brutal",
    layout: "left"
  },
  {
    id: 100,
    text: "your life is your life\ndon't let it be clubbed into dank submission.\nbe on the watch.\nthere are ways out.\nthere is a light somewhere.\nit may not be much light but\nit beats the darkness.\nbe on the watch.\nthe gods will offer you chances.\nknow them.\ntake them.\nyou can't beat death but\nyou can beat death in life, sometimes.\nand the more often you learn to do it,\nthe more light there will be.\nyour life is your life.\nknow it while you have it.\nyou are marvelous\nthe gods wait to delight\nin you.",
    attribution: "— Charles Bukowski",
    source: "The Laughing Heart",
    mood: "dark-raw",
    length: "long",
    animation: "pond-ripple",
    font: "fl718-font-literary",
    layout: "left"
  },

  // ── GEORGE SANTAYANA ──────────────────────────────────────────────────────
  {
    id: 101,
    text: "Experience may explore it adventurously, and science may describe it with precision; but after you have wandered up and down in it for many years, and have gathered all you could of its ways by report, this same world, because it exists substantially and is not invented, remains a foreign thing and a marvel to the spirit: unknowable as a drop of water is unknowable, or unknowable like a person loved.",
    attribution: "— George Santayana",
    source: "The Unknowable",
    mood: "contemplative-ancient",
    length: "standard",
    animation: "darkroom-develop",
    font: "fl718-font-archival",
    layout: "left"
  },

  // ── RICHARD P. FEYNMAN ────────────────────────────────────────────────────
  {
    id: 102,
    text: "I think it's much more interesting to live not knowing than to have answers which might be wrong. I have approximate answers and possible beliefs and different degrees of uncertainty about different things, but I am not absolutely sure of anything and there are many things I don't know anything about, such as whether it means anything to ask why we're here. I don't have to know an answer. I don't feel frightened not knowing things, by being lost in a mysterious universe without any purpose, which is the way it really is as far as I can tell.",
    attribution: "— Richard P. Feynman",
    source: null,
    mood: "contemplative-ancient",
    length: "long",
    animation: "data-dissolve",
    entrance: "smoke-dissolve",
    font: "fl718-font-system",
    layout: "left"
  },

  // ── IMMORTAL TECHNIQUE ────────────────────────────────────────────────────
  {
    id: 103,
    text: "So if I should ever fall and get caught in a hustle\nLet them know that I died while I fought in a struggle\nFrom the hood rats to the rich kids lost in a bubble\nSpray painting on the streets and at the subway tunnels\nWrite it down and remember that we never gave in\nThe mind of a child is where the revolution begins\nSo if the solution has never been to look in yourself\nHow is it that you expect to find it anywhere else?",
    attribution: "— Immortal Technique",
    source: "Caught in a Hustle",
    mood: "defiant-political",
    length: "standard",
    animation: "data-dissolve",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── TOOL ──────────────────────────────────────────────────────────────────
  {
    id: 104,
    text: "Join in my\nJoin in my child\nAnd listen, digging through\nMy old numb shadow\nMy shadow's shedding skin\nI've been picking scabs again\nI'm down, digging through\nMy old muscles looking for a clue",
    attribution: "— Tool",
    source: "Forty Six & 2",
    mood: "dark-raw",
    length: "standard",
    animation: "paint-drip",
    font: "fl718-font-expressive",
    layout: "left"
  },

  // ── DEAD PREZ ─────────────────────────────────────────────────────────────
  {
    id: 105,
    text: "I say we all rush the pentagon, pull out guns\nAnd grab the intercom, my first words will be\nI believe man made god, outta ignorance and fear\nIf God made man, then why the hell would he put us here?\nI thought he's supposed to be the all loving\nThe same God who let Hitler put the Jews in the oven\nWe don't fall for the regular shit, they try to feed us\nAll this half-ass leadership, flippin' position\nThey turn politician and shut the hell up and follow tradition\nFor your TV screen is telling lies to your vision",
    attribution: "— dead prez",
    source: "Propaganda",
    mood: "defiant-political",
    length: "standard",
    animation: "data-dissolve",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── OSCAR WILDE ───────────────────────────────────────────────────────────
  {
    id: 106,
    text: "We are all in the gutter, but some of us are looking at the stars.",
    attribution: "— Oscar Wilde",
    source: null,
    mood: "dark-raw",
    length: "short",
    animation: "marquee-bulb",
    font: "fl718-font-literary",
    layout: "center"
  },

  // ── HAKUIN EKAKU (Zen) ────────────────────────────────────────────────────
  // (already included as id: 22 above)

  // ── HUNTER S. THOMPSON ──────────────────────────────────────────────────────
  {
    id: 108,
    text: "We were somewhere around Barstow on the edge of the desert when the drugs began to take hold. I remember saying something like 'I feel a bit lightheaded; maybe you should drive. . . .' And suddenly there was a terrible roar all around us and the sky was full of what looked like huge bats, all swooping and screeching and diving around the car, which was going about a hundred miles an hour with the top down to Las Vegas. And a voice was screaming 'Holy Jesus! What are these goddamn animals?'",
    attribution: "— Hunter S. Thompson",
    source: "Fear and Loathing in Las Vegas",
    mood: "wild-electric",
    length: "long",
    animation: "navigation-map",
    font: "fl718-font-expressive",
    layout: "left"
  },

  // ── HUNTER S. THOMPSON (cont.) ───────────────────────────────────────────
  {
    id: 109,
    text: "Then it was quiet again. My attorney had taken his shirt off and was pouring beer on his chest, to facilitate the tanning process. \"What the hell are you yelling about?\" he muttered, staring up at the sun with his eyes closed and covered with wraparound Spanish sunglasses. \"Never mind,\" I said. \"It's your turn to drive.\" I hit the brakes and aimed the Great Red Shark toward the shoulder of the highway. No point mentioning those bats, I thought. The poor bastard will see them soon enough.",
    attribution: "— Hunter S. Thompson",
    source: "Fear and Loathing in Las Vegas",
    mood: "wild-electric",
    length: "long",
    animation: "navigation-map",
    font: "fl718-font-expressive",
    layout: "left"
  },

  // ── BAD RELIGION ────────────────────────────────────────────────────────────
  {
    id: 110,
    text: "There's no vestige of beginning, no prospect of an end\nWhen we all disintegrate, it will all happen again, yeah\nIf you came to conquer, you'll be king for a day\nBut you too will deteriorate and quickly fade away\n\nAnd believe these words you hear when you think your path is clear\nWe have no control\nWe have no control\nWe have no control\nWe do not understand, you have no control\nYou are not in command\n\nYou have no control\nWe have no control\nNo control, no control\nYou have no control",
    attribution: "— Bad Religion",
    source: "No Control",
    mood: "defiant-political",
    length: "standard",
    animation: "letterpress",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── BAD RELIGION (cont.) ────────────────────────────────────────────────────
  {
    id: 111,
    text: "Hey, Man of Science with your perfect rules of measure\nCan you improve this place with the data that you gather?\nHey, Mother Mercy, can your loins bear fruit forever?\nIs your fecundity a trammel or a treasure?",
    attribution: "— Bad Religion",
    source: "I Want to Conquer the World",
    mood: "defiant-political",
    length: "standard",
    animation: "data-dissolve",
    entrance: "smoke-dissolve",
    font: "fl718-font-brutal",
    layout: "left"
  },

  // ── SÉAMUS DOLAN (cont.) ──────────────────────────────────────────────────
  {
    id: 112,
    text: "Sometimes six or seven whiskeys leave you feeling loose around the edges. More than a few of those whiskeys had sand in them. Sure, I was in Egypt, but nowhere near the desert. I was hanging off a jagged chair in a haggard bar in the center of Alexandria. What the fuck am I drinking whiskey and sand on a Tuesday at 11:30 in the morning for?",
    attribution: "— Séamus Dolan",
    source: "Tears of Egypt Series",
    mood: "dark-raw",
    length: "standard",
    animation: "darkroom-develop",
    font: "fl718-font-literary",
    layout: "left"
  },

];
