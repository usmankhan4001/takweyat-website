# EmDash build: Astro on a Node server. Every page renders on the server from the CMS database; EmDash admin and its SQLite database run here.
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
COPY --from=build /app/public ./public
COPY --from=build /app/.emdash ./.emdash
RUN mkdir -p data
VOLUME /app/data
EXPOSE 4321
# Seed the CMS with the site content once per seed version (never overwrites edits), then start the server.
CMD ["sh", "-c", "[ -f data/.seeded-v1 ] || (npx emdash seed -d $DATABASE_PATH .emdash/seed.json && touch data/.seeded-v1); exec node ./dist/server/entry.mjs"]
