// Lambda function to save user progress in Pink Galaxy DevHub
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('🌸 SaveUserProgress Lambda triggered:', JSON.stringify(event, null, 2));
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Parse the request body
        const { userId, moduleId, sectionProgress, totalXP, completedAt } = JSON.parse(event.body);

        if (!userId || !moduleId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Missing required fields: userId and moduleId are required' 
                })
            };
        }

        // Calculate progress percentage
        const totalSections = Object.keys(sectionProgress || {}).length;
        const completedSections = Object.values(sectionProgress || {}).filter(Boolean).length;
        const progressPercentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

        // Prepare DynamoDB item
        const item = {
            userId,
            moduleId,
            sectionProgress: sectionProgress || {},
            progressPercentage,
            totalXP: totalXP || 0,
            lastUpdated: new Date().toISOString(),
            completedAt: progressPercentage === 100 ? (completedAt || new Date().toISOString()) : null
        };

        // Save to DynamoDB
        const params = {
            TableName: process.env.USER_PROGRESS_TABLE || `UserProgress-${process.env.ENV}`,
            Item: item
        };

        await dynamodb.put(params).promise();

        console.log('✅ Progress saved successfully:', { userId, moduleId, progressPercentage });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Progress saved successfully',
                data: {
                    userId,
                    moduleId,
                    progressPercentage,
                    lastUpdated: item.lastUpdated
                }
            })
        };

    } catch (error) {
        console.error('❌ Error saving progress:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to save progress',
                message: error.message
            })
        };
    }
};