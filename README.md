> Project is no longer maintained, and may have bugs and security issues. Feel free to fork but no pull request or security alert will be answered

<p align="center">
  <img src="./logo.png" width="130px">
  <img src="./screenshot.png">
</p>
<p align="center">
  Website - <a href="https://mysigmail.com">https://mysigmail.com</a> | Twitter - <a href="https://twitter.com/mysigmail">@mysigmail</a>
</p>

<p align="center" style="padding-top: 15px;">
  <a href="https://www.producthunt.com/posts/mysigmail-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=142330&theme=dark&period=daily" alt="MySigMail - UI email signature generator on GitHub | Product Hunt Embed" style="widht: 250px;" /></a>
</p>


## Purpose

Creating an email signature is not a trivial task, even for people who have knowledge of HTML and CSS. And what about ordinary users.

There are many solutions on the Internet, and most of them are paid. There are free, but all of them are closed source. I wanted to make a free application with a user-friendly interface and open source code.

So let's make creating email signatures easier!

## Features

- Upload image - upload to AWS S3 or set public link
- Custom fields - add unlimited number of custom fields with different types such as: text, link, email
- Social icons - add social media links to your signature
- Options - customize your signature as you like, change color, avatar shape, font and more
- Addons - additional options such as disclaimer, mobile application badges
- Templates - templates for signature (so far, only one template)
- Projects - ability to save, download or import a previously created signature. No need to create an account, everything is already available in the browser
- Signature preview - hot reloading preview

## Roadmap

- Create more templates
- Create more addons

## Development

Set env variables

```bash
VUE_APP_AWS_S3_URL=
VUE_APP_AWS_S3_BASKET=
VUE_APP_AWS_S3_ID=
VUE_APP_AWS_S3_KEY=
VUE_APP_AWS_S3_REGION=
```
Run

```bash
npm i
npm run serve
```

## Support project

If you liked the project, I am very grateful for the help to the project.

- BTC - 1di5dpLQpcryUke4e5eq1NJv4if9faLhJ
- [PayPal](https://www.paypal.me/antonreshetov) 
- [Become a backer on Patreon](https://www.patreon.com/antonreshetov)
- [Become a backer on Open Collective](https://opencollective.com/mysigmail)
- [Become a backer on Ko-fi](https://ko-fi.com/antonreshetov)

## Commercialization
If you would like to commercialize MySigMail, please contact reshetov.art@gmail.com.
