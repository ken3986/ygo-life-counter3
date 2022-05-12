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
          <div class="row mb-3">

            <div class="col-5">
              <!-- 左側プレイヤー -->
              <div class="player1">
                <!-- プレイヤー名 -->
                <input type="text" class="playerName form-control mb-2" :value="player(1).name" @change="updatePlayer({id:1, key:'name', value:$event.target.value})">
                <!-- ライフポイント -->
                <div class="lifePoints lifePoints1 tt-digital text-center">{{ player(1).lifePoints }}</div>
              </div>
            </div>

            <div class="col-2 text-center">
              <!-- リセットボタン -->
              <button @click="resetLifePoints" class="btn btn-dark mb-3"><b-icon-arrow-clockwise></b-icon-arrow-clockwise></button>
              <!-- アンドゥボタン -->
              <button @click="$store.dispatch('undoChange')" class="btn btn-dark"><b-icon-skip-backward></b-icon-skip-backward></button>
            </div>

            <div class="col-5">
              <!-- 右側プレイヤー -->
              <div class="player2">
                <!-- プレイヤー名 -->
                <input type="text" class="playerName form-control mb-2" :value="player(2).name" @change="updatePlayer({id:2, key:'name', value:$event.target.value})">
                <!-- ライフポイント -->
                <div class="lifePoints lifePoints2 tt-digital text-center">{{ player(2).lifePoints }}</div>
              </div>
            </div>
          </div>

          <!-- 増減ボタン -->
          <div class="lifeOperator">
            <div class="d-flex lifeOperator-row">

              <div class="lifeOperator-buttons player1">
                <!-- プレイヤー1・2分の1 -->
                <button class="lifeOperator-button lifeOperator-divide" @click="changeLifePoints(1, '/')">&#189;</button>
                <!-- プレイヤー1・プラス -->
                <button class="lifeOperator-button" @click="changeLifePoints(1, '+')">+</button>
                <!-- プレイヤー1・マイナス -->
                <button class="lifeOperator-button" @click="changeLifePoints(1, '-')">-</button>
              </div>

              <!-- 増減値表示 -->
              <div class="inputPointsArea">
                <div class="inputPointsArea-head">
                  <p class="memoryPoints" :class="{ active: memoryPoints }">M {{ memoryPoints }}</p>
                  <!-- <p v-if="totalPoints">{{ totalPoints }}</p> -->
                  <div class="operators">
                    <p class="operator" :class="{ activeOperator: operator=='/' }">÷</p>
                    <p class="operator" :class="{ activeOperator: operator=='*' }">×</p>
                    <p class="operator" :class="{ activeOperator: operator=='-' }">-</p>
                    <p class="operator" :class="{ activeOperator: operator=='+' }">+</p>
                  </div>
                </div>
                <div class="inputPointsArea-body">
                  <button class="clearInputPoints" @click="clearInputPoints">C</button>
                  <p class="text-right inputPoints">{{ inputPoints }}</p>
                </div>
                <!-- <p v-if="logs.length">{{ logs[logs.length - 1].operator }}{{ logs[logs.length - 1].changeLifePoints }}</p> -->
                <!-- <input type="text" class="form-control text-center" inputmode="numeric" v-model.number="inputPoints"> -->
              </div>

              <div class="lifeOperator-buttons player2">
                <!-- プレイヤー2・2分の1 -->
                <button class="lifeOperator-button lifeOperator-divide" @click="changeLifePoints(2, '/')">&#189;</button>
                <!-- プレイヤー2・マイナス -->
                <button class="lifeOperator-button" @click="changeLifePoints(2, '-')">-</button>
                <!-- プレイヤー2・プラス -->
                <button class="lifeOperator-button" @click="changeLifePoints(2, '+')">+</button>
              </div>

            </div>
          </div>

          <hr>

          <!-- 計算器領域 -->
          <div class="calculator px-5 text-center">
            <div class="d-flex calculator-row">
              <button @click="clearInputPoints">C</button>
              <button @click="mrc">MRC</button>
              <button @click="inputMemory('-')">M-</button>
              <button @click="inputMemory('+')">M+</button>
              <button @click="inputOperator('/')">÷</button>
            </div>
            <div class="d-flex calculator-row">
              <button></button>
              <button @click="inputNumber(number)" v-for="number in numbers.slice(0, 3)" :key="number">{{ number }}</button>
              <button @click="inputOperator('*')">×</button>
            </div>
            <div class="d-flex calculator-row">
            </div>
            <div class="d-flex calculator-row">
              <button></button>
              <button @click="inputNumber(number)" v-for="number in numbers.slice(3, 6)" :key="number">{{ number }}</button>
              <button @click="inputOperator('-')">-</button>
            </div>
            <div class="d-flex calculator-row">
              <!-- ログ窓を表示 -->
              <button @click="openLogs()">Log</button>

              <button @click="inputNumber(number)" v-for="number in numbers.slice(6, 9)" :key="number">{{ number }}</button>
              <button @click="inputOperator('+')">+</button>
            </div>
            <div class="d-flex calculator-row">
              <!-- 別窓バーを表示 -->
              <button @click="openBar()">Bar</button>

              <button @click="inputNumber(number)" v-for="number in numbers.slice(9, 12)" :key="number" :disabled="dividing">{{ number }}</button>
              <button @click="equal">=</button>
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
import {
  // mapGetters,
} from 'vuex'

import Mixin from '@/mixins/mixin'

export default {
  name: 'life-calculator',

  mixins: [Mixin],

  components: {
    // Logs,
  }, /* components */

  data () {
    return {
      inputPoints: 0,
      totalPoints: 0,
      operator: '',

      /** 最後に押されたキーの種類
       * 0: 数値
       * 1: 演算子
       * 2: =
       */
      lastInputButton: 0,

      lastCalc: {
        operator: '',
        value: 0
      },

      memoryPoints: 0,
      mr: true,

      dividing: false,

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

      currentLogId: 0,

      overDamagePoints: {
        playerId: 0,
        value: 0
      },
    }
  }, /* data */

  computed: {
    // 増減値窓を整数化して返す
    intInputPoints () {
      return parseInt(this.inputPoints)
    }
  }, /* computed */

  mounted () {
    console.log('outerWidth:' + window.outerWidth)
    console.log('outerHeight:' + window.outerHeight)
  },

  methods: {
    // IDからプレイヤーオブジェクトを取得
    getPlayer (playerId) {
      const player = this.players.find((player) => player.id === playerId)
      return player
    },

    // プレイヤー情報をリセット
    resetPlayers () {
      this.players.forEach((player) => {
        this.updatePlayer({
          id: player.id,
          key: 'name',
          value: 'Player' + player.id,
        })
      })
      this.resetLifePoints()
    },

    // ライフ関連の情報をリセット
    resetLifePoints () {
      this.players.forEach((player) => {
        this.updatePlayer({
          id: player.id,
          key: 'lifePoints',
          value: 8000,
        })
      })
      this.overDamagePoints = {playerId: 0, value: 0}
      this.clearInputPoints()
      this.$store.commit('resetLogs')
    },

    // 計算領域のリセット
    clearInputPoints () {
      this.inputPoints = 0
      this.totalPoints = 0
      this.memoryPoints = 0
      this.mr = true
      this.operator = ''
      this.lastInputButton = 0
      this.lastCalc.operator = ''
      this.lastCalc.value = 0
      this.dividing = false
    },

    // 数字ボタンを入力
    inputNumber (number) {
      // 最後に入力されたものが数値でないなら入力エリアをクリア
      if (this.lastInputButton !== 0) {
        this.inputPoints = ''
      }
      // 最後に入力されたボタンがイコールなら合計値をクリア
      else if (this.lastInputButton === 2) {
        this.totalPoints = 0
      }
      // 0が入っている場合は繋げずに入力値をそのまま表示
      if (this.inputPoints == 0) {
        this.inputPoints = ''
      }

      // 数字を連結
      this.inputPoints += number

      // 連結結果の数値が0なら0を表示（00や000を入力したとき用）
      if (parseInt(this.inputPoints) === 0) {
        this.inputPoints = 0
      }

      // 計算待ち数値を設定
      this.lastCalc.value = parseInt(this.inputPoints)

      // 最後に入力されたボタンを数字と設定
      this.lastInputButton = 0
    }, /* inputNumber */

    // 計算式として解釈する関数
    calculate (totalPoints, operator, inputPoints) {
      if (!operator) {
        console.log('エラー：計算演算子が指定されていません。')
        return
      }
      return Function('return (' + totalPoints + operator + inputPoints + ')')
    }, /* calculate */

    // 演算子ボタンの挙動
    inputOperator (operator) {
      if (operator === '/') {
        this.dividing = true
      } else {
        this.dividing = false
      }
      // 最後に入力されたボタンが数字なら
      if (this.lastInputButton === 0) {
        // 0除算を回避
        if (this.lastCalc.operator === '/' && this.lastCalc.value === 0) {
          console.log('エラー：0で割ることはできません。')
          return
        }
        // 合計値を計算
        if (this.lastCalc.operator) {
          this.totalPoints = Math.floor(this.calculate(this.totalPoints, this.lastCalc.operator, parseInt(this.lastCalc.value))())
        } else {
          this.totalPoints = parseInt(this.lastCalc.value)
        }
        // 計算待ち数値を設定
        this.lastCalc.value = parseInt(this.inputPoints)
        // 合計値を表示
        this.inputPoints = this.totalPoints
      }
      // 最後に入力されたボタンがイコールなら
      else if (this.lastInputButton === 2) {
        // 現在の入力値を合計値に保管
        this.totalPoints = parseInt(this.inputPoints)
      }

      // 表示演算子を設定
      this.operator = operator
      // 計算待ち演算子を設定
      this.lastCalc.operator = operator

      // 最後に入力したボタンを演算子と設定
      this.lastInputButton = 1
    }, /* inputOperator */

    // イコールボタンの挙動
    equal () {
      this.dividing = false
      // 最後に入力されたボタンがイコールなら
      if (this.lastInputButton === 2) {
        this.totalPoints = this.inputPoints
      }
      if (this.lastCalc.operator) {
        // 合計値を計算して表示
        this.inputPoints = this.calculate(this.totalPoints, this.lastCalc.operator, parseInt(this.lastCalc.value))()
      }
      this.operator = ''
      // 最後に入力されたボタンをイコールと設定
      this.lastInputButton = 2
    }, /* equal */

    // メモリーボタンの挙動
    inputMemory (operator) {
      this.memoryPoints = this.calculate(this.memoryPoints, operator, this.inputPoints)()
      this.lastInputButton = 1
    },
    // MRCボタンの挙動
    mrc () {
      if (this.mr) {
        this.inputPoints = this.memoryPoints
      } else {
        this.memoryPoints = 0
      }
      this.lastInputButton = 1
      this.mr = !this.mr
    },

    // ライフポイントの増減
    changeLifePoints (playerId, operator) {
      this.dividing = false
      // const player = this.getPlayer(playerId)
      const player = this.player(playerId)
      const previousLifePoints = player.lifePoints
      const inputPoints = parseInt(this.inputPoints)

      // 増加・減少の場合は入力値が0なら計算を行わない
      if ((operator === '+' || operator === '-') && this.inputPoints === 0) {
        return
      }

      // カウンターの初期値と終了値をセットする
      const from = player.lifePoints
      let to = 0
      const startTime = Date.now()

      // ライフを減少させる
      if (operator === '-') {
        to = player.lifePoints - inputPoints
        // 0以下になる場合は0にする
        if (player.lifePoints < inputPoints) {
          // オーバー値を保存
          this.overDamagePoints.playerId = player.id
          this.overDamagePoints.value = Math.abs(player.lifePoints - inputPoints)
          to = 0
        }
      }
      // ライフを増加させる
      else if (operator === '+') {
        to = player.lifePoints + inputPoints
      }
      // ライフを2分の1にする
      else if (operator == '/') {
        // 小数点以下を切り捨て
        to = Math.floor(player.lifePoints / 2)
      }
      else {
        return
      }

      // 結果表示までの時間（ミリ秒）
      const duration = 600

      // 終了値までカウンターを増減させる
      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const progress = elapsedTime / duration

        if (progress < 1) {
          this.updatePlayer({
            id: player.id,
            key: 'lifePoints',
            value: Math.floor(from + progress * (to - from)),
          })
        } else {
          this.updatePlayer({
            id: player.id,
            key: 'lifePoints',
            value: to,
          })
          clearInterval(timer)
        }
      })

      // ログに出力
      const log = {
        id: this.currentLogId,
        playerId: playerId,
        previousLifePoints: previousLifePoints,
        changeLifePoints: inputPoints,
        operator: operator,
        currentLifePoints: to,
      }
      this.$store.commit('addLog', log)
      this.currentLogId++

      // 入力値をクリアする
      if (operator === '+' || operator === '-') {
        this.inputPoints = 0
      }
    },



  }, /* methods */

}
</script>


<style lang="scss">
html {
  min-height: 100%;
}
body {
  background-image: url('~@/assets/img/metal3.png');
  background-size: cover;
  font-family: 'メイリオ';
}

.life-counter {
  min-width: 440px;
}

.playerName {
  background-color: #000 !important;
  color: #fff !important;
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

.lifePoints {
  // height: calc(1.5em + 0.75rem + 2px);
  padding: 0.475rem 0.75em 0.275rem;
  border-radius: 0.25rem;
}
.lifePoints1 {
    text-shadow:  2px  2px 8px crimson ,
               -2px  2px 8px crimson ,
                2px -2px 8px crimson ,
               -2px -2px 8px crimson;
}
.lifePoints2 {
    text-shadow:  2px  2px 8px blue ,
               -2px  2px 8px blue ,
                2px -2px 8px blue ,
               -2px -2px 8px blue;
}

// ライフ操作
.lifeOperator {
  .lifeOperator-row {
    height: 6em;
    justify-content: space-between;
    .lifeOperator-buttons {
      display: grid;
      grid-template-rows: 30% 1fr;
      grid-template-columns: 50% 50%;
      width: 25%;

      button {
        &:first-child {
          grid-row: 1 / 2;
          grid-column: 1 / 3;
        }
        &:nth-child(2) {
          grid-row: 2 / 3;
          grid-column: 1 / 2;
        }
        &:nth-child(3) {
          grid-row: 2 / 3;
          grid-column: 2 / 3;
        }
      }
      &.player1 {
        .lifeOperator-button {
          $background-color: crimson;
          background-color: $background-color;
          // border-color: darken($background-color, 10);
        }
      }
      &.player2 {
        .lifeOperator-button {
          $background-color: blue;
          background-color: $background-color;
          // border-color: darken($background-color, 10);
        }
      }
      .lifeOperator-button {
        flex-basis: 12%;
        font-size: 1.5rem;
        border-radius: 5%;
        color: #fff;
      }
      .lifeOperator-divide {
        flex-basis: 8%;
        padding: 0;
        line-height: 1;
      }
    }

    .inputPointsArea {
      $padding: 0.8rem;
      background-color: #000;
      color: #fff;
      width: 50%;

      display: flex;
      flex-direction: column;

      .inputPointsArea-head {
        height: 1.5em;
        // font-size: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333;
        color: #ddd;
        p {
          margin: 0;
          // font-size: 30px;
        }
        .memoryPoints {
          margin-left: $padding;
          font-size: 14px;
          opacity: 0;
          &.active {
            opacity: 1;
          }
        }
        .operators {
          display: flex;
          margin-right: $padding;
          font-size: 14px;
          .operator {
            opacity: 0;
            margin-left: 0.2em;
            background-color: #eee;
            color: #000;
            width: 1.2em;
            height: 1em;
            text-align: center;
            border-radius: 10%;
            display:flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            font-weight: bold;
          }
          .activeOperator {
            opacity: 0.9
          }
        }
      }
      .inputPointsArea-body {
        display: flex;
        align-items: center;
        margin-top: auto;
        margin-bottom: auto;

        .clearInputPoints {
          border-radius: 5%;
          width: 1.5em;
          height: 1.5em;
          // line-height: 20px;
          // font-size: 1rem;
          margin-left: $padding;
          border: 0px solid #000;
        }
        .inputPoints {
          flex-grow: 1;
          margin: 0;
          font-size: 1.5rem;
          margin-right: $padding;
          padding: 0 0 2px 0;
        }
      }
    }
  }
}

// 計算機
.calculator {
  // max-width: 500px;
  margin: 0 auto;
  .calculator-row {
    justify-content: space-between;
  }
  button {
    $background-color: rgb(71, 71, 78);
    flex-basis: 20%;
    background-color: $background-color;
    color: #fff;
    border-radius: 5%;
    height: 2.5em;
    font-size: 1.4rem;

    &:hover {
      background-color: darken($background-color, 30)
    }
    &:disabled {
      background-color: #666;
    }
  }
}
</style>

