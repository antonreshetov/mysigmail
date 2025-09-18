<script setup lang="ts">
import * as Addons from './components/addons'
import * as Base from './components/base'
import * as Main from './components/main'

const {
  fontAccent,
  fontBase,
  imageField,
  isAddonTool,
  jobFields,
  nameField,
  options,
  otherFields,
  socials,
} = useSignatures()

const width = ref(300)
</script>

<template>
  <Base.Table>
    <tr>
      <td
        valign="top"
        style="padding: 0 0 10px 0 !important"
      >
        <Base.Table width="auto">
          <tr>
            <td style="padding: 0px !important">
              <Main.Avatar
                v-if="options && options.avatar"
                :show="options.avatar"
                :src="imageField"
                :shape="options && options.avatarShape"
                :size="options && options.avatarSize"
              />
            </td>
          </tr>
          <tr v-if="isAddonTool('logo')">
            <td style="padding: 0px !important">
              <Addons.Logo td-style="padding: 10px 10px 0 0 !important;" />
            </td>
          </tr>
        </Base.Table>
      </td>
    </tr>
    <tr>
      <td style="padding: 0px !important">
        <Base.Table width="100%">
          <Main.Field
            :model="nameField"
            :show-label="false"
            :style="{ fontWeight: 600 }"
            :font="fontAccent"
            :text-color="options && options.mainColor"
            td-style="padding: 0px !important;"
          />
          <Main.JobFields
            :model="jobFields"
            td-style="padding: 0 0 5px 0 !important;"
            :show-label="false"
            :separator="options && options.jobSeparator"
            :separator-style="{ color: options && options.mainColor }"
            :font="fontBase"
            :label-color="options && options.mainColor"
          />
        </Base.Table>
      </td>
    </tr>
    <tr>
      <td style="padding: 0px !important">
        <Base.Table
          :width="width"
          :responsive="false"
        >
          <Main.Field
            v-for="(i, index) in otherFields"
            :key="i.id"
            :model="i"
            :analytic-tag="index === 0 ? 'website' : undefined"
            :font="fontBase"
            :label-color="options && options.secondaryColor"
            td-style="padding: 0px !important;"
          />
        </Base.Table>
      </td>
    </tr>
    <tr v-if="socials && socials.length">
      <td style="padding: 2px 0 0 0 !important">
        <Base.Table
          :width="width"
          :responsive="false"
        >
          <tr>
            <td style="padding: 0px !important">
              <Main.Social />
            </td>
          </tr>
        </Base.Table>
      </td>
    </tr>
    <tr v-if="isAddonTool('videoConference')">
      <td style="padding: 0px !important">
        <Addons.VideoConference td-style="padding: 10px 10px 0 0 !important" />
      </td>
    </tr>
    <tr v-if="isAddonTool('mobileApp')">
      <td style="padding: 0px !important">
        <Addons.MobileApp td-style="padding: 10px 0 0 0 !important;" />
      </td>
    </tr>
    <tr v-if="isAddonTool('banner')">
      <td style="padding: 0px !important">
        <Addons.Banner td-style="padding: 10px 0 0 0 !important;" />
      </td>
    </tr>
    <tr v-if="isAddonTool('cta')">
      <td style="padding: 0px !important">
        <Addons.Cta
          :td-style="{
            padding: isAddonTool('banner') ? '7px 0 0 0 !important' : '10px 0 0 0 !important',
          }"
        />
      </td>
    </tr>
    <tr v-if="isAddonTool('disclaimer')">
      <td
        colspan="2"
        style="padding: 0px !important"
      >
        <Addons.Disclaimer td-style="padding: 5px 0 0 0 !important;" />
      </td>
    </tr>
  </Base.Table>
</template>
