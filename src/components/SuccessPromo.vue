<template>
  <el-dialog
    ref="modal"
    class="success-promo-modal"
    :visible="show"
    @update:visible="$emit('update:show', false)"
  >
    <div class="success-promo">
      <h1>🎉 Hooray 🎉</h1>
      <h2>Your signature successfully created and copied!</h2>
      <br>
      <p>Please tell about us 😇🙏</p>
      <social-sharing
        inline-template
        url="https://mysigmail.com"
        title="Check out simple and robust email signature generator"
        hashtags="email, emailsignature"
        twitter-user="mysigmail"
      >
        <div style="margin: 10px 0;">
          <network network="facebook">
            <div class="social-icon social-icon--fb">
              <svg-icon
                width="20"
                height="20"
                icon="facebook"
              />
            </div>
          </network>
          <network network="vk">
            <div class="social-icon social-icon--vk">
              <svg-icon
                width="20"
                height="20"
                icon="vk"
              />
            </div>
          </network>
          <network network="twitter">
            <div class="social-icon social-icon--tw">
              <svg-icon
                width="20"
                height="20"
                icon="twitter"
              />
            </div>
          </network>
          <network network="reddit">
            <div class="social-icon social-icon--reddit">
              <svg-icon
                width="20"
                height="20"
                icon="reddit"
              />
            </div>
          </network>
          <network network="telegram">
            <div class="social-icon social-icon--telegram">
              <svg-icon
                width="20"
                height="20"
                icon="telegram"
              />
            </div>
          </network>
        </div>
      </social-sharing>
      <p>Your opinion is very important to us.</p>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'SuccessPromo',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  created () {
    this.$root.$on('social_shares_open', (payload) => {
      this.gaEventClick(`social ${payload}`)
    })
  }
}
</script>

<style lang="scss">
.social-icon {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 38px;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
  margin: 0 5px;
  svg {
    transition: all .2s;
  }
  &--fb {
    &:hover {
      svg {
          fill: lighten(#3b5998, 15%);
        }
      }
    svg {
      fill: #3b5998;
    }
  }
  &--vk {
     &:hover {
      svg {
          fill: lighten(#45668e, 15%);
        }
      }
    svg {
      fill: #45668e;
    }
  }
  &--tw {
    &:hover {
      svg {
          fill: darken(#1da1f2, 10%);
        }
      }
    svg {
      fill: #1da1f2;
    }
  }
  &--reddit {
    &:hover {
      svg {
          fill: darken(#ff4500, 10%);
        }
      }
    svg {
      fill: #ff4500;
    }
  }
  &--telegram {
    &:hover {
      svg {
          fill: lighten(#0088cc, 10%);
        }
      }
    svg {
      fill: #0088cc;
    }
  }
}
.success-promo {
  text-align: center;
}
.success-promo-modal {
  .el-dialog {
    &__header {
      padding-bottom: 0;
    }
    h1 {
      margin-top: 0;
    }
  }
}
</style>
