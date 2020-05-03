<template>
    <div>
        <p>{{greeting}} World!</p>
        <button @click="clicker">Kliknij {{name}} {{counter}} razy!</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                greeting: 'Hello',
                name: 'Kaśka',
                counter: 1
            }
        },
        methods:{
            clicker(){
                this.counter++;
            }
        }

    }
</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
</style>
