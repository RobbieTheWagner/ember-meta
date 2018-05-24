import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import config from 'ember-get-config';

const emberMetaConfig = config['ember-meta'];

export default Service.extend({
  routing: service('-routing'),

  routeName: alias('routing.currentRouteName'),

  currentRouteModel: computed('routeName', function() {
    return getOwner(this).lookup(`route:${this.get('routeName')}`).get('currentModel');
  }),

  /**
   * Used for og:title, twitter:title as the title to show in the unfurled links
   */
  articleTitle: computed('routeName', function() {
    return this.get('currentRouteModel.articleTitle');
  }),
  /**
   * Used for twitter 'written by' meta.
   */
  author: computed('routeName', function() {
    return this.get('currentRouteModel.author');
  }),
  /**
   * Used for article:published_time
   */
  date: computed('routeName', function() {
    return this.get('currentRouteModel.date');
  }),
  /**
   * Used for <meta name="description">, og:description, twitter:description
   * This is the main content of your page, shown as the conten in the unfurled links
   */
  description: computed('routeName', function() {
    const content = this.get('currentRouteModel.content');

    if (content && content.substring) {
      return `${content.substring(0, 260)}...`;
    }

    return this.getWithDefault('currentRouteModel.attributes.description', emberMetaConfig.description);
  }),
  /**
   * Internal - used by keywords & tags
   */
  categories: computed('routeName', function() {
    return this.get('currentRouteModel.categories');
  }),
  /**
   * Used for twitter meta to display 'filed under'
   */
  keywords: computed('routeName', function() {
    const categories = this.get('categories');
    return categories ? categories.join(', ') : null;
  }),
  /**
   * Used for og:image twitter:image:src, the image to display in your unfurled links
   */
  imgSrc: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.imgSrc', emberMetaConfig.imgSrc);
  }),
  /**
   * Used for og:site_name
   */
  siteName: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.siteName', emberMetaConfig.siteName);
  }),
  /**
   * Used for article:tag
   */
  tags: computed('routeName', function() {
    return this.get('categories');
  }),
  /**
   * Used for <title>, og:title, twitter:title
   */
  title: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.title', emberMetaConfig.title);
  }),
  /**
   * Used for twitter:site and twitter:creator
   */
  twitterUsername: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.twitterUsername', emberMetaConfig.twitterUsername);
  }),
  /**
   * Used for og:type, defaults to 'website'
   */
  type: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.type', 'website');
  }),
  /**
   * Used for <link rel="canonical">, og:url, twitter:url
   */
  url: computed('routeName', function() {
    let url = this.getWithDefault('currentRouteModel.url', emberMetaConfig.url);
    const slug = this.get('slug');
    if (slug) {
      url = `${url}${slug}/`;
    }
    return url;
  }),
  /**
   * Used for <link rel="canonical">
   */
  canonical: computed('routeName', function() {
    return this.get('currentRouteModel.attributes.canonical');
  }),
  /**
   * Internal - used for url
   */
  slug: computed('routeName', function() {
    return this.get('currentRouteModel.slug');
  }),
});
