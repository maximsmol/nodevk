'use strict';

var nodevk = require('../lib/nodevk');


var code = process.argv[2];

if (code == null)
{
	var msg = 'Follow this URL, then copy the code from the address bar.\n'+
			  'Note, that the code is one-time use,'+
			  'because we dont store the access token.\n';
	console.log(
		msg+nodevk.getCodeURL({
			appId: '4769438',
			scope: ['notify']
		}));
	process.exit();
}

nodevk.getAccessTokenFromCode({
	appId: '4769438',
	appSecret: 'LpjFGDnO0fqBQ1q7Aw34',

	code: code
},
function doRequest(res)
{
	var query =
	{
		method: 'users.search',
		token: res.access_token,
		params:
		{
			q: 'Vasya Pupkin'
		}
	};

	query.dryRun = true;
	console.log(nodevk.execMethod(query));

	query.dryRun = false;
	nodevk.execMethod(query, console.log);
});
