import Service, { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import config from 'ember-get-config';

const emberMetaConfig = config['ember-meta'];

export default Service.extend({
  routing: service('-routing'),

  routeName: alias('routing.currentRouteName'),

  articleTitle: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.title') || emberMetaConfig.title;
  }),
  description: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.description') || emberMetaConfig.description;
  }),
  imgSrc: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.imgSrc') || emberMetaConfig.imgSrc;
  }),
  siteName: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.siteName') || emberMetaConfig.siteName;
  }),
  title: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.title') || emberMetaConfig.title;
  }),
  twitterUsername: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.twitterUsername') || emberMetaConfig.twitterUsername;
  }),
  type: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.type') || 'website';
  }),
  url: computed('routeName', function() {
    let route = getOwner(this).lookup(`route:${this.routeName}`);
    return get(route, 'currentModel.url') || emberMetaConfig.url;
  }),
});
