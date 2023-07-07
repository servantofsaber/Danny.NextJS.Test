import Head from "next/head";
import Image from "next/image";
import styles from "./Layout.module.css"
import utils from "../src/styles/utils.module.css"
import Link from "next/link"

const name = 'Danny'
export const siteTilte = "Next.js Blog"

function Layout({children,home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
            {
                home?(
                    <Image className={`${utils.borderCircle} ${styles.headerHomeImage}`} src="/images/Q_A-icon.png" alt="" width={120} height={100} />
                ):(
                    <Image className={`${utils.borderCircle}`} src="/images/Q_A-icon.png" alt="" width={120} height={100} />
                )
            }
                
                <h1 className={utils.heading2x1}>{name}</h1>
            </header>
           <main>
            {children}
            {!home && (
                <div className="">
                    <Link href="/">
                        ホームへ戻る
                    </Link>
                </div>
            )}
           </main>
        </div>
    );
}

export default Layout;