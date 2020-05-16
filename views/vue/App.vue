<template>
    <div>
        <Searchbar v-model="query" @keydown.enter="search" @search="search"/>
        <GridLoader id="loader" v-bind:loading="loading" v-bind:color="color"/>
        <div id="persons" v-if="personResults.length">
            <Person
                    v-for="person in personResults"
                    :key="person.id"
                    :person="person"
            />
        </div>
        <p v-else-if="searched === false"/>
        <p v-else id="no-results">
            Nie znaleziono użytkownika pod wyszukiwaną frazą {{lastQuery}}!
        </p>
    </div>
</template>
<script>
    import Searchbar from "./components/Searchbar.vue";
    import Person from "./components/Person.vue";

    export default {
        components: {Searchbar, Person},
        data() {
            return {
                searched: false,
                personResults: [],
                query: '',
                lastQuery: '',
                hostname: window.location.host,
                requestToken: {
                    key: '',
                    secret: ''
                },
                loading: false,
                color: "#3298DC"
            }
        },
        methods: {
            async search() {
                if(this.lastQuery === this.query) return;
                this.lastQuery = this.query;

                let name, surname = null;
                let splitQuery = this.query.split(' ');
                const countOfParams = splitQuery.length;
                if (countOfParams === 1) surname = splitQuery[0];
                if (countOfParams >= 2) {
                    name = splitQuery[0];
                    surname = splitQuery[1]
                }
                const searchParams = countOfParams === 1 ? {'surname': surname} : {'surname': surname, 'name': name};
                const url = new URL('https://' + this.hostname + '/api/usos/user'),
                    params = searchParams
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

                try{
                    this.searched = false;
                    this.personResults = [];
                    this.loading = true;
                    const response = await fetch(url);
                    const result = await response.json();
                    this.loading = false;
                    this.personResults = result;
                }catch (e) {
                    this.loading = false;
                    this.personResults = [];
                }
                this.searched = true;
            }
        }
    }
</script>
