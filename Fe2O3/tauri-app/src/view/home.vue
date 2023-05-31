<script setup>
import { invoke } from '@tauri-apps/api/tauri'
import { ref, onMounted } from 'vue'
import { authStore } from '@/stores/auth'

const auth = authStore()
const greetMsg = ref('')
const name = ref('sir')

async function greet () {
  greetMsg.value = await invoke('greet', { name: name.value })
  const authCodes = await invoke('auth_check', { name: name.value })

  if (authCodes?.length) {
    auth.authCodes = authCodes
    auth.updateMenus()
  } else {
    auth.clearMenus()
  }
}

onMounted(() => {
  greet()
})

</script>
<template>
  <div class="container">
    <h1>Welcome to Tauri!</h1>
    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <p>
      Click on the Tauri, Vite, and Vue logos to learn more about each
      framework.
    </p>
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      +
      <a href="https://github.com/tauri-apps/tauri-vscode" target="_blank">Tauri</a>
      +
      <a href="https://github.com/rust-lang/rust-analyzer" target="_blank">rust-analyzer</a>
    </p>

    <div class="card">
      <input id="greet-input" v-model="name" placeholder="Enter a name...">
      <button type="button" @click="greet">Greet</button>
    </div>
    <p @click="reset">{{ greetMsg }}</p>
  </div>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
