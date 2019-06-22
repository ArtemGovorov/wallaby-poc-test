module.exports = {
  name: 'wallaby-poc-test',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/wallaby-poc-test',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
