@echo off
echo eSIM Myanmar - Fix Update

echo Updating dependencies...
cd frontend
npm update
npm audit fix

echo Updating backend...
cd ../backend
pip install --upgrade -r requirements.txt

echo Fix update complete
pause