<template>
  <div>
    <!-- <p>{{ logs }}</p> -->
    <h1>Log</h1>
    <hr>
    <div class="container">
      <div class="row mb-4">
        <div class="col-6">
          {{ player(1).name }}
          <ul class="list-group">
            <li class="list-group-item" v-for="log in logs" :key="log.id">
              <template v-if="log.playerId == 1">
                {{ log.previousLifePoints }}{{ log.operator }}{{ log.changeLifePoints }}
                =
                {{ log.currentLifePoints }}
              </template>
            </li>
          </ul>
        </div>
        <div class="col-6">
          {{ player(2).name }}
          <ul class="list-group">
            <li class="list-group-item" v-for="log in logs" :key="log.id">
              <template v-if="log.playerId == 2">
                {{ log.previousLifePoints }}{{ log.operator }}{{ log.changeLifePoints }}
                =
                {{ log.currentLifePoints }}
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Mixin from '@/mixins/mixin'

import {

} from 'vuex'

export default {
  name: 'Logs',

  mixins: [Mixin],

  props: {

  }, /* props */

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





<style>
h1 {
  text-align: center;
}
.list-group-item {
  height: 3em;
}
</style>
