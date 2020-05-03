<template>
    <div id="searchbar">
        <h1 id="title">Wyszukaj użytkowników Usos UMK</h1>
        <div class="field has-addons">
            <div class="control">
                <input class="input" type="text" :value="value" v-on="listeners" placeholder="Szukaj użytkownika...">
            </div>
            <div class="control ">
                <a class="button is-link" @click="$emit('search')">
                    Szukaj<i style="padding-left: 10%" class="fas fa-search"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Searchbar",
        props: {
            value: {
                type: String,
                default: '',
            }
        },
        computed: {
            listeners () {
                return {
                    // Pass all component listeners directly to input
                    ...this.$listeners,
                    // Override input listener to work with v-model
                    input: event => this.$emit('input', event.target.value),
                    search: event => this.$emit('search', event.target.value)
                }
            }
        }
    }
</script>

<style scoped>

</style>
