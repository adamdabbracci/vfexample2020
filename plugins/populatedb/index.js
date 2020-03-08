var AWS = require(`aws-sdk`);
const Lambda = new AWS.Lambda();

/**
 * Reads the customer data from S3 and puts it into the database
 */
class PopulateDbPlugin {

    constructor(serverless, options) {
      this.serverless = serverless;
      this.options = options;
      this.commands = {};
      this.hooks = {
        'after:deploy:deploy': this.invoke.bind(this),
      };
  
      console.log(`[PLUGINS] PopulateDbPlugin: constructed successfully with hooks:`);
      console.log(this.hooks);
    }

    async invoke() {
        console.log(this.serverless.variables.service.custom.s3BucketName);
        const lambdaName = this.serverless.variables.service.custom.s3BucketName;

        console.log(`[PLUGINS] PopulateDbPlugin: Invoking lambda: ${lambdaName}`);
        try {
            await Lambda.invoke()
            return;
        }
        catch (ex) {
            console.log(`[PLUGINS] PopulateDbPlugin: failed to retrieve data:`);
            console.log(ex);
            return;
        }


        
    }
}


module.exports = PopulateDbPlugin;