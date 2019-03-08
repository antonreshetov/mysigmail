export default {
  addons: {
    disclaimer:
    'This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.',
    mobileApp: {
      appStore: {
        img: `${process.env.VUE_APP_AWS_S3_URL}/icons/app-store-badge.png`,
        link: 'http://example.com'
      },
      googlePlay: {
        img: `${process.env.VUE_APP_AWS_S3_URL}/icons/google-play-badge.png`,
        link: 'http://example.com'
      }
    }
  }
}
