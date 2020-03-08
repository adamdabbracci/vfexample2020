var AWS = require(`aws-sdk`);

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

    /**
     * Invokes the lambda which will sync the S3 data to the database
     *
     * @returns
     * @memberof PopulateDbPlugin
     */
    async invoke() {
        const Lambda = new AWS.Lambda({
            region: this.serverless.variables.service.provider.region,
        });

        
        const lambdaName = this.serverless.variables.service.custom.extractFunctionName;

        try {
            console.log(`[PLUGINS] PopulateDbPlugin: Invoking lambda: ${lambdaName}`);

            const result = await Lambda.invoke({
                FunctionName: lambdaName
            }).promise();

            if (result.FunctionError) {
                console.log(`[PLUGINS] PopulateDbPlugin: Invocation failed`);
                console.log(result.FunctionError);
                return;
            }

            if (result.Payload) {
                console.log(`[PLUGINS] PopulateDbPlugin: Invocation success:`);
                console.log(result.Payload);
            }

            console.log(`[PLUGINS] PopulateDbPlugin: Finished lambda: ${lambdaName}`);

            return;
        }
        catch (ex) {
            console.log(`[PLUGINS] PopulateDbPlugin: failed to invoke lambda:`);
            console.log(ex);
            return;
        }


        
    }
}


module.exports = PopulateDbPlugin;