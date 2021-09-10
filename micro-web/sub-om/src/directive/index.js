export default (app, router, store) => {
  app.directive('permission', {
    mounted (el, binding, vnode) {
      const permission = binding.value// 获取权限值
      const pageName = router.currentRoute.value.name// 获取当前路由名称
      const hasPermission = store.state.user.permission[pageName] || '' // 当前用户拥有的权限
      if (!hasPermission.includes(permission)) {
        el.parentElement.removeChild(el);//不拥有该权限移除dom元素
      }
    }
  })
  app.directive('highlight', {
    created (el, binding, vnode, prevVnode) { }, //在元素的 attribute 或事件监听器被应用之前调用
    beforeMount (el, binding, vnode, prevVnode) { //指令绑定到元素后调用。只调用一次。
      el.style.color = binding.value
    },
    mounted (el, binding, vnode) {//元素插入父 DOM 后调用。
      const vm = binding.instance
    },
    beforeUpdate () { }, // 在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
    updated () { },//一旦组件和子级被更新，就会调用这个钩子。
    beforeUnmount () { }, // 与组件的生命周期钩子类似，它将在元素被卸载之前调用。
    unmounted () { }//一旦指令被移除，就会调用这个钩子。也只调用一次。
  })
}