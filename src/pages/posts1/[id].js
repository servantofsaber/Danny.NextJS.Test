import Layout from "../../../components/Layout";
import { getAllPostIds } from "../../../lib/post";
import { getPostsData } from "../../../lib/post";
import utils from "../../styles/utils.module.css"
import Head from "next/head";
// eslint-disable-next-line @next/next/no-typos
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostsData(params.id)

  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  return (<Layout>
  <Head>
    <title>{postData.title}</title>
  </Head>
    <article>
      <h1 class={utils.headingx1}>
        {postData.title}
      </h1>
      <div className={utils.lightText}>
        {postData.date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.blogConetentHTML }} />


  


    </article>


  </Layout>)
}

