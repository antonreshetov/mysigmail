<template>
  <div>
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      style="font-size: 0; line-height: 1.5"
    >
      <tbody>
        <!-- Avatar column -->
        <tr>
          <td style="vertical-align: top;">
            <avatar
              :show-avatar="showAvatar"
              :src="image"
              :size="options.avatar.size"
              :roundness="options.avatar.roundness"
            />
          </td>
          <!-- Info column -->
          <td style="vertical-align: top;">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              role="presentation"
              style="font-size: 0;"
            >
              <tbody>
                <!-- Name and job fields -->
                <tr>
                  <td>
                    <span
                      :style="[fontBase, {
                        fontSize: `${options.font.size + 2}px`,
                        color: options.color.mainPreview || options.color.main,
                        fontWeight: 700
                      }]"
                    >{{ mainFields[0].value }}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span :style="fontBase">{{ mainFields[1].value }}</span>
                    <span v-if="mainFields[2].value && options.separator !== 'br'">
                      <span :style="fontBase">&nbsp;{{ options.separator }}&nbsp;</span>
                      <span :style="fontBase">{{ mainFields[2].value }}</span>
                    </span>
                  </td>
                </tr>
                <tr v-if="options.separator === 'br'">
                  <td>
                    <span :style="fontBase">{{ mainFields[2].value }}</span>
                  </td>
                </tr>
                <!-- Other fields -->
                <tr>
                  <td>
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      role="presentation"
                      style="margin-top: 5px; font-size: 0;"
                    >
                      <template v-for="item in otherFields">
                        <tr
                          v-if="item.value"
                          :key="item.name"
                        >
                          <td>
                            <span
                              :style="[fontBase, {
                                color: options.color.secondaryPreview || options.color.secondary,
                                fontWeight: 600
                              }]"
                            >{{ item.name }}:&nbsp;</span>
                            <a
                              v-if="item.type === 'link'"
                              :href="formatLink(item.value)"
                              style="text-decoration: none; color: inherit;"
                              :style="fontBase"
                            >{{ item.value }}</a>
                            <a
                              v-if="item.type === 'email'"
                              :href="`mailto:${item.value}`"
                              style="text-decoration: none; color: inherit;"
                              :style="fontBase"
                            >{{ item.value }}</a>
                            <span
                              v-if="item.type === 'text'"
                              :style="fontBase"
                            >{{ item.value }}</span>
                          </td>
                        </tr>
                      </template>
                    </table>
                  </td>
                </tr>
                <!-- Social icons -->
                <tr v-if="socials.installed.length">
                  <td>
                    <table
                      cellspacing="2"
                      cellpadding="0"
                      border="0"
                      role="presentation"
                      style="margin-top: 5px; margin-left: -2px; font-size: 0;"
                    >
                      <tbody>
                        <tr>
                          <td
                            v-for="item in socials.installed"
                            :key="item.name"
                            align="center"
                            style="width: 20px; height: 20px; border-radius: 3px;"
                            :style="{
                              backgroundColor: options.color.mainPreview || options.color.main,
                            }"
                          >
                            <a :href="formatLink(item.link)">
                              <img
                                width="12px"
                                :src="`${s3url}/icons/${item.icon}.png`"
                                :alt="`social-icon-${item.icon}`"
                                style="display: table-cell; vertical-align: middle;"
                              >
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Addons -->
    <table
      v-if="isAdded('mobileApp')"
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      style="margin-top: 10px; font-size: 0;"
    >
      <tbody>
        <tr>
          <td v-if="addons.mobileApp.appStore.link">
            <a :href="addons.mobileApp.appStore.link">
              <img
                :src="addons.mobileApp.appStore.img"
                style="height:35px; margin-right: 5px;"
                alt="app store badge"
              >
            </a>
          </td>
          <td v-if="addons.mobileApp.googlePlay.link">
            <a :href="addons.mobileApp.googlePlay.link">
              <img
                :src="addons.mobileApp.googlePlay.img"
                style="height:35px;"
                alt="google play badge"
              >
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="isAdded('disclaimer')"
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      style="font-size: 0; color: #888; margin-top: 10px;"
    >
      <tbody>
        <tr>
          <td>
            <span :style="fontBase">{{ addons.disclaimer }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <promote-signature v-if="template.promoteSignature" />
  </div>
</template>

<script>
import EmailTemplate from './emailTemplate'
import PromoteSignature from './components/PromoteSignature'
import Avatar from './components/Avatar'

export default {
  components: {
    Avatar,
    PromoteSignature
  },
  extends: EmailTemplate
}
</script>
