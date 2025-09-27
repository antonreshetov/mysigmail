> **⚠️ Fork Notice (Read First)**
>
> This repository is a **fork** of the original project (upstream).  
> It includes **additional features** that are **not approved/merged by upstream** but which we believe add real value.  
> To use these enhancements, deploy **this fork**.
>
> - **Upstream repo:** _<add link to original>_
> - **This fork:** REVREBEL/email-signature (active)

---

## 🚀 What’s different in this fork?
Add customizable hyperlink fields and social icons to the signature builder, introduce a new template, and refactor form and component handling for cleaner state management.

### New Features
- **Customizable field text colors**  
  Add a `color` attribute to **BasicTool** and UI controls to pick **default / main / secondary** text colors for form fields.
- **Configurable label separators**  
  Choose a **label separator** in options and apply it across signature templates.
- **Hyperlink field type**  
  New `hyperlink` field supports **title**, **underline**, and **label-based hyperlink display** in signatures.
- **Custom social icons**  
  `SocialLinkInput` lets users select defaults or supply **custom icon URLs**.
- **New template: Template10**  
  Registered and available for preview.

### Enhancements
- Refactor initialization with `watchEffect` to set **default field properties**.
- **Dynamic text color** computed in `Field` and `JobFields` based on selected options.
- `getAnchorAttrs` now accepts `{ color, analytics }` and unifies `href` assignment.
- `FormItem` simplified with a computed item; streamlined Basic Tool updates.
- Replaced `SocialUrlInput` with `SocialLinkInput` in social lists.

### Build / Docs / Chores
- **Docs:** Added `labelSeparator` options to attributes data.
- **Chores:** Expanded `useSignatures` availability to include **SignatureTemplate10**.
- **Build:** Updated `tsconfig.json` (target **ESNext**, module resolution, includes) and added base **tailwind.config.js**.
- **Output:** HTML generator renders both default and custom icons as email-safe `<img>` tags.
- **State:** JSON state loader/downloader + reactive signature store via `useSignatureData`.


---

## 🧭 Using the fork
- Everything from upstream works here.  
- Fork-only features are available **by default** (no special flags).  
- If you have questions or issues, please open them **on this fork**.

---

## 🔄 Keeping up with upstream

### [2025-09-26] Upstream sync: shared signatures + community tooling

**New Features**
- Documented **Shared signatures** as a feature in the README.

**CI**
- Added GitHub Actions to auto-comment on issues labeled `need reproduction`.
- Added a workflow to automatically close **stale** issues.

**Documentation**
- Added **CODE_OF_CONDUCT.md** and **CONTRIBUTING.md**.
- Added **issue templates**, a **pull request template**, and issue configuration to guide contributions and support.


## 📝 Fork-Only Changelog
> Add new entries by duplicating the template below. Keep this section focused on changes **not present** in upstream.

### [Unreleased]
**New**
- (add)

**Enhancements**
- (add)

**Fixes**
- (add)

**Docs**
- (add)

**Chores / Build**
- (add)

---

<details>
<summary>⬇️ Upstream README (unchanged)</summary>

<!-- Leave everything from the original README below this line so readers can see upstream docs unchanged. -->






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

## Follow
 - News and updates on [X](https://x.com/mysigmail).
 - [Discussions](https://github.com/antonreshetov/mysigmail/discussions).

## License

This project is licensed under the [AGPL-3.0](https://github.com/antonreshetov/mysigmail/blob/master/LICENSE) for non-commercial use.

## Commercial Use

For commercial use, please contact me for a commercial license at reshetov.art@gmail.com.

By using this software, you agree to the terms of the license.

Copyright (c) 2019-present, [Anton Reshetov](https://github.com/antonreshetov).
