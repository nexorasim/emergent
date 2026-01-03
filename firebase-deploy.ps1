# Firebase CLI Setup and Deploy Script
# Project: eSIM Myanmar (esim-myanmar-ia6gw)

Write-Host "[1%] Firebase CLI Installation and Deployment Setup"

# Install Firebase CLI
Write-Host "[10%] Installing Firebase CLI..."
npm install -g firebase-tools

# Login to Firebase
Write-Host "[20%] Firebase Login (browser will open)..."
firebase login

# Initialize Firebase project
Write-Host "[30%] Initializing Firebase project..."
cd frontend
firebase init hosting

# Configure firebase.json
Write-Host "[40%] Configuring firebase.json..."
$firebaseConfig = @"
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
"@

$firebaseConfig | Out-File -FilePath "firebase.json" -Encoding UTF8

# Build application
Write-Host "[60%] Building React application..."
npm run build

# Deploy to Firebase Hosting
Write-Host "[80%] Deploying to Firebase Hosting..."
firebase deploy --only hosting --project esim-myanmar-ia6gw

Write-Host "[100%] Firebase deployment complete!"
Write-Host "Live URL: https://esim-myanmar-ia6gw.web.app"
Write-Host "Custom domain: https://www.esim.com.mm"