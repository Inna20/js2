Vue.component('errors', {
    data(){
        return {
            errorText: '',
            errorUrl: '',
        }
    },
    computed: {
        showError(){
            return this.errorText === '' ? false : true;
        }
    },
    methods: {
        setError(error) {
            this.errorText = error.statusText;
            this.errorUrl  = error.url;
        }
    },
    template: `<div class="errorMsg" v-show="showError">
                    <p>Ошибка: {{errorText}} </p>
                    <p>Запрос: {{errorUrl}}</p>
                </div>`
});