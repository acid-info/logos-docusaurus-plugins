import { Joi } from '@docusaurus/utils-validation'
import { ThemeOptions } from '../../client/types/theme.types'

const schema = Joi.object<ThemeOptions>({}).unknown(true)

export const validateOptions = ({
  options,
  validate,
}: {
  options: ThemeOptions
  validate: any
}) => validate(schema, { ...(options ?? {}) })
