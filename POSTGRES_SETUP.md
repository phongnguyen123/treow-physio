# Vercel Postgres Migration - Setup Guide

## 🎯 Overview

This guide will help you complete the migration to Vercel Postgres.

---

## 📋 Prerequisites

1. ✅ Vercel Postgres database created
2. ✅ `@vercel/postgres` installed
3. ✅ Migration scripts created

---

## 🚀 Step-by-Step Setup

### Step 1: Get Database Connection String

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Select your Postgres database
4. Copy the connection strings:
   - `POSTGRES_URL` (for application)
   - `POSTGRES_URL_NON_POOLING` (for migrations)

### Step 2: Set Environment Variables Locally

Create or update `.env.local`:

```env
# Vercel Postgres
POSTGRES_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?sslmode=require"

# Other existing variables
NEXT_PUBLIC_BASE_URL=https://treowclinic.com
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=your-app-password
SMTP_FROM_NAME=TREOW Physiotherapy
REVALIDATE_SECRET=your-secret-key
```

### Step 3: Initialize Database Schema

Run the initialization script to create tables:

```bash
npx tsx scripts/init-db.ts
```

Expected output:
```
🚀 Starting database initialization...
📡 Testing database connection...
✅ Database connection successful!
📋 Creating bookings table...
✅ Bookings table created
📧 Creating newsletters table...
✅ Newsletters table created
✍️ Creating authors table...
✅ Authors table created
📝 Creating posts table...
✅ Posts table created
🔍 Creating indexes...
✅ Indexes created
🎉 Database initialization completed successfully!
```

### Step 4: Migrate Existing Data

Run the data migration script:

```bash
npx tsx scripts/migrate-data.ts
```

This will:
- Read data from JSON files in `/data` folder
- Insert into Postgres tables
- Handle duplicates gracefully

### Step 5: Test Locally

```bash
npm run dev
```

Test the following:
1. ✅ View existing posts/authors
2. ✅ Create a new booking
3. ✅ Subscribe to newsletter
4. ✅ Admin panel operations

### Step 6: Deploy to Vercel

1. **Commit and push** your changes:
```bash
git add .
git commit -m "feat: migrate to Vercel Postgres"
git push
```

2. **Vercel will auto-deploy**
   - Environment variables are already set (from Vercel Storage)
   - Migration scripts don't need to run (tables already created)

3. **Verify on production**:
   - Test booking creation
   - Test newsletter subscription
   - Check admin panel

---

## 🔄 How It Works

### Automatic Fallback

The database layer (`lib/db.ts`) automatically detects the environment:

- **With Postgres** (`POSTGRES_URL` exists):
  - Uses Vercel Postgres
  - All CRUD operations work
  - Data persists across deployments

- **Without Postgres** (local dev without env var):
  - Falls back to JSON files
  - Read-only on Vercel
  - Useful for local development

### Database Structure

```
📊 Vercel Postgres
├── bookings (appointments)
├── newsletters (email subscribers)
├── authors (content authors)
└── posts (blog posts/articles)
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"

**Check**:
1. `POSTGRES_URL` is set correctly
2. Connection string includes password
3. Vercel Postgres is active

**Fix**:
```bash
# Test connection
npx tsx -e "import { sql } from '@vercel/postgres'; sql\`SELECT 1\`.then(() => console.log('OK'))"
```

### Error: "Table does not exist"

**Fix**: Run initialization script
```bash
npx tsx scripts/init-db.ts
```

### Error: "Duplicate key value"

**Cause**: Data already exists in database

**Fix**: This is normal if you run migration twice. The script uses `ON CONFLICT` to handle duplicates.

### Bookings not saving

**Check**:
1. Postgres is configured
2. Tables are created
3. Check Vercel logs for errors

---

## 📊 Monitoring

### View Data in Vercel Dashboard

1. Go to Vercel project → Storage
2. Click on your Postgres database
3. Use **Data** tab to browse tables
4. Use **Query** tab to run SQL

### Example Queries

```sql
-- Count bookings
SELECT COUNT(*) FROM bookings;

-- Recent bookings
SELECT * FROM bookings ORDER BY created_at DESC LIMIT 10;

-- Newsletter subscribers
SELECT COUNT(*) FROM newsletters WHERE status = 'ACTIVE';

-- Published posts
SELECT COUNT(*) FROM posts WHERE published = true;
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Database connection works
- [ ] All 4 tables created
- [ ] Indexes created
- [ ] Existing data migrated
- [ ] Bookings can be created
- [ ] Newsletter subscription works
- [ ] Admin panel works
- [ ] Production deployment successful

---

## 🎉 Success!

Your application is now using Vercel Postgres! 

**Benefits**:
- ✅ Data persists across deployments
- ✅ Scalable and reliable
- ✅ Automatic backups
- ✅ Works on Vercel production
- ✅ Fast query performance

---

## 📞 Need Help?

- Vercel Postgres Docs: https://vercel.com/docs/storage/vercel-postgres
- Vercel Support: https://vercel.com/support

**Last updated**: December 30, 2024
