import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default class HeadDataService extends Service {
  @service router;

  get config() {
    const config = getOwner(this).resolveRegistration('config:environment');
    return config['ember-meta'];
  }

  get currentRouteMeta() {
    const currentRoute = getOwner(this).lookup(
      `route:${this.router.currentRouteName}`,
    );

    return currentRoute.metaInfo || currentRoute.currentModel;
  }

  /**
   * Used for og:title, twitter:title as the title to show in the unfurled links
   */
  get articleTitle() {
    return this.currentRouteMeta.articleTitle;
  }
  /**
   * Used for twitter 'written by' meta.
   */
  get author() {
    return this.currentRouteMeta.author;
  }
  /**
   * Used for <link rel="canonical">
   */
  get canonical() {
    return this.currentRouteMeta.canonical;
  }
  /**
   * Internal - used by keywords & tags
   */
  get categories() {
    return this.currentRouteMeta.categories;
  }
  /**
   * Internal - optionally used for description
   */
  get content() {
    return this.currentRouteMeta.content;
  }
  /**
   * Used for article:published_time
   */
  get date() {
    return this.currentRouteMeta.date;
  }

  /**
   * Used for <meta name="description">, og:description, twitter:description
   * This is the main content of your page, shown as the content in the unfurled links
   * If you pass a description, it will be used, otherwise it will truncate your content,
   * and finally it will use the description from the global config.
   */
  get description() {
    const description = this.currentRouteMeta?.description;

    if (description) {
      return description;
    } else if (this.content?.substring) {
      return `${this.content.substring(0, 260)}...`;
    }

    return this.config.description;
  }

  /**
   * Used for og:image twitter:image:src, the image to display in your unfurled links
   */
  get imgSrc() {
    return this.currentRouteMeta?.imgSrc ?? this.config.imgSrc;
  }

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
  get keywords() {
    const categories = this.categories;
    return categories ? categories.join(', ') : null;
  }

  /**
   * Used for og:site_name
   */
  get siteName() {
    return this.currentRouteMeta?.siteName ?? this.config.siteName;
  }

  /**
   * Internal - used for url
   */
  get slug() {
    return this.currentRouteMeta.slug;
  }
  /**
   * Used for article:tag
   */
  get tags() {
    return this.categories;
  }
  /**
   * Used for <title>, og:title, twitter:title
   */
  get title() {
    return this.currentRouteMeta?.title ?? this.config.title;
  }

  /**
   * Used for twitter:site and twitter:creator
   */
  get twitterUsername() {
    return (
      this.currentRouteMeta?.twitterUsername ?? this.config.twitterUsername
    );
  }

  /**
   * Used for og:type, defaults to 'website'
   */
  get type() {
    return this.currentRouteMeta?.type ?? 'website';
  }

  /**
   * Used for <link rel="canonical">, og:url, twitter:url
   */
  get url() {
    let url = this.currentRouteMeta?.url ?? this.config.url;
    if (this.slug) {
      url = `${url}${this.slug}/`;
    }
    return url;
  }
}
