import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import '@/msgs'
import Maska from 'maska';

Vue.config.productionTip = false;


Vue.filter('formatDocument', value => {
  let doc = value
  if(doc.length == 11){
    return doc.slice(0,3) + '.' + doc.slice(3,6) + '.' + doc.slice(6,9) + '-' + doc.slice(9,11)
  } else return doc.slice(0,2) + '.' + doc.slice(2,5) + '.' + doc.slice(5,8) + '/' + doc.slice(8,11) + '-' + doc.slice(11,13)
  
})

Vue.filter('formatTel', value => {
  let doc = value
  if(doc.length == 11){
    return '(' + doc.slice(0,2) + ')' + doc.slice(2,7) + '-' + doc.slice(7,11)
  } else return '(' + doc.slice(0,2) + ')' + doc.slice(2,6) + '-' + doc.slice(6,10)
})

Vue.use(Maska);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
