import { sanityFetch } from "@/utils/api/sanityFetch"
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


  return (
    <div>
      <h1>Image Component In Action</h1>
      <hr/>
      <section className={styles.posts}>
        {posts.map((post, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{post.title}</h3>
          <div >
            <ClientImg 
              img={post.mainImage}
              sizes={"100vw"}
              
            />
          </div>
          </div>
        ))}
      </section>
    </div>
  )
}