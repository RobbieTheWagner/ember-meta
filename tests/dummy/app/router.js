import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('blog', function() {
    this.route('post-meta-info');
    this.route('post-model');
  });
});

export default Router;
