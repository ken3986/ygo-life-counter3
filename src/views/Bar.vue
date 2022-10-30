<template>
  <div class="page-wrapper">
    <div class="page-body">
      <div class="container">
        <div class="row">
          <!-- 左側プレイヤー -->
          <div class="col-3">
            <!-- プレイヤー名 -->
            <input type="text" class="playerName form-control"
              :value="player(1).name"
              @change="updatePlayer({id:1, key:'name', value:$event.target.value})"
            >
          </div>
          <div class="col-3">
            <!-- ライフポイント -->
            <input type="text"
              :value="player(1).lifePoints"
              class="lifePoints1 tt-digital form-control text-center"
              inputmode="numeric">
          </div>


          <!-- 右側プレイヤー -->
          <div class="col-3">
            <!-- ライフポイント -->
            <input type="text"
            :value="player(2).lifePoints"
            class="lifePoints2 tt-digital form-control text-center"
            inputmode="numeric">
          </div>
          <div class="col-3">
            <!-- プレイヤー名 -->
            <input type="text" class="playerName form-control"
              :value="player(2).name"
              @change="updatePlayer({id:2, key:'name', value:$event.target.value})"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixin from '@/mixins/mixin'

export default {
  name: 'Bar',

  mixins: [Mixin],

  data () {
    return {

    }
  }, /* data */

  computed: {

  }, /* computed */

  mounted () {

  }, /* mounted */

  methods: {

  } /* methods */

}
</script>



<style lang="scss">

</style>
