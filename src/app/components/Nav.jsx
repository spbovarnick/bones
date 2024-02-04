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
      <div className={styles.navTitle}>Next/Sanity On-Demand Reload <br/> and Image Component Template</div>
      <Link href="/posts" className={styles.posts}>
          Image Component at Work
      </Link>
    </nav>
  )
}