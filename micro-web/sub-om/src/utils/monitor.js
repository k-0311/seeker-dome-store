(function () {
  //1、监听视窗激活状态
  const vEvent = document.webkitHidden != undefined ? 'webkitvisibilitychange' : 'visibilitychange';
  function visibilityChanged () {
    if (document.hidden || document.webkitHidden) {
      document.title = 'sometime'
      // console.log("Web page is hidden.")
    } else {
      document.title = 'united until death'
      // console.log("Web page is visible.")
    }
  }
  document.addEventListener(vEvent, visibilityChanged, false)

  //2、观察长任务（performance 中Task）
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // console.log(entry)
    }
  })
  observer.observe({ entryTypes: ['longtask'] })

  //3、监听网络变化
  let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  let type = connection.effectiveType;
  function updateConnectionStatus () {
    // console.log("Connection type changed from " + type + " to " + connection.effectiveType);
    type = connection.effectiveType;
  }
  connection.addEventListener('change', updateConnectionStatus);

  //4、计算DOMContentLoaded时间
  window.addEventListener('DOMContentLoaded', function () {
    let timing = performance.getEntriesByType('navigation')[0];
    // console.log(timing.domInteractive);
    // console.log(timing.fetchStart);
    let diff = timing.domInteractive - timing.fetchStart;
    // console.log("TTI: " + diff);
  })
})()