const app = require('./config/app'); //the actual app

const port = process.env.PORT || 5000; 
app.listen(port, () => {
  try {
    console.log('Server is running on port ' + port);
  } catch (error) {
    console.error('Error starting server:', error);
  }
});
