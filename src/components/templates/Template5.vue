<script setup lang="ts">
import * as Addons from './components/addons'
import * as Base from './components/base'
import * as Main from './components/main'

const {
  fontAccent,
  fontBase,
  imageField,
  isAddonTool,
  isOnlyAddon,
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
      <td
        colspan="5"
        style="border-bottom: 1px solid #ddd; padding: 0px !important"
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
                td-style="padding: 0 10px 5px 0 !important;"
              />
            </td>
          </tr>
          <tr v-if="isAddonTool('logo')">
            <td style="padding: 0px !important">
              <Addons.Logo td-style="padding: 5px 10px 10px 0 !important;" />
            </td>
          </tr>
        </Base.Table>
      </td>
    </tr>
    <tr>
      <td
        :width="options && options.column1Width ? `${options.column1Width}%` : 'auto'"
        style="padding: 0px !important"
      >
        <Base.Table width="auto">
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
            :font="fontBase"
          />
        </Base.Table>
      </td>
      <td style="padding: 0px !important">
&nbsp;&nbsp;
      </td>
      <td style="border-left: 1px solid #ddd; padding: 0px !important" />
      <td style="padding: 0px !important">
&nbsp;&nbsp;
      </td>
      <td
        width="80%"
        style="padding: 0px !important"
      >
        <Base.Table width="auto">
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
    <tr>
      <td
        colspan="5"
        style="border-top: 1px solid #ddd; padding: 5px 0 0 0 !important"
      >
        <Base.Table width="100%">
          <tr>
            <td
              v-if="isAddonTool('banner') || isAddonTool('videoConference') || isAddonTool('cta')"
              align="left"
              style="padding: 5px 0 0 0 !important"
              width="50%"
            >
              <Base.Table width="auto">
                <tr v-if="isAddonTool('videoConference')">
                  <td style="padding: 0px !important">
                    <Addons.VideoConference />
                  </td>
                </tr>
                <tr v-if="isAddonTool('banner')">
                  <td style="padding: 0px !important">
                    <Addons.Banner
                      :td-style="
                        isAddonTool('videoConference')
                          ? 'padding: 10px 0 0 0 !important;'
                          : 'padding: 0 !important'
                      "
                    />
                  </td>
                </tr>
                <tr v-if="isAddonTool('cta')">
                  <td style="padding: 0px !important">
                    <Addons.Cta
                      :td-style="{
                        padding: isAddonTool('banner')
                          ? '7px 0 0 0 !important'
                          : isOnlyAddon('cta')
                            ? '0 !important'
                            : '10px 0 0 0 !important',
                      }"
                    />
                  </td>
                </tr>
              </Base.Table>
            </td>
            <td
              v-if="socials && socials.length"
              align="right"
              style="padding: 5px 0 0 0 !important; vertical-align: top"
            >
              <Main.Social style="margin-top: -2px" />
            </td>
          </tr>
        </Base.Table>
      </td>
    </tr>
    <tr>
      <td colspan="5">
        <Base.Table width="auto">
          <tr v-if="isAddonTool('mobileApp')">
            <td style="padding: 0px !important">
              <Addons.MobileApp td-style="padding: 10px 0 0 0 !important;" />
            </td>
          </tr>
          <tr v-if="isAddonTool('disclaimer')">
            <td style="padding: 0px !important">
              <Addons.Disclaimer td-style="padding: 5px 0 0 !important;" />
            </td>
          </tr>
        </Base.Table>
      </td>
    </tr>
  </Base.Table>
</template>
