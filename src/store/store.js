import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: [],

    players: [
      {
        id: 1,
        name: 'Player1',
        lifePoints: 8000,
      },

      {
        id: 2,
        name: 'Player2',
        lifePoints: 8000,
      }
    ],
  },

  getters: {
    getLogs (state) {
      return state.logs
    },

    getPlayers (state) {
      return state.players
    },
  },

  mutations: {
    addLog (state, payload) {
      state.logs.push(payload)
    },

    undoLog (state) {
      state.logs.splice(-1, 1)
    },

    resetLogs (state) {
      state.logs.splice(0)
    },

    saveLogs (state) {
      const key = 'logs'
      localStorage.setItem(key, JSON.stringify(state.logs))
    },

    loadLogs (state) {
      const key = 'logs'
      if (localStorage.getItem(key)) {
        const newValue = JSON.parse(localStorage.getItem(key))
        state.logs.splice(0)
        state.logs.splice(0, 0, ...newValue)
      }
    },

    // プレイヤー情報を更新
    updatePlayer (state, payload) {
      const player = state.players.find((player) => player.id === payload.id)
      player[payload.key] = payload.value
    },

    // ストレージにプレイヤー情報を書き込む
    savePlayer (state, payload) {
      const player = state.players.find((player) => player.id === payload.id)
      const key = 'player' + player.id
      localStorage.setItem(key, JSON.stringify(player))
    },

    // ストレージからプレイヤー情報を読み込む
    loadPlayer (state, payload) {
      const player = state.players.find((player) => player.id === payload.id)
      const key = 'player' + player.id
      if (localStorage.getItem(key)) {
        const newValue = JSON.parse(localStorage.getItem(key))
        Object.assign(player, newValue)
      }
    },
  },

  actions: {
    undoChange ({ state, commit }) {
      if (state.logs.length) {
        let targetLog = {}
        targetLog = state.logs[state.logs.length - 1]
        const targetPlayer = state.players.find((player) => player.id === targetLog.playerId)
        // ライフポイントを１つ前の状態に戻す
        commit('updatePlayer', {
          id: targetPlayer.id,
          key: 'lifePoints',
          value: targetLog.previousLifePoints,
        })

        commit('undoLog')
      }
    }
  },

  modules: {
  }
})
