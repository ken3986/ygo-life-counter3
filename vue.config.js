module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: 'src/assets/img/hoshinowa-mark.png',
          target: [
            {
              target: 'nsis', // NSIS インストーラー
              arch: ['x64', 'ia32'] // 64bit と 32bit アーキテクチャをビルド
            },
            {
              target: 'portable', // ポータブル版
              arch: ['x64', 'ia32'] // 64bit と 32bit アーキテクチャをビルド
            }
          ]
        },
        nsis: {
          oneClick: false, // ワンクリックインストールを無効化
          allowToChangeInstallationDirectory: true // インストールディレクトリの変更を許可
        }
      }
    }
  }
}
