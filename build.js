'use strict';

var execSync = require('child_process').execSync,
	fs = require('fs');

console.log('Building resume');
execSync('npm run build');

function cleanBadChars(documentStr){
	var updatedDocument = documentStr.replace(/—/g, '&ndash;');
	return updatedDocument
}

function addAnalytics(documentStr){
	var trackingCode = fs.readFileSync('./tracking.html', { encoding: 'utf-8' });
	
	return documentStr.replace('<body>', '<body>' + '\n' + trackingCode);
}

console.log('Reading resume doc');
var finalDoc = fs.readFileSync('./cstead-resume.html', { encoding: 'utf-8'});

console.log('Replacing bad characters');
finalDoc = cleanBadChars(finalDoc);

console.log('Adding tracking code');
finalDoc = addAnalytics(finalDoc);

console.log('Writing updated resume');
fs.writeFileSync('./cstead-resume.html', finalDoc);

fs.copyFileSync('./cstead-resume.html', './index.html');