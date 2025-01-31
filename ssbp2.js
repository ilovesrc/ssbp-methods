const bedrock = require('bedrock-protocol');

const invite = '';

const client = bedrock.createClient({
    realms: {
        realmInvite: invite
    },
    skinData: {
        DeviceOS: 11,
        PersonaPieces: [],
    },
    offline: false,
    skipPing: true,
    profilesFolder: './auth'
});

client.on('join', async () => {
    console.log(`[LOG] connected to realm > ${invite} > ${client.username}`);
});

client.on('close', async () => {
    console.log(`[LOG] left realm > ${invite} > ${client.username}`);
});

client.on('disconnect', (packet) => {
    console.error('[LOG] realm disconnect > ', packet.reason);
});

client.on('error', (err) => {
    console.error('[LOG] error > ', err.message);
});
