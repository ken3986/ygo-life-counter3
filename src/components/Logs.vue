<template>
  <div>
    Logs
    <p>{{ logs }}</p>
    <ul class="list-group">
      <li class="list-group-item" v-for="log in logs" :key="log.id">
        {{ log.currentLifePoint }}
        {{ log.operator }}{{ log.changeLifePoint }}
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
