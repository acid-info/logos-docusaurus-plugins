import type { LoadContext } from '@docusaurus/types'
import { Joi } from '@docusaurus/utils-validation'
import * as fs from 'fs-extra'
import * as path from 'path'
import { BusinessUnits, PluginOptions, Status } from '../types'

const COMMON_DATA_DIR = path.join(__dirname, '../../static/common/data')

export const createCommonDataDir = () => void fs.ensureDirSync(COMMON_DATA_DIR)

export const findTeamByBusinessUnit = (bu: BusinessUnits) => {
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
    }[bu] ?? []
  ).map((dep) => dep.toLowerCase())

  return Object.values(contacts).filter(
    (contact) =>
      !!contact.department &&
      departments.includes(contact.department.toLowerCase()),
  )
}

export const getTeamFromCustomFile = (filename: string) => {
  const contact = JSON.parse(fs.readFileSync(filename).toString())

  const schema = Joi.array().items(
    Joi.object({
      name: Joi.string().min(1).required(),
      image: Joi.string().example('team/Name.jpg').required(),
      contact: Joi.object({
        email: Joi.string().allow(null).optional(),
        status: Joi.string().allow(null).optional(),
        github: Joi.string().allow(null).optional(),
        discord: Joi.string().allow(null).optional(),
        gscholar: Joi.string().allow(null).optional(),
      })
        .optional()
        .default({}),
    }),
  )

  const result = schema.validate(contact, { abortEarly: false })
  if (result.error) throw result.error

  return contact.map(
    ({ name, image, contact }) =>
      ({
        'pref-name': name,
        department: null,
        'photo-path': image,
        contact,
      } as Status.Contacts.Contact),
  )
}

export const createTeamFile = (
  context: LoadContext,
  options: PluginOptions,
) => {
  const filename = options?.contactInfo
    ? path.isAbsolute(options.contactInfo)
      ? options.contactInfo
      : path.join(context.siteDir, options.contactInfo)
    : path.join(COMMON_DATA_DIR, '../contacts.json')

  const team = options.contactInfo
    ? getTeamFromCustomFile(filename)
    : findTeamByBusinessUnit(options.businessUnit)

  fs.writeFileSync(
    path.join(COMMON_DATA_DIR, 'team.json'),
    Buffer.from(JSON.stringify(team)),
  )
}
