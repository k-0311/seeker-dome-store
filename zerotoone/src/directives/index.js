import validata from './modules/validata';

const directives = {
  validata
}

export default {
  istall (Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directives(key, directives[key])
    })
  }
}