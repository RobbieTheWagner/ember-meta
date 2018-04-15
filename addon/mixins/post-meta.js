import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import { setProperties } from '@ember/object';
import config from 'ember-get-config';

export default Mixin.create({
  headData: service(),

  afterModel(model) {
    this._super(...arguments);

    const premberMetaConfig = config['prember-meta'];

    assert('The post-meta mixin requires a model to be defined.', model !== undefined);
    assert(`The post-meta mixin requires values to be set in config['prember-meta'].`, premberMetaConfig !== undefined);

    const description = `${model.content.substring(0, 260)}...`;
    const { author, categories, date, slug, title, type } = model.attributes;

    return setProperties(this.get('headData'), {
      title: `${title} - ${premberMetaConfig.title}`,
      articleTitle: title,
      author,
      description,
      date,
      keywords: categories.join(', '),
      tags: categories,
      type: type || 'article',
      url: `${premberMetaConfig.url}${slug}/`
    });
  }
});
