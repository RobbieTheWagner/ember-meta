export function initialize(application) {
  application.inject('route', 'headData', 'service:head-data');
}

export default {
  name: 'head-data',
  initialize
};
