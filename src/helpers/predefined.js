import api from './index'

export default {
  apiIsReady,
  getDepartments,
  getMunicipalities,
  getAssociations,
  getCandidates,
  sendBinomeVotes,
  sendVotes,
  getOrderedVotes
}

async function apiIsReady() {
  const { data } = await api.from('/').get();

  return data || null;
}

async function getDepartments() {
  const { data } = await api.from('/departments/list').get()

  return data?.departamento || null
}

async function getMunicipalities() {
  const { data } = await api.from('/municipalities/list').get()

  return data?.municipalities || null
}

async function getAssociations() {
  const { data } = await api.from('/associations/list').get()

  return data?.partidos || null
}

async function getCandidates() {
  const { data } = await api.from('/candidates/list').get()

  return data?.candidatos || null
}

async function sendBinomeVotes(votes) {
  const { data } = await api.from('/votes/add/binome').post(votes)

  return data || null
}


async function sendVotes(votes) {
  const { data } = await api.from('/votes/add').post(votes)

  return data || null
}

async function getOrderedVotes() {
  const { data } = await api.from('/votes/file').get();

  return data || null;
}
