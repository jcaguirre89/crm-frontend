const { RESTDataSource, HTTPCache } = require('apollo-datasource-rest');

class DjangoAPI extends RESTDataSource {
  constructor() {
    super();
    this.httpCache = new HTTPCache();
  }

  willSendRequest(request) {
    // Add token to headers
    request.headers.set('Authorization', this.context.token);
  }

  get baseURL() {
    if (this.context.env === 'development') {
      return 'http://localhost:8000/';
    }
    return 'https://api.example.com/';
  }

  async getDeals() {
    return this.get(`api/v1/deals`);
  }

  async getDeal(id) {
    const data = await this.get(`api/v1/deals/${id}`);
    return data;
  }
}

module.exports = { DjangoAPI };
