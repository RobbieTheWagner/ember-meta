module.exports = {
  normalizeEntityName() { },
  beforeInstall() {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-cli-head' }
      ]
    });
  }
};
