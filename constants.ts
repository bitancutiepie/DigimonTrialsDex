
import { NatureCategory } from './types';

export const NATURE_GUIDE: NatureCategory[] = [
  {
    name: 'Lowkey',
    traits: ['Lonely', 'Bold', 'Relaxed', 'Timid', 'Serious', 'Modest', 'Mild', 'Quiet', 'Bashful', 'Calm', 'Gentle', 'Careful']
  },
  {
    name: 'Amped',
    traits: ['Hardy', 'Brave', 'Adamant', 'Naughty', 'Docile', 'Impish', 'Lax', 'Hasty', 'Jolly', 'Naive', 'Rash', 'Sassy', 'Quirky']
  }
];

export const ITEM_NAMES = [
  'Gakuren', 'Auspicious Armor', 'King\'s Rock', 'Sachet', 'Red Digicore', 
  'Malicious Armor', 'Gold X Antibody', 'Rose Soul', 'Toy Gun', 'Grani', 
  'Lunar Scale', 'Byakko Core', 'Scary Plush', 'Cute Plush', 'Famis', 'Unholy Heart',
  'Rhata Genes', 'Zino Genes', 'Shine Soul', 'PositronLaser', 'Omega Blade',
  'Wolf Soul', 'Crow Soul', 'Lupine Laser', 'Wolf Kendo', 'Jealousy Rain', 
  'Titanic Charge', 'Earth Shaker', 'Shadow Meteor', 'Salamander Break', 'Flame Storm'
];

export const RAW_DATA = `
PATAMON LINE
Patamon
├─ Lv20 → Angemon
├─ Light Data → Pegasmon

Angemon
├─ Lv35 → HolyAngemon
├─ Light Data ⇄ Pegasmon

Pegasmon
├─ Lv35 → HolyAngemon Priest Mode
├─ Light Data ⇄ Angemon

HolyAngemon
├─ Lv56 → Seraphimon
├─ Light Data ⇄ HolyAngemon Priest Mode
├─ Lv80 → Goddramon

Seraphimon
└─ Light Data ⇄ Goddramon

LOPMON LINE
Lopmon
├─ Lv20 → Turuiemon

Turuiemon
├─ Lv35 → Antilamon Deva
├─ Dark Data → Wendimon

Wendimon
├─ Lv35 → Antilamon Virus
├─ Light Data ⇄ Turuiemon

Antilamon Deva
├─ Lv56 → Cherubimon Virtue
├─ Dark Data ⇄ Antilamon Virus

Antilamon Virus
├─ Lv35 → Cherubimon Vice
├─ Light Data ⇄ Antilamon Deva

Cherubimon Virtue
└─ Dark Data ⇄ Cherubimon Vice

SALAMON LINE
Salamon
├─ Lv20 → Tailmon

Tailmon
├─ Light Data → Nefertimon
├─ Lv35 → Angewomon

Angewomon
├─ Lv56 → Ophanimon
├─ Jogress with LadyDevimon → Mastemon
├─ Light Data → Kyukimon

Nefertimon
├─ Lv35 → Kyukimon

Kyukimon
├─ Lv80 → Holydramon
├─ Light Data ⇄ Angewomon

Ophanimon
└─ Light Data ⇄ Holydramon

ARMADIMON LINE
Armadimon
├─ Lv18 → Ankylomon
├─ Water Data → Submarimon
├─ Earth Data → Digmon

Ankylomon
├─ Lv32 → Brachiomon
├─ Lv30 with Angemon or Pegasmon in party → Shakkoumon

Submarimon
├─ Lv32 → Whamon

Digmon
├─ Lv32 → Scorpiomon

Brachiomon
├─ Lv54 → Ultimate Brachiomon

Whamon
├─ Lv54 → MarinAngemon
├─ King's Rock → KingWhamon

Shakkoumon
└─ Lv54 → SlashAngemon

HAWKMON LINE
Hawkmon
├─ Lv18 → Aquilamon
├─ Wind Data → Holsmon
├─ Wood Data → Shurimon

Aquilamon
├─ Lv32 → Hippogriffomon
├─ Lv30 with Tailmon or Nefertimon in party → Silphymon

Holsmon
├─ Lv32 → Peacockmon

Shurimon
├─ Lv32 → Fuumamon

Hippogriffomon
├─ Male Lv54 → Griphomon
├─ Female Lv54 → LovelyAngemon
├─ Sachet → Murmukusmon

Silphymon
├─ Lv54 → Valkyriemon

Fuumamon
├─ Lv54 → Tactimon

Peacockmon
├─ Lv54 → Valdurmon

Valdurmon
└─ Jogress with BanchouLeomon → Chaosmon Valdur Arm

VEEMON LINE
Veemon
├─ Lv18 → ExVeemon
├─ Fire Data → Fladramon
├─ Thunder Data → Raidramon
├─ Light Data → Gargoylemon

ExVeemon
├─ Lv32 → Aeroveedramon
├─ Lv30 with Stingmon in party → Paildramon

Fladramon
├─ Lv32 → Magnamon

Raidramon
├─ Lv32 → Majiramon

Gargoylemon
├─ Lv35 → Manticoremon

Aeroveedramon
├─ Lv54 → UlforceVeedramon

Magnamon
└─ Holding Gold X Antibody → Magnamon X

Majiramon
└─ Lv70 → Qinglongmon

Manticoremon
└─ Lv70 → Goddramon

Paildramon
└─ Lv54 → Imperialdramon Dragon Mode

Imperialdramon Dragon Mode
└─ Using PositronLaser in battle → Imperialdramon Fighter Mode

Imperialdramon Fighter Mode
└─ Holding Omega Blade → Imperialdramon Paladin Mode

WORMMON LINE
Wormmon
├─ Lv18 → Stingmon

Stingmon
├─ Lv32 → Jewelbeemon
├─ Lv30 with ExVeemon in party → Dinobeemon

Jewelbeemon
└─ Gakuren → BanchouStingmon

Dinobeemon
└─ Lv54 → Imperialdramon Dragon Mode

AGUMON LINE
Agumon
├─ Lv18 → Greymon

Greymon
├─ Lv32 → MetalGreymon
└─ AW Data → Laeus Greymon

MetalGreymon
├─ Lv54 → WarGreymon
├─ Auspicious Armor → ShineGreymon
├─ Level up in Old Mauville → BlitzGreymon

WarGreymon
└─ Jogress with MetalGarurumon → Omegamon

BlitzGreymon
└─ Jogress with CresGarurumon → Omegamon Alter-S

ShineGreymon
└─ Holding Shine Soul → Burst Mode

Laeus Greymon
└─ Holding Rhata Genes → RAGE MODE

GABUMON LINE
Gabumon
├─ Lv18 → Garurumon

Garurumon
├─ Lv32 → WereGarurumon
└─ AW Data → Zino Garurumon

WereGarurumon
├─ Lv54 → MetalGarurumon
└─ Auspicious Armor → CresGarurumon

Zino Garurumon
└─ Holding Zino Genes → RAGE MODE

LUXMON LINE
Luxmon
├─ Lv18 → Piddmon

Piddmon
├─ Lv32 → ArkhaiAngemon

ArkhaiAngemon
└─ Lv54 → ClavisAngemon

GOMAMON LINE
Gomamon
├─ Lv18 → Ikkakumon

Ikkakumon
├─ Lv32 → Zudomon

Zudomon
├─ Lv54 → Vikemon
└─ King's Rock → Plesiomon

Plesiomon
└─ Jogress with Metalseadramon → Aegisdramon

TENTOMON LINE
Tentomon
├─ Lv18 Lowkey → Kabuterimon
└─ Lv18 Amped → Kuwagamon

Kabuterimon
├─ Lv32 → AtlurKabuterimon

Kuwagamon
├─ Lv32 → Okuwamon

AtlurKabuterimon
├─ Lv54 → HerakleKabuterimon
└─ Sachet → TyrantKabuterimon

Okuwamon
└─ Lv54 → GranKuwagamon

PALMON LINE
Palmon
├─ Lv18 Lowkey → Sunflowmon
└─ Lv18 Amped → Togemon

Togemon
├─ Lv32 → Lilimon

Sunflowmon
├─ Lv32 Female → Lilamon
└─ Lv32 Male → Blossomon

Lilimon
├─ Lv54 → Rosemon
└─ Gakuren → BanchouLilimon

Blossomon
└─ Lv54 → Zamielmon

Lilamon
└─ Lv54 → Lotusmon

Rosemon
├─ Holding Rose Soul → Burst Mode
└─ Jogress with Lotusmon → Rafflesimon

COMMANDRAMON LINE
Commandramon
├─ Lv18 Lowkey → Hi-Commandramon
└─ Lv18 Amped → Sealsdramon

Hi-Commandramon
├─ Lv32 → Cargodramon

Sealsdramon
├─ Lv32 → Tankdramon

Cargodramon
└─ Lv54 → Brigadramon

Tankdramon
└─ Lv54 → Darkdramon

Ghilledhumon
└─ Randomly Lv54 → Darkdramon or Brigadramon

Darkdramon
└─ Jogress with BanchouLeomon → Chaosmon

LIOLLMON LINE
Liollmon
├─ Lv18 Lowkey → Liamon
├─ Lv18 Amped → Leomon
└─ Dark Data → Lowemon

Liamon
├─ Lv32 → LoaderLeomon

Leomon
├─ Lv32 → GrapLeomon

Lowemon
├─ Using Shadow Meteor ⇄ KaiserLeomon
└─ Lv32 → Rihimon

KaiserLeomon
└─ Lv32 → Rihimon

LoaderLeomon
└─ Lv54 → SaberLeomon

GrapLeomon
├─ Lv54 without Swords Dance → HeavyLeomon
├─ Lv53 learning Swords Dance → Marsmon
└─ Gakuren → BanchouLeomon

Rihimon
└─ Lv54 → Ancient Sphinxmon

BanchouLeomon
├─ Jogress with Darkdramon → Chaosmon
└─ Jogress with Valdurmon → Chaosmon Valdur Arm

SaberLeomon
└─ Jogress with Eldoradimon → Tlalocmon

IMPMON LINE
Impmon
├─ Lv18 → Wizarmon
└─ Dark Data → Punkmon

Wizarmon
├─ Lv32 Lowkey → Mistymon
└─ Lv32 Amped → Baalmon

Punkmon
├─ Lv32 → Loudmon

Mistymon
└─ Lv54 → Dinasmon

Baalmon
└─ Lv54 → Beelzebumon

Loudmon
└─ Lv54 → HeavyMetaldramon

Beelzebumon
└─ Holding Toy Gun → Blast Mode

PULSEMON LINE
Pulsemon
├─ Lv18 knowing Work Up → Bulkmon
└─ Lv18 without Work Up and with Meditate → Exermon

Bulkmon
├─ Lv32 → Boutmon

Exermon
├─ Lv32 → Climbmon

Boutmon
├─ Lv54 → Kazuchimon
└─ Malicious Armor → Shroudmon

Climbmon
└─ Lv54 → Shivamon

Kazuchimon
└─ Jogress with Fenriloogamon → Fenriloogamon Takemikazuchi

LOOGAMON LINE
Loogamon
├─ Lv18 → Loogarmon

Loogarmon
├─ Lv32 → Helloogamon

Helloogamon
├─ High Friendship → Soloogarmon

Soloogarmon
├─ Lv54 → Fenriloogamon

Fenriloogamon
└─ Jogress with Kazuchimon → Fenriloogamon Takemikazuchi

PIYOMON LINE
Piyomon
├─ Lv18 → Birdramon
├─ Water Data → Xiquemon

Birdramon
├─ Lv32 → Garudamon

Xiquemon
├─ Lv32 → Huankunmon

Garudamon
├─ Lv54 → Hououmon
├─ Red Digicore → Zhuqiaomon

Huankunmon
└─ Lv54 → Xiangpengmon

BETAMON LINE
Betamon
├─ Attack > Defense Lv18 → Tyranomon
├─ Defense > Attack Lv18 → Seadramon
└─ Attack = Defense Lv18 → Airdramon

Seadramon
├─ Lv32 → Megaseadramon

Megaseadramon
├─ Lv54 → Metalseadramon

Metalseadramon
└─ Jogress with Plesiomon → Aegisdramon

Airdramon
├─ Lv32 → Megadramon

Megadramon
├─ Mechanic Data → Mugendramon
└─ Lv70 → Mugendramon

Tyranomon
├─ Dark Data → Dark Tyranomon
└─ Lv32 → Master Tyranomon

Master Tyranomon
└─ Lv54 → Dinomon

Dark Tyranomon
├─ Lv32 → Metal Tyranomon

Metal Tyranomon
├─ Lv54 → Rust Tyranomon
└─ Mechanic Data → Mugendramon

DEMIDEVIMON LINE
DemiDevimon
├─ Lv18 → Devimon
└─ Dark Data → Vilemon

Devimon
├─ Lv32 Lowkey → Jokermon
└─ Lv32 Amped → NeoDevimon

Vilemon
├─ Lv32 → SkullSatamon

SkullSatamon
└─ Lv54 → Barbamon

Jokermon
└─ Lv54 → Piedmon

NeoDevimon
└─ Lv54 → DoneDevimon

DRACUMON LINE
Dracumon
├─ Lv18 → Sangloupmon

Sangloupmon
├─ Lv18 Lowkey → Myotismon
└─ Lv18 Amped → Matadormon

Myotismon
├─ Lv32 → VenomMyotismon

Matadormon
└─ Lv32 → GranDracumon

KOTEMON LINE
Kotemon
└─ Randomly Lv18 → Musyamon or Dinohumon

Musyamon
└─ Lv32 → Oboromon

Dinohumon
└─ Lv32 → Knightmon

Oboromon
└─ Lv54 → Gaiomon

Knightmon
├─ Lv54 → Lord Knightmon
└─ Malicious Armor → Craniummon

BEARMON LINE
Bearmon
├─ Lv18 Lowkey → Dorulumon
└─ Lv18 Amped → Grizzmon

Dorulumon
├─ Lv31 learning Kings Shield → Yaeger Dorulumon
└─ Lv32 without Kings Shield → Mihiramon

Grizzmon
├─ Lv31 learning Hammer Rush → GrapLeomon
└─ Lv32 without Hammer Rush → Great Gryzmon

Great Gryzmon
└─ Lv54 → Callismon

Yaeger Dorulumon
├─ Lv54 → Merukimon
└─ Malicious Armor → Duftmon

Mihiramon
└─ Byakko Core → Baihumon

Duftmon
└─ Using Earth Shaker during battle ⇄ Leopard Mode

NUMEMON LINE
Numemon
├─ Cute Plush → Monzaemon
└─ Scary Plush → Waru Monzaemon

Monzaemon
└─ Lv54 → Shin Monzaemon

Waru Monzaemon
└─ Lv54 → Shin Monzaemon

FLAMON LINE
Flamon
├─ Lv18 → Meramon
└─ Fire Data → Agnimon

Meramon
├─ Lv32 Amped → Asuramon
└─ Lv30 while having a DARK TYPE in party → DeathMeramon

Agnimon
├─ Using Salamander Break or Flame Storm ⇄ Vritramon
└─ Lv32 → Aldamon

Vritramon
└─ Lv32 → Aldamon

DeathMeramon
└─ Lv54 → Demon (Creepymon)

Asuramon
├─ Lv54 → Apollomon
└─ Auspicious Armor → Gankoomon

Aldamon
└─ Lv54 → Ancient Greymon

Ancient Greymon
└─ Jogress with Ancient Garurumon → Susanoomon

KUDAMON LINE
Kudamon
├─ Lv18 → Reppamon

Reppamon
├─ Lv32 → Chirinmon

Chirinmon
├─ Lv54 → Mitamamon
└─ Auspicious Armor → Sleipmon

KOKUWAMON LINE
Kokuwamon
├─ Lv18 → Thunderballmon

Thunderballmon
├─ Lv32 → Mamemon

Mamemon
├─ Metal Data → MetalMamemon
└─ Lv54 → BanchouMamemon

MetalMamemon
└─ Lv70 → Mugendramon

GUILMON LINE
Guilmon
├─ Lv18 → Growlmon

Growlmon
├─ Lv32 → Megalo Growlmon

Megalo Growlmon
├─ Lv54 → Dukemon

Dukemon
├─ Holding Grani in battle → Dukemon Crimson mode
└─ Dark Data → Megidramon

Megidramon
└─ Light Data → Dukemon

TERRIERMON LINE
Terriermon
└─ Lv18 → Galgomon └─ Lv32 → Rapidmon └─ Lv54 → Saint Galgomon

MONODRAMON LINE
Monodramon
└─ Lv18 → Strikedramon └─ Lv32 → Cyberdramon └─ Lv54 → Justimon

PTEROMON LINE
Pteromon
└─ Lv18 → Galemon └─ Lv32 → GrandGalemon └─ Lv54 → Zephagamon

ELIZAMON LINE
Elizamon
└─ Lv18 → Dimetromon └─ Lv32 → Lamiamon └─ Lv54 → Medusamon

KERAMON LINE
Keramon
└─ Lv18 → Chrysalimon └─ Lv32 → Infermon └─ Lv54 → Diaboromon

GAOMON LINE
Gaomon
└─ Lv18 → Gaogamon └─ Lv32 → MachGaogamon └─ Lv54 → Mirage Gaogamon └─ Holding wolf soul → Burst Mode

FALCOMON LINE
Falcomon
└─ Lv18 → Peckmon └─ Lv32 → Yatagaramon └─ Lv54 → Ravmon └─ Holding crow soul → Burst Mode

JELLYMON LINE
Jellymon
└─ Lv18 → TeslaJellymon └─ Lv32 → Thetismon └─ Lv54 → Amphimon

ANGORAMON LINE
Angoramon
└─ Symbare Angoramon └─ Lamortmon └─ Diarbitmon

GAZIMON LINE
Gazimon
└─ Devidramon └─ Orochimon └─ Nidhoggmon

CHUUMON LINE
Chuumon
└─ Sukamon └─ Etemon └─ Metal Etemon

JAZAMON LINE
Jazamon
└─ Jazardmon └─ Jazarichmon └─ Metallicdramon

VORVOMON LINE
Vorvomon
└─ Lavorvomon └─ Larvogaritamon └─ Volcanicdramon

KODOKUGUMON LINE
Kodokugumon
└─ Dokugumon └─ Archnemon └─ Parasimon

RYUDAMON LINE
Ryudamon
└─ Ginryumon └─ Hisyaryumon └─ Ouryumon └─ Jogress with Alphamon → Alphamon Ouryuken

FLORAMON LINE
Floramon
└─ Lv18 → Woodmon

Woodmon
├─ Male Lv32 → Jureimon
└─ Female Lv32 → Oleamon

Jureimon
└─ Lv54 → Pinochimon

Oleamon
└─ Lv54 → Ceresmon
   └─ Using Famis in battle ⇄ Ceresmon Medium

DRACOMON LINE
Dracomon
├─ Lv18 Lowkey → Coredramon Blue
└─ Lv18 Amped → Coredramon Green

Coredramon Blue
└─ Lv32 → Wingdramon

Coredramon Green
└─ Lv32 → Groundramon

Wingdramon
└─ Lv54 → Slayerdramon

Groundramon
└─ Lv54 → Breakdramon

Slayerdramon
└─ Jogress with Breakdramon → Examon

ZUBAMON LINE
Zubamon
└─ Lv18 → Zubaeagermon └─ Lv32 → Duramon └─ Lv54 → Durandamon

LUDOMON LINE
Ludomon
└─ Lv18 → TiaLudomon └─ Lv32 → RaijiLudomon └─ Lv54 → Bryweludramon

Durandamon
└─ Jogress with Bryweludramon → RagnaLordmon

FUNBEEMON LINE
Funbeemon
├─ Male Lv18 → Waspmon
└─ Female Lv18 → ForgeBeemon

Waspmon
└─ Lv32 → Vespamon └─ Lv54 → TigerVespamon

ForgeBeemon
└─ Lv32 → CannonBeemon └─ Lv54 → QueenBeemon

MORPHOMON LINE
Morphomon
└─ Lv18 → Hudiemon └─ Randomly Lv32 → LadyDevimon or Archnemon

HERISSMON LINE
Herissmon
└─ Lv18 → Filmon └─ Lv32 → Stiffilmon └─ Lv50 → Rasenmon Fury Mode └─ Max Friendship level up → Rasenmon True Form

GAMMAMON LINE
Gammamon
├─ Lv18 Lowkey → Betel Gammamon
└─ Lv18 Amped → Gulus Gammamon

Betel Gammamon
└─ Lv32 → Canoweismon └─ Lv54 → Siriusmon

Gulus Gammamon
└─ Lv32 → Regulusmon └─ Lv54 → Arcturusmon

Siriusmon
└─ Jogress with Arcturusmon → Proximamon

MONMON LINE
Monmon
└─ Lv18 → Apemon └─ Lv32 → Gokuwmon └─ Jogress with Sagomon → Shakamon

STRABIMON LINE
Strabimon
├─ Light Data → Wolfmon
└─ Lv18 → Garurumon

Wolfmon
├─ Using Lupine Laser or Wolf Kendo ⇄ Garmmon
└─ Lv32 → Beowolfmon

Garmmon
└─ Lv32 → Beowolfmon

Beowolfmon
├─ Lv54 → Ancient Garurumon
└─ Auspicious Armor → Takutoumon

DORUMON LINE
DORUmon
├─ Lv18 → DORUgamon
└─ Dark Data → DexDORUgamon

DORUgamon
└─ Lv32 → DORUguremon └─ Lv54 → DORUgoramon or Auspicious Armor → Alphamon

DexDORUgamon
└─ Lv32 → DexDORUguremon └─ Lv54 → DexDORUgoramon

Alphamon
└─ Jogress Ouryumon → Alphamon Ouryuken

RENAMON LINE
Renamon
├─ Lv18 → Kyubimon
└─ Ice Data → Tenkomon

Kyubimon
└─ Lv32 → Taomon └─ Lv54 → Sakuyamon

Tenkomon
└─ Lv32 → Sekkamon └─ Lv54 → Yukinamon

SANGOMON LINE
Sangomon
├─ Lv18 Lowkey → Shellmon
├─ Lv18 Amped → Tobiumon
└─ Water Data → Ranamon

Shellmon
├─ Lv31 learning Teleport → Pixiemon
└─ Lv32 without Teleport → Marin Bullmon

Tobiumon
└─ Lv32 → Piranimon

Ranamon
├─ Using Jealousy Rain or Titanic Charge ⇄ Calamaramon
└─ Lv32 → Mermaimon

Calamaramon
└─ Lv32 → Mermaimon

Pixiemon
└─ Lv54 → Venusmon

Marin Bullmon
└─ Lv54 → Ryugumon

Piranimon
├─ Lv54 → MetalPiranimon
└─ Unholy Heart → CThyllamon

TSUKAIMON LINE
Tsukaimon
└─ Lv18 → Witchmon

Witchmon
├─ Lv32 Amped → Bastemon
└─ Lv32 Lowkey → LadyDevimon

LadyDevimon
├─ Lv54 → Lilithmon
├─ Jogress with Angewomon → Mastemon
└─ Lunar Scale → Dianamon

Bastemon
└─ Lv54 → Lilithmon

POMUMON LINE
Pomumon
├─ Lv18 → Parasaurmon
└─ Wood Data → Arbormon

Parasaurmon
├─ Lv32 Amped → Ajatarmon
└─ Lv32 Lowkey → Tropiamon

Ajatarmon
└─ Lv54 → Bloomlordmon

Tropiamon
└─ Lv54 → Hydramon

Arbormon
├─ Using Shadow Meteor ⇄ Petaldramon
└─ Jogress with Petaldramon (both Lv32) → Entmon

Entmon
└─ Lv54 → Ancient Trojamon

LABRAMON LINE
Labramon
├─ Lv18 Amped → Dobermon
└─ Lv18 Lowkey → Siesamon

Dobermon
└─ Lv32 → Cerberusmon └─ Lv54 → Anubismon

Siesamon
└─ Lv32 → Caturamon └─ Lv54 → Erlangmon
`;
