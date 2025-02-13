<template lang="pug">
div
  router-view(v-if="isIndex")
  root-frame.root(v-else :lang.sync="lang")
    navigator(:lang="lang", slot="side-nav")
    router-view(slot="page-content").doc.markdown-body
</template>

<script>
import RootFrame from './RootFrame.vue'
import Navigator from './Navigator.vue'

export default {
  components: {
    Navigator,
    RootFrame
  },
  data () {
    return {
      lang: 'zh'
    }
  },
  mounted () {
    document.addEventListener('click', event => {
      if (event.target.id === 'toZh') {
        this.lang = 'zh'
      } else if (event.target.id === 'toEn') {
        this.lang = 'en'
      }
    })
    this.$router.afterEach((route) => {
      this.$nextTick(() => {
        const $table = [].filter.call(
          this.$el.getElementsByTagName('table'),
          ($t) => !~$t.parentNode.classList.value.indexOf('md-table')
        )
        $table.forEach(($t) => {
          $t.outerHTML = `<div class="doc-table md-table md-theme-default md-whiteframe md-whiteframe-1dp">${$t.outerHTML}</div>`
        })
      })
      const meta = this.$route.meta || {}
      this.lang = meta.lang
    })
  },
  computed: {
    isIndex () {
      return this.$route.fullPath === '/'
    }
  }
}
</script>

<style lang="stylus">
h1.title {
  .logo {
    width: 2.5rem;
    height: 2.5rem;
    vertical-align: middle;
    margin-right: 1rem;
  }

  .logo, span, a {
    vertical-align: middle;
  }
}

.is-fixed-top {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
}

h2 {
  transition: all 1s;

  &.active {
    color: #0075c7;
    text-shadow: 0 0 10px silver;
    transform: translateX(1rem);
  }
}

.doc {
  padding: 0 2rem 2rem;

  blockquote {
    &::before {
      content: none;
    }

    &::after {
      content: none;
    }
  }
}

.viewer {
  width: 100%;
  height: 550px;

  img {
    max-width: none !important;
    background: none !important;
  }

  svg {
    max-width: initial;
  }

  canvas {
    max-width: initial;
  }
}

@media (min-width: 1281px) {
  .md-sidenav-backdrop {
    display: none;
  }

  .root {
    padding-left: 304px;
  }

  .main-nav {
    .md-sidenav-content {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
      pointer-events: auto !important;
      transform: translate3D(0, 0, 0) !important;
    }
  }

  .menu-button {
    display: none !important;
  }
}

.md-select {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.demo-tool {
  position: absolute;
  left: 1%;
  top: 1%;
  min-width: 185px;
  z-index: 100;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
}

.cesium-svgPath-svg {
  height: 100% !important;
}
</style>
