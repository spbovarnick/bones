import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import title_and_id from "/public/images/id_and_title.png";

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
              <Link href="#localtunnel">localtunnel</Link>
            </li>
            <li>
              <Link href="webhook">Webhook</Link>
            </li>
          </ul>
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

      </section>

      <section id="#webhook" className={styles.webhook}>
        
      </section>


    </div>
  );
}
