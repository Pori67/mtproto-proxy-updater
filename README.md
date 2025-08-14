# MTProto Proxy Updater

این پروژه یک ابزار خودکار برای آپدیت لیست پروکسی‌های MTProto تلگرام است. لیست از API عمومی fetch می‌شود و روی GitHub Pages نمایش داده می‌شود. مناسب برای کاربران در مناطق محدود مثل ایران.

## ویژگی‌ها
- آپدیت خودکار هر 5 دقیقه با GitHub Actions.
- نمایش لیست روی صفحه وب (index.html).
- امنیت پایه: چک کشور (فقط ایران مجاز)، rate limiting ساده.
- الهام‌گرفته از کد پروکسی Telegram API برای retry و circuit breaker.

## نحوه استفاده
- لیست JSON: `/mtproto.json`
- صفحه وب: `<your-username>.github.io/mtproto-proxy-updater/`

## منبع داده
لیست از API https://mtpro.xyz/api/?type=mtproto گرفته می‌شود.

## نصب محلی
- `node update.js` برای آپدیت دستی.

تاریخ ساخت: August 14, 2025