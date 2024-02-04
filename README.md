# Development
Steps to upload in development

1. Build the database
```
    docker compose up -d
```

2. Rename env.template file to .env
3. Replace enviroment variables
4. Execute seed to [build the database](localhost:3000/api/seed)

# Prisma commands
```
    npx prisma init
    npx prisma migrate dev
    npx prisma generate
```

# Production

# Stage