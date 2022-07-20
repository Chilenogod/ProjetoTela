<template>
  <v-main class="pagina">
    <v-card width="400px" height="500px" class="mx-auto my-10 rounded-xl display: flex">
      <v-img
      height="210"
      src="@/assets/logo2.png"
    ></v-img>
    <v-divider class="mx-4" insert></v-divider>
      <v-card-title class="justify-center">Login</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined v-model="user.login" prepend-inner-icon="mdi-account" label="Usuário"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined type="password" v-model="user.senha" prepend-inner-icon="mdi-lock" label="Senha"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="usuarioLoginVerifica">Entrar</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import axios from 'axios'
import { baseUrl } from '@/global'
export default {
  name: 'ch-login',
  data() {
    return {
      user: {},
      userLog: {}
    }
  },
  methods: {
    usuarioLoginVerifica() {
      if(!this.user.login || !this.user.senha) {return this.$toasted.global.defaultError({msg: 'Informe Usuário e Senha!'})}
      axios.post(`${ baseUrl }/login`, this.user)
      .then(res => {
        console.log(res.data)
        this.userLog = res.data[0]
        if(!this.userLog) {this.$toasted.global.defaultError({msg: res.data.msg}), this.user = {}}
        if(this.user.senha === this.userLog.senha) {
          this.$toasted.global.defaultSuccess({msg: 'Login realizado com sucesso!'})
          this.$router.replace('dashboard')
          this.user = {}
        } else this.$toasted.global.defaultError({msg: 'Usuário/Senha inválidos'})
      })
    }
  }
}
</script>

<style>
.pagina{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  margin: 0;
  background-image: linear-gradient(147.38deg, #000000 0%, #86A8C0 100%);
}
</style>