<template>
    <div class="person">
        <div class="box">
            <article v-if="person.about === false" class="media">
                <div class="media-left">
                    <figure class="image is-50x50">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <div>
                            <strong>{{person.name}}</strong> <small>@nieznana rola</small>
                            <br>
                            <p>
                                Brak szczegółowych informacji.
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            <article v-if="person.about === true" class="media">
                <div class="media-left">
                    <figure class="image is-50x50">
                        <img :src="person.image"alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <div>
                            <div v-if="person.title !== ''">
                                <strong>{{person.title}} {{person.name}}</strong> <small>@{{person.rule}}</small>
                            </div>
                            <div v-else>
                                <strong>{{person.name}}</strong> <small>@{{person.rule}}</small>
                            </div>
                            <br>
                            <p>
                                <strong>Wydział: </strong>{{person.faculty}}<br>
                                <strong>Pozycja: </strong>{{person.position}}<br>
                                <strong>E-mail: </strong>{{person.email}}<br>
                                <strong>Strona www: </strong>{{person.homepage}}<br>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            person: {
                type: Object,
                required: true
            }
        },
        name: "Person",
        components: {},
        methods: {}
    }
</script>

<style scoped>

</style>
<div>

</div>

