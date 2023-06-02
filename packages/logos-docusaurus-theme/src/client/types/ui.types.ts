import { GroupProps } from '@react-three/fiber/dist/declarations/src/three-types'

export enum ECommunityProviders {
  'discord' = 'discord',
  'twitter' = 'twitter',
  'linkedin' = 'linkedin',
  'status' = 'status',
  'github' = 'github',
  'discourse' = 'discourse',
  'telegram' = 'telegram',
  'gscholar' = 'gscholar',
}

export type LookPresetItemValues = {
  cameraPos: [number, number, number]
  cameraRot: [number, number, number]
  controlsTarget: [number, number, number]
}

export type LookPresetItem = {
  modelId: string
  simple: LookPresetItemValues
  abstract: LookPresetItemValues
  targetLook?: LookPresetItemValues
}

export type MovementProps = {
  rotateSpeed?: number
  enableZoom?: boolean
  enableRotateOnScroll?: boolean
  preset: LookPresetItemValues
  targetPreset?: LookPresetItemValues
} & GroupProps

export type AsciiConfigs = {
  characters?: string
  invert?: boolean
  color?: boolean
  bgColor?: string
  fgColor?: string
  resolution?: number
  renderIndex?: number
  textShadowSize?: number
  withTextShadow?: boolean
}
