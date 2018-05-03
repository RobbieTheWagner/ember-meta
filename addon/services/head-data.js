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
    return this.get('currentRouteModel.attributes.articleTitle');
  }),
  /**
   * Used for twitter 'written by' meta.
   */
  author: computed('routeName', function() {
    return this.get('currentRouteModel.attributes.author');
  }),
  /**
   * Used for article:published_time
   */
  date: computed('routeName', function() {
    return this.get('currentRouteModel.attributes.date');
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
   * Used for twitter meta to display 'filed under'
   */
  keywords: computed('routeName', function() {
    const categories = this.get('currentRouteModel.attributes.categories');
    return categories ? categories.join(', ') : null;
  }),
  /**
   * Used for og:image twitter:image:src, the image to display in your unfurled links
   */
  imgSrc: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.attributes.imgSrc', emberMetaConfig.imgSrc);
  }),
  /**
   * Used for og:site_name
   */
  siteName: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.attributes.siteName', emberMetaConfig.siteName);
  }),
  /**
   * Used for article:tag
   */
  tags: computed('routeName', function() {
    return this.get('currentRouteModel.attributes.categories');
  }),
  /**
   * Used for <title>, og:title, twitter:title
   */
  title: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.attributes.title', emberMetaConfig.title);
  }),
  /**
   * Used for twitter:site and twitter:creator
   */
  twitterUsername: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.attributes.twitterUsername', emberMetaConfig.twitterUsername);
  }),
  /**
   * Used for og:type, defaults to 'website'
   */
  type: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.attributes.type', 'website');
  }),
  /**
   * Used for <link rel="canonical">, og:url, twitter:url
   */
  url: computed('routeName', function() {
    let url = this.getWithDefault('currentRouteModel.attributes.url', emberMetaConfig.url);
    const slug = this.get('currentRouteModel.attributes.slug');
    if (slug) {
      url = `${url}${slug}/`;
    }
    return url;
  })
});
