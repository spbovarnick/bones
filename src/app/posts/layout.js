import styles from "./posts.module.css"

export default function PostLayout({ children }) {

  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}