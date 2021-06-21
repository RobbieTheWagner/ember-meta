import Route from '@ember/routing/route';

export default Route.extend({
  afterModel() {
    this._super(...arguments);

    this.metaInfo = {
      content: '<h1>Overridden post content</h1> <p>This is a post body!</p>',
      author: 'Robert Wagner',
      authorId: 'rwwagner90',
      categories: ['ember', 'ember.js'],
      date: '2018-04-09',
      slug: 'test-post-slug',
      title: 'Overridden Title',
      type: 'article',
    };
  },
});
