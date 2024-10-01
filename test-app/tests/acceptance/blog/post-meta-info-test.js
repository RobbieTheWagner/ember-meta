import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | blog/post-meta-info', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /blog/post-meta-info and checking general meta', async function (assert) {
    await visit('/blog/post-meta-info');

    assert.strictEqual(currentURL(), '/blog/post-meta-info');
    assert.strictEqual(
      document.head.querySelector('link[rel="canonical"]').href,
      'https://myblog.io/test-post-slug/',
      'canonical link is correct'
    );
    assert.strictEqual(
      document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url',
      'referrer is always unsafe-url for maximum links'
    );
  });

  test('visiting /blog/post-meta-info and checking article meta', async function (assert) {
    await visit('/blog/post-meta-info');

    assert.strictEqual(currentURL(), '/blog/post-meta-info');
    assert.strictEqual(
      document.head.querySelector('meta[property="article:published_time"]')
        .content,
      '2018-04-09',
      'article published date is correct'
    );

    const tags = document.head.querySelectorAll('meta[property="article:tag"]');

    assert.strictEqual(tags[0].content, 'ember', 'first tag is correct');
    assert.strictEqual(tags[1].content, 'ember.js', 'second tag is correct');
  });

  test('visiting /blog/post-meta-info and checking opengraph meta', async function (assert) {
    await visit('/blog/post-meta-info');

    assert.strictEqual(currentURL(), '/blog/post-meta-info');
    assert.strictEqual(
      document.head.querySelector('meta[property="og:site_name"]').content,
      'Test Site Name',
      'og site_name is correct'
    );
    assert.strictEqual(
      document.head.querySelector('meta[property="og:title"]').content,
      'Overridden Title',
      'og title is correct'
    );
  });

  test('visiting /blog/post-meta-info and checking twitter meta', async function (assert) {
    await visit('/blog/post-meta-info');

    assert.strictEqual(currentURL(), '/blog/post-meta-info');
    assert.strictEqual(
      document.head.querySelector('meta[name="twitter:title"]').content,
      'Overridden Title',
      'twitter title is correct'
    );
  });
});
