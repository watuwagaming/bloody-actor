# Deploying to your VPS

This site is pure static HTML. Any web server can host it — Nginx, Apache, Caddy, or even `python -m http.server` for a quick test.

Below is the standard Nginx setup (most common on DigitalOcean droplets).

---

## 1. Copy files to your VPS

From your local machine (Windows PowerShell):

```powershell
# Replace user@your-vps-ip with your actual SSH details
scp -r C:\bloody-actor user@your-vps-ip:/var/www/
```

Or use `rsync` if you have it:

```bash
rsync -avz --delete C:/bloody-actor/ user@your-vps-ip:/var/www/bloody-actor/
```

Then SSH into the VPS:

```bash
ssh user@your-vps-ip
```

---

## 2. Set permissions

```bash
sudo chown -R www-data:www-data /var/www/bloody-actor
sudo chmod -R 755 /var/www/bloody-actor
```

---

## 3. Create the Nginx server block

Once you've bought your domain (e.g. `bloodyactor.com`), point its DNS A-record to your VPS IP first.

Then:

```bash
sudo nano /etc/nginx/sites-available/bloody-actor
```

Paste this (replace `bloodyactor.com` with your real domain):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name bloodyactor.com www.bloodyactor.com;

    root /var/www/bloody-actor;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache images aggressively
    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip for HTML/CSS/JS
    gzip on;
    gzip_types text/html text/css application/javascript;
}
```

Save (`Ctrl+O`, Enter, `Ctrl+X`).

---

## 4. Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/bloody-actor /etc/nginx/sites-enabled/
sudo nginx -t          # test the config
sudo systemctl reload nginx
```

Visit `http://bloodyactor.com` — you should see your portfolio.

---

## 5. Add HTTPS (free, via Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bloodyactor.com -d www.bloodyactor.com
```

Follow the prompts. Certbot rewrites your Nginx config to redirect HTTP → HTTPS automatically. Renews happen on a cron timer — set and forget.

---

## 6. Updating the site later

Whenever you change `index.html` or add new images, just push the changed files up:

```powershell
# From Windows:
scp C:\bloody-actor\index.html user@your-vps-ip:/var/www/bloody-actor/
scp C:\bloody-actor\assets\images\*.jpg user@your-vps-ip:/var/www/bloody-actor/assets/images/
```

No restart, no build, no rebuild. Browser refresh shows the new version instantly.

---

## Quick local preview

Before deploying, you can test it locally — just double-click `index.html`. Or for a proper local server:

```powershell
cd C:\bloody-actor
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
