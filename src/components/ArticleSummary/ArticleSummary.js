import history from '../../history'

import './ArticleSummary.css'

const ArticleSummary = ({ article }) => (
  <li className="article-summary" key={article.id} onClick={() => history.push(`/article/${article.id}`)}>
    <figure>
      <img src={article.img_url} alt={article.img_alt} />
    </figure>
    <h3>{article.title}</h3>
    <p>{article.summary}</p>
  </li>
)

export default ArticleSummary
