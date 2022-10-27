import type { LoadContext } from '@docusaurus/types'
import * as fs from 'fs-extra'
import * as path from 'path'
import { BusinessUnits, PluginOptions, Status } from '../types'

const COMMON_DATA_DIR = path.join(__dirname, '../../static/common/data')

export const createCommonDataDir = () => void fs.ensureDirSync(COMMON_DATA_DIR)

export const createTeamFile = (
  context: LoadContext,
  options: PluginOptions,
) => {
  const contacts: Status.Contacts.Data = require(path.join(
    COMMON_DATA_DIR,
    '../contacts.json',
  ))

  const departments: string[] = (
    {
      [BusinessUnits.Codex]: [Status.Department.Codex],
      [BusinessUnits.Waku]: [
        Status.Department.WakuProduct,
        Status.Department.WakuResearch,
      ],
    }[options.businessUnit] ?? []
  ).map((dep) => dep.toLowerCase())

  const team = Object.values(contacts).filter(
    (contact) =>
      !!contact.department &&
      departments.includes(contact.department.toLowerCase()),
  )

  fs.writeFileSync(
    path.join(COMMON_DATA_DIR, 'team.json'),
    Buffer.from(JSON.stringify(team)),
  )
}
