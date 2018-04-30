import Mixin from '@ember/object/mixin';
import { setProperties } from '@ember/object';
import config from 'ember-get-config';

export default Mixin.create({
  afterModel(model) {
    this._super(...arguments);

    const emberMetaConfig = config['ember-meta'];

    // Use global config values, when local ones are not defined, by merging configs together with Object.assign
    const mergedConfig = Object.assign({}, emberMetaConfig, model.attributes);
    const {
      title
    } = mergedConfig;

    return setProperties(this.get('headData'), {
      articleTitle: title,
      title: `${title} - ${emberMetaConfig.title}`
    });
  }
});
