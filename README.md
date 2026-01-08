<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/logo-white.png">
    <source media="(prefers-color-scheme: light)" srcset=".github/logo-black.png">
    <img src=".github/logo-black.png" width="100" alt="MySigMail Logo" />
  </picture>
</p>

<p align="center">
  <img src=".github/hero.png" width="500" alt="MySigMail - Email Signature Generator" />
</p>

<h1 align="center">MySigMail</h1>
<p align="center">
  <strong>An open-source email signature generator for Gmail, Outlook, Apple Mail, etc.</strong>
  <br>
  Build a sleek, professional-looking signature that enhances your brand.
</p>

<p align="center">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/antonreshetov/mysigmail">
  <img alt="GitHub" src="https://img.shields.io/github/license/antonreshetov/mysigmail">
</p>

<p align="center" >
  <a href="https://www.producthunt.com/posts/mysigmail-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=142330&theme=dark&period=daily" alt="MySigMail - UI email signature generator on GitHub | Product Hunt Embed" style="width: 200px;" /></a>
</p>

## About
Creating an email signature is not a trivial task, especially for non-technical people.
Most existing solutions are either paid or closed-source.

**MySigMail** makes it easy, free, and open-source.
Let’s make creating professional signatures accessible for everyone!

## Features
- **Customization** – fonts, colors, avatar shapes, social icons, custom fields
- **Templates** – ready-to-use layouts for quick start
- **Add-ons** – disclaimer, call-to-action, and more

## Development

### Prerequisites

The project uses Bun for building and running. Please make sure you have [Bun](https://bun.sh/) installed.

### Quick Start

```bash
git clone https://github.com/antonreshetov/mysigmail
cd mysigmail
bun install
bun run dev
```

### Set env variables
If you want to test image upload functionality, you need to set AWS S3 credentials.

Create a `.env` file in the root directory and add the following variables:

```bash
VITE_AWS_S3_URL=
VITE_AWS_S3_BASKET=
VITE_AWS_S3_ID=
VITE_AWS_S3_KEY=
VITE_AWS_S3_REGION=
```

## SaaS Version
Don’t want to deal with setup and running locally?

Use the **[MySigMail](https://mysigmail.com)** – a production-ready version of app, hosted and packed with extra features.

### Key Features
- **Manage multiple signatures** – create, save, and switch between multiple signatures effortlessly, all stored safely on our servers
- **Shared signatures** – share ready-to-use signatures that your teammates can copy and install
- **Analytics** – track clicks and engagement from your email signature
- **Presets library** – professionally designed signature styles you can apply in one click
- **Image hosting** – reliable CDN hosting for logos, banners, and photos

### Tools
Extend your signatures with powerful marketing and branding tools:

- **Sign Off** – create a handwritten signature and add it as a personal sign-off to your email signature
- **URL Builder** – generate UTM-tagged URLs and seamlessly track your campaigns in Google Analytics
- **Banner Maker** *(coming soon)* – design and add eye-catching banners to promote events, offers, or announcements directly in your email signature

Check out **[MySigMail](https://mysigmail.com)** and start creating professional email signatures in seconds.

## Contribution Policy

MySigMail is an open-source project but only accepting contributions for bug fixes. To get started, please read [CONTRIBUTING.md](https://github.com/antonreshetov/mysigmail/blob/master/CONTRIBUTING.md) for more details.

## Follow
 - News and updates on [X](https://x.com/mysigmail).
 - [Discussions](https://github.com/antonreshetov/mysigmail/discussions).

## License

This project is licensed under the [AGPL-3.0](https://github.com/antonreshetov/mysigmail/blob/master/LICENSE).

## Commercial Use

For commercial use, please contact me for a commercial license at reshetov.art@gmail.com.

By using this software, you agree to the terms of the license.

Copyright (c) 2019-present, [Anton Reshetov](https://github.com/antonreshetov).
