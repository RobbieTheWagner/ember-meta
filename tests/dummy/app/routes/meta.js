import Route from '@ember/routing/route';

export default Route.extend({
  metaAlias: 'anotherModel',

  model() {
    return {
      anotherModel: {
        content: '<h1>Overridden meta content</h1> <p>This is a meta body!</p>',
        author: 'Scotty Newcomer',
        authorId: 'snewcomer',
        categories: ['ember', 'ember.js'],
        date: '2018-04-09',
        slug: 'test-meta-slug',
        title: 'Overridden Meta',
        type: 'meta'
      },
      model: {
        slug: 'test-post-slug',
        type: 'blog'
      }
    };
  }
});
