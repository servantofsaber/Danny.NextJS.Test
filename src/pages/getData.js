import sql from 'mssql';
import { format, compareAsc } from 'date-fns'
import Link from 'next/link';

export async function getServerSideProps() {
    const config = {
        server: 'sv0278',
        user: 'tic',
        password: 'termite',
        database: 'Z_WebSys',
        options: {
            encrypt: false, // SSL/TLSを使用する場合はtrueに設定
        },
    };

    try {
        // データベース接続を確立
        await sql.connect(config);

        // SQLクエリを実行してデータを取得
        const result = await sql.query('SELECT * FROM Macro_有休残業管理_時短者マスタ');
        const data = JSON.parse(JSON.stringify(result.recordset))
        console.log(data)


        // データベース接続を閉じる
        sql.close();

        // 取得したデータをpropsとして返す
        return {
            props: {
              data,
            },
          };
    } catch (error) {
        console.error(error);

        // エラーが発生した場合は空のpropsを返す
        return {
            props: {
            },
        };
    }
}


export default function MyPage({ data }) {
    console.log(data);
  
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    }
  
    return (
      <div>
        <h1>hello</h1>
        <table>
          <thead>
            <tr>
              <th>社員コード</th>
              <th>氏名</th>
              <th>勤務時間数</th>
              <th>開始時間</th>
              <th>終了時間</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, key) => (
              <tr key={key}>
                <td>{value.社員コード}</td>
                <td>{value.氏名}</td>
                <td>{value.勤務時間数}</td>
                <td>{formatDate(value.開始時間)}</td>
                <td>{formatDate(value.終了時間)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/">戻る</Link>
      </div>
    )
  }
  




