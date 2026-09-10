# Swoon Properties — Website

A free, self-hosted website for your buyer's agent business. No page builder, no monthly fee — just files you fully own.

## What's inside

```
index.html                 Home page
about.html                 About Me
services.html              Services + interactive loan calculator
listings-project.html      New project listings (filterable)
contact.html                Contact form + direct contact info
css/styles.css             All styling (colors, fonts, layout)
js/main.js                 Nav menu, loan calculator, filters, form handling
```

Everything is placeholder content — sample prices, sample copy, gray photo boxes. Nothing here needs to break if you edit it: it's plain HTML, so any text between tags is safe to change.

## 1. Publish it for free with GitHub Pages

1. Create a free GitHub account at github.com if you don't have one (use swoonproperty@gmail.com).
2. Create a new repository named exactly `swoonproperties` (or anything you like — the name becomes part of your URL if it's not `<username>.github.io`).
   - **Tip:** if you name the repo `<your-username>.github.io`, your site will live at `https://<your-username>.github.io` with no extra folder in the URL.
3. Upload all the files in this folder (keep the `css/` and `js/` folders intact) — either by dragging them into the GitHub web interface ("Add file" → "Upload files") or via `git push` if you're comfortable with Git.
4. In the repository, go to **Settings → Pages**, set the source branch to `main` and folder to `/ (root)`, then save.
5. Wait 1–2 minutes — GitHub will give you a live URL like `https://yourusername.github.io/swoonproperties/`.

That's it — free hosting, no ads, HTTPS included.

### Custom domain (optional, paid)
If you later want `swoonproperties.com` instead of the github.io address, buy the domain (~USD 10–15/year from Namecheap, GoDaddy, etc.) and point it at GitHub Pages — GitHub's docs walk through the DNS steps under Settings → Pages → Custom domain.

## 2. Add your real photos and videos

Every gray box with dashed-looking text (e.g. "Replace with your business photo") is a placeholder `<div class="photo-placeholder">`. To swap in a real image:

```html
<!-- Replace this: -->
<div class="photo-placeholder">Replace with your business photo</div>

<!-- With this: -->
<img src="assets/your-photo.jpg" alt="Your name, buyer's agent">
```

Put your image files in the `assets/` folder, then reference them as `assets/filename.jpg`.

For listing photos, replace the `<div class="listing-photo">...</div>` blocks the same way — an `<img>` tag inside instead of an empty div. For video, you can embed a YouTube/Vimeo link (upload the video there for free, unlisted if you like) using an `<iframe>`, which is far lighter than hosting video files yourself.

## 3. Make the contact form actually send you messages

Right now the form shows a message but doesn't email you — plain HTML/CSS/JS can't send emails on its own. Easiest free fix:

1. Sign up free at **formspree.io** (50 free submissions/month).
2. Create a form, get your form endpoint URL (looks like `https://formspree.io/f/xxxxxxx`).
3. In `contact.html`, change:
   ```html
   <form class="contact-form">
   ```
   to:
   ```html
   <form class="contact-form" action="https://formspree.io/f/xxxxxxx" method="POST">
   ```
4. Remove the `e.preventDefault()` line in `js/main.js` inside `initContactForm()` (or just delete that whole function) so the form submits normally to Formspree.

Alternative: if you host on Netlify instead of GitHub Pages, Netlify Forms works with zero setup — just add `data-netlify="true"` to the `<form>` tag.

## 4. Editing content

Everything is plain text inside HTML tags — open any `.html` file in a text editor (even Notepad works, but VS Code is nicer and free) and edit between the tags. A few places worth updating first:

- `about.html` — the two `[Edit this: ...]` paragraphs with your real story
- Phone number — currently `+60 00-000 0000` in the footer and contact page, search-and-replace across all files
- New Project listings — edit the `PROJECT_LISTINGS` array in `js/projects-data.js` to add, remove, or update a project. Both the homepage preview and the New Project listings page render from this one file automatically, so you never need to edit them separately. Set `featured: true` on a listing to have it also show in the homepage preview (max 3).

## 5. Colors & fonts

All design tokens live at the top of `css/styles.css` under `:root`. Change `--brass`, `--forest`, etc. to adjust the palette globally without touching any HTML.

---

Questions or want me to add anything (e.g. a blog, testimonials section, WhatsApp click-to-chat button, more listings)? Just ask.
