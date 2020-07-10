import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias, reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import config from 'ember-get-config';

export default class HeadDataService extends Service {
  @service router;

  @alias('router.currentRouteName') routeName;

  get config() {
    return config['ember-meta'];
  }

  @computed('routeName')
  get currentRouteMeta() {
    const currentRoute = getOwner(this).lookup(`route:${this.routeName}`);

    return currentRoute.metaInfo || currentRoute.currentModel;
  }

  /**
   * Used for og:title, twitter:title as the title to show in the unfurled links
   */
  @reads('currentRouteMeta.articleTitle') articleTitle;
  /**
   * Used for twitter 'written by' meta.
   */
  @reads('currentRouteMeta.author') author;
  /**
   * Used for <link rel="canonical">
   */
  @reads('currentRouteMeta.canonical') canonical;
  /**
   * Internal - used by keywords & tags
   */
  @reads('currentRouteMeta.categories') categories;
  /**
   * Internal - optionally used for description
   */
  @reads('currentRouteMeta.content') content;
  /**
   * Used for article:published_time
   */
  @reads('currentRouteMeta.date') date;

  /**
   * Used for <meta name="description">, og:description, twitter:description
   * This is the main content of your page, shown as the content in the unfurled links
   * If you pass a description, it will be used, otherwise it will truncate your content,
   * and finally it will use the description from the global config.
   */
  @computed('content', 'currentRouteMeta.description', 'routeName', 'config.description')
  get description() {
    const description = this.currentRouteMeta?.description;
    const content = this.content;

    if (description) {
      return description;
    } else if (content && content.substring) {
      return `${content.substring(0, 260)}...`;
    }

    return this.config.description;
  }

  /**
   * Used for og:image twitter:image:src, the image to display in your unfurled links
   */
  @computed('currentRouteMeta.imgSrc', 'routeName', 'config.imgSrc')
  get imgSrc() {
    return this.currentRouteMeta?.imgSrc ?? this.config.imgSrc;
  }

  @computed('currentRouteMeta.jsonld', 'routeName')
  get jsonld() {
    const jsonld = this.currentRouteMeta?.jsonld;

    if (jsonld) {
      return JSON.stringify(jsonld);
    }

    return false;
  }

  /**
   * Used for twitter meta to display 'filed under'
   */
  @computed('categories', 'routeName')
  get keywords() {
    const categories = this.categories;
    return categories ? categories.join(', ') : null;
  }

  /**
   * Used for og:site_name
   */
  @computed('currentRouteMeta.siteName', 'routeName', 'config.siteName')
  get siteName() {
    return this.currentRouteMeta?.siteName ?? this.config.siteName;
  }

  /**
   * Internal - used for url
   */
  @reads('currentRouteMeta.slug') slug;
  /**
   * Used for article:tag
   */
  @reads('categories') tags;
  /**
   * Used for <title>, og:title, twitter:title
   */
  @computed('currentRouteMeta.title', 'routeName', 'config.title')
  get title() {
    return this.currentRouteMeta?.title ?? this.config.title;
  }

  /**
   * Used for twitter:site and twitter:creator
   */
  @computed('currentRouteMeta.twitterUsername', 'routeName', 'config.twitterUsername')
  get twitterUsername() {
    return this.currentRouteMeta?.twitterUsername ?? this.config.twitterUsername;
  }

  /**
   * Used for og:type, defaults to 'website'
   */
  @computed('currentRouteMeta.type', 'routeName')
  get type() {
    return this.currentRouteMeta?.type ?? 'website';
  }

  /**
   * Used for <link rel="canonical">, og:url, twitter:url
   */
  @computed('currentRouteMeta.url', 'routeName', 'slug', 'config.url')
  get url() {
    let url = this.currentRouteMeta?.url ?? this.config.url;
    const slug = this.slug;
    if (slug) {
      url = `${url}${slug}/`;
    }
    return url;
  }
}
