# Deployment Notes

## Current Issue: Backend on Render Free Tier

Your backend is timing out because Render's free tier spins down after 15 minutes of inactivity.

### Quick Fix for Demo:
1. **Wake up backend before demo:**
   - Visit: https://backend-studybuddy.onrender.com/api
   - Wait 30-60 seconds for it to start
   - Then test your frontend

2. **Add health check endpoint:**
   Add to `backend/app.js`:
   ```js
   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok', timestamp: new Date().toISOString() });
   });
   ```

3. **Keep backend alive (temporary):**
   Use a service like UptimeRobot or Cron-job.org to ping your backend every 10 minutes

### Better Solutions:

#### Option 1: Add Loading States (Recommended for hackathon)
Show users "Waking up server..." message while backend starts (takes ~30 secs)

#### Option 2: Upgrade Render ($7/month)
Never sleeps, instant response

#### Option 3: Deploy to Railway/Fly.io
Similar free tier but better performance

## Demo Day Checklist:
- [ ] Wake up backend 5 minutes before presenting
- [ ] Test login flow
- [ ] Test upload notes → generate quiz
- [ ] Have backup video recording ready
