import { Joi } from '@docusaurus/utils-validation'
import { BusinessUnits, PluginOptions, ThemeNames } from './types'

const schema = Joi.object<PluginOptions>({
  businessUnit: Joi.string()
    .valid(...Object.values(BusinessUnits))
    .required(),

  theme: Joi.object()
    .schema({
      name: Joi.string()
        .valid(...Object.keys(ThemeNames))
        .required(),
      themeOptions: Joi.object().optional().default({}),
    })
    .optional()
    .default({}),
})

export const validateOptions = ({
  options,
  validate,
}: {
  options: PluginOptions
  validate: any
}) => validate(schema, options ?? {})
