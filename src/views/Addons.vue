<template>
  <div class="addons">
    <h3>Installed</h3>
    <div
      v-if="isEmpty"
      class="desc"
    >Addons is not installed</div>
    <addon-group>
      <addon-item
        v-for="item in addons.installed"
        :key="item.name"
        :name="item.name"
        :title="item.label"
      >
        <disclaimer v-if="item.name ==='disclaimer'" />
        <mobile-app v-if="item.name === 'mobileApp'" />
        <banner v-if="item.name === 'banner'" />
      </addon-item>
    </addon-group>
    <h3>Addons</h3>
    <el-table
      :data="addonsList"
      size="small"
    >
      <el-table-column
        label="Name"
        prop="label"
      />
      <el-table-column width="100px">
        <template slot-scope="scope">
          <div style="text-align: right;">
            <el-button
              size="mini"
              type="text"
              @click="onAdd(scope.row)"
            >
              Add
              <i class="el-icon-circle-plus-outline" />
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div class="desc">More features are planned to be added soon</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddonItem from '../components/addons/AddonItem'
import AddonGroup from '../components/addons/AddonGroup'
import MobileApp from '../components/addons/types/MobileApp'
import Disclaimer from '../components/addons/types/Disclaimer'
import Banner from '../components/addons/types/Banner'

export default {
  name: '',

  components: {
    AddonItem,
    AddonGroup,
    MobileApp,
    Disclaimer,
    Banner
  },

  data () {
    return {
      addonsList: [
        { label: 'Disclaimer', name: 'disclaimer' },
        { label: 'Mobile app ', name: 'mobileApp' },
        { label: 'Banner ', name: 'banner' }
      ]
    }
  },

  computed: {
    ...mapState(['addons', 'attributes']),
    isEmpty () {
      return this.addons.installed.length === 0
    }
  },

  created () {
    this.$ga.page(this.$router)
  },

  methods: {
    onAdd (v) {
      this.$store.dispatch('addAddon', v)
    }
  }
}
</script>

<style lang="scss">
</style>
