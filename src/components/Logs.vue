<template>
  <div>
    Logs
    <p>{{ logs }}</p>
    <ul class="list-group">
      <li class="list-group-item" v-for="log in logs" :key="log.id">
        <template v-if="log.playerId == 1">
          {{ log.previousLifePoints }}
          {{ log.operator }}{{ log.changeLifePoints }}
          ={{ log.currentLifePoints }}
        </template>
      </li>
    </ul>

    <ul>
      <li v-for="log in logs" :key="log.id">
        <template v-if="log.playerId == 2">
          {{ log.previousLifePoints }}
          {{ log.operator }}{{ log.changeLifePoints }}
          ={{ log.currentLifePoints }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import Mixin from '@/mixins/mixin'

import {
  // mapGetters,
} from 'vuex'

export default {
  name: 'Logs',

  mixins: [Mixin],

  props: {
    // logs: {
    //   type: Array,
    //   require: true,
    // }
  }, /* props */

  data () {
    return {
      // logs: this.$route.params.logs
    }
  }, /* data */

  computed: {
    // ...mapGetters({
    //   logs: 'getLogs'
    // })
  }, /* computed */

  mounted () {

  }, /* mounted */

  methods: {

  } /* methods */

}
</script>

<style>

</style>
