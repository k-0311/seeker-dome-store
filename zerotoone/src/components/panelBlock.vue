<template>
  <div class="block" :style="{'width' : width + 'px','height': height +'px'}">
    <div class="corner-lt"></div>
    <div class="corner-lb"></div>
    <div class="corner-rt"></div>
    <div class="corner-rb"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      default: '530'
    },
    height: {
      type: [String, Number],
      default: '160'
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  position: relative;
  border: 1px solid #343a63;
  background-color: #0A0F2C;
  border-radius: 4px;
  .corner-lt {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 27px;
    height: 27px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAJ1BMVEUAAAAQWpsUWJgVV5gUV5cUWJcUWJgUWZgTWZsXWJkVaqoUWJgTV5fRG8gMAAAADHRSTlMAgNtT86WaikI3DOayZz2gAAAAWklEQVQ4y2MAAlOVM3DAgAqMziABQSTAwMB+BrdcDUwY00zmM2eOzWLADpjOnG5gwAFszpxgwAViziTglNM5MwGnnM+ZBTjlgM4elRuVI1qOUWBUblRu0MoBADDkVgtnj+uZAAAAAElFTkSuQmCC')
      no-repeat center;
    background-size: 27px 27px;
  }
  .corner-lb {
    content: '';
    position: absolute;
    bottom: -1px;
    left: -1px;
    width: 27px;
    height: 27px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAKlBMVEUAAAAQWpsUWJgeaaUUV5cUWJcUWJgUWZgVV5kWWJcTWZsXWJkUWJgTV5fhtg89AAAADXRSTlMAgNsI86WailVRQjfmIlGmcwAAAFZJREFUOMtjYBRgwAVG5UblBlzu7t1RuVE54uV87xrglNO9uwGnXOzdBJxyvXdv4ZQzuntnAS45zrt3r23GJVl7FxmgyrGjyAkiAaDkJDxyzK0q2M0EAEzkXbSLlP4ZAAAAAElFTkSuQmCC')
      no-repeat center;
    background-size: 27px 27px;
  }
  .corner-rt {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    width: 27px;
    height: 27px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAKlBMVEUAAAAQWpsUWJgUV5cUWJcUWJgUWZgVV5kWWJcTWZsXWJkVaqoUWJgTV5djNXclAAAADXRSTlMAgNvzpZqKVVFCNwzmykqBNgAAAFlJREFUOMtjQAZ34cDIHcQXRAJ3kYAGHrm7CQwoAEXuGgMOsCv27t0GXJKcZ+8qMOACc+9exynHevcKTjmuu5dwynHfvYzMRffQqNyoHPFyjAKjcqNyAy0HAIdpXZ9+3VsPAAAAAElFTkSuQmCC')
      no-repeat center;
    background-size: 27px 27px;
  }
  .corner-rb {
    content: '';
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 27px;
    height: 27px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAKlBMVEUAAAAQWpsUWJgeaaUUV5cUWJcUWJgUWZgVV5kWWJcTWZsXWJkUWJgTV5fhtg89AAAADXRSTlMAgNsI86WailVRQjfmIlGmcwAAAFZJREFUOMtjwAkYBUblRuUGr9zdu6Nyo3JEyzHfvYJTjvvuJZxybHev4pRbe/cGLimus3eVcUhZ5969OwHV2cjgOgODIBJAkSvALaeJHhRw4BRhwMAAADO3XbT8zyy9AAAAAElFTkSuQmCC')
      no-repeat center;
    background-size: 27px 27px;
  }
}
</style>