const app = require('./config/app');
const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
}).on('error', (error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
