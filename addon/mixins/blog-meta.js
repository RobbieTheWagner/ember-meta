import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import { setProperties } from '@ember/object';
import config from 'ember-get-config';

export default Mixin.create({
  headData: service(),

  afterModel() {
    this._super(...arguments);

    const premberMetaConfig = config['prember-meta'];

    assert(`The blog-meta mixin requires values to be set in config['prember-meta'].`, premberMetaConfig !== undefined);

    const {description, title, url} = premberMetaConfig;

    return setProperties(this.get('headData'), {
      description,
      title,
      url,
      type: 'website'
    });
  }
});
