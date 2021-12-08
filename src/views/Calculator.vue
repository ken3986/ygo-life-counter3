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
                <input type="text" class="playerName form-control mb-2" v-model="player(1).name">
                <!-- ライフポイント -->
                <input type="text" :value="player(1).lifePoint" class="lifePoint1 tt-digital form-control text-center" inputmode="numeric">
              </div>
            </div>

            <div class="col-2 text-center">
              <!-- リセットボタン -->
              <button @click="resetLifePoints" class="btn btn-dark mb-3"><b-icon-arrow-clockwise></b-icon-arrow-clockwise></button>
              <button @click="undoLogs" class="btn btn-dark"><b-icon-skip-backward></b-icon-skip-backward></button>
            </div>

            <div class="col-5">
              <!-- 右側プレイヤー -->
              <div class="form-group">
                <!-- プレイヤー名 -->
                <input type="text" class="playerName form-control mb-2" v-model="player(2).name">
                <!-- ライフポイント -->
                <input type="text" :value="player(2).lifePoint" class="lifePoint2 tt-digital form-control text-center" inputmode="numeric">
              </div>
            </div>
          </div>

          <!-- 増減ボタン -->
          <div class="lifeOperator">
            <div class="d-flex lifeOperator-row">

              <div class="lifeOperator-buttons player1">
                <!-- プレイヤー1・2分の1 -->
                <button class="lifeOperator-button lifeOperator-divide" @click="changeLifePoint(1, '/')">&#189;</button>
                <!-- プレイヤー1・プラス -->
                <button class="lifeOperator-button" @click="changeLifePoint(1, '+')">+</button>
                <!-- プレイヤー1・マイナス -->
                <button class="lifeOperator-button" @click="changeLifePoint(1, '-')">-</button>
              </div>

              <!-- 増減値表示 -->
              <div class="inputPointArea">
                <div class="inputPointArea-head">
                  <p class="memoryPoint" :class="{ active: memoryPoint }">M {{ memoryPoint }}</p>
                  <!-- <p v-if="totalPoint">{{ totalPoint }}</p> -->
                  <div class="operators">
                    <p class="operator" :class="{ activeOperator: operator=='/' }">÷</p>
                    <p class="operator" :class="{ activeOperator: operator=='*' }">×</p>
                    <p class="operator" :class="{ activeOperator: operator=='-' }">-</p>
                    <p class="operator" :class="{ activeOperator: operator=='+' }">+</p>
                  </div>
                </div>
                <div class="inputPointArea-body">
                  <button class="clearInputPoint" @click="clearInputPoint">C</button>
                  <p class="text-right inputPoint">{{ inputPoint }}</p>
                </div>
                <!-- <p v-if="logs.length">{{ logs[logs.length - 1].operator }}{{ logs[logs.length - 1].changeLifePoint }}</p> -->
                <!-- <input type="text" class="form-control text-center" inputmode="numeric" v-model.number="inputPoint"> -->
              </div>

              <div class="lifeOperator-buttons player2">
                <!-- プレイヤー2・2分の1 -->
                <button class="lifeOperator-button lifeOperator-divide" @click="changeLifePoint(2, '/')">&#189;</button>
                <!-- プレイヤー2・マイナス -->
                <button class="lifeOperator-button" @click="changeLifePoint(2, '-')">-</button>
                <!-- プレイヤー2・プラス -->
                <button class="lifeOperator-button" @click="changeLifePoint(2, '+')">+</button>
              </div>

            </div>
          </div>

          <hr>

          <!-- 計算器領域 -->
          <div class="calculator px-5 text-center">
            <div class="d-flex calculator-row">
              <button @click="clearInputPoint">C</button>
              <button @click="mrc">MRC</button>
              <button @click="inputMemory('-')">M-</button>
              <button @click="inputMemory('+')">M+</button>
              <button @click="inputOperator('/')">÷</button>
            </div>
            <div class="d-flex calculator-row">
              <button>test</button>
              <button @click="inputNumber(number)" v-for="number in numbers.slice(0, 3)" :key="number">{{ number }}</button>
              <button @click="inputOperator('*')">×</button>
            </div>
            <div class="d-flex calculator-row">
            </div>
            <div class="d-flex calculator-row">
              <button>test</button>
              <button @click="inputNumber(number)" v-for="number in numbers.slice(3, 6)" :key="number">{{ number }}</button>
              <button @click="inputOperator('-')">-</button>
            </div>
            <div class="d-flex calculator-row">
              <button>test</button>
              <button @click="inputNumber(number)" v-for="number in numbers.slice(6, 9)" :key="number">{{ number }}</button>
              <button @click="inputOperator('+')">+</button>
            </div>
            <div class="d-flex calculator-row">
              <button @click="openWindow('Bar')">bar</button>
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

export default {
  name: 'life-calculator',

  components: {
    // Logs,
  }, /* components */

  data () {
    return {
      inputPoint: 0,
      totalPoint: 0,
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

      memoryPoint: 0,
      mr: true,

      dividing: false,

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

      overDamagePoint: {
        playerId: 0,
        value: 0
      },
    }
  }, /* data */

  computed: {
    // プレイヤーIDからプレイヤー情報を取得して返す
    player () {
      return function (playerId) {
        const player = this.getPlayer(playerId)
        return player
      }
    },

    // プレイヤーIDからログを取得して返す
    playerLog () {
      return function (playerId) {
        const playerLog = this.logs.filter(log => log.playerId === playerId)
        return playerLog
      }
    },

    // 増減値窓を整数化して返す
    intInputPoint () {
      return parseInt(this.inputPoint)
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
      })
      this.overDamagePoint = {playerId: 0, value: 0}
      this.logs = []
      this.clearInputPoint()
    },

    // 計算領域のリセット
    clearInputPoint () {
      this.inputPoint = 0
      this.totalPoint = 0
      this.memoryPoint = 0
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
        this.inputPoint = ''
      }
      // 最後に入力されたボタンがイコールなら合計値をクリア
      else if (this.lastInputButton === 2) {
        this.totalPoint = 0
      }
      // 0が入っている場合は繋げずに入力値をそのまま表示
      if (this.inputPoint == 0) {
        this.inputPoint = ''
      }

      // 数字を連結
      this.inputPoint += number

      // 連結結果の数値が0なら0を表示（00や000を入力したとき用）
      if (parseInt(this.inputPoint) === 0) {
        this.inputPoint = 0
      }

      // 計算待ち数値を設定
      this.lastCalc.value = parseInt(this.inputPoint)

      // 最後に入力されたボタンを数字と設定
      this.lastInputButton = 0
    }, /* inputNumber */

    // 計算式として解釈する関数
    calculate (totalPoint, operator, inputPoint) {
      if (!operator) {
        console.log('エラー：計算演算子が指定されていません。')
        return
      }
      return Function('return (' + totalPoint + operator + inputPoint + ')')
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
          this.totalPoint = Math.floor(this.calculate(this.totalPoint, this.lastCalc.operator, parseInt(this.lastCalc.value))())
        } else {
          this.totalPoint = parseInt(this.lastCalc.value)
        }
        // 計算待ち数値を設定
        this.lastCalc.value = parseInt(this.inputPoint)
        // 合計値を表示
        this.inputPoint = this.totalPoint
      }
      // 最後に入力されたボタンがイコールなら
      else if (this.lastInputButton === 2) {
        // 現在の入力値を合計値に保管
        this.totalPoint = parseInt(this.inputPoint)
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
        this.totalPoint = this.inputPoint
      }
      if (this.lastCalc.operator) {
        // 合計値を計算して表示
        this.inputPoint = this.calculate(this.totalPoint, this.lastCalc.operator, parseInt(this.lastCalc.value))()
      }
      this.operator = ''
      // 最後に入力されたボタンをイコールと設定
      this.lastInputButton = 2
    }, /* equal */

    // メモリーボタンの挙動
    inputMemory (operator) {
      this.memoryPoint = this.calculate(this.memoryPoint, operator, this.inputPoint)()
      this.lastInputButton = 1
    },
    // MRCボタンの挙動
    mrc () {
      if (this.mr) {
        this.inputPoint = this.memoryPoint
      } else {
        this.memoryPoint = 0
      }
      this.lastInputButton = 1
      this.mr = !this.mr
    },

    // ライフポイントの増減
    changeLifePoint (playerId, operator) {
      this.dividing = false
      const player = this.getPlayer(playerId)
      const previousLifePoint = player.lifePoint
      const inputPoint = parseInt(this.inputPoint)

      // 増加・減少の場合は入力値が0なら計算を行わない
      if ((operator === '+' || operator === '-') && this.inputPoint === 0) {
        return
      }

      // カウンターの初期値と終了値をセットする
      const from = player.lifePoint
      let to = 0
      const startTime = Date.now()

      // ライフを減少させる
      if (operator === '-') {
        to = player.lifePoint - inputPoint
        // 0以下になる場合は0にする
        if (player.lifePoint < inputPoint) {
          // オーバー値を保存
          this.overDamagePoint.playerId = player.id
          this.overDamagePoint.value = Math.abs(player.lifePoint - inputPoint)
          to = 0
        }
      }
      // ライフを増加させる
      else if (operator === '+') {
        to = player.lifePoint + inputPoint
      }
      // ライフを2分の1にする
      else if (operator == '/') {
        // 小数点以下を切り捨て
        to = Math.floor(player.lifePoint / 2)
      }
      else {
        return
      }

      // ローカルストレージに記録
      const storageData = JSON.stringify({
        id: player.id,
        name: player.name,
        lifePoint: 7800,
      })
      if (localStorage.players) {
        const players = JSON.parse(localStorage.players)
        const index = players.findIndex((player) => {
          player.id === storageData.id
        })
        localStorage.players.splice(index, 1, storageData)
      } else {
        let storageArray = []
        storageArray.push(storageData)
        localStorage.setItem('players', JSON.stringify(storageArray))
      }

      // 結果表示までの時間（ミリ秒）
      const duration = 600

      // 終了値までカウンターを増減させる
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

      // 入力値をクリアする
      if (operator === '+' || operator === '-') {
        this.inputPoint = 0
      }
    },



    // 1つ戻す
    undoLogs () {
      if (this.logs.length) {
        let targetLog = {}
        targetLog = this.logs[this.logs.length - 1]

        const player = this.getPlayer(targetLog.playerId)

        // ライフポイントを１つ前の状態に戻す
        player.lifePoint = targetLog.previousLifePoint

        // if (targetLog.operator === '+') {
        //   player.lifePoint = player.lifePoint - targetLog.changeLifePoint
        // } else if (targetLog.operator === '-') {
        //   player.lifePoint = player.lifePoint + targetLog.changeLifePoint
        // } else if (targetLog.operator === '/') {
        //   player.lifePoint = targetLog.previousLifePoint
        // }

        this.logs.pop()
        // this.$store.commit('removeLog')
      }
    },

    // 別ウィンドウを開く
    openWindow (name) {
      const resolveRoute = this.$router.resolve({
        name: name
      })
      window.open(resolveRoute.href, '_blank')
    }
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

    .inputPointArea {
      $padding: 0.8rem;
      background-color: #000;
      color: #fff;
      width: 50%;

      display: flex;
      flex-direction: column;

      .inputPointArea-head {
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
        .memoryPoint {
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
      .inputPointArea-body {
        display: flex;
        align-items: center;
        margin-top: auto;
        margin-bottom: auto;

        .clearInputPoint {
          border-radius: 5%;
          width: 1.5em;
          height: 1.5em;
          // line-height: 20px;
          // font-size: 1rem;
          margin-left: $padding;
          border: 0px solid #000;
        }
        .inputPoint {
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

