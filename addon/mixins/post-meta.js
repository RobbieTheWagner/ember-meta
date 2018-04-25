import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import { setProperties } from '@ember/object';
import config from 'ember-get-config';
import { get } from '@ember/object';

export default Mixin.create({
  headData: service(),

  _attributeReferences: {
    author: 'author',
    canonical: 'canonical',
    categories: 'categories',
    date: 'date',
    imgSrc: 'imgSrc',
    siteName: 'siteName',
    slug: 'slug',
    title: 'title',
    twitterUsername: 'twitterUsername',
    description(model) {
      return `${model.content.substring(0, 260)}...`;
    },
    url(model, globalConfig) {
      return `${globalConfig.url}${model.slug}/`
    },
  },

  afterModel(model) {
    this._super(...arguments);

    const emberMetaConfig = config['ember-meta'];

    assert('The post-meta mixin requires a model to be defined.', model !== undefined);
    assert(`The post-meta mixin requires values to be set in config['ember-meta'].`, emberMetaConfig !== undefined);

    const localAttributes = {};
    const attributeReferences = Object.assign({}, get(this, '_attributeReferences'), get(this, 'attributeReferences'));


    Object.keys(attributeReferences).forEach((key) => {
      let newValue;
      if (typeof(attributeReferences[key]) === 'string') {
        newValue = get(model, attributeReferences[key]);
      } else if(typeof(attributeReferences[key]) === 'function') {
        newValue = attributeReferences[key](model, emberMetaConfig);
      }
      // only override if it has a value
      if (newValue) {
        localAttributes[key] = newValue
      }
    });

    // Use global config values, when local ones are not defined, by merging configs together with Object.assign
    const mergedConfig = Object.assign({}, emberMetaConfig, localAttributes);

    const {
      author,
      canonical,
      categories,
      date,
      description,
      imgSrc,
      siteName,
      title,
      twitterUsername,
      url
    } = mergedConfig;

    return setProperties(this.get('headData'), {
      author,
      canonical,
      description,
      date,
      imgSrc,
      siteName,
      twitterUsername,
      articleTitle: title,
      keywords: categories.join(', '),
      tags: categories,
      title: `${title} - ${emberMetaConfig.title}`,
      type: 'article',
      url,
    });
  }
});
