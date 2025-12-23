@echo off
echo ========================================
echo  Sunday Biryani Website Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This will take about 1 minute...
    echo.
    call npm install
    echo.
    echo Installation complete!
    echo.
)

echo Starting server...
echo.
echo ========================================
echo  Server will start at http://localhost:3000
echo  Admin Panel: http://localhost:3000/admin.html
echo  
echo  Login: admin / admin123
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:3000

call npm start
