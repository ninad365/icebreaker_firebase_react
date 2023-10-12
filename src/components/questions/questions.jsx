import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const RandomDataDisplay = () => {
  const [randomQuestion, setRandomQuestion] = useState(null);

  const fetchRandomDocument = async () => {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    if (querySnapshot.empty) {
      console.log('No documents found in the collection.');
      return null;
    }

    const documents = querySnapshot.docs.map((doc) => doc.data());
    const randomIndex = Math.floor(Math.random() * documents.length);
    return documents[randomIndex];
  };

  const generateRandomQuestion = async () => {
    try {
      const data = await fetchRandomDocument();
      setRandomQuestion(data);
    } catch (error) {
      console.error('Error fetching random document:', error);
    }
  };

  return (
    <div className="random-data-container">
      <h2>Random Question Generator</h2>
      <button onClick={generateRandomQuestion}>Generate Random Question</button>
      <div className="question-text">
        {randomQuestion ? (
          <p>{randomQuestion.text}</p>
        ) : (
          <p>Click the button to generate a random question.</p>
        )}
      </div>
    </div>
  );
};

export default RandomDataDisplay;
