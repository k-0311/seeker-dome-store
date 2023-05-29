<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/blob">Blob</router-link> |
    <router-link to="/gzip">Gzip</router-link> |
    <router-link to="/css">Css</router-link> |
    <router-link to="/labs">Labs</router-link> |
    <router-link to="/online">online</router-link> |
    <router-link to="/dark">dark</router-link> |
    <router-link to="/capsule">capsule</router-link> |
    <router-link to="/model">model</router-link> |
    <router-link to="/keyboard">keyboard</router-link>| 
    <router-link to="/paste?aaa=111&bbb=222">paste</router-link>
  </div>
  <router-view />
  <div class="cookieDiv" v-if="showCookie">
    <div class="cookie-left">
      <p>我们的网站使用cookie来优化用户体验和分析。我们可能会与我们的分析合作伙伴共享您的信息。</p>
      <p>我们的<a href="##">《Cookie政策》</a>提供更多的信息。点击同意，即表示您同意我们根据您的偏好使用cookies。</p>
    </div>
    <div>
      <button @click="closeDiv">同意</button>
      <button @click="showCookie = false">拒绝</button>
    </div>
  </div>
</template>



<script>
export default {
  data () {
    return {
      showCookie: false
    }
  },
  created () {
    this.checkCookie()
  },
  methods: {
    getCookie (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    setCookie (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    clearCookie () {
      this.setCookie("hq_buy_ca", "", -1000);//设置天数
    },
    checkCookie () {
      var user = this.getCookie("hq_buy_ca");
      if (user != "") {
        this.showCookie = false
      } else {
        this.showCookie = false
      }

    },
    closeDiv () {
      this.setCookie('hq_buy_ca', '1', 1000)//设置天数
      this.showCookie = false
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.cookieDiv {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 90px;
  background-color: #e9e9e9;
  z-index: 1000;
  .cookie-left {
    width: 700px;
  }
}
</style>
