# DEPENDENCIES
FROM node:16-alpine3.15 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# BUILDER
FROM node:16-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# PRODUCTION
FROM node:16-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}

CMD [ "node","dist/main" ]