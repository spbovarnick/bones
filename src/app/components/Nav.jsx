import Image from "next/image"
import styles from "../page.module.css"
import logo from "/public/images/nav-logo.png"

export default function Nav() {
  
  return (
    <nav className={styles.nav}>
      <Image
        src={logo}
        sizes="100vw"
        alt="Logo"
        style={{
          width: '200px',
          height: 'auto',
        }}
        className={styles.logo}
      />
      <div className={styles.navTitle}>Next/Sanity Content Reload <br/> and Image Component Template</div>
    </nav>
  )
}