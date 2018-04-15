ember-meta
==============================================================================

<a href="https://shipshape.io/"><img src="http://i.imgur.com/KVqNjgO.png" width="100" height="100"/></a>

**[ember-meta is built and maintained by Ship Shape. Contact us for Ember.js consulting, development, and training for your project](https://shipshape.io/ember-consulting)**.

[![npm version](https://badge.fury.io/js/ember-meta.svg)](http://badge.fury.io/js/ember-meta)
![Download count all time](https://img.shields.io/npm/dt/ember-meta.svg)
[![npm](https://img.shields.io/npm/dm/ember-meta.svg)]()
[![Ember Observer Score](http://emberobserver.com/badges/ember-meta.svg)](http://emberobserver.com/addons/ember-meta)
[![Build Status](https://travis-ci.org/shipshapecode/ember-meta.svg)](https://travis-ci.org/shipshapecode/ember-meta)

Setup meta for your Prember/Ember blog to support opengraph, microdata, Facebook, Twitter, Slack etc.

Installation
------------------------------------------------------------------------------

```
ember install ember-meta
```


Usage
------------------------------------------------------------------------------
This addon requires a config be set with the basic info for your blog, including the `title`,
`description`, and `url`. The `url` should end in a trailing slash.

```js
// config/environment.js
ENV['ember-meta'] = {
    description: 'Ramblings about Ember.js, JavaScript, life, liberty, and the pursuit of happiness.',
    imgSrc: 'http://i.imgur.com/KVqNjgO.png',
    siteName: 'Ship Shape',
    title: 'Blog - Ship Shape',
    twitterUsername: '@shipshapecode',
    url: 'https://shipshape.io/blog/'
  };
```

The `title` will be used for both the `<title>` tag of your page, and for `og:title` and `twitter:title`. Similarly, the description will be used for `description`, `og:description`, and `twitter:description`. You probably are starting to see
a pattern forming here :smiley:.

Once you have defined your base values, there are two mixins exposed for use in your app's blog index route, and each post's route.

The `blog-meta` mixin only needs the values from the global config, so it will work even without the model hook,
but I wanted to just show the setup I have with my model hook, where I load in all the posts.

```js
// routes/blog/index.js
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import BlogMetaMixin from 'ember-meta/mixins/blog-meta';

export default Route.extend(BlogMetaMixin, {
  markdownResolver: service(),

  model() {
    return this.markdownResolver.tree('blog').then((tree) => {
      return new RSVP.Promise((resolve) => {
        const sortedPosts = tree.files.sortBy('attributes.date').reverse();
        resolve(sortedPosts);
      });
    });
  }
});
```

The `post-meta` mixin, however, relies heavily on your model values. Therefore, if you do not have a model hook, and 
your `afterModel` is passed an `undefined` model reference, an assertion will be thrown that you must have a model. 
In this example, we are using [ember-cli-markdown-resolver](https://github.com/willviles/ember-cli-markdown-resolver)
and it automatically will set the front matter values from your markdown as properties on your model, when you grab the file.

The values in my `.md` files look something like this:

```md
---
author: Robert Wagner
authorId: rwwagner90
categories: 
  - ember
  - ember.js
  - ember inspector
date: '2018-04-09'
slug: ember-inspector-the-journey-so-far
title: Ember Inspector - The Journey so Far
---
```

You do not have to use the markdown resolver, but your model must return values of the same format, i.e. an author 
name string, a categories array, a slug for the post, a title, etc.

```js
// routes/blog/post.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import PostMetaMixin from 'ember-meta/mixins/post-meta';

export default Route.extend(PostMetaMixin, {
  markdownResolver: service(),

  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    return this.markdownResolver.file('blog', withoutSlash);
  }
});
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
