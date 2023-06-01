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
    modelId: 'architecture02',
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
    modelId: 'architecture03',
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
    modelId: 'architecture04',
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
    modelId: 'architecture05',
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
    modelId: 'architecture06',
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
    modelId: 'architecture07',
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
    modelId: 'atlas',
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
    modelId: 'bust01',
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
    modelId: 'bust02',
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
    modelId: 'bust03',
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
    modelId: 'discobolus',
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
]
