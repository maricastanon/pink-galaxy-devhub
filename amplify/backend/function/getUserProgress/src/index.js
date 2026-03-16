// Lambda function to get user progress in Pink Galaxy DevHub
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('🌸 GetUserProgress Lambda triggered:', JSON.stringify(event, null, 2));
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
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
        const userId = event.pathParameters?.userId || event.queryStringParameters?.userId;
        const moduleId = event.queryStringParameters?.moduleId;

        if (!userId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Missing required parameter: userId' 
                })
            };
        }

        let params;

        if (moduleId) {
            // Get specific module progress
            params = {
                TableName: process.env.USER_PROGRESS_TABLE || `UserProgress-${process.env.ENV}`,
                Key: {
                    userId,
                    moduleId
                }
            };

            const result = await dynamodb.get(params).promise();

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    data: result.Item || null
                })
            };

        } else {
            // Get all user progress
            params = {
                TableName: process.env.USER_PROGRESS_TABLE || `UserProgress-${process.env.ENV}`,
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': userId
                }
            };

            const result = await dynamodb.query(params).promise();

            // Transform the data for easier frontend consumption
            const progressMap = {};
            let totalXP = 0;
            let completedModules = 0;

            result.Items.forEach(item => {
                progressMap[item.moduleId] = {
                    sectionProgress: item.sectionProgress || {},
                    progressPercentage: item.progressPercentage || 0,
                    totalXP: item.totalXP || 0,
                    lastUpdated: item.lastUpdated,
                    completedAt: item.completedAt
                };

                totalXP += item.totalXP || 0;
                if (item.progressPercentage === 100) {
                    completedModules++;
                }
            });

            const summary = {
                totalModules: result.Items.length,
                completedModules,
                totalXP,
                overallProgress: result.Items.length > 0 ? 
                    Math.round(result.Items.reduce((sum, item) => sum + (item.progressPercentage || 0), 0) / result.Items.length) : 0
            };

            console.log('✅ Progress retrieved successfully:', { userId, moduleCount: result.Items.length });

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    data: {
                        progress: progressMap,
                        summary
                    }
                })
            };
        }

    } catch (error) {
        console.error('❌ Error getting progress:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to get progress',
                message: error.message
            })
        };
    }
};