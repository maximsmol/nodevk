'use strict';

var nodevk = require('../lib/nodevk');


var query =
{
	appId: '4769438',
	appSecret: 'LpjFGDnO0fqBQ1q7Aw34'
};

query.dryRun = true;
console.log(nodevk.getServerToken(query));

query.dryRun = false;
nodevk.getServerToken(query,
function doRequest(res)
{
	query =
	{
		method: 'secure.getSMSHistory',
		token: res.access_token,
		params:
		{
			client_secret: 'LpjFGDnO0fqBQ1q7Aw34'
		}
	};

	query.dryRun = true;
	console.log(nodevk.execMethod(query));

	query.dryRun = false;
	nodevk.execMethod(query, console.log);
});
