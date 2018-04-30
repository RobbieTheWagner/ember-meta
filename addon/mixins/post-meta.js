import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { setProperties } from '@ember/object';
import config from 'ember-get-config';

export default Mixin.create({
  afterModel(model) {
    this._super(...arguments);

    const emberMetaConfig = config['ember-meta'];

    assert('The post-meta mixin requires a model to be defined.', model !== undefined);
    assert(`The post-meta mixin requires values to be set in config['ember-meta'].`, emberMetaConfig !== undefined);

    const description = `${model.content.substring(0, 260)}...`;

    // Use global config values, when local ones are not defined, by merging configs together with Object.assign
    const mergedConfig = Object.assign({}, emberMetaConfig, model.attributes);
    const {
      author,
      categories,
      date,
      imgSrc,
      siteName,
      slug,
      title,
      twitterUsername,
      url
    } = mergedConfig;

    return setProperties(this.get('headData'), {
      author,
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
      url: `${url}${slug}/`
    });
  }
});
