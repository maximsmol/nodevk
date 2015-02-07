'use strict';

//
// Standard libraries
var assert = require('assert');

//
//
var nodevk = require('../lib/nodevk');

//
// Mocha
var describe = global.describe;
var it = global.it;


//
// Main code
//

//
// Tests
describe('Teting getCodeURL', function getCodeURL()
{
	describe('Not providing appId', function noAppId()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.getCodeURL();
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'appId is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Not providing permission scope', function noScope()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.getCodeURL({appId: 'test'});
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'scope is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Requesting more then one permission', function perms()
	{
		it('Should output correctly', function test()
		{
			var correctResult = 'https://oauth.vk.com/authorize?';
			correctResult += 'client_id=test&scope=friends,groups';
			correctResult += '&redirect_uri='+nodevk.DEFAULT_REDIRECT;
			correctResult += '&v='+nodevk.DEFAULT_VERSION;
			correctResult += '&response_type=code';

			assert.strictEqual(nodevk.getCodeURL(
				{
					appId: 'test',
					scope: ['friends', 'groups']
				}
			), correctResult);
		});
	});

	describe('Not providing optional options', function noOptional()
	{
		it('Should use default options', function test()
		{
			var correctResult = 'https://oauth.vk.com/authorize?';
			correctResult += 'client_id=test&scope=friends';
			correctResult += '&redirect_uri='+nodevk.DEFAULT_REDIRECT;
			correctResult += '&v='+nodevk.DEFAULT_VERSION;
			correctResult += '&response_type=code';

			assert.strictEqual(nodevk.getCodeURL(
			{
				appId: 'test',
				scope: ['friends']
			}), correctResult);
		});
	});
});

describe('Testing getServerToken', function getToken()
{
	describe('Not providing appId', function noAppId()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.getServerToken();
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'appId is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Not providing appSecret', function noAppSecret()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.getServerToken({appId: 'test'});
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'appSecret is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Not providing optional options', function noOptional()
	{
		it('Should use default options', function test()
		{
			var correctResult = 'GET https://oauth.vk.com/access_token?';
			correctResult += 'client_id=test';
			correctResult += '&client_secret=secret-shhhh';
			correctResult += '&v='+nodevk.DEFAULT_VERSION;
			correctResult += '&grant_type=client_credentials';

			assert.strictEqual(nodevk.getServerToken(
			{
				appId: 'test',
				appSecret: 'secret-shhhh',

				dryRun: true
			}), correctResult);
		});
	});

	describe('Testing actual call', function apiCall()
	{
		it('Should not throw an error', function test(done)
		{
			assert.doesNotThrow(function shouldNotThrow()
			{
				nodevk.getServerToken({
					appId: 'test',
					appSecret: 'secret-shhhh'
				}, function handleResponse()
				{
					done();
				});
			});
		});
	});
});

describe('Testing getAccessTokenFromCode', function getToken()
{
	describe('Not providing appId', function noAppId()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.getAccessTokenFromCode();
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'appId is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Not providing appSecret', function noAppSecret()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.getAccessTokenFromCode({appId: 'test'});
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'appSecret is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Not providing the code', function noCode()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.getAccessTokenFromCode({appId: 'a', appSecret: 'b'});
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'code is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Not providing optional options', function noOptional()
	{
		it('Should use default options', function test()
		{
			var correctResult = 'GET https://oauth.vk.com/access_token?';
			correctResult += 'client_id=test';
			correctResult += '&client_secret=secret-shhhh';
			correctResult += '&redirect_uri='+nodevk.DEFAULT_REDIRECT;
			correctResult += '&code=MEACCESSCODE';
			correctResult += '&v='+nodevk.DEFAULT_VERSION;

			assert.strictEqual(nodevk.getAccessTokenFromCode(
			{
				appId: 'test',
				appSecret: 'secret-shhhh',
				code: 'MEACCESSCODE',

				dryRun: true
			}), correctResult);
		});
	});

	describe('Testing actual call', function apiCall()
	{
		it('Should not throw an error', function test(done)
		{
			assert.doesNotThrow(function shouldNotThrow()
			{
				nodevk.getAccessTokenFromCode({
					appId: 'test',
					appSecret: 'secret-shhhh',
					code: 'MEACCESSCODE'
				}, function handleResponse()
				{
					done();
				});
			});
		});
	});
});

describe('Testing execMethod', function execMethod()
{
	describe('Not providing the method', function noMethod()
	{
		it('Should throw an error', function test()
		{
			assert.throws(
				function shouldThrow()
				{
					nodevk.execMethod();
				},
				function checkError(e)
				{
					return e instanceof Error &&
						e.message === 'method is required';
				},
				'Wrong error'
			);
		});
	});

	describe('Not providing optional options', function noOptional()
	{
		it('Should use default options', function test()
		{
			var correctResult = 'GET https://api.vk.com/method/abcdef?';
			correctResult += 'v='+nodevk.DEFAULT_VERSION;

			assert.strictEqual(nodevk.execMethod(
			{
				method: 'abcdef',
				dryRun: true
			}), correctResult);
		});
	});

	describe('Providing parameters', function noMethod()
	{
		it('Should not throw an error', function test()
		{
			var correctResult = 'GET https://api.vk.com/method/abcdef?';
			correctResult += 'test=hello&';
			correctResult += 'v='+nodevk.DEFAULT_VERSION;

			assert.strictEqual(nodevk.execMethod(
			{
				method: 'abcdef',
				params: {test: 'hello'},
				dryRun: true
			}), correctResult);
		});
	});

	describe('Testing actuall call', function noMethod()
	{
		it('Should not throw an error', function test(done)
		{
			nodevk.execMethod(
			{
				method: 'abcdef',
				params: {test: 'hello'}
			}, function handleResponse()
			{
				done();
			});
		});
	});
});
