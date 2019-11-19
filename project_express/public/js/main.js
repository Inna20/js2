// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API = 'http://localhost:3000/api/';

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, body){

            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },

        putJson(url) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        }
    },
    mounted() {
        console.log(this);
    }
});

