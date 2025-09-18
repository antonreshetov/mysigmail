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
</script>

<template>
  <Base.Table>
    <tr>
      <td>
        <Base.Table width="auto">
          <tr>
            <td
              valign="top"
              style="padding: 0px !important"
            >
              <Base.Table width="auto">
                <tr>
                  <td style="padding: 0px !important">
                    <Main.Avatar
                      v-if="options && options.avatar"
                      :show="options.avatar"
                      :src="imageField"
                      :shape="options.avatarShape"
                      :size="options.avatarSize"
                      td-style="padding: 0px 10px 0px 0 !important;"
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
            <td
              valign="top"
              width="100%"
              style="padding: 0px !important"
            >
              <Base.Table width="auto">
                <Main.Field
                  v-if="nameField"
                  :model="nameField"
                  :show-label="false"
                  :style="{ fontWeight: 600 }"
                  :font="fontAccent"
                  :text-color="options && options.mainColor"
                  td-style="padding: 0px !important;"
                />
                <Main.JobFields
                  v-if="jobFields"
                  :model="jobFields"
                  td-style="padding: 0 0 5px 0 !important;"
                  :show-label="false"
                  :separator="options && options.jobSeparator"
                  :font="fontBase"
                />
                <Main.Field
                  v-for="(i, index) in otherFields"
                  :key="i.id"
                  :model="i"
                  :analytic-tag="index === 0 ? 'website' : undefined"
                  :font="fontBase"
                  :label-color="options && options.secondaryColor"
                  td-style="padding: 0px !important;"
                />
                <tr v-if="socials.length">
                  <td style="padding: 2px 0 0 0 !important">
                    <Main.Social />
                  </td>
                </tr>
              </Base.Table>
            </td>
          </tr>
        </Base.Table>
      </td>
    </tr>
    <tr v-if="isAddonTool('videoConference')">
      <td style="padding: 0px !important">
        <Addons.VideoConference td-style="padding: 10px 0 0 0 !important;" />
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
            padding: `${isAddonTool('banner') ? '7px' : '10px'} 0 0 0 !important`,
          }"
        />
      </td>
    </tr>
    <tr v-if="isAddonTool('disclaimer')">
      <td style="padding: 0px !important">
        <Addons.Disclaimer td-style="padding: 5px 0 0 0 !important;" />
      </td>
    </tr>
  </Base.Table>
</template>
