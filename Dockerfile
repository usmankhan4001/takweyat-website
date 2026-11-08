# EmDash build: Astro on a Node server. Static pages are prerendered; EmDash admin and its SQLite database run here.
# Mount a persistent volume at /app/data (database + uploads) and set EMDASH_ENCRYPTION_KEY at run time.
FROM node:24-alpine AS build
WORKDIR /app
ARG EMDASH_SITE_URL=https://takweyat.org
ENV EMDASH_SITE_URL=$EMDASH_SITE_URL
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321 DATABASE_PATH=/app/data/emdash.db
ARG EMDASH_SITE_URL=https://takweyat.org
ENV EMDASH_SITE_URL=$EMDASH_SITE_URL
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
RUN mkdir -p data
VOLUME /app/data
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
