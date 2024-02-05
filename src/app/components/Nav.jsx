import Image from "next/image"
import Link from "next/link"
import styles from "./nav.module.css"
import logo from "/public/images/nav-logo.png"

export default function Nav() {
  
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image
          src={logo}
          sizes="100vw"
          alt="Logo"
          style={{
            width: '200px',
            height: 'auto',
          }}
        />
      </Link>
      <div className={styles.navTitle}>
        <Link href="/"><span className={styles.dTitle}>Next/Sanity On-Demand Reload <br /> and Image Component Template</span><span className={styles.mTitle}>Next/Sanity <br/>Template</span></Link>
      </div>
      <Link href="/posts" className={styles.posts}>
          <span className={styles.dPosts}>Image Component at Work</span><span className={styles.mPosts}>Example</span>
      </Link>
    </nav>
  )
}