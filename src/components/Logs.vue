<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="log in logs" :key="log.id">
        {{ log.currentLifePoint }}
        {{ log.operator }}{{ log.changeLifePoint }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Logs',

  props: {
    logs: {
      type: Array,
      require: true,
    }
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

</style>
