<template>
    <div>
        <Searchbar/>
        <div id="persons">
            <Person/>
            <Person/>
            <Person/>
        </div>
    </div>
</template>
<script>
    import Searchbar from "./components/Searchbar.vue";
    import Person from "./components/Person.vue";
    export default {
        components: {Searchbar, Person}
    }
</script>
