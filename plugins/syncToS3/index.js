'use strict';

const spawnSync = require('child_process').spawnSync;


/**
 * Syncs a local demo file to S3
 * Example from: https://github.com/serverless/examples/blob/502881310bce6ae4a01ec3d29a058fa87ae14d4f/aws-node-single-page-app-via-cloudfront/serverless-single-page-app-plugin/index.js
 *
 * @export
 * @class SyncToS3Plugin
 */
class SyncToS3Plugin {

  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {};
    this.hooks = {
      'after:deploy:deploy': this.syncDirectory.bind(this),
    };

    console.log("[PLUGINS] SyncToS3Plugin: constructed successfully with hooks:");
    console.log(this.hooks);
  }

  /**
   * Execute an AWS CLI command
   *
   * @param {*} args
   * @returns
   * @memberof SyncToS3Plugin
   */
  runAwsCommand(args) {
    const result = spawnSync('aws', args);
    const stdout = result.stdout.toString();
    const sterr = result.stderr.toString();
    if (stdout) {
      this.serverless.cli.log(stdout);
    }
    if (sterr) {
      this.serverless.cli.log(sterr);
    }

    return { stdout, sterr };
  }

  /**
   * Syncs the local customer directory
   *
   * @memberof SyncToS3Plugin
   */
  syncDirectory() {


    const s3Bucket = "vf-demo-customer-upload"; // TODO: pull this from Param

    console.log("[PLUGINS] SyncToS3Plugin: Starting sync process with bucket: " + s3Bucket);

    const args = [
      's3',
      'sync',
      'customerdata/',
      `s3://${s3Bucket}/`,
      //'--delete',
    ];
    const { sterr } = this.runAwsCommand(args);
    if (!sterr) {
      this.serverless.cli.log('[PLUGINS] SyncToS3Plugin: Successfully synced to the S3 bucket');
      console.log('[PLUGINS] SyncToS3Plugin: Successfully synced to the S3 bucket');
    } else {
      throw new Error('[PLUGINS] SyncToS3Plugin: Failed syncing to the S3 bucket');
    }
  }

}

module.exports = SyncToS3Plugin;
