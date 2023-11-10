import { Joi } from '@docusaurus/utils-validation'
import { GeneratedDataPluginConfig } from './plugins/generatedData.plugin'
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
  og: Joi.object<PluginOptions['og']>().optional().default(false),
  generated: Joi.object<GeneratedDataPluginConfig>({
    challenges: Joi.object<GeneratedDataPluginConfig['challenges']>({
      githubAccessToken: Joi.string().required(),
      repoArray: Joi.array()
        .items(
          Joi.object({
            repo: Joi.string().required(),
            owner: Joi.string().required(),
          }),
        )
        .required(),
    }).optional(),
    jobList: Joi.object<GeneratedDataPluginConfig['jobList']>({
      jobBoard: Joi.string().uri().required(),
    }).optional(),
  }).optional(),
})

export const validateOptions = ({
  options,
  validate,
}: {
  options: PluginOptions
  validate: any
}) => validate(schema, options ?? {})
