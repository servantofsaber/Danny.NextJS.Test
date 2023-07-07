import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Layout,{siteTilte} from '../../components/Layout'
import utilis from '../styles/utils.module.css'
import { getPostData } from '../../lib/post'



const inter = Inter({ subsets: ['latin'] })

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostData();


  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context){
  

//   return{
//     props:{
//       //コンポーネントに渡すためのprops
//     },
//   }
// }



export default function Home({ allPostsData }) {
  console.log(allPostsData);


  return (
    <Layout home>
    <Head>
      <title>{siteTilte}</title>
    </Head>
      <section className={utilis.headingMd}>
        <p>これは、React x Next.js練習のためのサンプルサイトです。</p>
      </section>

      <section>
        <h2>📝Dannyのブログ</h2>
      </section>

      <div className={styles.grid}>
        {allPostsData.map(({id, title, date, thumbnail}) => (
          <article key={id}>
            <Link href={`/posts1/${id}`}>
              <Image className={styles.thumbnailImage} src={thumbnail} alt="" width={200} height={200}></Image>
            </Link>
            <Link legacyBehavior href={`/posts1/${id}`}>
              <a className={utilis.boldText} href={`/posts1/${id}`}>{title}</a>
            </Link>
            <br />
            <small className={utilis.lightText}>
             {date}
            </small>
          </article>
        ))}
      </div>
    </Layout>



  )
}
