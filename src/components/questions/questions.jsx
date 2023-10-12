import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const RandomDataDisplay = ({ collectionName }) => {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [hasClickedButton, setHasClickedButton] = useState(false);

  const fetchRandomDocument = async () => {
    const querySnapshot = await getDocs(collection(db, "questions"));
    if (querySnapshot.size === 0) {
      console.log('No documents found in the collection.');
      return null;
    }

    const documents = querySnapshot.docs.map((doc) => doc.data());
    const randomIndex = Math.floor(Math.random() * documents.length);
    return documents[randomIndex];
  };  

  useEffect(() => {
    const getRandomData = async () => {
      try {
        const data = await fetchRandomDocument();
        setRandomQuestion(data);
      } catch (error) {
        console.error('Error fetching random document:', error);
      }
    };

    getRandomData();
  }, [collectionName]);

  return (
    <div>
      <h2>Random Question Generator</h2>
      <button onClick={() => setHasClickedButton(true)}>Generate Random Question</button>
      {hasClickedButton && randomQuestion ? (
        <div>
          <p>{randomQuestion.text}</p>
        </div>
      ) : (
        hasClickedButton && <p>Click the button to generate a random question.</p>
      )}
    </div>
  );
};

export default RandomDataDisplay;