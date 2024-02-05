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
        <p>Let's <Link href="/posts">head over</Link>, make some Posts in our Sanity Studio to see the on-demand revalidation and see it all in action!</p>
      </section>
      <hr/>
      <section id="explanation">
        <h2>On-Demand Revalidation</h2>
        <p>The first thing we did in configuring out Sanity project was to create a webhook for revalidation. Every time we do a Create, Update, or Delete action within our project's dataset our webhook is triggered and sends a POST request to our <code>/api/revalidate</code> route.</p>
        <p>Inside our <code>POST</code> function, Next-Sanity's <code>parseBody</code> function validates the request using the the <code>SANITY_WEBHOOK_SECRET</code> we pasted from the Sanity console and copied into our <code>.env</code>.</p>
        <p>If the request is valid, Next's <code>revalidateTag</code> function will take <code>body._type</code> as an argument and then purge the tag specified by <code>body._type</code>. Feel free to throw some <code>console.log</code>s in there. The tag you'll see returned in this case is <code>post</code>.</p>
        <p>Over in our <code>sanityFetch</code> function in <code>src/utils/api</code>, the last accepted argument is <code>tags</code>. You'll notice that in the <code>return</code> block, which is just a <code>fetch</code> call to our dataset, we pass the <code>tags</code> argument. Setting these cache tags, tells <code>fetch</code> where to look in the cache for stored resource. However, if we've made any changes, our <code>POST</code> in <code>/api/revalidate</code> will have purged the cache, forcing the fetch to hit up our remote Sanity dataset. Boom, fresh content!</p> 
      </section>

      <section id="clientImg">
        <h2>ClientImg Component</h2>
        <p>Sanity and Next do many wonderful things together. In particular, I'm a fan of how they handle image media and I'm sure I've only just scratched the surface.</p>
        <p><code>ClientImg</code> accepts three arguments: <code>img</code>, <code>sizes</code> and <code>classes</code>. <code>sizes</code> accepts a string in accordances with the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes" target="_blank">sizes attribute</a> of the <code>img</code> tag in order to render responsive images. <code>classes</code> accepts a string of classes, which is especially handy if you're using a class-based CSS framework like <a href="https://tailwindcss.com/" target="_blank">Tailwind</a> or CSS modules.</p>
        <p>The <code>img</code> argument of <code>ClientImg</code> is where the magic happens. Firstly, it depends on a query projection like the one found in <code>src/app/posts/page.js</code>:</p>
        <p className={styles.codeBlock}>
          *[_type == "post"] &#123;<br/>
            <span className={styles.indent}></span>title,<br />
            <span className={styles.indent}></span>mainImage&#123;<br />
              <span className={styles.indent}></span><span className={styles.indent}></span>alt,<br />
              <span className={styles.indent}></span><span className={styles.indent}></span>asset -&gt; &#123;<br />
                <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span>...,<br />
                <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span>metadata<br />
              <span className={styles.indent}></span><span className={styles.indent}></span>&#125;<br />
            <span className={styles.indent}></span>&#125;<br />
          &#125;<br />
        </p>
        <p>This projection passes us not only <code>alt</code>, which is a required, though not breaking property of Next's <code>Image</code> component, but all of the metadata associated with the asset. We need that metadata to pass to <code>useNextSanityImage</code>, which will produce the props we need to render our image!</p>
        <p>The third, optional argument, <code>imageBuilder: urlForImage</code>, is a handy way to transofrm images. Though it's not the case in this repo, image transformations are crucial when you are using the <code>hotspot</code> and <code>crop</code> options on your Sanity image schemas.</p>
      </section>
      <section id="dependencies">

      </section>
    </div>
  );
}