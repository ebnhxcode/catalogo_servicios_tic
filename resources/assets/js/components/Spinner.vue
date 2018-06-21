<template>
    <div class="loader text-center">Cargando tabla, espere por favor...</div>
</template>

<script>
   export default {
      'spinner': {
         props: [''],
         'name': 'spinner',
         'template': ``,
         data () {
            return {
               visible: false,
            }
         },
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
   }
</script>

<style scoped>

</style>