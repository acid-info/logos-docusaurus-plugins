import { Joi } from '@docusaurus/utils-validation'
import {
  Author,
  AuthorPageConfig,
  DocConfig,
  DocContent,
  DocSidebarConfig,
  ThemeOptions,
} from '../../client/types/theme.types'

const schema = Joi.object<ThemeOptions>({
  docs: Joi.object()
    .pattern(
      Joi.string(),
      Joi.object<DocConfig>({
        sidebar: Joi.object<DocSidebarConfig>({
          hide: Joi.bool().default(true),
        }).default({}),
        content: Joi.object<DocContent>({
          authorPage: Joi.alternatives(
            Joi.boolean(),
            Joi.object<AuthorPageConfig>({
              sidebar: Joi.string().optional(),
            }),
          ).default({}),
          authors: Joi.array()
            .items(
              Joi.object<Author>({
                key: Joi.string().required(),
                name: Joi.string().required(),
                github: Joi.string().optional(),
                twitter: Joi.string().optional(),
                website: Joi.string().optional(),
              }),
            )
            .default([]),
        }).default({}),
      }),
    )
    .default({}),
}).unknown(true)

export const validateOptions = ({
  options,
  validate,
}: {
  options: ThemeOptions
  validate: any
}) => validate(schema, { ...(options ?? {}) })
