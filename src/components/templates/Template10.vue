<script setup lang="ts">
import type { AddonLogo } from '@/composables/signatures/types'

import * as Addons from './components/addons'
import * as Base from './components/base'
import * as Main from './components/main'

const {
  fontAccent,
  fontBase,
  getAddonValue,
  imageField,
  isAddonTool,
  jobFields,
  nameField,
  options,
  otherFields,
  otherFieldsGroup2,
  otherFieldsGroup3,
  socials,
} = useSignatures()
</script>

<template>
  <Base.Table>
    <tr>
      <td
        valign="top"
        style="padding-top: 2px; padding-bottom: 20px"
      >
        <Base.Table width="auto">
          <tr v-if="options && options.avatar">
            <td style="padding-bottom: 10px">
              <Main.Avatar
                :show="options.avatar"
                :src="imageField"
                :shape="options.avatarShape"
                :size="options.avatarSize"
              />
            </td>
          </tr>
          <Main.Field
            v-if="nameField"
            :model="nameField"
            :show-label="false"
            :style="{ fontWeight: 600 }"
            :font="fontAccent"
            :text-color="options && options.mainColor"
            td-style="padding-top: 2px;"
          />
          <Main.JobFields
            v-if="jobFields.length"
            :model="jobFields"
            :show-label="false"
            :separator="options && options.jobSeparator"
            :separator-style="{ color: options && options.mainColor }"
            :font="fontBase"
            :label-color="options && options.mainColor"
            :text-color="options && options.secondaryColor"
            td-style="padding-top: 2px;"
          />
        </Base.Table>
      </td>
    </tr>
    <tr>
      <td
        valign="top"
        style="padding-top: 2px; padding-bottom: 5px"
      >
        <Base.Table width="auto">
          <Main.Field
            v-for="(i, index) in otherFieldsGroup2"
            :key="i.id"
            :model="i"
            :analytic-tag="index === 0 ? 'website' : undefined"
            :font="fontBase"
            :label-color="options && options.mainColor"
            :text-color="options && options.secondaryColor"
            td-style="padding-top: 2px;"
          />
          <Main.Field
            v-for="(i, index) in otherFieldsGroup3"
            :key="i.id"
            :model="i"
            :analytic-tag="index === 0 ? 'website' : undefined"
            :font="fontBase"
            :label-color="options && options.mainColor"
            :text-color="options && options.secondaryColor"
            td-style="padding-top: 2px;"
          />
        </Base.Table>
      </td>
    </tr>
    <tr>
      <td
        valign="top"
        style="padding-top: 2px; padding-bottom: 15px"
      >
        <Base.Table width="auto">
          <Main.Field
            v-for="(i, index) in otherFields"
            :key="i.id"
            :model="i"
            :analytic-tag="index === 0 ? 'website' : undefined"
            :font="fontBase"
            :label-color="options && options.mainColor"
            :text-color="options && options.secondaryColor"
            td-style="padding-top: 2px;"
          />
        </Base.Table>
      </td>
    </tr>
    <tr v-if="socials && socials.length">
      <td
        valign="top"
        style="padding-top: 2px; padding-bottom: 20px"
      >
        <Main.Social :icon-size="30" />
      </td>
    </tr>
    <tr v-if="isAddonTool('logo')">
      <td
        valign="top"
        style="padding-top: 2px; padding-bottom: 10px"
      >
        <Addons.Logo :width="(getAddonValue('logo') as AddonLogo)?.width" />
      </td>
    </tr>
    <tr v-if="isAddonTool('videoConference')">
      <td
        valign="top"
        style="padding-top: 2px"
      >
        <Addons.VideoConference />
      </td>
    </tr>
    <tr v-if="isAddonTool('mobileApp')">
      <td
        valign="top"
        style="padding-top: 2px"
      >
        <Addons.MobileApp />
      </td>
    </tr>
    <tr v-if="isAddonTool('banner')">
      <td
        valign="top"
        style="padding-top: 2px"
      >
        <Addons.Banner />
      </td>
    </tr>
    <tr v-if="isAddonTool('cta')">
      <td valign="top">
        <Addons.Cta
          :td-style="{
            padding: isAddonTool('banner') ? '7px 0 0 0 !important' : '10px 0 0 0 !important',
          }"
        />
      </td>
    </tr>
    <tr v-if="isAddonTool('disclaimer')">
      <td valign="top">
        <Addons.Disclaimer td-style="padding: 5px 0 0 0 !important;" />
      </td>
    </tr>
  </Base.Table>
</template>
