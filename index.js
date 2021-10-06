const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const KEYFILEPATH = './ServiceAccount.json';
const SCOPES = ['http://www.googleapis.com/auth/drive'];
const auth = new google.auth.GoogleAuth({
    keyFile = KEYFILEPATH,
    scopes = SCOPES
})
async function createAndUploadFile(auth){
    const driveService = google.drive({version:'v3',auth});
    let fileMetaData = {
        'name': 'C:\\Users\\minhd\\Downloads\\download.jpg',
        'parents': ['10krlloIS2i_2u_ewkdv3_1NqcpmWSL1w']

    }

    let media = {
        mineType: 'image/png',
        body : fs.createReadStream('icon.png')
    }

    let response = await driveService.files.create({
        response:fileMetaData,
        media : media,
        fields: 'id'
    })

    switch(response.status){
        case 200:
            console.log('File created id:', response.data.id)
            break;
        default:
            console.error('Error create id:',response.error)
            break;
    }

}

createAndUploadFile(auth).catch(console.error);