import { sanityFetch } from "@/utils/api/sanityFetch"
import ClientImg from "../components/ClientImg"


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
    <>
      {posts.map((post, index) => (
        <div key={index}>
         {post.title}
         <ClientImg 
          img={post.mainImage}
          sizes={"100vw"}
         />
        </div>
      ))}
    </>
  )
}