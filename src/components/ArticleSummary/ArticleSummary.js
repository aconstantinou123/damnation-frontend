import history from "../../history"

import "./ArticleSummary.css"

const ArticleSummary = ({ article }) => {
  const summaryClass = article.is_main? "article-summary-main" : "article-summary"
  return (
    <li
      className={summaryClass}
      key={article.id}
      onClick={() => history.push(`/article/${article.id}`)}
    >
      <h3>{article.title}</h3>
      <div>
        <img src={article.img_url} alt={article.img_alt} />
      </div>
      <h4>
        By {article.author} {article.date}
      </h4>
      <p>{article.summary}</p>
    </li>
  )
}

export default ArticleSummary;
