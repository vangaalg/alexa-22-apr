@echo off
echo Starting deployment process...

REM Kill any existing Node.js processes
taskkill /F /IM node.exe 2>nul

REM Install dependencies
echo Installing dependencies...
call npm install

REM Build the project
echo Building project...
call npm run build

REM Add all changes to git
echo Adding changes to git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Auto deploy: %date% %time%"

REM Push to GitHub
echo Pushing to GitHub...
git push origin main

echo Deployment process completed!
echo Your site will be automatically deployed to Vercel.
pause 