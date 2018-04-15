import EmberObject from '@ember/object';
import BlogMetaMixin from 'prember-meta/mixins/blog-meta';
import { module, test } from 'qunit';

module('Unit | Mixin | blog-meta', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let BlogMetaObject = EmberObject.extend(BlogMetaMixin);
    let subject = BlogMetaObject.create();
    assert.ok(subject);
  });
});
