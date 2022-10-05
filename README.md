# AsyncDB

An simple asynchronous wrapper for Indexed DB.

## How to use

You can ensure the database has been opened when calling transactions using the `.tx` method. For example:
```js
let db = new AsyncDB('myDB', 1, db => {
	db.createObjectStore('store');
});
db.tx('store', 'readwrite').then(tx => {
	//this wil run when the DB is opened but be delayed when closed.
	tx.objectStore('store').put('value', 'key');
});
```

Use the `.async()` method of `IDBRequest` to use it as a promise. For example:
```js
db.tx('store', 'readonly').then(async tx => {
	let result = await tx.objectStore('store').get('key').async();
	// do something with result;
});
```
