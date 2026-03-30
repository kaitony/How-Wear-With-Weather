FROM node:22-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable
RUN yarn set version berry
RUN yarn install --frozen-lockfile --immutable;

COPY . .

RUN yarn build;

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
