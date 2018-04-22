// Add headers
const setHeaders = (req, res, next) => {

    // Website I wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods I wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers I wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if I need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
};

module.exports = { setHeaders };
