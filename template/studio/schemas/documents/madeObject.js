import React from 'react'
import {Link} from 'part:@sanity/base/router'
import jsonata from 'jsonata'
import {FaBookDead} from 'react-icons/fa'

import {
  editorialState,
  accessState,
  image,
  digitallyShownBy,
  subjectOfManifest,
  preferredIdentifier,
  license,
  subject,
  referredToBy,
  relation,
  hasCurrentOwner,
  hasFormerOrCurrentOwner,
  composedOf,
  identifiedBy,
  isSubjectOf,
  depicts,
  showsVisualObject,
  carries,
  measuredBy,
  consistsOf,
  labelSingleton,
  presentAt,
} from '../props'
import {coalesceLabel} from '../helpers/helpers'

export default {
  name: 'madeObject',
  title: 'Objekt',
  titleEN: 'Made Object',
  description: 'Menneskapte objekt',
  type: 'document',
  initialValue: {
    editorialState: 'draft',
    accessState: 'secret',
  },
  icon: FaBookDead,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: {collapsible: true, collapsed: false, columns: 2},
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'representation',
      title: 'Alle bilder',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'partsAndContent',
      title: 'Felt relatert til deler eller innhold',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'physicalDescription',
      title: 'Felt relatert til fysisk beskrivelse',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'ownership',
      title: 'Felt relatert til eierskap',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    editorialState,
    accessState,
    preferredIdentifier,
    labelSingleton,
    {
      ...identifiedBy,
      fieldset: 'minimum',
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      name: 'hasType',
      type: 'array',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      description: (
        <span>
          If the correct type is not available, create it here{' '}
          <Link target="blank" href={'/desk/typer;objectType'}>
            Object type list
          </Link>
        </span>
      ),
      descriptionEN: '',
      fieldset: 'minimum',
      of: [
        {
          type: 'reference',
          to: [{type: 'objectType'}],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Hendelser og aktiviteter knyttet til dette objektet.',
      descriptionEN: 'Events and activities connected to this object',
      fieldset: 'minimum',
      type: 'array',
      of: [
        {type: 'beginningOfExistence'},
        {type: 'production'},
        {type: 'transformation'},
        {type: 'reference', to: [{type: 'acquisition'}]},
        {type: 'move'},
        {type: 'activity'},
        {type: 'destruction'},
      ],
    },
    {
      ...subject,
      fieldset: 'minimum',
    },
    {
      ...isSubjectOf,
      fieldset: 'minimum',
    },
    {
      ...license,
      fieldset: 'minimum',
    },
    {
      ...image,
      fieldset: 'mainImage',
    },
    {
      ...digitallyShownBy,
      fieldset: 'representation',
    },
    {
      ...subjectOfManifest,
      fieldset: 'representation',
    },
    {
      ...relation,
      fieldset: 'relations',
    },
    {
      ...presentAt,
      fieldset: 'relations',
    },
    {
      ...depicts,
      fieldset: 'partsAndContent',
    },
    {
      ...showsVisualObject,
      fieldset: 'partsAndContent',
    },
    {
      ...carries,
      fieldset: 'partsAndContent',
    },
    {
      ...composedOf,
      fieldset: 'partsAndContent',
    },
    {
      ...measuredBy,
      fieldset: 'physicalDescription',
    },
    {
      ...consistsOf,
      fieldset: 'physicalDescription',
    },
    {
      ...hasCurrentOwner,
      fieldset: 'ownership',
    },
    {
      ...hasFormerOrCurrentOwner,
      fieldset: 'ownership',
    },
    {
      name: 'wasOutputOf',
      title: 'Was output of',
      type: 'dataTransferEvent',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'label',
      id: 'preferredIdentifier',
      type: 'hasType.0.label',
      blocks: 'description',
      media: 'image',
      published: 'accessState',
    },
    prepare(selection) {
      const {title, id, type, blocks, media, published} = selection
      const expression = jsonata('nor[0]')
      const block = expression.evaluate(blocks)
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: title,
        subtitle: secret + (id ? id + ', ' : '') + coalesceLabel(type),
        description: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : '',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Tittel, A-Å',
      name: 'title',
      by: [{field: 'label', direction: 'asc'}],
    },
    {
      title: 'Tittel, Å-A',
      name: 'title',
      by: [{field: 'label', direction: 'desc'}],
    },
    {
      title: 'Foretrukket id, Synkende',
      name: 'preferredIdentifier',
      by: [{field: 'preferredIdentifier', direction: 'desc'}],
    },
    {
      title: 'Foretrukket id, Stigende',
      name: 'preferredIdentifier',
      by: [{field: 'preferredIdentifier', direction: 'asc'}],
    },
  ],
}
