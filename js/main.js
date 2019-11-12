const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x50',
    cartUrl: '/getBasket.json',
    cartList: [],
    amount: 0,
    countGoods: 0,
    isVisibleCart: true,
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
      let find = this.cartList.find(item => item.id_product === product.id_product);
      if (find !== undefined) { // Если такой товар уже есть в корзине
        let new_cart = this.cartList.map((item)=> {
          if (item.id_product === product.id_product) {
            item.quantity++;
          }
          return item;
        });
        this.cartList = [...new_cart];
      } else {  // Добавляем новый товар
        product.quantity = 1;
        this.cartList.push(product);
      }
    },
    removeProduct(product) {
      this.cartList.splice(this.cartList.indexOf(product), 1);
    },
    checkValue($event) { //change event - проверка, что не ввели < 1
      if (+$event.target.value < 1 )
        $event.target.value = 1;
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