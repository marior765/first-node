var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'myfirstnodesadg' }, function(err, tunnel) {
  console.log('LT running')
});