#!/bin/bash

echo "🤖 Telegram Bot Setup for CI/CD Notifications"
echo "=============================================="
echo ""

echo "📱 Step 1: Create a Telegram Bot"
echo "---------------------------------"
echo "1. Open Telegram and search for @BotFather"
echo "2. Send /newbot command"
echo "3. Follow the instructions to create your bot"
echo "4. Copy the bot token when provided"
echo ""

read -p "Enter your bot token: " BOT_TOKEN

if [ -z "$BOT_TOKEN" ]; then
    echo "❌ Bot token is required!"
    exit 1
fi

echo ""
echo "👥 Step 2: Get Chat ID"
echo "----------------------"
echo "Choose one of the following options:"
echo "1. Personal messages (direct to bot)"
echo "2. Group chat (add bot to group)"
echo ""

read -p "Enter choice (1 or 2): " CHAT_OPTION

if [ "$CHAT_OPTION" = "1" ]; then
    echo ""
    echo "📱 For personal messages:"
    echo "1. Search for your bot in Telegram"
    echo "2. Send any message to your bot (e.g., /start)"
    echo "3. Press Enter when done..."
    read -p ""
    
    echo "🔍 Getting your chat ID..."
    RESPONSE=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates")
    CHAT_ID=$(echo $RESPONSE | grep -o '"chat":{"id":[^,]*' | head -1 | grep -o '[0-9-]*')
    
elif [ "$CHAT_OPTION" = "2" ]; then
    echo ""
    echo "👥 For group chat:"
    echo "1. Create a group or use existing one"
    echo "2. Add your bot to the group"
    echo "3. Send any message in the group"
    echo "4. Press Enter when done..."
    read -p ""
    
    echo "🔍 Getting group chat ID..."
    RESPONSE=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates")
    CHAT_ID=$(echo $RESPONSE | grep -o '"chat":{"id":[^,]*' | tail -1 | grep -o '[0-9-]*')
    
else
    echo "❌ Invalid choice!"
    exit 1
fi

if [ -z "$CHAT_ID" ]; then
    echo "❌ Could not retrieve chat ID. Please:"
    echo "1. Make sure you sent a message to the bot"
    echo "2. Check that the bot token is correct"
    echo "3. Try running the script again"
    exit 1
fi

echo ""
echo "✅ Chat ID found: $CHAT_ID"
echo ""

echo "🧪 Step 3: Test the Setup"
echo "-------------------------"
echo "Sending test message..."

TEST_MESSAGE="🎉 Telegram bot setup successful! Your CI/CD notifications are ready."
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "{\"chat_id\": \"${CHAT_ID}\", \"text\": \"${TEST_MESSAGE}\"}" \
    > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Test message sent successfully!"
else
    echo "❌ Failed to send test message. Please check your setup."
    exit 1
fi

echo ""
echo "🔐 Step 4: GitHub Secrets"
echo "-------------------------"
echo "Add these secrets to your GitHub repository:"
echo ""
echo "Secret Name: TELEGRAM_BOT_TOKEN"
echo "Secret Value: $BOT_TOKEN"
echo ""
echo "Secret Name: TELEGRAM_CHAT_ID"
echo "Secret Value: $CHAT_ID"
echo ""

echo "📍 How to add secrets to GitHub:"
echo "1. Go to your repository on GitHub"
echo "2. Click Settings → Secrets and variables → Actions"
echo "3. Click 'New repository secret'"
echo "4. Add both secrets with the names and values above"
echo ""

echo "🌍 For environment-specific secrets (staging/production):"
echo "1. Go to Settings → Environments"
echo "2. Create 'staging' and 'production' environments"
echo "3. Add the same secrets to each environment"
echo ""

echo "✅ Setup Complete!"
echo ""
echo "Your Telegram bot is ready for CI/CD notifications."
echo "You'll receive messages for:"
echo "  ✅ Successful builds and deployments"
echo "  ❌ Failed builds and deployments"  
echo "  🚨 Security alerts"
echo "  🧹 Cleanup notifications"
echo ""
echo "🚀 Next steps:"
echo "1. Add the secrets to GitHub (see instructions above)"
echo "2. Push a commit to trigger the CI/CD pipeline"
echo "3. Check your Telegram for notifications!" 
