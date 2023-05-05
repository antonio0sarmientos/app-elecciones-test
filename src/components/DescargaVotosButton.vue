<template>
  <v-row id="descarga-botos-component" class="d-flex justify-center">
    <v-col cols="9">
      <v-card class="rounded-xl">
        <v-card-title>
          Descargar votos registrados
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="pa-4 d-flex align-center justify-center">
            <v-col cols="10" md="3">
              <v-btn @click.prevent="downloadVotesCsv" block elevated color="success">
                Descargar (CSV)
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="stopped" width="auto" min-height="450" transition="dialog-top-transition">
    <v-card append-icon="$close" max-width="500" title="Error al enviar el formulario">
      <template v-slot:append>
        <v-btn icon="$close" variant="text" @click="stopped = false"></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="mx-4 py-12 text-center">
        <v-icon class="mb-6" color="error" icon="mdi-alert-circle-outline" size="128"></v-icon>

        <div class="text-h4 font-weight-bold">No se pudo descargar el archivo, intente nuevamente.</div>
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
  name: 'DescargaVotosButton',
  data() {
    return {
      data_votos: [],
      stopped: false,
      filename: 'Votos totales por presidente.csv'
    }
  },
  computed: {
    ...mapStores(useLoadingStore),
  },
  methods: {
    async downloadVotesCsv() {

      this.loadingStore.toggleLoading()

      try {
        const listado_votos = await api.getOrderedVotes()

        if (listado_votos.length > 0) {
          let csvContent = ""

          listado_votos.forEach(voto_row => {

            let row = Object.values(voto_row).join(',')

            csvContent += row + "\r\n"

          });

          const blob = new Blob([csvContent], { type: "data:text/csv;charset=utf-8," });

          if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, this.filename);

          } else {

            const link = document.createElement("a");

            if (link.download !== undefined) { // feature detection

              // Browsers that support HTML5 download attribute
              const url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", this.filename);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        } else {
          console.error("No existen datos para generar el archivo")
          this.stopped = true
        }

        this.loadingStore.toggleLoading()
      } catch (ex) {
        console.error("Ha ocurrido un error al generar el archivo", ex)
        this.stopped = true
        this.loadingStore.toggleLoading()
      }
    }
  }
}
</script>
