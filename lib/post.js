import path from "path"
import matter from "gray-matter"
import fs from "fs"
import {remark} from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "src","pages","posts");

//MDファイルのデータを取り出す
export function getPostData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "")
        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        const matterResult = matter(fileContents)

        //IDとデータを返す
        return{
            id,
            ...matterResult.data
        }
    });
return allPostsData
}

//getStaticPathsでreturnで使うpathを取得する
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName)=>{
        return{
            params:{
                id:fileName.replace(/\.md$/,"")
            }
        }
    })
    
}

//idに基づいてブログ投稿データを返す
export async function getPostsData(id){
  const fullpath = path.join(postsDirectory,`${id}.md`)
  const fileContent = fs.readFileSync(fullpath,"utf8")

  const matterResult = matter(fileContent)

  const blogContent = await remark().use(html).process(matterResult.content)

  const blogConetentHTML = blogContent.toString()

  return{
    id,
    blogConetentHTML,
    ...matterResult.data
  }
}