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

    // ストレージにデータがある場合はロード
    players.forEach((player) => {
      if (localStorage.getItem('player' + player.id)) {
        this.$store.commit('loadPlayer', {id: player.id})
      }
    })

    // プレイヤーデータを更新したらストレージを更新
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'updatePlayer') {
        this.$store.commit('savePlayer', mutation.payload)
      }
    })

    // ストレージが更新されたらデータをリロード
    window.onstorage = (event) => {
      const players = this.$store.getters.getPlayers
      players.forEach((player) => {
        if (event.key == ('player' + player.id)) {
          this.$store.commit('loadPlayer', {id: player.id})
        }
      })
    }
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

    // // プレイヤー名を更新
    // updateName (e, playerId) {
    //   this.updatePlayer ({
    //     id: playerId,
    //     key: 'name',
    //     value: e.target.value,
    //   })
    // },

    // // プレイヤー名を更新
    // updateLifePoints (e, playerId) {
    //   this.updatePlayer ({
    //     id: playerId,
    //     key: 'lifePoints',
    //     value: e.target.value,
    //   })
    // },

    // 別ウィンドウを開く
    openWindow (name) {
      const resolveRoute = this.$router.resolve({
        name: name
      })
      console.log(resolveRoute.href)
      window.open(resolveRoute.href, '', 'width=1000, height=100')
    }
  }, /* methods */
}
