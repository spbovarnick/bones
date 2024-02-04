import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import title_and_id from "/public/images/id_and_title.png";
import ltURL from "/public/images/lt_url.png";
import apiNav from "/public/images/API_Nav.png";
import webhookConfig from "/public/images/webhook_settings.png";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.intro}>
        <h1>Next/Sanity Project Template</h1>
        <hr></hr>
        
        <p>This repo is a project template for Next/Sanity projects. The two features that I find myself re-using project-to-project are the tag-based revalidation on the <code>api/revalidate</code> route and the <code>ClientImag.jsx</code>.</p>

        <p>Please plunder this resource (and share any issues). If you've never built a Next/Sanity project, follow the steps to get going.</p>
      </section>
      
      <section className={styles.tableOfContents}>
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
          </ul>
          <li><a href="#spin">Taking It For A Spin</a></li>
        </ul>
      </section>

      <section id="sanity-setup" className={styles.sanitySetup}>
        <h2>Setting Up Sanity</h2>
        <p>Create a Sanity project at <a href="https://www.sanity.io" target="_blank">https://www.sanity.io</a>. If you haven't made a Sanity account already, do that first. The free tier will work for all this.</p>

        <p>Creat a <code>.env</code> file at the root level of your project. Paste in the following:</p>
        <p className={styles.codeBlock}>
          NEXT_PUBLIC_SANITY_PROJECT_ID="&lt;&gt;YOUR_SANITY_PROJECT_ID&lt;&gt;"<br/>
          NEXT_PUBLIC_SANITY_DATASET="&lt;&gt;YOUR_SANITY_DATASET_TITLE&lt;&gt;"
        </p>
        <p>Make sure to replace <code>YOUR_SANITY_PROJECT</code> and <code>YOUR_SANITY_DATASET_TITLE</code> with those actual values!</p>
        <div className={styles.imageContainer}>
          <Image 
            src={title_and_id}
            sizes="100vw"
            alt="Image of the Sanity console, highlighting the project title and ID."
            style={{width: "60%", height: "auto"}}
          />
        </div>
      </section>

      <section id="localtunnel" className={styles.localtunnel}>
        <h2>Installing localtunnel</h2>
        <p>Install <a href="https://github.com/localtunnel/localtunnel#readme">localtunnel</a>. It can be installed globally or as a local dependency. I recommend globall install, because you're likely to continue using it and there's no need to bloat a project with something only used in development.</p>
        <p>localtunnel will allow us to use a revalidation webhook that rebuilds our refreshes the site when new content is loaded to the content lake. Having the site hot-reload when content is uploaded speeds up the development process.</p>
      </section>

      <section id="#webhook" className={styles.webhook}>
        <h2>Creating the Revalidation Webhook</h2>
        <p>Start your dev server with <code>npm run dev</code>. In another terminal at project-level, run <code>lt -p 3000</code>. This is going to expose our localhost so that we can test out, and work with, the revalidation hook we're about to create. Copy the url localtunnel spits out.</p>
        <div className={styles.imageContainer}>
          <Image 
            src={ltURL}
            sizes="100vw"
            alt="Image of the localtunnel url."
            style={{width: "60%", height: "auto"}}
          />
        </div>
        <p>Back in your Sanity project console, navigate to API</p>
        <div className={styles.imageContainer}>
          <Image 
            src={apiNav}
            sizes="100vw"
            alt="Image of the API navigation in the Sanity console."
            style={{width: "60%", height: "auto"}}
          />
        </div>
        <p>Select the appropriate dataset from the dropdown menu (*(all datasets) will also work). Otherwise, match your webhook config to the following:</p>
        <div className={styles.imageContainer}>
          <Image 
            src={webhookConfig}
            sizes="100vw"
            alt="Image of the webhook settings in the Sanity console."
            style={{width: "60%", height: "auto"}}
          />
        </div>
        <p>Paste that localtunnel URL into the text field labeld <strong>URL</strong> and make sure to append it with <code>/api/revalidate</code>. Now, every time you do a Create, Update, or Delete action in this Sanity dataset, the webhook will ping your application's <code>/api/revalidate</code> route and tell it revalidate the data you've specifid with when calling <code>sanityFetch</code>.</p>
        <p>We want the hook to trigger on Create, Update and Delete actions. To work, the webhook should also be enabled, so make sure that box is checked. And the HTTP method we'll be using is POST.</p>
        <p>Before clicking "Save", create a secret and copy it.</p>
        <p>Back in your <code>.env</code> file, add the following:</p>
        <p className={styles.codeBlock}>
          SANITY_WEBHOOK_SECRET="&lt;&gt;YOUR_WEBHOOK_SECRET&lt;&gt;"
        </p>
      </section>
      <section id="spin">
        <h2>Taking It For A Spin</h2>
      </section>
    </div>
  );
}
