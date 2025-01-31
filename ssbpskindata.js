const bedrock = require('bedrock-protocol');
const { setTimeout } = require('timers/promises');
const skinData = require('./data/ssbp.json');
const { NIL, v3: uuidv3, v4: uuidv4 } = require('uuid');

async function ssbp(realmCode, duration, nameSpoof) {
    try {
        const name = nameSpoof || "§4raks";

        console.log(`[LOG] connecting to realm > ${realmCode} > ${name}`);

        const raks = bedrock.createClient({
            profilesFolder: './auth',
            offline: false,
            skinData: {
                CurrentInputMode: 3,
                DefaultInputMode: 3,
                DeviceOS: 11,
                DeviceId: uuidv3(uuidv4(), NIL),
                PlatformOnlineId: generateRandomString(19, '1234567890'),
                PrimaryUser: false,
                SelfSignedId: uuidv4(),
                ThirdPartyName: name,
                ThirdPartyNameOnly: true,
                TrustedSkin: true,
                ...skinData,
            },
            realms: {
                [realmCode.length === 8 ? 'realmId' : 'realmInvite']: realmCode,
            },
        });

        raks.on('join', async () => {
            console.log(`[LOG] connected to realm > ${realmCode} > ${name}`);
        });

        raks.on('error', (err) => {
            console.error('[LOG] realm error > message: ', err.message || 'unknown error');
        });

        raks.on('close', async () => {
            console.log(`[LOG] left realm > ${invite} > ${raks.username}`);
        });

        await setTimeout(duration * 1000);
        raks.disconnect();
        console.log('[LOG] time up.');
    } catch (error) {
        console.error('[LOG] dev error > message: ', error.message || 'unknown error');
    }
}

function generateRandomString(length, charSet) {
    if (!charSet) charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return result;
}


const realmCode = ''
const duration = 6000
const nameSpoof = '§4raks'
ssbp(realmCode, parseInt(duration), nameSpoof);
