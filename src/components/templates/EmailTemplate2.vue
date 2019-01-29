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
        <tr>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            :style="{fontSize: options.font.size + 'px'}"
          >
            <!-- Name field -->
            <tr>
              <td>
                <span
                  :style="{
                    fontSize: `${options.font.size + 2}px`,
                    fontWeight: '600'
                  }"
                >{{ mainFields[0].value }}</span>
              </td>
            </tr>
            <!-- Job & company name fields -->
            <tr>
              <td
                :style="{color: options.color.mainPreview || options.color.main, fontSize: `${options.font.size}px`}"
              >
                <span>{{ mainFields[1].value }}</span>
                <span v-if="mainFields[2].value && options.separator !== 'br'">
                  &nbsp;{{ options.separator }}&nbsp;
                  <span>{{ mainFields[2].value }}</span>
                </span>
              </td>
            </tr>
            <tr v-if="options.separator === 'br'">
              <td>
                <span
                  :style="{color: options.color.mainPreview || options.color.main}"
                >{{ mainFields[2].value }}</span>
              </td>
            </tr>
          </table>
        </tr>
      </tbody>
    </table>
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
        <tr>
          <!-- Avatar field -->
          <td style="padding-top: 8px; vertical-align: top;">
            <avatar
              :show-avatar="showAvatar"
              :src="image"
              :size="options.avatar.size"
              :roundness="options.avatar.roundness"
            />
          </td>
          <td style="padding-top: 8px; vertical-align: top;">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              role="presentation"
              style="margin: 0;"
              :style="{fontSize: `${options.font.size + 1}px`}"
            >
              <tbody>
                <!-- Phone number field -->
                <tr>
                  <td>
                    <span>{{ otherFields[2].value }}</span>
                  </td>
                </tr>
                <!-- Email address & website fields -->
                <tr>
                  <td>
                    <span v-if="(otherFields[1].value || otherFields[0].value)">
                      <a
                        style="text-decoration: none; color: inherit;"
                        :href="`mailto:${otherFields[1].value}`"
                      >{{ otherFields[1].value }}</a> -
                      <a
                        style="text-decoration: none; color: inherit;"
                        :href="`${formatLink(otherFields[0].value
                        )}`"
                      >{{ otherFields[0].value }}</a>
                    </span>
                  </td>
                </tr>
                <!-- Other fields -->
                <template v-for="(item, index) in otherFields">
                  <tr
                    v-if="item.value && index > 2"
                    :key="item.name"
                  >
                    <td>
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
                <!-- Social icons -->
                <tr>
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
                            style="width: 24px; height: 24px; border-radius: 3px;"
                            :style="{
                              backgroundColor: options.color.mainPreview || options.color.main,
                            }"
                          >
                            <a :href="formatLink(item.link)">
                              <img
                                width="12px"
                                :src="`https://s3.eu-central-1.amazonaws.com/mysigmail/icons/${item.icon}.png`"
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
    <table
      v-if="isAdded('disclaimer')"
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
  </div>
</template>

<script>
import EmailTemplate from './emailTemplate'
import Avatar from './components/Avatar'

export default {
  components: { Avatar },
  extends: EmailTemplate
}
</script>
