<template>
    <div class="model" ref="model"></div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component<Model>({
})
export default class Model extends Vue {
    mounted(){
        console.log("coucou"); 
    }
}
  
</script>
<style scoped lang="scss">
    
</style>