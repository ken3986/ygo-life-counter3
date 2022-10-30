import {
  mapGetters,
} from 'vuex'

export default {
  data () {
    return {

    }
  }, /* data */

  computed: {
    ...mapGetters({
      players: 'getPlayers',
      logs: 'getLogs',
    }),

    // プレイヤーIDからプレイヤー情報を取得して返す
    player () {
      return function (playerId) {
        const player = this.players.find((player) => player.id === playerId)
        return player
      }
    },
  }, /* computed */

  mounted () {
    // プレイヤーリストを取得
    const players = this.$store.getters.getPlayers

    // ストレージからデータをロード
    players.forEach((player) => {
      this.$store.commit('loadPlayer', {id: player.id})
    })

    // プレイヤーデータを更新したらストレージを更新
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'updatePlayer') {
        this.$store.commit('savePlayer', mutation.payload)
      }
    })

    // ストレージが更新されたらデータをリロード
    window.onstorage = (event) => {
      // ログをリロード
      if (event.key == 'logs') {
        this.$store.commit('loadLogs')
      }

      // プレイヤー情報をリロード
      const players = this.$store.getters.getPlayers
      players.forEach((player) => {
        if (event.key == ('player' + player.id)) {
          this.$store.commit('loadPlayer', {id: player.id})
        }
      })
    }

    // ストレージにログがある場合はロード
    // if (localStorage.getItem('logs')) {
      this.$store.commit('loadLogs')
    // }

    // ログを更新したらストレージを更新
    this.$store.subscribe((mutation) => {
      if (
        mutation.type === 'addLog'
        || mutation.type === 'resetLogs'
        || mutation.type === 'undoLog'
      ) {
        this.$store.commit('saveLogs')
      }
    })

  }, /* mounted */

  methods: {
    // プレイヤーデータを更新
    updatePlayer (data) {
      this.$store.commit('updatePlayer', {
        id: data.id,
        key: data.key,
        value: data.value,
      })
    },

    // 別ウィンドウを開く
    openWindow (name ,size = { width: 400, height: 400 }) {
      const resolveRoute = this.$router.resolve({
        name: name
      })
      window.open(resolveRoute.href, '', `width=${size.width}, height=${size.height}`)
    },

    openBar () {
      this.openWindow ('Bar', { width: 1000, height: 100 })
    },

    openLogs () {
      this.openWindow ('Logs', { width: 460, height: 500 })
    }
  }, /* methods */
}
