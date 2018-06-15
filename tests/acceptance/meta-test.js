import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | meta', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /meta and checking general meta', async function(assert) {
    await visit('/meta');

    assert.equal(currentURL(), '/meta');
    assert.equal(document.head.querySelector('link[rel="canonical"]').href,
      'https://myblog.io/test-meta-slug/', 'canonical link is correct');
    assert.equal(document.head.querySelector('meta[name="referrer"]').content,
      'unsafe-url', 'referrer is always unsafe-url for maximum links');
  });

  test('visiting /meta and checking article meta', async function(assert) {
    await visit('/meta');

    assert.equal(currentURL(), '/meta');
    assert.equal(document.head.querySelector('meta[property="article:published_time"]').content,
      '2018-04-09', 'article published date is correct');

    const tags = document.head.querySelectorAll('meta[property="article:tag"]');

    assert.equal(tags[0].content, 'ember', 'first tag is correct');
    assert.equal(tags[1].content, 'ember.js', 'second tag is correct');
  });

  test('visiting /meta and checking opengraph meta', async function(assert) {
    await visit('/meta');

    assert.equal(currentURL(), '/meta');
    assert.equal(document.head.querySelector('meta[property="og:site_name"]').content,
      'Test Site Name', 'og site_name is correct');
    assert.equal(document.head.querySelector('meta[property="og:title"]').content,
      'Overridden Meta', 'og title is correct');
  });

  test('visiting /meta and checking twitter meta', async function(assert) {
    await visit('/meta');

    assert.equal(currentURL(), '/meta');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Overridden Meta', 'twitter title is correct');
  });

  test('coming from anothe route', async function(assert) {
    await visit('/blog/post');
    await visit('/meta');

    assert.equal(currentURL(), '/meta');
    assert.equal(document.head.querySelector('meta[name="twitter:title"]').content,
      'Overridden Meta', 'twitter title is correct');
  });
});
