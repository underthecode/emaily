module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like to hear about your experience!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="http://localhost:5000">Yes</a>
          </div>
          <div>
            <a href="http://localhost:5000">No</a>
          </div>
        </div>
      </body>
    </html>`;
};
