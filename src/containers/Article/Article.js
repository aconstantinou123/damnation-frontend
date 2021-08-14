import { useParams } from "react-router-dom"

import "./Article.css";
import articles from "../../data/data.json"
import ArticleView from "../../components/ArticleView/ArticleView"

const Article = () => {
  const { id } = useParams()

  return (
    <div className="article-container">
      <ArticleView article={articles[id - 1]} />
    </div>
  );
};

export default Article
