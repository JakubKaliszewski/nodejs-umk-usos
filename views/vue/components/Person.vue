<template>
    <div class="person">
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <div>
                            <strong>{{person.name}}</strong> <small>@{{person.id}}</small>
                            <br>
                            <p v-if="person.about !== null">
                                {{person.about}}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    import PersonDetails from "./PersonDetails.vue";

    export default {
        props: {
            person: {
                type: Object,
                required: true
            }
        },
        name: "Person",
        components: {PersonDetails},
        methods: {}
    }
</script>

<style scoped>

</style>
