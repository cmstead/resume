'use strict';

var execSync = require('child_process').execSync,
	fs = require('fs');

console.log('Building resume');
execSync('npm run build');

function cleanBadChars(documentStr){
	var updatedDocument = documentStr.replace(/—/g, '&ndash;');
	return updatedDocument
}

console.log('Reading resume doc');
var finalDoc = fs.readFileSync('./cstead-resume.html', { encoding: 'utf-8'});

console.log('Replacing bad characters');
finalDoc = cleanBadChars(finalDoc);

console.log('Writing updated resume');
fs.writeFileSync('./cstead-resume.html', finalDoc);