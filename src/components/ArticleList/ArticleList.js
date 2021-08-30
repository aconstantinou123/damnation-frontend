
import ArticleSummary from "../ArticleSummary/ArticleSummary"
import "./ArticleList.css"

const ArticleList = ({ articles, setArticleToView }) => {

  const mapArticles = () => {
    console.log('here')
    return articles.map((article) => (
      <ArticleSummary
        key={article.id}
        article={article}
        setArticleToView={setArticleToView}
      />
    ))
  }
  
  return (
    <section className="articles" id="articles">
      <ul>
        {
          articles.length 
          ? mapArticles()
          : <></>
        }
      </ul>
    </section>
  )
}
export default ArticleList
