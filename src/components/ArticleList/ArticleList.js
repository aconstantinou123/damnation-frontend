
import ArticleSummary from "../ArticleSummary/ArticleSummary"
import "./ArticleList.css"

const ArticleList = ({ articles }) => {
  
  return (
    <section className="articles" id="articles">
      <ul>
        {articles.map((article) => (
          <ArticleSummary key={article.id} article={article} />
        ))}
      </ul>
    </section>
  )
}
export default ArticleList
