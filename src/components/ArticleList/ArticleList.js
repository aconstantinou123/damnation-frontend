
import ArticleSummary from "../ArticleSummary/ArticleSummary"
import "./ArticleList.css"

const ArticleList = ({ articles, setArticleToView }) => {
  
  return (
    <section className="articles" id="articles">
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
export default ArticleList
