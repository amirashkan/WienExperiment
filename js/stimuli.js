var anagrams = [
    [ 'ERKL', 'ZWIT', 'IETG', 'AOSJ', 'LAMZ', 'GETS', 'NFSE', 'FAST', 'HMRU', 'ADJG', 'KION', 'NHSO', 'HRRE', 'ELHD', 'GERI', 'PTUL', 'ITAX', 'ECPH', 'EGLD', 'KCOH', 'GFRA', 'RPAA', 'TIRP', 'DNKI', 'KSSU', 'YBAB', 'FGOL', 'TLSOZ', 'PUML', 'GADM', 'RUUG', 'TASA', 'SOBT', 'RSEI', 'SBSO', 'BBEU', 'BRAG', 'NRAR', 'TROB', 'LANC', 'GTSA', 'IEHM', 'UJDE', 'AFKF', 'YURJ', 'AISV', 'APKT', 'UDBE', 'ALSZ', 'TMZI', 'OTFU', 'KKES', 'ESKT', 'EEXH', 'ILMO', 'EHFE', 'LOZL', 'ISNN', 'IODL', 'OTTG', 'UTLK', 'GAOY', 'SAPS', 'EEBIL', 'HOETL', 'UESAP', 'ATATS', 'NOLWC', 'UUGNF', 'UMSIV', 'FUEAT', 'HTNOR' ],

    [ 'ADLW', 'NWDI', 'ILPZ', 'EAFLP', 'OMOR', 'SOMO', 'NDSA', 'IMAS', 'ZALM', 'FLES', 'LZHO', 'GOVEL', 'OGLD', 'IHMLC', 'ULTG', 'UBAM', 'LEFD', 'BEEB', 'OHEC', 'BEEI', 'UEFE', 'HONEB', 'ASMR', 'OSTR', 'EAUTB', 'WFOL', 'URMW', 'EZLP', 'SOSR', 'AFEF', 'ITRE', 'DNRI', 'SSRO', 'MUAP', 'TEPU', 'AGLU', 'ALMA', 'NYOP', 'FAAU', 'ALBK', 'SEEL', 'SGAN', 'NUHH', 'SEHA', 'UBLEM', 'LGEI', 'IHECT', 'UEEL', 'LMUA', 'FLLE', 'UCSHF', 'BOBRE', 'THEHC', 'HNNEE', 'ETAZK', 'AKOAL', 'SREKB', 'GERIT', 'SLHUC', 'REZAB', 'NDAAP', 'PDEFR', 'KELWO', 'NNEOS', 'AHSFC', 'EHIEC', 'WLEEP', 'HAUCL', 'BUCEH', 'RHISE', 'LWLEE', 'ENBHO' 
    ],

    
    [ 'TLZE', 'CSKA', 'AVSE', 'BEUT', 'RLEDE', 'FTOP', 'OSAF', 'ITIP', 'HRRO', 'GSÄE', 'ILSE', 'NUZA', 'OOEB', 'OTUA', 'CKOR', 'MEDH', 'RENZ', 'KATN', 'NKRA', 'UHBC', 'EMLI', 'TOBO', 'RANK', 'GRUT', 'EFHT', 'ETBT', 'NBAD', 'EOHS', 'PHUE', 'MMAK', 'NAKU', 'OKLN', 'KCAL', 'DMAM', 'OMAF', 'ETER', 'CPHI', 'LMIF', 'LBEEH', 'UKAK', 'PEPAP', 'MONR', 'TUMR', 'LALW', 'NWAD', 'IKOL', 'SHUHC', 'SALA', 'AMRT', 'GNOG', 'OHRN', 'KCER', 'TAHDR', 'DNYAH', 'LROAB', 'OEDMM', 'ORTMO', 'YLNNO', 'DRARA', 'RIDAO', 'IGMUM', 'ANSUA', 'ISFEE', 'HRUAC', 'QLUMA', 'EDNFA', 'EKETT', 'EINEL', 'IPKOE', 'FEWFA', 'TALXE', 'DPMFA'
    ]
];

var solutions = [
    [ 'KERL', 'WITZ', 'TEIG', 'SOJA', 'MALZ', 'STEG', 'SENF', 'SAFT', 'RUHM', 'JAGD', 'KINO', 'SOHN', 'HERR', 'HELD', 'GIER', 'PULT', 'TAXI', 'PECH', 'GELD', 'KOCH', 'GRAF', 'PAAR', 'TRIP', 'KIND', 'KUSS', 'BABY', 'GOLF', 'STOLZ', 'LUMP', 'MAGD', 'GURU', 'SAAT', 'OBST', 'REIS', 'BOSS', 'BUBE', 'GRAB', 'NARR', 'BROT', 'CLAN', 'GAST', 'HEIM', 'JUDE', 'KAFF', 'JURY', 'VISA', 'PAKT', 'BUDE', 'SALZ', 'ZIMT', 'TOFU', 'KEKS', 'SEKT', 'HEXE', 'LIMO', 'HEFE', 'ZOLL', 'SINN', 'IDOL', 'GOTT', 'KULT', 'YOGA', 'PASS', 'LIEBE', 'HOTEL', 'PAUSE', 'STAAT', 'CLOWN', 'UNFUG', 'VISUM', 'TAUFE', 'THRON' 
    ],

    [ 'WALD', 'WIND', 'PILZ', 'APFEL', 'MOOR', 'MOOS', 'SAND', 'MAIS', 'MALZ', 'FELS', 'HOLZ', 'VOGEL', 'GOLD', 'MILCH', 'GLUT', 'BAUM', 'FELD', 'EBBE', 'ECHO', 'EIBE', 'EFEU', 'BOHNE', 'MARS', 'ROST', 'TAUBE', 'WOLF', 'WURM', 'PELZ', 'ROSS', 'AFFE', 'TIER', 'RIND', 'ROSS', 'PUMA', 'PUTE', 'GAUL', 'LAMA', 'PONY', 'PFAU', 'KALB', 'ESEL', 'GANS', 'HUHN', 'HASE', 'BLUME', 'IGEL', 'TEICH', 'EULE', 'MAUL', 'FELL', 'FUCHS', 'ROBBE', 'HECHT', 'HENNE', 'KATZE', 'KOALA', 'KREBS', 'TIGER', 'LUCHS', 'ZEBRA', 'PANDA', 'PFERD', 'WOLKE', 'SONNE', 'SCHAF', 'EICHE', 'WELPE', 'LAUCH', 'BUCHE', 'HIRSE', 'WELLE', 'BOHNE'
    ],

    [ 'ZELT', 'SACK', 'VASE', 'TUBE', 'LEDER', 'TOPF', 'SOFA', 'TIPI', 'ROHR', 'SÄGE', 'SEIL', 'ZAUN', 'OBOE', 'AUTO', 'ROCK', 'HEMD', 'NERZ', 'TANK', 'KRAN', 'BUCH', 'LEIM', 'BOOT', 'KRAN', 'GURT', 'HEFT', 'BETT', 'BAND', 'HOSE', 'HUPE', 'KAMM', 'KANU', 'KLON', 'LACK', 'DAMM', 'MOFA', 'TEER', 'CHIP', 'FILM', 'HEBEL', 'AKKU', 'PAPPE', 'NORM', 'TURM', 'WALL', 'WAND', 'KILO', 'SCHUH', 'SAAL', 'TRAM', 'GONG', 'HORN', 'RECK', 'DRAHT', 'HANDY', 'LABOR', 'MODEM', 'MOTOR', 'NYLON', 'RADAR', 'RADIO', 'GUMMI', 'SAUNA', 'SEIFE', 'RAUCH', 'QUALM', 'FADEN', 'KETTE', 'LEINE', 'KOPIE', 'WAFFE', 'LATEX', 'DAMPF'
    ]
];

var examples = ['GAST' , 'BROT' , 'BUBE' , 'PILZ' , 'KAMM' , 'SCHUH' , 'LEINE' , 'HORN' , 'KOPIE' , 'SEIL' , 'RAUCH', 'HEBEL' ]

// If using error_feedback, you need to define the possible codes, and 
// the correct response for each.
var list_of_codes = new Array('common_word', 'rare_word','pseudo_word', 'consonants');
var correct_responses = new Array(1, 1, 2, 2);
