import './ArticleList.css'

const ArticleList = ({ articles }) => (
  <section className="articles" id="articles">
      <ul>
        {articles.map(article => (
        <li key={article.id}>
          <figure>
            <img
              src={article.img_url} 
              alt={article.img_alt}
            />
          </figure>
          <h3>{article.title}</h3>
          <p>
            {article.summary}
          </p>
        </li>
      ))}
      </ul>
    </section>
)
export default ArticleList