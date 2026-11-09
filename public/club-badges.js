// User-supplied CWC Logos.zip (22) and Team Icons V2.zip (45).
// Badge SVGs retain their original bytes. Canonical names correct archive typos.
const clubEntries = [
  [
    "AC Milan",
    "ac-milan",
    [
      "AC Milan",
      "A.C. Milan"
    ]
  ],
  [
    "Al Ahly",
    "al-ahly",
    [
      "Al ahly",
      "Al Ahly SC"
    ]
  ],
  [
    "Al Ain FC",
    "al-ain",
    [
      "Al Ain FC",
      "Al Ain"
    ]
  ],
  [
    "Al Hilal",
    "al-hilal",
    [
      "Al Hilal",
      "Al-Hilal SFC",
      "Al Hilal Saudi Club"
    ]
  ],
  [
    "Arsenal",
    "arsenal",
    [
      "Arsenal",
      "Arsenal FC"
    ]
  ],
  [
    "AS Monaco",
    "monaco",
    [
      "Monaco",
      "A.S. Monaco",
      "AS Monaco FC"
    ]
  ],
  [
    "Aston Villa",
    "aston-villa",
    [
      "Aston Villa",
      "Aston Villa FC"
    ]
  ],
  [
    "Athletic Club",
    "athletic-club",
    [
      "Athletic Club",
      "Athletic Bilbao",
      "Athletic Club Bilbao"
    ]
  ],
  [
    "Atlético Madrid",
    "atletico-madrid",
    [
      "Atletico Madrid",
      "Club Atletico de Madrid",
      "Atletico de Madrid"
    ]
  ],
  [
    "Auckland City",
    "auckland-city",
    [
      "Auckland",
      "Auckland City FC"
    ]
  ],
  [
    "Barcelona",
    "barcelona",
    [
      "Barcelona",
      "FC Barcelona",
      "F.C. Barcelona"
    ]
  ],
  [
    "Bayer Leverkusen",
    "bayer-leverkusen",
    [
      "Bayer LEverkusen",
      "Bayer 04 Leverkusen"
    ]
  ],
  [
    "Bayern Munich",
    "bayern-munich",
    [
      "Bayern Munich",
      "FC Bayern Munich",
      "Bayern München",
      "FC Bayern München",
      "Bayern Munchen"
    ]
  ],
  [
    "Benfica",
    "benfica",
    [
      "Benfica",
      "SL Benfica",
      "S.L. Benfica"
    ]
  ],
  [
    "Boca Juniors",
    "boca-juniors",
    [
      "Boca",
      "CA Boca Juniors"
    ]
  ],
  [
    "Borussia Dortmund",
    "borussia-dortmund",
    [
      "Borussia Dortmund",
      "BVB"
    ]
  ],
  [
    "Borussia Mönchengladbach",
    "borussia-monchengladbach",
    [
      "Monchengladbach",
      "Mönchengladbach",
      "Borussia Moenchengladbach",
      "Moenchengladbach"
    ]
  ],
  [
    "Botafogo",
    "botafogo",
    [
      "Botafogo",
      "Botafogo FR"
    ]
  ],
  [
    "Bournemouth",
    "bournemouth",
    [
      "Bournemouth",
      "AFC Bournemouth",
      "A.F.C. Bournemouth"
    ]
  ],
  [
    "Brentford",
    "brentford",
    [
      "Brentford",
      "Brentford FC"
    ]
  ],
  [
    "Brighton & Hove Albion",
    "brighton",
    [
      "Brighton",
      "Brighton and Hove Albion",
      "Brighton Hove Albion"
    ]
  ],
  [
    "Chelsea",
    "chelsea",
    [
      "Chelsea",
      "Chelsea FC"
    ]
  ],
  [
    "Crystal Palace",
    "crystal-palace",
    [
      "Crystal Palace",
      "Crystal Palace FC"
    ]
  ],
  [
    "Eintracht Frankfurt",
    "eintracht-frankfurt",
    [
      "Eintracht Frankfurt"
    ]
  ],
  [
    "Espérance Sportive de Tunis",
    "esperance-tunis",
    [
      "Esperance Sprotive de Tunis",
      "Esperance de Tunis",
      "Esperance Tunis",
      "Espérance Tunis"
    ]
  ],
  [
    "Everton",
    "everton",
    [
      "Everton",
      "Everton FC"
    ]
  ],
  [
    "FC Porto",
    "porto",
    [
      "FC Porto",
      "Porto",
      "F.C. Porto"
    ]
  ],
  [
    "Flamengo",
    "flamengo",
    [
      "Flamengo",
      "CR Flamengo"
    ]
  ],
  [
    "Fluminense",
    "fluminense",
    [
      "Fluminense",
      "Fluminense FC"
    ]
  ],
  [
    "Fulham",
    "fulham",
    [
      "Fulham",
      "Fulham FC",
      "Fulham F.C."
    ]
  ],
  [
    "Inter Miami",
    "inter-miami",
    [
      "Miami",
      "Inter Miami CF"
    ]
  ],
  [
    "Inter Milan",
    "inter-milan",
    [
      "Inter Milan",
      "Internazionale",
      "FC Internazionale Milano",
      "Internazionale Milano"
    ]
  ],
  [
    "Ipswich Town",
    "ipswich-town",
    [
      "Ipswitch",
      "Ipswich",
      "Ipswich Town FC"
    ]
  ],
  [
    "Juventus",
    "juventus",
    [
      "Juventus",
      "Juventus FC"
    ]
  ],
  [
    "Lazio",
    "lazio",
    [
      "Lazio",
      "SS Lazio",
      "S.S. Lazio"
    ]
  ],
  [
    "Leicester City",
    "leicester-city",
    [
      "Leiceste",
      "Leicester",
      "Leicester City FC"
    ]
  ],
  [
    "Liverpool",
    "liverpool",
    [
      "Liverpool",
      "Liverpool FC"
    ]
  ],
  [
    "Lyon",
    "lyon",
    [
      "Lyon",
      "Olympique Lyonnais",
      "Olympique Lyon"
    ]
  ],
  [
    "Mainz 05",
    "mainz",
    [
      "Mainz",
      "1. FSV Mainz 05",
      "FSV Mainz 05"
    ]
  ],
  [
    "Mamelodi Sundowns",
    "mamelodi-sundowns",
    [
      "Mamelodi",
      "Mamelodi Sundowns FC"
    ]
  ],
  [
    "Manchester City",
    "manchester-city",
    [
      "Man City",
      "Manchester City FC",
      "Man. City"
    ]
  ],
  [
    "Manchester United",
    "manchester-united",
    [
      "Manchester Untied",
      "Manchester United FC",
      "Man United",
      "Man Utd"
    ]
  ],
  [
    "Marseille",
    "marseille",
    [
      "Marseille",
      "Olympique de Marseille",
      "Olympique Marseille"
    ]
  ],
  [
    "Monterrey",
    "monterrey",
    [
      "Monterrey",
      "CF Monterrey",
      "C.F. Monterrey"
    ]
  ],
  [
    "Napoli",
    "napoli",
    [
      "Napoli",
      "SSC Napoli",
      "S.S.C. Napoli"
    ]
  ],
  [
    "Newcastle United",
    "newcastle-united",
    [
      "Newcastle",
      "Newcastle United FC"
    ]
  ],
  [
    "Nottingham Forest",
    "nottingham-forest",
    [
      "Notts Forest",
      "Nottingham Forest FC",
      "Nottm Forest"
    ]
  ],
  [
    "Pachuca",
    "pachuca",
    [
      "Pachuca",
      "CF Pachuca",
      "C.F. Pachuca"
    ]
  ],
  [
    "Palmeiras",
    "palmeiras",
    [
      "Palmeiras",
      "SE Palmeiras"
    ]
  ],
  [
    "Paris Saint-Germain",
    "paris-saint-germain",
    [
      "PSG",
      "Paris Saint Germain",
      "Paris SG",
      "Paris St Germain"
    ]
  ],
  [
    "RB Leipzig",
    "rb-leipzig",
    [
      "Red Bull Leipzig",
      "RasenBallsport Leipzig",
      "Rasenballsport Leipzig e.V."
    ]
  ],
  [
    "Real Betis",
    "real-betis",
    [
      "Real Betis",
      "Real Betis Balompié",
      "Real Betis Balompie"
    ]
  ],
  [
    "Real Madrid",
    "real-madrid",
    [
      "Real Madrid",
      "Real Madrid CF",
      "Real Madrid C.F."
    ]
  ],
  [
    "Red Bull Salzburg",
    "red-bull-salzburg",
    [
      "Salzburg",
      "FC Red Bull Salzburg",
      "RB Salzburg"
    ]
  ],
  [
    "River Plate",
    "river-plate",
    [
      "River Plate",
      "CA River Plate"
    ]
  ],
  [
    "Roma",
    "roma",
    [
      "Roma",
      "AS Roma",
      "A.S. Roma"
    ]
  ],
  [
    "Seattle Sounders",
    "seattle-sounders",
    [
      "Seattle",
      "Seattle Sounders FC"
    ]
  ],
  [
    "Southampton",
    "southampton",
    [
      "Southampton",
      "Southampton FC"
    ]
  ],
  [
    "Tottenham Hotspur",
    "tottenham-hotspur",
    [
      "Tottenham",
      "Tottenham Hotspur FC",
      "Spurs"
    ]
  ],
  [
    "Ulsan HD",
    "ulsan-hd",
    [
      "Ulsan HD",
      "Ulsan HD FC",
      "Ulsan Hyundai"
    ]
  ],
  [
    "Urawa Red Diamonds",
    "urawa-red-diamonds",
    [
      "Uruwa",
      "Urawa",
      "Urawa Reds"
    ]
  ],
  [
    "Valencia",
    "valencia",
    [
      "Valencia",
      "Valencia CF",
      "Valencia C.F."
    ]
  ],
  [
    "VfL Wolfsburg",
    "wolfsburg",
    [
      "Wolfsburg",
      "VFL Wolfsburg"
    ]
  ],
  [
    "Villarreal",
    "villarreal",
    [
      "Villa Real",
      "Villarreal CF",
      "Villarreal C.F."
    ]
  ],
  [
    "West Ham United",
    "west-ham-united",
    [
      "West Ham",
      "West Ham United FC"
    ]
  ],
  [
    "Wolverhampton Wanderers",
    "wolverhampton-wanderers",
    [
      "Wolves",
      "Wolverhampton",
      "Wolverhampton Wanderers FC"
    ]
  ],
  [
    "Wydad AC",
    "wydad",
    [
      "Wydad",
      "Wydad Athletic Club",
      "Wydad Casablanca"
    ]
  ]
];

const normalizeClubName = (name) => name.normalize('NFKD')
  .replace(/\p{M}/gu, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]/gu, '');

const clubBadgePaths = new Map();
for (const [name, slug, aliases] of clubEntries) {
  const path = `/assets/clubs/${slug}.svg`;
  for (const label of [name, ...aliases]) {
    const key = normalizeClubName(label);
    const existing = clubBadgePaths.get(key);
    if (existing && existing !== path) {
      throw new Error(`Conflicting club badge alias: ${label}`);
    }
    clubBadgePaths.set(key, path);
  }
}

export const clubNames = Object.freeze(clubEntries.map(([name]) => name));

export function getClubBadge(name) {
  if (typeof name !== 'string') return null;
  return clubBadgePaths.get(normalizeClubName(name)) ?? null;
}
