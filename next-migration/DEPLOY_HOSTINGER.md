# Deploy to Hostinger — Guide

## Prerequisites

- Hostinger VPS or Business hosting plan (Node.js support required)
- Domain configured in Hostinger DNS
- SSH access to server
- Supabase project already set up (see SUPABASE_SETUP.md)

---

## Option 1: Hostinger VPS (Recommended)

### 1. Server Setup

```bash
# SSH into your VPS
ssh root@your-server-ip

# Install Node.js 20+ via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Install PM2 for process management
npm install -g pm2

# Install Nginx (reverse proxy)
apt update && apt install nginx -y
```

### 2. Deploy Application

```bash
# Clone or upload project
mkdir -p /var/www/bolero
cd /var/www/bolero

# Upload project files (rsync from local)
# From your local machine:
rsync -avz --exclude node_modules --exclude .next \
  /Users/smarketer/Downloads/boleroo2/next-migration/ \
  root@your-server-ip:/var/www/bolero/

# On server: install deps and build
cd /var/www/bolero
npm install
npm run build
```

### 3. Environment Variables

```bash
# Create .env.local on server
cat > /var/www/bolero/.env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EOF
```

### 4. Start with PM2

```bash
cd /var/www/bolero
pm2 start npm --name "bolero" -- start
pm2 save
pm2 startup
```

### 5. Configure Nginx

```bash
cat > /etc/nginx/sites-available/bolero << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -s /etc/nginx/sites-available/bolero /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 6. SSL Certificate (Let's Encrypt)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Option 2: Hostinger Shared Hosting (Node.js)

If your Hostinger plan supports Node.js applications:

### 1. Build Locally

```bash
cd /Users/smarketer/Downloads/boleroo2/next-migration
npm run build
```

### 2. Upload via File Manager or SSH

Upload the following to your hosting:
- `.next/` (build output)
- `public/` (static assets)
- `node_modules/` (or run `npm install` on server)
- `package.json`
- `.env.local`
- `next.config.ts`

### 3. Configure Node.js in hPanel

1. Go to Hostinger hPanel → **Advanced** → **Node.js**
2. Set Node.js version: 20.x
3. Set entry point: `node_modules/.bin/next`
4. Set arguments: `start`
5. Set environment variables (from .env.local)
6. Click **Start**

---

## Option 3: Standalone Build (Docker-like)

Since `next.config.ts` has `output: "standalone"`:

```bash
# Build locally
npm run build

# The standalone output is in .next/standalone/
# Copy to server:
rsync -avz .next/standalone/ root@server:/var/www/bolero/
rsync -avz .next/static/ root@server:/var/www/bolero/.next/static/
rsync -avz public/ root@server:/var/www/bolero/public/

# On server:
cd /var/www/bolero
node server.js
```

This creates a minimal deployment (no node_modules needed).

---

## Post-Deploy Checklist

- [ ] Verify Supabase env vars are set
- [ ] Test frontend routes: `/{lang}`, `/ge/products`, `/ge/blogs`
- [ ] Test admin login: `/admin/login`
- [ ] Test admin CRUD operations
- [ ] Test contact form submission
- [ ] Test image display (Supabase Storage URLs)
- [ ] Verify SSL certificate
- [ ] Set up automatic restarts (PM2)
- [ ] Configure DNS A records in Hostinger

---

## Updating the Site

```bash
# From local machine:
cd /Users/smarketer/Downloads/boleroo2/next-migration
npm run build

# Deploy:
rsync -avz --exclude node_modules --exclude .env.local \
  ./ root@server:/var/www/bolero/

# On server:
ssh root@server "cd /var/www/bolero && npm install && npm run build && pm2 restart bolero"
```
