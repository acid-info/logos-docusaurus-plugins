import { LookPresetItem } from '../../../types/ui.types'

export let ROTATE_SPEED = 0.1
export const MIN_ROTATE_SPEED = 0
export const MAX_ROTATE_SPEED = 1
export const MIN_ZOOM = 0.22
export const RESIZE_SPEED_FACTOR = 0.9
export const INITIAL_ZOOM = 3

export const defaultAsciiConfigs = {
  renderIndex: 1,
  bgColor: 'rgb(var(--lsd-surface-primary))',
  fgColor: 'rgb(var(--lsd-text-primary))',
  characters: ' l.o.g.o.s ',
  invert: false,
  color: false,
  resolution: 0.21,
  textShadowSize: 15,
}

export const defaultPresets: LookPresetItem = {
  modelId: 'default',
  simple: {
    cameraPos: [6.898858137575106, 4.772099506970454, -3.1821660872368627],
    cameraRot: [-2.733342169570335, 1.127956558492365, 2.7690180385429666],
    controlsTarget: [
      -0.2185887974027981, 3.4320197290105474, -0.08409377618890646,
    ],
  },
  abstract: {
    cameraPos: [-1.4826176635786852, 4.021180061821954, -1.5929058418153597],
    cameraRot: [-2.9244096935808908, -0.8625529112689497, -2.9755407843387185],
    controlsTarget: [-0.3236695017538898, 3.8072918272567, -0.6236093222013962],
  },
}
export const OBJECTS_PRESETS: LookPresetItem[] = [
  defaultPresets,
  {
    modelId: 'architecture01',
    simple: {
      cameraPos: [6.898858137575106, 4.772099506970454, -3.1821660872368627],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'architecture02',
    simple: {
      cameraPos: [6.898858137575106, 4.772099506970454, -3.1821660872368627],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'architecture03',
    simple: {
      cameraPos: [6.898858137575106, 4.772099506970454, -3.1821660872368627],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'architecture04',
    simple: {
      cameraPos: [2.263701079468784, 0.6448855513810133, -1.1446840846564066],
      cameraRot: [-2.3314571674867457, 0.984733935216302, 2.422537357648925],
      controlsTarget: [
        0.6593539926170827, -0.1266335925222026, -0.4104215479626598,
      ],
    },
    abstract: {
      cameraPos: [1.8397825927313005, 0.5006635210357668, -0.7112749496103248],
      cameraRot: [-2.0637769654190388, 0.941591559117755, 2.1572780914058356],
      controlsTarget: [
        0.7525282128865571, -0.19650999135957886, -0.33673737792715125,
      ],
    },
    targetLook: {
      cameraPos: [1.2775067913826557, 1.3342390202957728, -3.123518037652026],
      cameraRot: [-2.6905895797482686, 0.32826936260575107, 2.9867046984290964],
      controlsTarget: [
        0.27965301570358253, 0.05724884619536415, -0.48670374558576035,
      ],
    },
  },
  {
    modelId: 'architecture05',
    simple: {
      cameraPos: [2.783916402572475, 0.8560027544276005, 2.7596737879252995],
      cameraRot: [
        -0.16075199314229247, 0.8310730403125255, 0.11920589473418516,
      ],
      controlsTarget: [
        -0.13283501637059433, 0.4299574965789378, 0.13221598116033606,
      ],
    },
    abstract: {
      cameraPos: [-0.5465903796360435, 0.8773980794748312, 0.08538618930043433],
      cameraRot: [
        -0.26855166005001807, -1.1713993239674987, -0.24830772343977955,
      ],
      controlsTarget: [
        -0.0544632211815667, 0.8222830795164463, -0.1148867151943581,
      ],
    },
    targetLook: {
      cameraPos: [-0.08633866196975185, 1.065498410363367, 3.299441795447572],
      cameraRot: [
        -0.30705338387773307, -0.04232616594886318, -0.01341603621000156,
      ],
      controlsTarget: [
        0.057360484222938594, 0.03995565554668334, 0.06512362298065871,
      ],
    },
    // abstract: {
    //   cameraPos: [1.1470783184950044, 0.23878712525763962, 1.4621079231748313],
    //   cameraRot: [0.0781563760261837, 0.753617521461716, -0.05353888616056665],
    //   controlsTarget: [
    //     -0.10475467093508074, 0.34294485241818873, 0.1321388746243302,
    //   ],
    // },
  },
  {
    modelId: 'architecture06',
    simple: {
      cameraPos: [6.898858137575106, 4.772099506970454, -3.1821660872368627],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'architecture07',
    simple: {
      cameraPos: [6.898858137575106, 4.772099506970454, -3.1821660872368627],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'atlas',
    simple: {
      cameraPos: [-0.05747471409961126, 1.1561369169508278, 0.2934743027588207],
      cameraRot: [
        0.13523803197626882, -0.45004875426349367, 0.05912213357583956,
      ],
      controlsTarget: [
        -0.03052411570622545, 1.1636581998026059, 0.23819862568800665,
      ],
    },
    // abstract: {
    //   cameraPos: [-0.05747471409961126, 1.1561369169508278, 0.2934743027588207],
    //   cameraRot: [
    //     0.13523803197626882, -0.45004875426349367, 0.05912213357583956,
    //   ],
    //   controlsTarget: [
    //     -0.03052411570622545, 1.1636581998026059, 0.23819862568800665,
    //   ],
    // },
    abstract: {
      cameraPos: [
        -0.18886266143333627, 1.0759713173211645, 0.49472614307040697,
      ],
      cameraRot: [
        0.11827338438455919, -0.49355424749746096, 0.056236459481599846,
      ],
      controlsTarget: [
        -0.03586918676122722, 1.1095292429426495, 0.21231853618809665,
      ],
    },
    targetLook: {
      cameraPos: [-0.6194495673706852, 0.6791728914823414, 1.1145248759455844],
      cameraRot: [
        0.08253419059538356, -0.589296072042965, 0.045942607479927136,
      ],
      controlsTarget: [
        0.09058057232790886, 0.7667301800204325, 0.05607398084523753,
      ],
    },
  },
  {
    modelId: 'bust01',
    simple: {
      cameraPos: [-0.6865425525854476, 0.9101267370893742, 0.6192780523604176],
      cameraRot: [
        -0.39660492694232563, -0.962317303218196, -0.3309893133032883,
      ],
      controlsTarget: [
        0.008888669206507317, 0.7229784900626205, 0.17240700391361993,
      ],
    },
    abstract: {
      cameraPos: [0.025758408225725123, 0.9432728632646389, 0.5085343068565109],
      cameraRot: [
        -0.016796160047877214, 0.23199352927595504, 0.003862085219634371,
      ],
      controlsTarget: [
        -0.04849025797636223, 0.9379943498483801, 0.19429480114059927,
      ],
    },
    targetLook: {
      cameraPos: [-0.0995637601904456, 0.9905193985583883, 1.2844592429465957],
      cameraRot: [
        -0.21489715158374015, -0.011908392248228742, -0.002599147273856083,
      ],
      controlsTarget: [
        -0.08519853311178426, 0.7332893758986562, 0.10595091334036527,
      ],
    },
  },
  {
    modelId: 'bust02',
    simple: {
      cameraPos: [-1.4566842350476759, 1.3228318382357354, 0.3529107224325513],
      cameraRot: [-0.7212161402570414, -1.161345100016008, -0.6787189972933454],
      controlsTarget: [
        0.13759890903780844, 0.8659810364239205, -0.1666973840261623,
      ],
    },
    // TODO add option for scale on scroll
    abstract: {
      cameraPos: [
        -0.3488062269042841, 1.3111379960412364, 0.033354968216059155,
      ],
      cameraRot: [
        -0.7212161402570405, -1.1613451000160089, -0.6787189972933446,
      ],
      controlsTarget: [
        0.2227218365835886, 1.147363414950647, -0.15291722311874764,
      ],
    },
  },
  {
    modelId: 'bust03',
    simple: {
      cameraPos: [6.898858137575106, 4.772099506970454, -3.1821660872368627],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'discobolus',
    simple: {
      cameraPos: [0.9321278495515372, 1.1243517299151449, 1.0437243089401456],
      cameraRot: [
        -0.05449607597993083, 0.5948614803388417, 0.030560026854436973,
      ],
      controlsTarget: [
        0.17851738112859908, 1.0636847191934362, -0.06840974825492452,
      ],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'hand',
    simple: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'vase01',
    simple: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
  {
    modelId: 'venus',
    simple: {
      cameraPos: [-0.33960257176056113, 1.3731114512210183, 0.5843851218219973],
      cameraRot: [
        0.19165735697369993, -0.4160172409280952, 0.07825504508386714,
      ],
      controlsTarget: [
        0.1766806722765915, 1.595709756901872, -0.5627979418735829,
      ],
    },
    abstract: {
      cameraPos: [-0.2543046264127692, 1.591894996466899, 0.21161310295797725],
      cameraRot: [0.17078534527374745, -0.637502107706861, 0.10229142114685894],
      controlsTarget: [
        0.2766995177502174, 1.7137410300309837, -0.49488235116491014,
      ],
    },
  },
  {
    modelId: 'flower',
    simple: {
      cameraPos: [-0.33960257176056113, 1.3731114512210183, 0.5843851218219973],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
    abstract: {
      cameraPos: [0, 0, 0],
      cameraRot: [0, 0, 0],
      controlsTarget: [0, 0, 0],
    },
  },
]
