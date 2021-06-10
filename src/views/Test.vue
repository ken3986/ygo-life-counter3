<template>
  <div class="page-wrapper">
    <!-- ページヘッダー -->
    <!-- <div class="page-header my-4">
      <div class="container">
        <h1 class="page-title">Life Counter</h1>
      </div>
    </div> -->

    <!-- ページボディ -->
    <div class="page-body my-4">
      <section class="life-counter">
        <div class="container">
          <div class="row mb-2">

            <div class="col-5">
              <!-- 左側プレイヤー -->
              <div class="form-group">
                <!-- プレイヤー名 -->
                <input type="text" class="form-control mb-2" v-model="player(1).name">
                <!-- ライフポイント -->
                <input type="text" :value="player(1).lifePoint" class="lifePoint1 tt-digital form-control text-center" inputmode="numeric">
              </div>
            </div>

            <div class="col-2 text-center">
              <!-- リセットボタン -->
              <button @click="resetLifePoints" class="btn btn-dark"><b-icon-arrow-clockwise></b-icon-arrow-clockwise></button>
              <!-- <button @click="undoLogs" class="btn btn-light"><b-icon-skip-backward></b-icon-skip-backward></button> -->
            </div>

            <div class="col-5">
              <!-- 右側プレイヤー -->
              <div class="form-group">
                <!-- プレイヤー名 -->
                <input type="text" class="form-control mb-2" v-model="player(2).name">
                <!-- ライフポイント -->
                <input type="text" :value="player(2).lifePoint" class="lifePoint2 tt-digital form-control text-center" inputmode="numeric">
              </div>
            </div>
          </div>

          <!-- 増減ボタン -->
          <div class="row mb-4 gx-2">
            <!-- プレイヤー1・プラス -->
            <div class="col-2 text-center">
              <button class="btn btn-block btn-danger" @click="changeLifePoint(1, '+')">+</button>
            </div>
            <!-- プレイヤー1・マイナス -->
            <div class="col-2 text-center">
              <button class="btn btn-block btn-danger" @click="changeLifePoint(1, '-')">-</button>
            </div>
            <!-- 増減値表示 -->
            <div class="col-4">
              <p class="text-center" @click="inputLifePoint = 0">{{ inputLifePoint }}</p>
              <!-- <input type="text" class="form-control text-center" inputmode="numeric" v-model.number="inputLifePoint"> -->
            </div>
            <!-- プレイヤー2・マイナス -->
            <div class="col-2 text-center">
              <button class="btn btn-block btn-primary" @click="changeLifePoint(2, '-')">-</button>
            </div>
            <!-- プレイヤー2・プラス -->
            <div class="col-2 text-center">
              <button class="btn btn-block btn-primary" @click="changeLifePoint(2, '+')">+</button>
            </div>
          </div>

          <!-- 数字キー -->
          <div class="numbers px-5 text-center">
            <div class="row">
              <div class="col-12 col-lg-6 order-0 order-lg-1">
                <div class="row">
                  <div  v-for="number in numbers.slice(0, 3)" :key="number" class="col-4 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="number in numbers.slice(3, 6)" :key="number" class="col-4 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="number in numbers.slice(6, 9)" :key="number" class="col-4 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="number in numbers.slice(9, 13)" :key="number" class="col-4 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                </div>
              </div>
              <div class="col-6 col-lg-3 order-1 order-lg-0">
                <!-- <Logs
                  :logs="playerLog(1)"
                ></Logs> -->
              </div>
              <div class="col-6 col-lg-3 order-2 order-lg-2">
                <!-- <Logs
                  :logs="playerLog(2)"
                ></Logs> -->
              </div>
            </div>
          </div> <!-- numbers -->
        </div> <!-- .container -->
      </section>

      <!-- デバック用 -->
      <section>
        <div class="container">
          <!-- <h2>デバックエリア</h2>
          <img src="@/assets/img/2_3r.png" alt="">
          {{ logs }}
          <p>{{ playerLog(1) }}</p> -->
        </div>
      </section>
    </div> <!-- .page-content -->
  </div> <!-- .pge-wrapper -->
</template>


<script>
// import Logs from '@/components/Logs.vue'

export default {
  name: 'life-counter',

  components: {
    // Logs,
  }, /* components */

  data () {
    return {
      message: 'testMessage',

      inputLifePoint: 0,

      players: [
        {
          id: 1,
          name: 'Player1',
          lifePoint: 8000,
          logs: [],
        },

        {
          id: 2,
          name: 'Player2',
          lifePoint: 8000,
          logs: [],
        }
      ],

      numbers: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '00',
        '000',
      ],

      logs: [],
      currentLogId: 0,
    }
  }, /* data */

  computed: {
    player () {
      return function (playerId) {
        const player = this.getPlayer(playerId)
        return player
      }
    },

    playerLog () {
      return function (playerId) {
        const playerLog = this.logs.filter(log => log.playerId === playerId)
        return playerLog
      }
    }
  }, /* computed */

  mounted () {
    console.log(window.outerWidth)
    console.log(window.outerHeight)
  },

  methods: {
    // IDからプレイヤーオブジェクトを取得
    getPlayer (playerId) {
      const player = this.players.find((player) => player.id === playerId)
      return player
    },

    // 全てリセット
    resetLifePoints () {
      this.players.forEach((player) => {
        player.lifePoint = 8000
        this.logs =[]
      })
    },

    // ライフポイントの増減
    changeLifePoint (playerId, operator) {
      const player = this.getPlayer(playerId)
      const previousLifePoint = player.lifePoint
      const inputLifePoint = parseInt(this.inputLifePoint)

      if (inputLifePoint !== 0) {
        if (operator === '+') {
          player.lifePoint = player.lifePoint + inputLifePoint
        }
        else if (operator === '-') {
          player.lifePoint = player.lifePoint - inputLifePoint
          // if (player.lifePoint <= 0) {
          //   player.lifePoint = 0
          // }
        }

        this.logs.push({
          id: this.currentLogId,
          playerId: playerId,
          previousLifePoint: previousLifePoint,
          changeLifePoint: inputLifePoint,
          operator: operator,
          currentLifePoint: player.lifePoint,
        })
        this.currentLogId++
      }

      this.inputLifePoint = 0
    },

    // 数字を入力
    inputNumber (number) {
      if(this.inputLifePoint == 0) {
        this.inputLifePoint = ''
      }
      this.inputLifePoint = this.inputLifePoint + number
    },

    // 1つ戻す
    undoLogs () {
      if (this.logs.length) {
        let targetLog = {}
        targetLog = this.logs[this.logs.length - 1]

        const player = this.getPlayer(targetLog.playerId)

        if (targetLog.operator === '+') {
          player.lifePoint = player.lifePoint - targetLog.changeLifePoint
        } else if (targetLog.operator === '-') {
          player.lifePoint = player.lifePoint + targetLog.changeLifePoint
        }

        this.logs.pop()
      }
    }
  }, /* methods */

}
</script>


<style>
body {
  background-color: #eee !important;
}

.life-counter {
  min-width: 440px;
}

@font-face {
  font-family: 'tt-digital';
  src: url('~@/assets/fonts/tt-digital.ttf');
}
.tt-digital {
  font-family: 'tt-digital';
  color: #fff !important;
  text-shadow:  2px  2px 3px green ,
               -2px  2px 3px green ,
                2px -2px 3px green ,
               -2px -2px 3px green;
  background-color: #000 !important;
  letter-spacing: 0.1em;
  font-size: 30px !important;
  /* border: 1px double #fff !important; */
}
.lifePoint1 {
    text-shadow:  2px  2px 8px crimson ,
               -2px  2px 8px crimson ,
                2px -2px 8px crimson ,
               -2px -2px 8px crimson;
}
.lifePoint2 {
    text-shadow:  2px  2px 8px blue ,
               -2px  2px 8px blue ,
                2px -2px 8px blue ,
               -2px -2px 8px blue;
}
</style>

