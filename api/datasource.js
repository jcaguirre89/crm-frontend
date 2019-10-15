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
    return 'https://movies-api.example.com/';
  }

  async getCompanies() {
    return this.get(`api/v1/companies`);
  }

  async getCompany(id) {
    const data = await this.get(`api/v1/companies/${id}`);
    return data;
  }
}

module.exports = { DjangoAPI };
