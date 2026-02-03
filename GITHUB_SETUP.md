# AI Creator Studio - GitHub Setup Guide

## 📋 ขั้นตอนการ Setup GitHub

### ขั้นตอนที่ 1: สร้าง Repository บน GitHub

1. ไปที่ https://github.com/new
2. ใส่ชื่อ Repository: `ai-creator-studio`
3. ใส่ Description: `AI Creator Studio - Unlimited Content Creation App`
4. เลือก "Public" (เพื่อให้ GitHub Actions ทำงาน)
5. คลิก "Create repository"

### ขั้นตอนที่ 2: Upload โปรเจกต์

**ใช้ Git (ถ้ามี):**
```bash
cd /home/ubuntu/ai-creator-studio
git init
git add .
git commit -m "Initial commit: AI Creator Studio"
git branch -M main
git remote add origin https://github.com/maemb3703/ai-creator-studio.git
git push -u origin main
```

**หรือใช้ GitHub Web Interface:**
1. ไปที่ Repository ที่สร้าง
2. คลิก "Add file" > "Upload files"
3. Drag & drop ไฟล์จาก `/home/ubuntu/ai-creator-studio`

### ขั้นตอนที่ 3: Setup Expo Token

1. ไปที่ https://expo.dev/settings/tokens
2. สร้าง Token ใหม่
3. คัดลอก Token

### ขั้นตอนที่ 4: เพิ่ม Secret ใน GitHub

1. ไปที่ Repository > Settings > Secrets and variables > Actions
2. คลิก "New repository secret"
3. ชื่อ: `EXPO_TOKEN`
4. ค่า: (Paste token ที่ได้จากขั้นตอนที่ 3)
5. คลิก "Add secret"

### ขั้นตอนที่ 5: Trigger Build

1. ไปที่ Repository > Actions
2. เลือก "Build APK"
3. คลิก "Run workflow"
4. รอให้ build เสร็จ (10-15 นาที)

### ขั้นตอนที่ 6: ดาวน์โหลด APK

1. ไปที่ Actions > Build APK (workflow ล่าสุด)
2. ไปที่ "Artifacts"
3. ดาวน์โหลด `apk`

---

## 🔗 ลิงก์ที่สำคัญ

- Repository: https://github.com/maemb3703/ai-creator-studio
- Actions: https://github.com/maemb3703/ai-creator-studio/actions
- Expo Tokens: https://expo.dev/settings/tokens

---

## 📱 ติดตั้งบนมือถือ

1. ดาวน์โหลด APK จาก GitHub
2. ไปที่ Settings > Security > เปิด "Unknown sources"
3. เปิด File Manager > Downloads
4. แตะไฟล์ APK > Install
5. รอให้เสร็จ > Open

---

## 🆘 ปัญหาที่อาจเจอ

### Build failed
- ตรวจสอบ Expo Token
- ตรวจสอบ app.config.ts

### Cannot download APK
- ตรวจสอบว่า workflow สำเร็จ
- ตรวจสอบ Artifacts

---

**ขอให้สำเร็จ! 🎉**
