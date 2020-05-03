<template>
    <div>
        <Searchbar v-model="query" @keydown.enter="search"/>
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
        data(){
            return {
                searched: false,
                personResults: [],
                query: '',
                lastQuery: '',
                hostname: window.location.host
            }
        },
        methods:{
            async search(){
                console.log('szukam ' + this.query);
                this.searched = true;
                this.lastQuery = this.query;

                let name, surname = null;
                let splitQuery = this.query.split(' ');
                const params = splitQuery.length;
                if(params === 1) surname = splitQuery[0];
                if(params === 2){ name = splitQuery[0]; surname = splitQuery[1]}

                const url = this.hostname + '/api/user';
                const searchParams = params === 1 ? new URLSearchParams([['surname', surname]]) : new URLSearchParams([['surname', surname], ['name', name]]);
                const response = (await fetch(url, searchParams)).json();
                this.personResults.push({
                    id: 1,
                    surname: response.body.surname
                })
            }
        }
    }
</script>
