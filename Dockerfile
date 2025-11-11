FROM node:22-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy rest of the app code
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3001

# Start app
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start"]
