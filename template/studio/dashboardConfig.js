export default {
  widgets: [
    {
      name: 'structure-menu',
      layout: {width: 'medium'},
    },
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: ['madeObject'],
      },
      layout: {width: 'small'},
    },
    {
      name: 'muna-docs-widget',
      layout: {width: 'small'},
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '<#<deployments.studio.providerInfo.buildHookId>#>',
                  title: 'Sanity Studio',
                  name: '<#<deployments.studio.providerInfo.siteName>#>',
                  apiId: '<#<deployments.studio.providerInfo.siteId>#>',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/<#<repository.owner>#>/<#<repository.name>#>',
            category: 'Code',
          },
        ],
      },
    },
  ],
}
