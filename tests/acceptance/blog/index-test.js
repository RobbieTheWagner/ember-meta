import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | blog/index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /blog and checking general meta', async function (assert) {
    await visit('/blog');

    assert.strictEqual(currentURL(), '/blog');
    assert.strictEqual(
      document.head.querySelector('link[rel="canonical"]').href,
      'https://myblog.io/',
      'canonical link is correct'
    );
    assert.strictEqual(
      document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url',
      'referrer is always unsafe-url for maximum links'
    );
  });

  test('visiting /blog and checking article meta', async function (assert) {
    await visit('/blog');

    assert.strictEqual(currentURL(), '/blog');
    assert.notOk(
      document.head.querySelector('meta[property="article:published_time"]'),
      'article published_time should be hidden, since we are not on an article'
    );
    assert.notOk(
      document.head.querySelector('meta[property="article:tag"]'),
      'article tags should be hidden, since we are not on an article'
    );
  });

  test('visiting /blog and checking opengraph meta', async function (assert) {
    await visit('/blog');

    assert.strictEqual(currentURL(), '/blog');
    assert.strictEqual(
      document.head.querySelector('meta[property="og:site_name"]').content,
      'Test Site Name',
      'og site_name is correct'
    );
    assert.strictEqual(
      document.head.querySelector('meta[property="og:title"]').content,
      'Blog - Test Site Name',
      'og title is correct'
    );
  });

  test('visiting /blog and checking twitter meta', async function (assert) {
    await visit('/blog');

    assert.strictEqual(currentURL(), '/blog');
    assert.strictEqual(
      document.head.querySelector('meta[name="twitter:title"]').content,
      'Blog - Test Site Name',
      'twitter title is correct'
    );
  });
});
