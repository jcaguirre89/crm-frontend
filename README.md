[WIP]

#About
This is a Next.js front end to a Django REST app that runs a CRM for deal
flow management ([repo](https://github.com/jcaguirre89/crm-backend)). This backend includes
auth and the deal models, and the app won't run without it.


# Local development
This repo uses yarn workspaces to separate the next app from the api that holds the Apollo Server.
To run locally, open 2 terminal windows and in each one run install first and `run dev` later.
```
# Apollo server running on localhost:4000
yarn workspace api install
yarn workspace api run dev

# Next front end running on localhost:3000
yarn workspace www install
yarn workspace www run dev
```
