# AI Creator Studio - Backend Server

Backend server สำหรับ AI Creator Studio ที่ให้บริการ API สำหรับการสร้างเนื้อหา

## Features

- Chat AI Integration
- Image Generation
- Character Generation
- Emoji Generation
- Audio/Voice Generation
- Music Generation
- Video Generation
- Image Analysis & Enhancement
- Translation

## Setup

### Install Dependencies
```bash
pnpm install
```

### Environment Variables
สร้างไฟล์ `.env` ในไดเรกทอรี่ root:

```env
PORT=3000
NODE_ENV=development
```

### Run Development Server
```bash
pnpm dev:server
```

### Build for Production
```bash
pnpm build
pnpm start
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Chat
```
POST /api/chat
Body: { message: string, personality?: string }
```

### Image Generation
```
POST /api/generate/image
Body: { prompt: string, style?: string, quality?: "low" | "medium" | "high" }
```

### Character Generation
```
POST /api/generate/character
Body: { description: string, style?: string }
```

### Emoji Generation
```
POST /api/generate/emoji
Body: { description: string }
```

### Audio Generation
```
POST /api/generate/audio
Body: { text: string, voice?: string, speed?: number, language?: "th" | "en" }
```

### Music Generation
```
POST /api/generate/music
Body: { prompt: string, genre?: string, duration?: number }
```

### Video Generation
```
POST /api/generate/video
Body: { prompt: string, duration?: number }
```

### Image Analysis
```
POST /api/analyze/image
Body: { imageUrl: string }
```

### Image Enhancement
```
POST /api/enhance/image
Body: { imageUrl: string, enhancement: "upscale" | "denoise" | "colorize" }
```

### Translation
```
POST /api/translate
Body: { text: string, targetLanguage: "th" | "en" }
```

## Integration with Manus AI

ใช้ AI ของ Manus โดยตรงในแอปพลิเคชั่น ไม่ต้องให้ API key

## Database

ปัจจุบันใช้ AsyncStorage สำหรับเก็บข้อมูลท้องถิ่น
สามารถเพิ่ม PostgreSQL หรือ MongoDB ได้ในอนาคต

## Security

- CORS enabled
- Input validation
- Error handling
- Rate limiting (optional)

## Deployment

สามารถ deploy ไปยัง:
- Heroku
- Vercel
- AWS
- DigitalOcean
- Railway

## Support

สำหรับปัญหาหรือคำถาม โปรดติดต่อ support@aicreatostudio.com
