'use strict';

var nodevk = require('../lib/nodevk');

var query =
{
	method: 'users.get',
	params:
	{
		user_ids: '205387401'
	}
};

query.dryRun = true;
console.log(nodevk.execMethod(query));

query.dryRun = false;
nodevk.execMethod(query, console.log);
