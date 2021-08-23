import './ArticleView.css'
import ArticleContent from '../ArticleContent/ArticleContent'

const ArticleView = ({ article }) => (
  <div className="article-view" key={article.id}>
    <h3>{article.title}</h3>
    <p>By {article.author} {article.date}</p>  
    <div>
      <img src={article.img_url} alt={article.img_alt} />
    </div>
    {/* <p>{article.content}</p> */}
    <ArticleContent articleContent={article.content}/>
  </div>
)

export default ArticleView