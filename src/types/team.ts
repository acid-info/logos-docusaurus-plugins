export interface IStatusContact {
  email: string
  status?: any
  github?: any
  discord: string
}

export interface IStatusTeamMember {
  'pref-name': string
  department: string
  'photo-path': string
  contact: IStatusContact
}

export enum ELogosTeamNames {
  CODEX = 'codex',
  WAKU = 'waku',
  VAC = 'vac',
}
