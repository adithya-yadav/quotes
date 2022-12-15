import { Fragment, useEffect } from "react";
import { Route, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from '../lib/api'

// const Dummy_Quotes = [
//   { id: "q1", author: "yash", text: "learning React is fun!" },
//   { id: "q2", author: "sun", text: "learning React is Great!" },
//   { id: "q3", author: "max", text: "learning React is ozm!" },
// ];

const QuoteDetail = () => {
    const match = useRouteMatch();
  const params = useParams();
    const {quoteId} = params

  const {sendRequest , status , data: loadedQuote , error} = useHttp(getSingleQuote,true)

//   const quote = Dummy_Quotes.find((quote) => quote.id === params.quoteId);

    useEffect(()=>{
        sendRequest(quoteId)
    },[sendRequest,quoteId])

    if(status === 'pending'){
        return <div className="centered">
            <LoadingSpinner/>
        </div>
    }
    
    if(error){
        return <p className="centered" >{error}</p>
    }
    
    if (!loadedQuote.text) {
      return <HighlightedQuote text={"Quote Not Found"} />;
    }
  
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
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
    </Fragment>
  );
};

export default QuoteDetail;
