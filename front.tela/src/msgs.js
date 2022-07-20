import Vue from 'vue';
import Toasted from 'vue-toasted';


Vue.use(Toasted, {
  iconPack: 'mdi',
  theme: 'bubble',
  duration: 3000
});

Vue.toasted.register(
  'defaultSuccess',
  payload => !payload.msg ? 'Tarefa realizada com sucesso!' : payload.msg,
  {type: 'success', icon: 'check'}
);

Vue.toasted.register(
  'defaultError',
  payload => !payload.msg ? 'Erro inesperado, tente novamente!' : payload.msg,
  {type: 'error', icon: 'alert-circle'}
);
