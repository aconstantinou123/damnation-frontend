import ArticleSummary from "../ArticleSummary/ArticleSummary"
import "./ArticleMain.css"

const ArticleMain = ({ articles, setArticleToView }) => {
  
  return (
    <section className="article-main" id="article-main">
      <ul>
        {articles.map((article) => (
          <ArticleSummary 
            key={article.id}
            article={article}
            setArticleToView={setArticleToView}
          />
        ))}
      </ul>
    </section>
  )
}
export default ArticleMain
