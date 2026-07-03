import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { navbarItems, navbarButtons } from "@/config/navbar";

export default function Navbar () {
    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <div className={styles.navbarIcon}>
                    <Link href="/">
                        <Image 
                            src="/favicon.ico" 
                            alt="Logo" 
                            width={40} 
                            height={40} 
                            priority 
                        />
                    </Link>
                </div>
                <div className={styles.navbarItems}>
                    {navbarItems.map((item) => (
                        <Link 
                            key={item.id} 
                            href={item.href} 
                            className={styles.navbarItem}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.rightSection}>
                {navbarButtons.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={styles[item.className]}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}