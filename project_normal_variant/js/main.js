const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => {
                    if (result.status === 200) {
                        return result.json();

                    } else { // вывод ошибки в компоненте errors
                        this.$refs.errors.setError(result);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

