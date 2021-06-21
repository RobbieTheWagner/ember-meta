import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | blog/post-model', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /blog/post-model and checking general meta', async function (assert) {
    await visit('/blog/post-model');

    assert.equal(currentURL(), '/blog/post-model');
    assert.equal(
      document.head.querySelector('link[rel="canonical"]').href,
      'https://myblog.io/test-post-slug/',
      'canonical link is correct'
    );
    assert.equal(
      document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url',
      'referrer is always unsafe-url for maximum links'
    );
  });

  test('visiting /blog/post-model and checking article meta', async function (assert) {
    await visit('/blog/post-model');

    assert.equal(currentURL(), '/blog/post-model');
    assert.equal(
      document.head.querySelector('meta[property="article:published_time"]')
        .content,
      '2018-04-09',
      'article published date is correct'
    );

    const tags = document.head.querySelectorAll('meta[property="article:tag"]');

    assert.equal(tags[0].content, 'ember', 'first tag is correct');
    assert.equal(tags[1].content, 'ember.js', 'second tag is correct');
  });

  test('visiting /blog/post-model and checking opengraph meta', async function (assert) {
    await visit('/blog/post-model');

    assert.equal(currentURL(), '/blog/post-model');
    assert.equal(
      document.head.querySelector('meta[property="og:site_name"]').content,
      'Test Site Name',
      'og site_name is correct'
    );
    assert.equal(
      document.head.querySelector('meta[property="og:title"]').content,
      'Overridden Title',
      'og title is correct'
    );
  });

  test('visiting /blog/post-model and checking twitter meta', async function (assert) {
    await visit('/blog/post-model');

    assert.equal(currentURL(), '/blog/post-model');
    assert.equal(
      document.head.querySelector('meta[name="twitter:title"]').content,
      'Overridden Title',
      'twitter title is correct'
    );
  });
});
