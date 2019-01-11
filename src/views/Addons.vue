<template>
  <div class="addons">
    <h3>Installed</h3>
    <div class="desc" v-if="isEmpty">No addons installed</div>
    <addon-group>
      <addon-item
        v-for="item in addons.installed"
        :key="item.name"
        :name="item.name"
        :title="item.label"
      >
        <template v-if="item.name ==='disclaimer'">
          <el-input type="textarea" v-model="disclaimer" :rows="6"></el-input>
        </template>
      </addon-item>
    </addon-group>
    <h3>Addons</h3>
    <el-table :data="addonsList" size="small">
      <el-table-column label="Name" prop="label"></el-table-column>
      <el-table-column width="100px">
        <template slot-scope="scope">
          <div style="text-align: right;">
            <el-button size="mini" type="text" @click="onAdd(scope.row)">
              Add
              <i class="el-icon-circle-plus-outline"></i>
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

export default {
  name: '',

  components: {
    AddonItem,
    AddonGroup
  },

  data () {
    return {
      addonsList: [
        { label: 'Disclaimer', name: 'disclaimer' }
      ]
    }
  },

  created () {
    this.$ga.page(this.$router)
  },

  computed: {
    ...mapState(['addons', 'attributes']),
    isEmpty () {
      return this.addons.installed.length === 0
    },
    disclaimer: {
      get () {
        return this.addons.disclaimer
      },
      set (v) {
        this.$store.dispatch('updateDisclaimer', v)
      }
    }
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
