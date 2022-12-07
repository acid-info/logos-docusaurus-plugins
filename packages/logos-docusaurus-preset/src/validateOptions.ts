import { Joi } from '@docusaurus/utils-validation'
import { BusinessUnits, PluginOptions, ThemeNames } from './types'

const schema = Joi.object<PluginOptions>({
  businessUnit: Joi.string()
    .valid(...Object.values(BusinessUnits))
    .default(BusinessUnits.Logos),
  contactInfo: Joi.string().optional(),
  theme: Joi.object()
    .schema({
      name: Joi.string()
        .valid(...Object.keys(ThemeNames))
        .required(),
      themeOptions: Joi.object().optional().default({}),
    })
    .optional()
    .default({}),
  customSiteConfig: Joi.boolean().optional().default(false),
})

export const validateOptions = ({
  options,
  validate,
}: {
  options: PluginOptions
  validate: any
}) => validate(schema, options ?? {})
