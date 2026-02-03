# AI Creator Studio - Build Instructions

## การสร้าง APK สำหรับ Android

### ข้อกำหนดเบื้องต้น

1. **Expo CLI** - ติดตั้งแล้ว
2. **EAS CLI** - ติดตั้ง: `npm install -g eas-cli`
3. **Expo Account** - สร้างบัญชี: https://expo.dev

### ขั้นตอนการ Build

#### 1. ตั้งค่า EAS (ครั้งแรก)
```bash
cd /home/ubuntu/ai-creator-studio
eas login
eas init
```

#### 2. Build APK
```bash
# Build APK สำหรับ Android
eas build --platform android --local

# หรือ Build ผ่าน Expo Cloud (แนะนำ)
eas build --platform android
```

#### 3. ติดตั้ง APK บนอุปกรณ์
```bash
# ดาวน์โหลด APK จากลิงก์ที่ได้จาก EAS
# หรือใช้ adb ในการติดตั้ง
adb install app-release.apk
```

### Build ด้วย Expo Go (ทดสอบเร็ว)

```bash
# เริ่ม dev server
pnpm dev

# สแกน QR code ด้วย Expo Go app บนมือถือ
```

### Build ด้วย Development Build

```bash
# สร้าง development build
eas build --platform android --profile preview

# ติดตั้งบนอุปกรณ์
```

### Build APK ท้องถิ่น (Local)

```bash
# ติดตั้ง Android SDK
# ตั้งค่า ANDROID_HOME environment variable

# Build APK
eas build --platform android --local

# APK จะอยู่ใน ./dist/
```

## การสร้าง IPA สำหรับ iOS

### ข้อกำหนดเบื้องต้น

1. **Mac** - จำเป็นต้องใช้ Mac เพื่อ build iOS
2. **Xcode** - ติดตั้ง Xcode Command Line Tools
3. **Apple Developer Account** - สำหรับ Code Signing

### ขั้นตอนการ Build

```bash
# Build IPA
eas build --platform ios

# หรือ build ท้องถิ่น
eas build --platform ios --local
```

## การ Build Web

```bash
# Build web version
expo export --platform web

# Output จะอยู่ใน ./web-build/
```

## Troubleshooting

### ปัญหา: "Build failed"
- ตรวจสอบ Node.js version: `node --version` (ต้อง >= 16)
- ลบ node_modules: `rm -rf node_modules && pnpm install`
- ล้าง cache: `pnpm store prune`

### ปัญหา: "Permission denied"
- ตรวจสอบ Android SDK permissions
- ใช้ `sudo` ถ้าจำเป็น

### ปัญหา: "Build timeout"
- ลองใช้ `--local` flag
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต

## ขนาด APK

- **Release APK**: ~50-70 MB
- **Debug APK**: ~80-100 MB

## ตัวเลือก Build

| Option | ค่า | คำอธิบาย |
|--------|-----|---------|
| `--platform` | `android`, `ios`, `web` | Platform ที่ต้องการ build |
| `--profile` | `preview`, `production` | Profile ของ build |
| `--local` | - | Build ท้องถิ่นแทน cloud |
| `--wait` | - | รอจนกว่า build เสร็จ |
| `--auto-submit` | - | ส่ง build ไปยัง app store โดยอัตโนมัติ |

## สำหรับ Production

```bash
# Build production APK
eas build --platform android --profile production

# ส่งไปยัง Google Play Store
eas submit --platform android --latest
```

## การทดสอบ APK

```bash
# ติดตั้ง APK
adb install app-release.apk

# เปิดแอป
adb shell am start -n space.manus.ai.creator.studio.t20260203/.MainActivity

# ดูเอาต์พุต
adb logcat
```

## ลิงก์ที่เป็นประโยชน์

- [Expo Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Build Setup](https://docs.expo.dev/build/setup/)
- [Android Build Guide](https://docs.expo.dev/build-reference/android/)
- [iOS Build Guide](https://docs.expo.dev/build-reference/ios/)

## สำหรับความช่วยเหลือ

ติดต่อ: support@aicreatostudio.com
