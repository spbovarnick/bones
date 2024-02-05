<style>
  .imageContainer {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .tableOfContents {
    border: 1px solid gray;
    padding: 0 20px;
    border-radius: 10px;
  }
</style>
<section class="intro">
  <h1>Next/Sanity Project Template</h1>
  <hr></hr>
  <p>This repo is a project template for Next/Sanity projects. The two features that I find myself re-using project-to-project are the tag-based revalidation on the <code>api/revalidate</code> route and the <code>ClientImag.jsx</code>.</p>
  <p>Please plunder this resource (and share any issues). If you've never built a Next/Sanity project, follow the steps to get going.</p>
  <h3>End Result:</h3>
  <div class="imageContainer"> 
    <img src="public/images/result.gif" />
  </div>
  <br/>
</section>
<section class="tableOfContents">
  <h2>Table of Contents</h2>
  <ul>
    <li>
      <Link href="#sanity-setup">Setup</Link>
    </li>
    <ul>
      <li>
        <Link href="#sanity-setup">Setting Up Sanity</Link>
      </li>
      <li>
        <Link href="#localtunnel">Installing localtunnel</Link>
      </li>
      <li>
        <Link href="webhook">Creating the Revalidation Webhook</Link>
      </li>
      <li><Link href="/posts">Taking It For A Spin</Link></li>
    </ul>
    <li>
      <Link href="#explanation">Explanation</Link>
      <ul>
        <li>
          <Link href="#explanation">On-Demand Revalidation</Link>
        </li>
        <li>
          <Link href="#clientImg">ClientImg Component</Link>
        </li>
      </ul>
    </li>
    <li>
      <Link href="#dependencies">Dependencies</Link>
    </li>
  </ul>
</section>

Create a Sanity project at [https://www.sanity.io/](https://www.sanity.io/).
Create a `.env` file and paste in the following:
```
NEXT_PUBLIC_SANITY_PROJECT_ID="<>YOUR_SANITY_PROJECT_ID<>"
NEXT_PUBLIC_SANITY_DATASET="<>YOUR_SANITY_DATASET_TITLE<>"
```

Install [localtunnel](https://github.com/localtunnel/localtunnel#readme). You can install globally or as a local dependency; I recommend globally because you're likely to continue using it!

localtunnel will allow us to use a revalidation webhook that rebuilds our refreshes the site when new content is loaded to the content lake. Having the site hot-reload when content is uploaded speeds up the development process.

Let's start building:

Start your dev server with `npm run dev`. In another terminal at project-level, run `lt -p 3000`. This is going to expose our localhost so that we can test out, and work with, the revalidation hook we're about to create. Copy the url localtunnel spits out.

Back in your Sanity project console, navigate to API
![Sanity console toolbar API tab](/public/images/API_Nav.png "Sanity console toolbar API tab")

Select the appropriate dataset from the dropdown menu (*(all datasets) will also work). Otherwise, match your webhook config to the following:
![Sanity revalidation webhook settings](/public/images/webhook_settings.png "Sanity revalidation webhook settings")

Paste that localtunnel URL into the text field labeld <strong>URL</strong> and make sure to append it with `/api/revalidate`.

We want the hook to trigger on Create, Update and Delete actions. To work, the webhook should also be enabled, so make sure that box is checked. And the HTTP method we'll be using is POST.

Before clicking "Save", create a secret and copy it.

Back in your `.env` file, add the following:
```
SANITY_WEBHOOK_SECRET="<>YOUR_WEBHOOK_SECRET<>"
```