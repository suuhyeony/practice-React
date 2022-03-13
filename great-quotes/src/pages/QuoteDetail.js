import { useParams, Route, useRouteMatch, Link } from "react-router-dom"
import Comments from '../components/comments/Comments'
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
  { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams()
  const quotes = DUMMY_QUOTES.find(quote => quote.id === params.quotesId)

  if (!quotes) {
    return <div>not found quote!</div>
  }

  return (
    <div>
      <HighlightedQuote text={quotes.text} author={quotes.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  )
}

export default QuoteDetail