import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import { setProperties } from '@ember/object';
import config from 'ember-get-config';

export default Mixin.create({
  headData: service(),

  afterModel() {
    this._super(...arguments);

    const emberMetaConfig = config['ember-meta'];

    assert(`The blog-meta mixin requires values to be set in config['ember-meta'].`, emberMetaConfig !== undefined);

    const { description, imgSrc, siteName, title, twitterUsername, url } = emberMetaConfig;

    return setProperties(this.get('headData'), {
      description,
      imgSrc,
      siteName,
      title,
      twitterUsername,
      url,
      type: 'website'
    });
  }
});
