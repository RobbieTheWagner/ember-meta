import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | blog/index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /blog and checking general meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://myblog.io/', 'canonical link is correct');
  });

  test('visiting /blog and checking article meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.notOk(document.head.querySelector('meta[property="article:published_time"]'),
      'article meta should be hidden, since we are not on an article');
  });

  test('visiting /blog and checking opengraph meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Blog - Test Site Name', 'og title is correct');
  });

  test('visiting /blog and checking twitter meta', async function(assert) {
    await visit('/blog');

    assert.equal(currentURL(), '/blog');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Blog - Test Site Name', 'twitter title is correct');
  });
});
