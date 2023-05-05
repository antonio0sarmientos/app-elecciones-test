<template>
  <LoaderComponent />
  <v-app>
    <HeaderComponent />
    <v-main>
      <v-container fluid>
        <RegistroVotosForm />
        <DescargaVotosButton />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import api from './helpers/index';

import HeaderComponent from './components/Header.vue';
import LoaderComponent from './components/Loader.vue';
import DescargaVotosButton from './components/DescargaVotosButton.vue';
import RegistroVotosForm from './components/RegistroVotosForm.vue';

export default {
    name: "ElectionsApp",
    components: {
      HeaderComponent,
      LoaderComponent,
      RegistroVotosForm,
      DescargaVotosButton
    },
    async created() {

      const body = await api.apiIsReady();

      console.log("🚀 ~ file: App.vue:38 ~ created ~ body:", body)
    },
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Mulish", sans-serif !important;
}

#app {
  height: 100vh;
  width: 100vw;
}

.v-main__wrap {
  background-color: #e5e5e5;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #aeb7bd;
  border: 0px none #aeb7bd;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #aeb7bd;
}
::-webkit-scrollbar-thumb:active {
  background: #aeb7bd;
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #ffffff;
}
::-webkit-scrollbar-track:active {
  background: #ffffff;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
