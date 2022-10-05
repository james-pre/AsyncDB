IDBRequest.prototype.async = function(){
	return new Promise((resolve, reject) => {
		this.onsuccess = e => resolve(this.result);
		this.onerror = e => reject(this.error);
	});
}
class AsyncDB{
	constructor(name, version, upgrade){
		this.async = new Promise((resolve, reject) => {
			let req = indexedDB.open(name, version);
			req.onsuccess = e => resolve(req.result);
			req.onerror = e => reject(req.error);
			req.onupgradeneeded = upgrade;
		});
	}
	async transaction(stores, mode){
		let db = await this.async;
		return db.transaction(stores, mode);
	}
	tx = transaction;
}
