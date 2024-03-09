const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
    try {
        // Read current version from file
        const versionFilePath = core.getInput('version-file-path');
        // Bump the version as needed
        const versionType = core.getInput('version-type').toLowerCase();

        // const versionFilePath = process.argv[2];
        // const versionType = process.argv[3];

        let currentVersion = fs.readFileSync(versionFilePath, 'utf-8').trim();
        core.info(`Current version: ${currentVersion}`);

        // Split version into its components
        let [major, minor, patch] = currentVersion.split('.').map(Number);

        if (versionType === 'major') {
            major++;
            minor = 0;
            patch = 0;
        } else if (versionType === 'minor') {
            minor++;
            patch = 0;
        } else if (versionType === 'patch') {
            patch++;
        } else {
            core.setFailed('Invalid version type provided.');
            return;
        }

        // Write the bumped version back to the file
        const newVersion = `${major}.${minor}.${patch}`;
        fs.writeFileSync(versionFilePath, newVersion); // Update file with new version

        // Check if the file was written successfully
        const updatedVersion = fs.readFileSync(versionFilePath, 'utf-8').trim();
        if (updatedVersion !== newVersion) {
            throw new Error('Failed to update version in file.');
        }

        core.setOutput('new-version', newVersion);
        core.info(`New version: ${newVersion}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();