import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import config from 'ember-get-config';

export default Service.extend({
  router: service(),

  config: computed(function() {
    return config['ember-meta'];
  }),

  routeName: alias('router.currentRouteName'),

  currentRouteMeta: computed('routeName', function() {
    const currentRoute = getOwner(this).lookup(`route:${this.routeName}`);

    return currentRoute.metaInfo || currentRoute.currentModel;
  }),

  /**
   * Used for og:title, twitter:title as the title to show in the unfurled links
   */
  articleTitle: computed.reads('currentRouteMeta.articleTitle'),
  /**
   * Used for twitter 'written by' meta.
   */
  author: computed.reads('currentRouteMeta.author'),
  /**
   * Used for <link rel="canonical">
   */
  canonical: computed.reads('currentRouteMeta.canonical'),
  /**
   * Internal - used by keywords & tags
   */
  categories: computed.reads('currentRouteMeta.categories'),
  /**
   * Internal - optionally used for description
   */
  content: computed.reads('currentRouteMeta.content'),
  /**
   * Used for article:published_time
   */
  date: computed.reads('currentRouteMeta.date'),
  /**
   * Used for <meta name="description">, og:description, twitter:description
   * This is the main content of your page, shown as the content in the unfurled links
   * If you pass a description, it will be used, otherwise it will truncate your content,
   * and finally it will use the description from the global config.
   */
  description: computed('content', 'currentRouteMeta.description', 'routeName', 'config.description', function() {
    const description = this.currentRouteMeta?.description;
    const content = this.content;

    if (description) {
      return description;
    } else if (content && content.substring) {
      return `${content.substring(0, 260)}...`;
    }

    return this.config.description;
  }),
  /**
   * Used for og:image twitter:image:src, the image to display in your unfurled links
   */
  imgSrc: computed('currentRouteMeta.imgSrc', 'routeName', 'config.imgSrc', function() {
    return this.currentRouteMeta?.imgSrc ?? this.config.imgSrc;
  }),
  jsonld: computed('currentRouteMeta.jsonld', 'routeName', function() {
    const jsonld = this.currentRouteMeta?.jsonld;

    if (jsonld) {
      return JSON.stringify(jsonld);
    }

    return false;
  }),
  /**
   * Used for twitter meta to display 'filed under'
   */
  keywords: computed('categories', 'routeName', function() {
    const categories = this.categories;
    return categories ? categories.join(', ') : null;
  }),
  /**
   * Used for og:site_name
   */
  siteName: computed('currentRouteMeta.siteName', 'routeName', 'config.siteName', function() {
    return this.currentRouteMeta?.siteName ?? this.config.siteName;
  }),
  /**
   * Internal - used for url
   */
  slug: computed.reads('currentRouteMeta.slug'),
  /**
   * Used for article:tag
   */
  tags: computed.reads('categories'),
  /**
   * Used for <title>, og:title, twitter:title
   */
  title: computed('currentRouteMeta.title', 'routeName', 'config.title', function() {
    return this.currentRouteMeta?.title ?? this.config.title;
  }),
  /**
   * Used for twitter:site and twitter:creator
   */
  twitterUsername: computed('currentRouteMeta.twitterUsername', 'routeName', 'config.twitterUsername', function() {
    return this.currentRouteMeta?.twitterUsername ?? this.config.twitterUsername;
  }),
  /**
   * Used for og:type, defaults to 'website'
   */
  type: computed('currentRouteMeta.type', 'routeName', function() {
    return this.currentRouteMeta?.type ?? 'website';
  }),
  /**
   * Used for <link rel="canonical">, og:url, twitter:url
   */
  url: computed('currentRouteMeta.url', 'routeName', 'slug', 'config.url', function() {
    let url = this.currentRouteMeta?.url ?? this.config.url;
    const slug = this.slug;
    if (slug) {
      url = `${url}${slug}/`;
    }
    return url;
  })
});
