import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | blog/post', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /blog/post and checking general meta', async function(assert) {
    await visit('/blog/post');

    assert.equal(currentURL(), '/blog/post');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://myblog.io/test-post-slug/', 'canonical link is correct');
  });

  test('visiting /blog/post and checking article meta', async function(assert) {
    await visit('/blog/post');

    assert.equal(currentURL(), '/blog/post');
    assert.equal(document.head.querySelector('meta[property="article:published_time"]').content,
      '2018-04-09', 'article published date is correct');
  });

  test('visiting /blog/post and checking opengraph meta', async function(assert) {
    await visit('/blog/post');

    assert.equal(currentURL(), '/blog/post');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Overridden Title', 'og title is correct');
  });

  test('visiting /blog/post and checking twitter meta', async function(assert) {
    await visit('/blog/post');

    assert.equal(currentURL(), '/blog/post');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Overridden Title', 'twitter title is correct');
  });
});
