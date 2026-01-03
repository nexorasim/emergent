#!/bin/bash
# Domain connectivity check for eSIM Myanmar

echo "Checking www.esim.com.mm..."
curl -I -s --connect-timeout 10 http://www.esim.com.mm | head -1

echo "Checking esim.com.mm..."
curl -I -s --connect-timeout 10 http://esim.com.mm | head -1

echo "Checking HTTPS www.esim.com.mm..."
curl -I -s --connect-timeout 10 https://www.esim.com.mm | head -1

echo "Checking HTTPS esim.com.mm..."
curl -I -s --connect-timeout 10 https://esim.com.mm | head -1