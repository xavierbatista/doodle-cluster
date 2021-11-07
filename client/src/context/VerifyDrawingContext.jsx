import React, { useState, createContext, useEffect } from 'react';

export const VerifyDrawingContext = createContext();

const VerifyDrawingProvider = ({ children }) => {
  const [drawingVerifiedForSubmission, setDrawingVerifiedForSubmission] =
    useState(false); //used to verify that the user made changes and isn't using a bot to spam submits. Used in SubmitButton.jsx
  const [numberOfChangesUserMade, setNumberOfChangesUserMade] = useState(0); //used for the submit button to make sure it doesn't submit if the user adds only like a dot or a line
  const adequateAmountOfChanges = 1; //change this to at least 2 when uploading to internet

  //List of things I still need to check for verifying drawing:
  //1. user spent more than 5 seconds on drawing when submitting. make something that keeps track of the amount of time they spent holding their mouse down on the canvas. Store this in localStorage so it stays when page refreshes.
  //2. the drawing isn't the same as their last drawing. I will probably have to store only what they drew in local storage
  //3. the user isn't submitting a crazy amount of drawings per minute. Store something in localStorage to keep track of amount of submissions in the last minute
  //4. make sure the user doesn't erase the entire canvas. check this by checking the dimensions of the image and making sure it's not 0x0
  //5. check the dimensions of the drawing to make sure they didn't tamper with the canvas. might want to check this server side as well, if possible.
  //6. check if the entire canvas is on color. google how to do this
  //7. on the server, i need to make sure not too many submissions are coming from the same account or ip. i will probably do this by sending user's ip when they submit a jwt token, which i still need to implement.

  useEffect(() => {
    //eventually i need to add more things to this if statement to verify the user didn't do anything bad
    if (numberOfChangesUserMade >= adequateAmountOfChanges)
      setDrawingVerifiedForSubmission(true);
    else setDrawingVerifiedForSubmission(false);
  }, [numberOfChangesUserMade]);

  const contextValues = {
    drawingVerifiedForSubmission,
    numberOfChangesUserMade,
    setNumberOfChangesUserMade,
  };

  return (
    <VerifyDrawingContext.Provider value={contextValues}>
      {children}
    </VerifyDrawingContext.Provider>
  );
};

export default VerifyDrawingProvider;
