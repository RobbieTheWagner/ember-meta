import Route from '@ember/routing/route';
import PostMetaMixin from 'ember-meta/mixins/post-meta';

export default Route.extend(PostMetaMixin, {
  attributeReferences: Object.freeze({
    slug: 'attributes.slug',
    url(model, globalConfig) {
      return `${globalConfig.url}${model.slug || model.attributes.slug}/`
    },
    date: 'attributes.date',
    tags: 'attributes.categories',
    title: 'attributes.title',
  }),

  model() {
    return {
      content: '<h1>Overridden post content</h1> <p>This is a post body!</p>',
      attributes: {
        author: 'Robert Wagner',
        authorId: 'rwwagner90',
        categories: ['ember', 'ember.js'],
        date: '2018-04-09',
        slug: 'test-post-slug',
        title: 'Overridden Title'
      }
    };
  }
});
