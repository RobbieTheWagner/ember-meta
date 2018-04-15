import EmberObject from '@ember/object';
import PostMetaMixin from 'prember-meta/mixins/post-meta';
import { module, test } from 'qunit';

module('Unit | Mixin | post-meta', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let PostMetaObject = EmberObject.extend(PostMetaMixin);
    let subject = PostMetaObject.create();
    assert.ok(subject);
  });
});
