import './ArticleView.css'

const ArticleView = ({ article }) => (
  <div className="article-view" key={article.id}>
    <h3>{article.title}</h3>
    <p>By {article.author} {article.date}</p>  
    <figure>
      <img src={article.img_url} alt={article.img_alt} />
    </figure>
    <p>{article.content}</p>
  </div>
)

export default ArticleView