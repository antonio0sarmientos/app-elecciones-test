<template>
  <v-row id="registro-votos-component" class="d-flex justify-center">
    <v-col cols="9">
      <v-card class="rounded-xl">
        <v-card-title>
          Registro de votos
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" @submit.prevent>
            <v-row class="pa-4 d-flex align-center justify-start">
              <v-col cols="12" md="6">
                <v-select v-model="departamento" :items="listadoDepartamentos" item-title="nombre" item-value="_id"
                  :rules="[itemRequired]" label="Departamento" required></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="municipio" :items="listadoMunicipios" item-title="nombre" item-value="_id"
                  :rules="[itemRequired]" label="Municipio" required :disabled="!departamento"></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select v-model="partido" :items="listadoPartidos" item-title="nombre" item-value="value"
                  :rules="[itemRequired]" label="Partido" required></v-select>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field v-if="!partido" v-model="candidatos.text" variant="outlined" label="Binomio"
                  disabled></v-text-field>
                <v-text-field v-else-if="partido && candidatos.value" v-model="candidatos.text" variant="outlined"
                  label="Binomio" readonly></v-text-field>
                <v-text-field v-else v-model="candidatos.text" variant="outlined" label="Binomio" bg-color="error"
                  disabled></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="mesa" :rules="[itemRequired, onlyNumbers]" label="No. Mesa" type="number"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="votos" :rules="[itemRequired]" label="No. Votos" type="number"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row class="pa-4 d-flex flex-wrap align-center justify-center">
              <v-col cols="12" md="3">
                <v-btn v-if="formIsValid" prepend-icon="mdi-send-check" color="success" rounded="lg" class="mt-4" block
                  @click="submit">
                  Enviar Formulario
                </v-btn>
                <v-btn v-else prepend-icon="mdi-auto-fix" color="warning" variant="tonal" rounded="lg" class="mt-4" block
                  @click="validate">
                  Validar Formulario
                </v-btn>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn prepend-icon="mdi-delete-empty" color="info" rounded="lg" class="mt-4" block @click="reset">
                  Limpiar Formulario
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" width="auto" min-height="450" transition="dialog-top-transition">
    <v-card append-icon="$close" max-width="500" title="Formulario enviado">
      <template v-slot:append>
        <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="mx-4 py-12 text-center">
        <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>

        <div class="text-h4 font-weight-bold">Los votos han sido registrados!</div>
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-end">
        <v-btn class="text-none" color="medium-emphasis" min-width="92" rounded variant="outlined"
          @click="dialog = false">
          Close
        </v-btn>
      </div>
    </v-card>

  </v-dialog>

  <v-dialog v-model="stopped" width="auto" min-height="450" transition="dialog-top-transition">
    <v-card append-icon="$close" max-width="500" title="Error al enviar el formulario">
      <template v-slot:append>
        <v-btn icon="$close" variant="text" @click="stopped = false"></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="mx-4 py-12 text-center">
        <v-icon class="mb-6" color="error" icon="mdi-alert-circle-outline" size="128"></v-icon>

        <div class="text-h4 font-weight-bold">Los votos no fueron registrados</div>
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-end">
        <v-btn class="text-none" color="red-accent-2" min-width="92" rounded variant="outlined" @click="stopped = false">
          Close
        </v-btn>
      </div>
    </v-card>

  </v-dialog>
</template>

<script>
import api from '../helpers/index'

import { mapStores } from 'pinia'
import { useLoadingStore } from '../store/Loading';

export default {
  name: 'RegistroVotosForm',
  data() {
    return {
      departamento: '',
      municipio: '',
      partido: '',
      candidatos: {
        text: 'Seleccione un partido...',
        value: null
      },
      mesa: '',
      votos: '',
      dialog: false,
      stopped: false,
      itemRequired: v => !!v || 'Este campo es obligatorio.',
      onlyNumbers: v => isNaN(parseInt(v)) || v <= 0 ? 'Este campo debe ser un número mayor a 0.' : true,
      municipios_x_departamento: {},
      candidatos_x_partido: {},
      listadoDepartamentos: [],
      listadoMunicipios: [],
      listadoPartidos: [],
    }
  },
  computed: {
    ...mapStores(useLoadingStore),
    formIsValid() {
      return (
        this.departamento,
        this.municipio,
        this.partido,
        this.candidatos.value,
        this.mesa,
        this.votos
      )
    },
  },
  watch: {
    departamento(to, from) {
      if (to !== from && to !== null) {
        this.listadoMunicipios = this.municipios_x_departamento.filter(({ departamento }) => departamento === to)
      }
    },
    partido(to, from) {
      if (to !== from && to !== null) {

        const [partido_nombre, partido_id] = to.split("-")

        const listado_candidatos = this.candidatos_x_partido
          .filter(({ partido }) => partido === partido_id)
          .map(({ nombres, apellidos, _id }) => {
            return { nombre_completo: `${nombres} ${apellidos}`, id: _id }
          })

        if (listado_candidatos.length > 0) {
          this.candidatos.text = `${partido_nombre} - ${listado_candidatos[0].nombre_completo} y ${listado_candidatos[1].nombre_completo}`
          this.candidatos.value = [listado_candidatos[0].id, listado_candidatos[1].id]
        } else {
          this.candidatos.text = `${partido_nombre} - No cuenta con candidatos registrados`
          this.candidatos.value = null
        }

      }
    }
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (!valid || !this.candidatos.value) alert('Por favor, corrija los errores resaltados para continuar.')
    },
    reset() {
      this.$refs.form.reset()
      this.candidatos = {
        text: 'Seleccione un partido...',
        value: null
      }
      this.checkbox = false
      this.$refs.form.resetValidation()
    },
    async submit() {
      this.loadingStore.toggleLoading();

      const data = {
        municipio: this.municipio,
        candidatos: this.candidatos.value,
        no_mesa: this.mesa,
        cant_votos: this.votos
      };

      const response = await api.sendBinomeVotes(data)

      if (response !== null && response?.message === 'Vote Added') {
        this.loadingStore.toggleLoading()
        this.dialog = true
        this.reset()
      } else {
        this.loadingStore.toggleLoading()
        this.stopped = true
        this.reset()
      }
    },
    async getDataFromApi() {
      try {
        const listado_departamentos = await api.getDepartments()

        this.listadoDepartamentos = listado_departamentos.map(({ _id, nombre }) => { return { _id, nombre } })

        this.municipios_x_departamento = await api.getMunicipalities()

        const partidosDesordenados = await api.getAssociations()

        this.listadoPartidos = partidosDesordenados.map(partido => {
          return {
            id: partido._id,
            value: `${partido.nombre}-${partido._id}`,
            nombre: partido.nombre
          }
        })

        this.candidatos_x_partido = await api.getCandidates()
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  async created() {

    await this.getDataFromApi()

    setTimeout(() => {
      this.loadingStore.toggleLoading()
    }, 1500);
  }
}
</script>
