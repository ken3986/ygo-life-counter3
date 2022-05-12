module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: 'src/assets/img/hoshinowa-mark.png',
          target: [
            {
              // target: 'portable',
              target: 'nsis',
              arch: ['x64']
            }
          ]
        }
      }
    }
  }
}
