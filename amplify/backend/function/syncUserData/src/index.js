// Lambda function for real-time sync in Pink Galaxy DevHub
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('🌸 SyncUserData Lambda triggered:', JSON.stringify(event, null, 2));
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS'
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
        const { action, userId, data, lastSyncTime } = JSON.parse(event.body || '{}');

        switch (action) {
            case 'sync_progress':
                return await syncProgress(userId, data, lastSyncTime, headers);
                
            case 'sync_notebooks':
                return await syncNotebooks(userId, data, lastSyncTime, headers);
                
            case 'get_sync_status':
                return await getSyncStatus(userId, headers);
                
            default:
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        error: 'Invalid action. Supported actions: sync_progress, sync_notebooks, get_sync_status'
                    })
                };
        }

    } catch (error) {
        console.error('❌ Error in sync operation:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Sync operation failed',
                message: error.message
            })
        };
    }
};

async function syncProgress(userId, localData, lastSyncTime, headers) {
    if (!userId || !localData) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Missing userId or data for progress sync' })
        };
    }

    // Get latest progress from DynamoDB
    const params = {
        TableName: process.env.USER_PROGRESS_TABLE || `UserProgress-${process.env.ENV}`,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    const result = await dynamodb.query(params).promise();
    
    // Build server data map
    const serverData = {};
    result.Items.forEach(item => {
        serverData[item.moduleId] = {
            sectionProgress: item.sectionProgress || {},
            lastUpdated: item.lastUpdated
        };
    });

    // Merge logic: most recent wins
    const mergedData = {};
    const conflicts = [];

    // Process local data
    for (const [moduleId, localModule] of Object.entries(localData)) {
        const serverModule = serverData[moduleId];
        
        if (!serverModule) {
            // Local only - keep local
            mergedData[moduleId] = localModule;
        } else {
            // Compare timestamps
            const localTime = new Date(localModule.lastUpdated || 0);
            const serverTime = new Date(serverModule.lastUpdated || 0);
            
            if (localTime > serverTime) {
                // Local is newer
                mergedData[moduleId] = localModule;
            } else if (serverTime > localTime) {
                // Server is newer
                mergedData[moduleId] = serverModule;
                conflicts.push({
                    moduleId,
                    reason: 'Server data is newer',
                    serverTime: serverTime.toISOString(),
                    localTime: localTime.toISOString()
                });
            } else {
                // Same time - merge section progress
                mergedData[moduleId] = {
                    ...serverModule,
                    sectionProgress: {
                        ...serverModule.sectionProgress,
                        ...localModule.sectionProgress
                    }
                };
            }
        }
    }

    // Process server-only data
    for (const [moduleId, serverModule] of Object.entries(serverData)) {
        if (!localData[moduleId]) {
            mergedData[moduleId] = serverModule;
        }
    }

    // Save merged data back to DynamoDB
    const writePromises = [];
    for (const [moduleId, moduleData] of Object.entries(mergedData)) {
        const putParams = {
            TableName: process.env.USER_PROGRESS_TABLE || `UserProgress-${process.env.ENV}`,
            Item: {
                userId,
                moduleId,
                sectionProgress: moduleData.sectionProgress || {},
                lastUpdated: new Date().toISOString(),
                progressPercentage: calculateProgress(moduleData.sectionProgress || {})
            }
        };
        writePromises.push(dynamodb.put(putParams).promise());
    }

    await Promise.all(writePromises);

    console.log('✅ Progress sync completed for user:', userId, 'Conflicts:', conflicts.length);

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            success: true,
            data: mergedData,
            conflicts,
            syncTime: new Date().toISOString(),
            message: `Synced ${Object.keys(mergedData).length} modules with ${conflicts.length} conflicts resolved`
        })
    };
}

async function syncNotebooks(userId, localNotebooks, lastSyncTime, headers) {
    // Similar implementation for notebooks
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            success: true,
            message: 'Notebook sync not yet implemented',
            data: localNotebooks || {}
        })
    };
}

async function getSyncStatus(userId, headers) {
    // Get last sync times and data checksums
    const progressParams = {
        TableName: process.env.USER_PROGRESS_TABLE || `UserProgress-${process.env.ENV}`,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    const progressResult = await dynamodb.query(progressParams).promise();
    
    const lastModified = progressResult.Items.length > 0 
        ? Math.max(...progressResult.Items.map(item => new Date(item.lastUpdated || 0).getTime()))
        : 0;

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            success: true,
            syncStatus: {
                lastModified: new Date(lastModified).toISOString(),
                totalModules: progressResult.Items.length,
                serverTime: new Date().toISOString()
            }
        })
    };
}

function calculateProgress(sectionProgress) {
    const total = Object.keys(sectionProgress).length;
    const completed = Object.values(sectionProgress).filter(Boolean).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
}