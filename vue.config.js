module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          // icon: 'src/assets/future-architect-vue-cli-electron-sample.png',
          target: [
            {
              target: 'portable',
              arch: ['x64']
            }
          ]
        }
      }
    }
  }
}
