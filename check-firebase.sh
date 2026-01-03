#!/bin/bash
# Firebase URL Status Check for eSIM Myanmar

echo "Checking Firebase hosting status..."
echo "URL: https://esim-myanmar-ia6gw.web.app"

# Check HTTP status
curl -I -s https://esim-myanmar-ia6gw.web.app | head -1

# Check if site is accessible
curl -s -o /dev/null -w "Response Code: %{http_code}\nTotal Time: %{time_total}s\n" https://esim-myanmar-ia6gw.web.app

echo "Firebase project: esim-myanmar-ia6gw"
echo "Custom domain: www.esim.com.mm"