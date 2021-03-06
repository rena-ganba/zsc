'use strict';

import Transaction from './transaction.js';

class QA extends Transaction {
  constructor(instance) {
    super(instance);
  };

  async add(token, language, content) {
    const data = new URLSearchParams();
    data.append('language', language);
    data.append('content', JSON.stringify(content));

    try {
      return await this.transaction('post', 'qa/add', { token }, null, data);
    } catch (err) {
      throw err;
    }
  };

  async removeAll(token, id, language) {
    const data = new URLSearchParams();
    if (id) {
      data.append('id', id);
    } else if (language) {
      data.append('language', language);
    } else {}

    try {
      return await this.transaction('post', 'qa/removeAll', { token }, null, data);
    } catch (err) {
      throw err;
    }
  };

  async remove(token, id, language) {
    const data = new URLSearchParams();
    data.append('id', id);
    data.append('language', language);

    try {
      return await this.transaction('post', 'qa/remove', { token }, null, data);
    } catch (err) {
      throw err;
    }
  };

  async update(token, id, language, content) {
    const data = new URLSearchParams();
    data.append('language', language);
    data.append('id', id);
    data.append('content', JSON.stringify(content));

    try {
      return await this.transaction('post', 'qa/update', { token }, null, data);
    } catch (err) {
      throw err;
    }
  };

  async getAll() {
    try {
      return await this.transaction('get', 'qa/getAll', null);
    } catch (err) {
      throw err;
    }
  };

  async get(id, language) {
    const query = new URLSearchParams();
    if (id) {
      query.append('id', id);
    } else if (language) {
      query.append('language', language);
    } else {}

    try {
      return await this.transaction('get', 'qa/get', null, query);
    } catch (err) {
      throw err;
    }
  };

  async getByIndex(id, language, index) {
    const query = new URLSearchParams();
    if (id) {
      query.append('id', id);
    } else if (language) {
      query.append('language', language);
    } else {}
    query.append('index', index);

    try {
      return await this.transaction('get', 'qa/getByIndex', null, query);
    } catch (err) {
      throw err;
    }
  };

  async count(id, language) {
    const query = new URLSearchParams();
    if (id) {
      query.append('id', id);
    } else if (language) {
      query.append('language', language);
    } else {}

    try {
      return await this.transaction('get', 'qa/count', null, query);
    } catch (err) {
      throw err;
    }
  };
}

export default QA;
