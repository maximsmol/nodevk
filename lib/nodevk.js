'use strict';

//
// Standard libraries
//

var https = require('https');


//
// Constants
//

var DEFAULT_REDIRECT = 'https://oauth.vk.com/blank.html';
var DEFAULT_VERSION = '5.28';


//
// Helper functions
//

var printQuery = function(query)
{
	console.log('GET https://'+query.host+query.path);
};


//
// Auth functions
//

var getToken = function(options, callback)
{
	if (options == null) options = {};

	if (options.appId == null) throw new Error('appId is required');
	if (options.appSecret == null) throw new Error('appSecret is required');
	if (options.code == null) throw new Error('code is required');
	if (options.version == null) options.version = DEFAULT_VERSION;
	if (options.redirectTo == null) options.redirectTo = DEFAULT_REDIRECT;
	if (options.dryRun == null) options.dryRun = false;

	//
	// Construct call parameters
	var dataStr =
	[
		'client_id='+options.appId,
		'client_secret='+options.appSecret,
		'redirect_uri='+options.redirectTo,
		'code='+options.code
	].concat('v='+options.version).join('&');

	//
	// Process the query
	var query =
	{
		host: 'oauth.vk.com',
		port: 443,
		path: '/access_token?'+dataStr
	};

	if (options.dryRun)
	{
		printQuery(query);
		return;
	}

	//
	// Do the API call
	https.get(query, function handleResponse(res)
	{
		var buf = '';
		res.setEncoding('utf8');

		res.on('data', function handleDataChunk(chunk)
		{
			buf += chunk;
		});

		res.on('end', function handleResponseEnd()
		{
			callback(JSON.parse(buf));
		});
	});
};

var getCodeURL = function(options)
{
	if (options == null) options = {};

	if (options.appId == null) throw new Error('appId is required');
	if (options.scope == null) throw new Error('scope is required');
	if (options.redirectTo == null) options.redirectTo = DEFAULT_REDIRECT;
	if (options.version == null) options.version = DEFAULT_VERSION;

	var dataStr =
	[
		'client_id='+options.appId,
		'scope='+options.scope.join(','),
		'redirect_uri='+options.redirectTo,
		'v='+options.version,
		'response_type=code'
	].join('&');

	return 'https://oauth.vk.com/authorize?'+dataStr;
};


//
// API caller
//

var execMethod = function(options, callback)
{
	if (options == null) options = {};

	if (options.method == null) throw new Error('method is required');
	if (options.params == null) options.params = [];
	if (options.version == null) options.version = DEFAULT_VERSION;
	if (options.dryRun == null) options.dryRun = false;

	//
	// Parse call parameters
	var paramsArr = [];
	for (var k in options.params)
	{
		if (!options.params.hasOwnProperty(k)) continue;

		var val = options.params[k];

		paramsArr.push(k+'='+val);
	}

	//
	// Construct query parameters
	var data = paramsArr.concat('v='+options.version);
	if (options.token != null) data = data.concat('access_token='+options.token);
	var dataStr = data.join('&');


	//
	// Process the query
	var query =
	{
		host: 'api.vk.com',
		port: 443,
		path: '/method/'+options.method+'?'+dataStr
	};

	if (options.dryRun)
	{
		printQuery(query);
		return;
	}

	//
	// Do the API call
	https.get(query, function handleResponse(res)
	{
		var buf = '';
		res.setEncoding('utf8');

		res.on('data', function handleDataChunk(chunk)
		{
			buf += chunk;
		});

		res.on('end', function handleResponseEnd()
		{
			callback(JSON.parse(buf));
		});
	});
};


//
// module.exports
//

module.exports.getCodeURL = getCodeURL;
module.exports.getToken = getToken;
module.exports.execMethod = execMethod;
