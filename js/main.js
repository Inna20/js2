const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    productsAll: [], // массив в который мы запоминаем все товары - для фильтрации и вывода если фильтр сброшен
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x50',
    cartUrl: '/getBasket.json',
    cartList: [],
    amount: 0,
    countGoods: 0,
    isVisibleCart: true, // не пустая
    searchLine: '',
    showCart: false,
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      this.getJson(`${API + '/addToBasket.json'}`)
          .then(data => {
            if (data.result === 1) {
              let find = this.cartList.find(item => item.id_product === product.id_product);
              if (find !== undefined) { // Если такой товар уже есть в корзине
                find.quantity++;
              } else {  // Добавляем новый товар
                product.quantity = 1;
                this.cartList.push(product);
              }
            } else {
              alert('error');
            }
          });
    },
    removeProduct(product) {
      this.getJson(`${API + '/deleteFromBasket.json'}`)
          .then(data => {
                if (data.result === 1) {
                  this.cartList.splice(this.cartList.indexOf(product), 1);
                } else {
                  alert('error');
                }
          });
    },
    checkValue($event) { //change event - проверка, что не ввели < 1
      if (+$event.target.value < 1 )
        $event.target.value = 1;
    },
    filterGoods($event) {
      if (this.searchLine.length) { // Если в поле введено слово - фильтруем
          this.products = this.productsAll.filter((item) => {
          let regSearch = new RegExp( `${this.searchLine}`, 'i');
          return regSearch.test(item.product_name);
        })
      } else {
        this.products = [...this.productsAll];
      }
    }
  },

  updated() {
    this.amount = this.cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.countGoods = this.cartList.reduce((sumCount, item) => sumCount + +item.quantity, 0);
    this.isVisibleCart = this.countGoods === 0 ?  false : true;
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
        this.productsAll = [...this.products];
      });

    this.getJson(`${API + this.cartUrl}`)
        .then(data => {
          for(let el of data.contents){
            el.url = 'http://example.com';
            el.totalPrice = el.price;
            this.cartList.push(el);
          }
          this.countGoods = data.countGoods;
          this.amount = data.amount;
        });
  }
});