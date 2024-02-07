# Development
Steps to upload in development

1. Build the database image in Docker
```
    docker compose up -d
```

2. Create a copy of the env.template file, and rename it to .env
3. Replace enviroment variables
4. Execute ``` npm install ```
5. Execute ``` npm run dev ```
6. Execute prisma commands 
```
    npx prisma migrate dev  
    npx prisma generate
```
7. Execute seed to [build the database](localhost:3000/api/seed)

# Prisma commands
```
    npx prisma init
    npx prisma migrate dev
    npx prisma generate
```

# Production

# Stage