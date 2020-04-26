ARG VERSION=12
ARG APP_PORT=3000

# ---- base ----
FROM node:${VERSION}-alpine AS base

WORKDIR /app

# ---- dependencies ----
FROM base as dependencies

COPY yarn.lock ./
COPY package.json ./
COPY .eslintrc ./
COPY nodemon.json ./
COPY tsconfig.json ./
COPY tsconfig.frontend.json ./
COPY webpack.config.js ./
COPY ormconfig.js ./

RUN yarn install --production --pure-lockfile --non-interactive --cache-folder ./ycache
RUN cp -R node_modules prod_node_modules
RUN rm -rf node_modules
RUN yarn install --pure-lockfile --non-interactive --cache-folder ./ycache
RUN rm -rf ./ycache

# ---- build ----
FROM dependencies as build

COPY assets ./assets
COPY src ./src
COPY templates ./templates
RUN yarn run frontend:prod:build

# ---- development ----
FROM dependencies as development

ENV NODE_ENV=development

# ---- production ----
FROM base as production

ENV NODE_ENV=production
ENV APP_PORT=${APP_PORT}

COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/templates ./templates
COPY --from=build /app/public ./public

EXPOSE ${APP_PORT}

CMD yarn run backend:start
