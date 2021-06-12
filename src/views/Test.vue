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
              <p v-if="memoryPoint">memory</p>
              <!-- <p v-if="logs.length">{{ logs[logs.length - 1].operator }}{{ logs[logs.length - 1].changeLifePoint }}</p> -->
              <p v-if="totalPoint">{{ totalPoint }}</p>
              <p v-if="operator">{{ operator }}</p>
              <p class="text-center" @click="inputPoint = 0">{{ inputPoint }}</p>
              <!-- <input type="text" class="form-control text-center" inputmode="numeric" v-model.number="inputPoint"> -->
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
                  <div class="col-3">
                    <button>MRC</button>
                  </div>
                  <div class="col-3">
                    <button>M-</button>
                  </div>
                  <div class="col-3">
                    <button>M+</button>
                  </div>
                  <div class="col-3">
                    <button @click="inputOperator('/')">÷</button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="number in numbers.slice(0, 3)" :key="number" class="col-3 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                  <div>
                    <button @click="inputOperator('*')">×</button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="number in numbers.slice(3, 6)" :key="number" class="col-3 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                  <div>
                    <button @click="inputOperator('-')">-</button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="number in numbers.slice(6, 9)" :key="number" class="col-3 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                  <div>
                    <button @click="inputOperator('+')">+</button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="number in numbers.slice(9, 13)" :key="number" class="col-3 d-grid gap-2">
                    <button
                      class="btn btn-block btn-secondary mb-2"
                      @click="inputNumber(number)"
                    >{{ number }}</button>
                  </div>
                  <div>
                    <button @click="equal">=</button>
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
          {{ logs }} -->
          <!-- <p>{{ playerLog(1) }}</p> -->
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

      inputPoint: 0,
      totalPoint: 0,
      operator: '+',

      /**
       * 0: 数値
       * 1: 演算子
       * 2: =
       */
      lastInputKey: 0,

      lastCalc: {
        operator: '+',
        value: 0
      },

      lastInputIsEqual: false,
      waitNewInput: false,
      calculated: false,

      memoryPoint: 0,

      players: [
        {
          id: 1,
          name: 'Player1',
          lifePoint: 8000,
        },

        {
          id: 2,
          name: 'Player2',
          lifePoint: 8000,
        }
      ],

      numbers: [
        '7',
        '8',
        '9',
        '4',
        '5',
        '6',
        '1',
        '2',
        '3',
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
      this.inputPoint = 0
      this.operator = ''
      this.totalPoint = 0
      this.calculated = false
      this.lastCalc.operator = '+'
      this.lastCalc.value = 0
    },

    // calculateInputPoints () {
    //   this.calculated = false
    //   if (this.operator === '+') {
    //     this.totalPoint = this.totalPoint + parseInt(this.inputPoint)
    //   }
    //   else if (this.operator === '-') {
    //     this.totalPoint = this.totalPoint - parseInt(this.inputPoint)
    //     }
    //   else if (this.operator === '×') {
    //     this.totalPoint = this.totalPoint * parseInt(this.inputPoint)
    //     }
    //   else if (this.operator === '÷') {
    //     this.totalPoint = Math.floor(this.totalPoint / parseInt(this.inputPoint))
    //   }
    // },

    // 算出記号の変更
    changeOperator (operator) {
      if (!this.calculated) {
        if (this.totalPoint) {
          this.calculateInputPoints()
          this.inputPoint = this.totalPoint
          this.calculated = true
        }
      }

      this.operator = operator

      this.waitNewInput = true
      this.calculated = false
    },



    // 数字を入力
    inputNumber (number) {

      // 最後に入力されたものが演算子なら入力エリアをクリア
      if (this.lastInputKey === 1) {
        this.inputPoint = ''
      } else if (this.lastInputKey === 2) {
        this.inputPoint = ''
        this.totalPoint = 0
      }

      // 最後に入力されたものを数字と設定
      this.lastInputKey = 0

      // 0が入っている場合は繋げず入力値をそのまま表示
      if(this.inputPoint == 0) {
        this.inputPoint = ''
      }

      if (this.waitNewInput) {
        if (!this.calculated) {
          this.totalPoint = parseInt(this.inputPoint)
        }
        this.inputPoint = ''
      }

      // 数字を連結
      this.inputPoint += number

      this.lastCalc.value = parseInt(this.inputPoint)

      // this.waitNewInput = false
      // this.calculated = false
    },

    // 計算式として解釈する関数
    calculate (totalPoint, operator, inputPoint) {
      return Function('return (' + totalPoint + operator + inputPoint + ')')
    },

    // 演算子ボタンの挙動
    inputOperator (operator) {
      if (this.lastInputKey === 0) {
        const total = this.calculate(this.totalPoint, this.lastCalc.operator, this.lastCalc.value)()
        // this.inputPoint = total
        this.totalPoint = total
        this.lastCalc.value = this.inputPoint
      }

      if (this.lastInputKey === 2) {
        this.totalPoint = this.inputPoint
      }

      this.operator = operator
      this.lastCalc.operator = operator

      this.lastInputKey = 1
      // // 最後に入力されたものが数値である場合
      // if (this.lastInputKey === 0 || this.lastInputKey === 2) {
      //   // 最後に入力されたものを演算子と設定
      //   this.lastInputKey = 1

      //   // 現在値と入力値を合算
      //   const total = this.calculate(this.totalPoint, this.operator, parseInt(this.inputPoint))()
      //   this.totalPoint = total
      //   this.inputPoint = this.totalPoint
      // }

      // if (operator === '=') {
      //   // this.totalPoint = 0
      //   this.operator = '+'
      //   this.lastInputKey = 2
      // } else {
      //   // 演算子を変更
      //   this.operator = operator
      // }
    },

    // イコールボタンの挙動
    equal () {
      if (this.lastInputKey === 2) {
        this.totalPoint = this.inputPoint
      }
      this.inputPoint = this.calculate(this.totalPoint, this.lastCalc.operator, this.lastCalc.value)()
        // this.operator = '+'
        this.lastInputKey = 2
      // this.calculateInputPoints()
      // this.inputPoint = this.totalPoint
      // this.calculated = true
      // this.operator = ''
      // this.waitNewInput = true
      // this.totalPoint = 0
    },

    // ライフポイントの増減
    changeLifePoint (playerId, operator) {
      const player = this.getPlayer(playerId)
      const previousLifePoint = player.lifePoint
      const inputPoint = parseInt(this.inputPoint)

      if (inputPoint !== 0) {
        const from = player.lifePoint
        let to = 0
        const startTime = Date.now()

        if (operator === '+') {
          to = player.lifePoint + inputPoint
        }
        else {
          to = player.lifePoint - inputPoint
          // if (player.lifePoint <= 0) {
          //   player.lifePoint = 0
          // }
        }

        // 結果表示までの時間
        const duration = 600

        const timer = setInterval(() => {
          const elapsedTime = Date.now() - startTime
          const progress = elapsedTime / duration

          if (progress < 1) {
            player.lifePoint = Math.floor(from + progress * (to - from))
          } else {
            player.lifePoint = to
            clearInterval(timer)
          }
        })

        // ログに出力
        const log = {
          id: this.currentLogId,
          playerId: playerId,
          previousLifePoint: previousLifePoint,
          changeLifePoint: inputPoint,
          operator: operator,
          currentLifePoint: player.lifePoint,
        }
        this.logs.push(log)
        // this.$store.commit('addLog', log)
        this.currentLogId++
      }

      this.inputPoint = 0
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
        // this.$store.commit('removeLog')
      }
    },
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
  background-color: #000 !important;
  letter-spacing: 0.1em;
  font-size: 26px !important;
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

