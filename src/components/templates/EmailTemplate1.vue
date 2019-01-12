<template>
  <div>
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5"
      :style="{
        fontSize: options.font.size + 'px',
        fontFamily: options.font.family
      }"
    >
      <tbody>
        <!-- Avatar column -->
        <tr>
          <td
            v-if="showAvatar"
            style="vertical-align: top;"
          >
            <img
              v-if="image"
              :src="image"
              :style="{
                'width': options.avatar.size + 'px',
                'height': options.avatar.size + 'px',
                'border-radius': options.avatar.roundness + 'px',
                'margin-right': '10px',
              }"
            >
            <div
              v-else
              style="margin-right: 10px; background: #eee;"
              :style="{
                'height': options.avatar.size + 'px',
                'width': options.avatar.size + 'px',
                'border-radius': options.avatar.roundness + 'px'
              }"
            />
          </td>
          <!-- Info column -->
          <td style="vertical-align: top;">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
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
                      &nbsp;{{ options.separator }}&nbsp;
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
                <tr>
                  <td>
                    <table
                      cellspacing="2"
                      cellpadding="0"
                      border="0"
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
                                :src="`https://s3.eu-central-1.amazonaws.com/mysigmail/icons/${item.icon}.png`"
                                alt=""
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
      v-if="isAdded('disclaimer')"
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

export default {
  extends: EmailTemplate
}
</script>
