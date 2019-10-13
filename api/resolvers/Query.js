const Query = {
  company: async (parent, {companyId}, {dataSources}) => {
    const company = await dataSources.djangoAPI.getCompany(companyId);
    return company;
  },
  companies: async (parent, args, {dataSources}) => {
    const companies = await dataSources.djangoAPI.getCompanies();
    return companies;
  },
};

module.exports = Query;
