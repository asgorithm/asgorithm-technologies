# Build the static export with Node, then serve the files with an unprivileged
# nginx. No Node.js process exists in the runtime image, so the class of
# Next.js server RCE behind the 2026-08-20 incident has nothing to reach.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
USER 101
EXPOSE 8080
