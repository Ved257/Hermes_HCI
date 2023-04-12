import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';

import { mapExpressionToEmoji } from '../../helpers/emojis';
import axios from 'axios';
import './Results.css';
import cookie from 'react-cookies'

const Results = ({ results, processing }) => {
  const [sent, setSent] = useState("")
  const [match, setMatch] = useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSent=async()=>{
    await axios
    .get(`http://localhost:5000/analyse/${results[0]}`, {
    })
    .then((res) => {
      setSent(res.data);
      // console.log(sent)
      let m = cookie.load('sentiment')
      if(sent === m)
      {
        setMatch(true)
      }
    });
  }

  useEffect(()=>{
    getSent();
  }, [getSent])

  if (processing && results) {
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            <p>I think...</p>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div style={{ width: '300px' }}>
                  <p>
                    One of you is probably {result.gender}, is looking {result.expressions.asSortedArray()[0].expression} and looks around{' '}
                    {Math.round(result.age)}
                  </p>
                </div>
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.expressions.asSortedArray()[0].expression)} size="4x" />
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.gender)} size="4x" />
              </div>
            ))}
          </div>
        ) : (
          <div className="results__wrapper">
            <div>
              <p>I think...</p>
              <p>You look {results[0].expressions.asSortedArray()[0].expression}</p>
              <p>You seem to be {Math.round(results[0].age)} years old</p>
              <p>I think you are a {results[0].gender}</p>
              <p>Your sentiment Matching group sentiment: {match}</p>
            </div>
            <div className="results__emoji">
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].expressions.asSortedArray()[0].expression)} size="4x" />
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].gender)} size="4x" />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
};

export default Results;
