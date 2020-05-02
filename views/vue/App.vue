<template>
    <div>
        <Searchbar/>
        <Person/>
    </div>
</template>
<script>
    import Searchbar from "./components/Searchbar.vue";
    import Person from "./components/Hello.vue";
    export default {
        components: {Searchbar, Person}
    }
</script>
