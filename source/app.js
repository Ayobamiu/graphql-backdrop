const Express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const urlRoute = require("./router/urlRouter");

const app = Express();

require("./db/mongoose");

const schema = require("./schema/urlSchema");

app.use("/graphql", ExpressGraphQL({ schema: schema, graphiql: true }));
app.use(urlRoute);

app.listen(process.env.PORT || 4004, () => {
  console.log(`🚀 Server ready at PORT ${process.env.PORT}`);
});

module.exports = app;
