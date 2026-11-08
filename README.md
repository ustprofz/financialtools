# Financial Tools — GitHub Pages website

A combined educational website by Jiang (Will) Zhang, Assistant Professor of
Finance, Opus College of Business, University of St. Thomas.

## What is included

- **Front page:** links to both tools, short introductions to St. Thomas, Opus,
  the Opus Way of Teaching, and VIBE Lab, plus the faculty creator profile.
- **Financial Calculator:** N / I/Y / PV / PMT / FV, payment frequencies,
  END/BGN timing, NPV, IRR, repeated cash flows, and CSV exports.
- **Portfolio Diversification:** stock/bond returns and volatility, correlation,
  portfolio combinations, minimum variance, optimal risky portfolio, and CAL.
- Shared navigation links back to the front page and between the two tools.

## Publish the combined site on GitHub Pages

1. Unzip `Financial_Tools_GitHub.zip`.
2. Create a new **public** GitHub repository, for example `financial-tools`, and
   select **Add a README file** to create the `main` branch. You can instead use
   the repository where you previously hosted the financial calculator.
3. Select **Add file → Upload files**. Upload the extracted site's contents,
   preserving these folders and files at the top level:

   - `index.html`
   - `assets/`
   - `calculator/`
   - `diversification/`

   Upload the **contents** of the extracted folder, not the ZIP or its enclosing
   folder. Upload all four items: the combined site requires its tool folders and
   shared assets. `README.md`, `check-links.mjs`, and the optional tests may also
   be uploaded; they are not needed to display the site.
4. Commit the upload to `main`, replacing the old root `index.html` if prompted.
   That root HTML is now the front page; the calculator is in `calculator/`.
5. Open **Settings → Pages**. Choose **Deploy from a branch**, branch **main**,
   and folder **/(root)**. Click **Save**. If your existing repository already uses
   these settings, leave them as they are.
6. Wait for the Pages deployment under **Actions** to finish. Open the public
   link in **Settings → Pages**. A new `financial-tools` project normally uses
   `https://YOUR-USERNAME.github.io/financial-tools/`.
7. Test both tool links and their **All financial tools** return links. A private
   window or hard refresh can help if the browser is showing an older version.

There is no build step, server, API key, or installation required for hosting.
The site uses relative links so it works under a GitHub project subpath or a
custom domain. To preview locally, extract the whole download and open the root
`index.html` in your browser.

The homepage and calculator have no external runtime dependencies. The existing
Diversification Dashboard still loads Chart.js and MathJax from jsDelivr, so its
chart and rendered formulas require an internet connection. The UST logo and all
site navigation styles are included in this download.

## File map

| Path | Purpose |
| --- | --- |
| `index.html` | Front page and institutional/VIBE introductions |
| `assets/site.css` | Front-page design and navigation shared by both tools |
| `assets/ust-logo.png` | Original UST logo |
| `calculator/index.html` | Financial calculator and its complete calculation code |
| `diversification/index.html` | Diversification dashboard |
| `calculator/tests.mjs` | Optional numerical calculator checks |
| `check-links.mjs` | Optional local navigation/asset and JavaScript syntax checks |
| `.nojekyll` | Optional static-hosting marker |

## Updating the website

Edit `index.html` for the front-page text and links. Edit `assets/site.css` for
shared styling. Each tool's page contains its own calculation code and interface.
Replace the affected files in GitHub and commit; the configured Pages source will
republish. When changing the site structure, retain the relative link paths.

The original tools' calculation and interaction scripts are preserved. The
integration adds page framing, shared navigation, and a title for diversification.
The calculator still assumes matching payment/compounding frequencies and, for
bond examples, coupon-date settlement. Its NPV/IRR worksheet uses equally spaced
cash flows, not irregular-date XNPV/XIRR.

## Content sources

The public institutional summaries are brief paraphrases of:

- University of St. Thomas:
  https://www.stthomas.edu/about/index.html
- Opus College of Business:
  https://business.stthomas.edu/about/
- The Opus Way of Teaching:
  https://business.stthomas.edu/about/the-opus-way/

The VIBE Lab summary and its full name, **Ventures in Business Engineering**, use
the faculty-provided VIBE Lab Innovation Fellows Proposal. The public description
states the lab's approach and vision; it does not present future proposal
milestones as completed work. The two tools in this version retain Jiang (Will)
Zhang as their creator.

Official Pages configuration help:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Optional validation

If Node.js is available, run:

```bash
node check-links.mjs
node calculator/tests.mjs
```

The calculator's 170 numerical checks are included. Shared links/assets and the
inline JavaScript are checked by `check-links.mjs`. The combined site's
navigation and representative interactions in both tools were checked in a
browser, along with the front-page mobile layout.

These tools are for educational purposes only and do not constitute financial,
investment, or legal advice.
