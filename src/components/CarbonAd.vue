<script>
export default {
  render (h) {
    return h('div', { class: 'carbon' })
  },
  mounted () {
    this.load()
  },
  watch: {
    $route (to, from) {
      if (
        to.path !== from.path &&
        this.$el.querySelector('#carbonads')
      ) {
        this.$el.innerHTML = ''
        this.load()
      }
    }
  },
  methods: {
    load () {
      const s = document.createElement('script')
      s.id = '_carbonads_js'
      s.src = `//cdn.carbonads.com/carbon.js?serve=CK7DEK7I&placement=antonreshetovgithubio`
      this.$el.appendChild(s)
    }
  }
}
</script>

<style lang="scss">
.carbon {
  min-height: 102px;
  max-width: 300px;
  font-size: 0.75rem;
  float: right;
  padding: 0 0 10px 10px;
  a {
    color: #444;
    font-weight: normal;
    display: inline !important;
  }
  .carbon-img {
    float: left;
    margin-right: 1rem;
    border: 1px solid #aaa;
    img {
      display: block;
    }
  }
  .carbon-poweredby {
    color: #999;
    display: block !important;
    margin-top: 0.5em;
  }
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
