# ember-meta

<a href="https://shipshape.io/"><img src="http://i.imgur.com/DWHQjA5.png" width="100" height="100"/></a>

**[ember-meta is built and maintained by Ship Shape. Contact us for Ember.js consulting, development, and training for your project](https://shipshape.io/ember-consulting)**.

[![npm version](https://badge.fury.io/js/ember-meta.svg)](http://badge.fury.io/js/ember-meta)
![Download count all time](https://img.shields.io/npm/dt/ember-meta.svg)
[![npm](https://img.shields.io/npm/dm/ember-meta.svg)]()
[![Ember Observer Score](http://emberobserver.com/badges/ember-meta.svg)](http://emberobserver.com/addons/ember-meta)
[![Build Status](https://travis-ci.org/shipshapecode/ember-meta.svg)](https://travis-ci.org/shipshapecode/ember-meta)

Setup meta for your Prember/Ember blog to support opengraph, microdata, Facebook, Twitter, Slack etc.

## Compatibility

- Ember.js v4.4 or above
- Ember CLI v4.4 or above
- Node.js v16 or above

## Installation

```
ember install ember-meta
```

## Usage

ember-meta uses ember-cli-head under the hood, so to make sure your meta makes it into the `<head>` you will have to
add this to `application.hbs`:

```hbs
<HeadLayout />
```

This addon supports a config be set with the basic info for your blog, including the `title`,
`description`, and `url`. The `url` should end in a trailing slash. These values will be used as defaults, and
you can override them by returning different values in your model.

## Global Config

```js
// config/environment.js
ENV["ember-meta"] = {
  description:
    "Ramblings about Ember.js, JavaScript, life, liberty, and the pursuit of happiness.",
  imgSrc: "http://i.imgur.com/KVqNjgO.png",
  siteName: "Ship Shape",
  title: "Blog - Ship Shape",
  twitterUsername: "@shipshapecode",
  url: "https://shipshape.io/blog/",
};
```

The `title` will be used for both the `<title>` tag of your page, and for `og:title` and `twitter:title`. Similarly, the
description will be used for `description`, `og:description`, and `twitter:description`. You probably are starting to see
a pattern forming here :smiley:.

The global config will be merged with the local config, when you are on a specific post. This allows you to define
sane defaults, while also retaining the flexibility to override each value on a specific post, by defining it on the
`model`.

All of the values, used to populate the meta, are computed properties, on the `head-data` service. This service is
automatically injected into all routes, and a default head.hbs is provided for you. This should allow a "zero config"
setup, if your app adheres to the same data formats as we expect.

## Local Config

The preferred way of configuring ember-meta, is to set your values under the `metaInfo` property on your route.
This ensures you do not have potential naming conflicts for your meta when using a model.

```js
// routes/blog/post.js
import Route from "@ember/routing/route";

export default class BlogPost extends Route {
  afterModel() {
    super.afterModel(...arguments);

    this.metaInfo = {
      content:
        "<h1>Ember Inspector - The Journey so Far</h1> <p>This is a post body!</p>",
      author: "Robert Wagner",
      authorId: "rwwagner90",
      categories: ["ember", "ember.js", "ember inspector"],
      date: "2018-04-09",
      slug: "ember-inspector-the-journey-so-far",
      title: "Ember Inspector - The Journey so Far",
    };
  }
}
```

### Using with a Vanilla Javascript Model Hook

If you want to override the global config, your `model()` hook must return an object with a certain format, i.e. an author
name string, a categories array, a slug for the post, a title, content etc.

Here is an example of a simple blog post using a POJO as the model:

```js
// routes/blog/post.js
import Route from "@ember/routing/route";

export default class BlogPost extends Route {
  model() {
    return {
      content:
        "<h1>Ember Inspector - The Journey so Far</h1> <p>This is a post body!</p>",
      author: "Robert Wagner",
      authorId: "rwwagner90",
      categories: ["ember", "ember.js", "ember inspector"],
      date: "2018-04-09",
      slug: "ember-inspector-the-journey-so-far",
      title: "Ember Inspector - The Journey so Far",
    };
  }
}
```

### Using with a Ember Data

If you are using Ember data it should work as expected. Here is an example of the same example using ember-data.

```js
// models/blog.js
import Model, { attr } from "@ember-data/model";

export default class Blog extends Model {
  @attr content;
  @attr author;
  @attr categories;
  @attr date;
  @attr slug;
  @attr title;
}
```

```js
// routes/blog/post.js
import Route from '@ember/routing/route';

export default BlogPost extends Route {
  model() {
    return this.store.findRecord('blog', 1);
  }
}
```

### Using with ember-cli-markdown-resolver

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
date: "2018-04-09"
slug: ember-inspector-the-journey-so-far
title: Ember Inspector - The Journey so Far
---
```

```js
// routes/blog/post.js
import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class BlogPost extends Route {
  @service markdownResolver;

  model({ path }) {
    const withoutSlash = !path.endsWith("/") ? path : path.slice(0, -1);
    return this.markdownResolver.file("blog", withoutSlash);
  }
}
```

In this case we need to override the `head-data` service because ember-cli-markdown-resolver puts all of the
front-matter data under an `attributes` key.

```js
// services/head-data.js
import HeadDataService from "ember-meta/services/head-data";
import { computed } from "@ember/object";
import { getOwner } from "@ember/application";

export default class HeadData extends HeadDataService {
  @computed("routeName")
  get currentRouteModel() {
    return getOwner(this)
      .lookup(`route:${this.get("routeName")}`)
      .get("currentModel.attributes");
  }

  @computed("routeName")
  get content() {
    // content is not on attributes when returned from ember-cli-markdown-resolver
    return getOwner(this)
      .lookup(`route:${this.get("routeName")}`)
      .get("currentModel.content");
  }
}
```

## Advanced Local Config

### Overriding Service Computed Properties

Since all of this is powered by computed properties, in the `head-data` service. You can create your own head-data service, and
extend the one we provide to override the computeds for various meta to do whatever you want.

```js
// services/head-data.js
import HeadDataService from "ember-meta/services/head-data";
import { computed } from "@ember/object";

export default class HeadData extends HeadDataService {
  @computed("foo")
  get description() {
    return this.foo.description;
  }
}
```

### Defining Your Own head.hbs

A default `head.hbs` is automatically available to your app, but we also provide a blueprint, if you would like to manage the
content yourself. This allows you to either define your own or delete it altogether and use the one we ship with this addon.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
