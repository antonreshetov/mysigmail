<template>
  <div>
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5"
      :style="{
        fontSize: options.font.size + 'px',
        fontFamily: options.font.family
      }"
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
              :style="{fontSize: options.font.size + 'px'}"
            >
              <tbody>
                <!-- Name and job fields -->
                <tr>
                  <td>
                    <span
                      style="font-weight: 600"
                      :style="{
                        fontSize: `${options.font.size + 2}px`,
                        color: options.color.mainPreview || options.color.main
                      }"
                    >{{ mainFields[0].value }}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{{ mainFields[1].value }}</span>
                    <span v-if="mainFields[2].value && options.separator !== 'br'">
                      <span>&nbsp;{{ options.separator }}&nbsp;</span>
                      <span>{{ mainFields[2].value }}</span>
                    </span>
                  </td>
                </tr>
                <tr v-if="options.separator === 'br'">
                  <td>
                    <span>{{ mainFields[2].value }}</span>
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
                      style="margin-top: 5px;"
                      :style="{fontSize: options.font.size + 'px'}"
                    >
                      <template v-for="item in otherFields">
                        <tr
                          v-if="item.value"
                          :key="item.name"
                        >
                          <td>
                            <span
                              style="font-weight: 600;"
                              :style="{color: options.color.secondaryPreview || options.color.secondary}"
                            >{{ item.name }}:&nbsp;</span>
                            <a
                              v-if="item.type === 'link'"
                              :href="formatLink(item.value)"
                              style="text-decoration: none; color: inherit;"
                            >{{ item.value }}</a>
                            <a
                              v-if="item.type === 'email'"
                              :href="`mailto:${item.value}`"
                              style="text-decoration: none; color: inherit;"
                            >{{ item.value }}</a>
                            <span v-if="item.type === 'text'">{{ item.value }}</span>
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
                      style=" margin-top: 5px; margin-left: -2px;"
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
      style="margin-top: 10px;"
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
      :style="{
        fontSize: options.font.size + 'px',
        fontFamily: options.font.family,
        color: '#888',
        marginTop: '10px'
      }"
    >
      <tbody>
        <tr>
          <td>
            <span>{{ addons.disclaimer }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <promote-signature />
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
