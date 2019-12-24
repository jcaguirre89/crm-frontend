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
      return 'http://localhost:8000/api/v1/';
    }
    return 'https://api.example.com/';
  }

  async getDeals() {
    const data = await this.get(`deals/`);
    console.log(data)
    return data
  }

  async getDeal(id) {
    const data = await this.get(`deals/${id}/`);
    return data;
  }

  async createDeal(deal) {
    return this.post(
      `deals/`,
      deal
    )
  }
}

module.exports = { DjangoAPI };
