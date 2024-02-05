import { sanityFetch } from "@/utils/api/sanityFetch"
import Link from "next/link"
import ClientImg from "../components/ClientImg"
import styles from "./posts.module.css"


export default async function Posts(){
  const query = `*[_type == "post"] {
    title,
    mainImage{
      alt,
      asset -> {
        ...,
        metadata
      }
    }
  }`

  const posts = await sanityFetch({query: query, qParams: {}, tags: ["post"]})

  console.log(posts)
  return (
    <div>
      <h1>Image Component In Action</h1>
      <p>To see live reload in action, add a new Post in your <Link href="/admin" target="_blank">Sanity Studio</Link>.</p>
      <hr/>
      <section className={styles.posts}>
        {posts.map((post, index) => (
          <div key={index} className={styles.card}>
            {post.title &&
              <h3 className={styles.cardTitle}>{post.title}</h3>
            }
          <div className={styles.imageContainer}>
            { post.mainImage.asset ?
              <ClientImg 
                img={post?.mainImage}
                sizes={"100vw"}
                classes={styles.cardImage}
              /> : 
              <h4>Make sure you've published this post and uploaded an image!</h4>
            }
          </div>
          </div>
        ))}
      </section>
    </div>
  )
}