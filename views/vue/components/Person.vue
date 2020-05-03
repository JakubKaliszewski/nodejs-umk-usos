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
                        <p>
                            <strong>{{person.name}} {{person.surname}}</strong> <small>@{{person.role}}</small>
                            <br>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa
                            fringilla egestas. Nullam condimentum luctus turpis.
                        </p>
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
