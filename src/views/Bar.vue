<template>
  <div>
    {{ lifePoint }}
  </div>
</template>

<script>
export default {
  name: 'Bar',

  data () {
    return {
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
    }
  }, /* data */

  computed: {

  }, /* computed */

  mounted () {
    // ライフポイントを取得
    if (localStorage.lifePoint) {
      this.lifePoint = localStorage.lifePoint
    }

    window.onstorage = (event) => {
      // ライフポイントを同期
      if (event.key == 'lifePoint') {
        this.lifePoint = event.newValue
      }
    }
  }, /* mounted */

  methods: {

  } /* methods */

}
</script>

<style>

</style>
