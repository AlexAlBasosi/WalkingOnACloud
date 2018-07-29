// Setup to use a database
// Get the VCAP_SERVICES environment variable on the server as JSON
var env = JSON.parse(process.env.VCAP_SERVICES);
// Pass nano the database information. Env contains the DB URL and credentials
var nano = require('nano')(env['cloudantNoSQLDB'][0]['credentials']);
// Tell nano what database we are using
var client = nano.db.use('mydatabase');

// This section runs when you go to the app's homepage.
// Slash (/) is the home directory.
app.get('/', function(req, res){
  // To hold the local value of number in the database
  var lnumber;
  // Retrieve mydocument from the database
  client.get('mydocument', function(err, doc) {
  	if(!err) {
  		// Retrieve number from the document
  		lnumber = doc.number;
  		// Render index.ejs and pass it lnumber as number
  		res.render('index', {number: lnumber});
  	} else {
  		console.log("Error getting count from db: " + err);
  	}
  });
});
