Vue.component('errors', {
    data(){
        return {
            errorText: '',
            errorUrl: '',
            showError: false,
        }
    },
    methods: {
        setError(error) {
            this.errorText = error.statusText;
            this.errorUrl  = error.url;
            this.showError = true;
        }
    },
    template: `<div class="errorMsg" :class="{'hidden': !showError}">
                    <p>Ошибка: {{errorText}} </p>
                    <p>Запрос: {{errorUrl}}</p>
                </div>`
});