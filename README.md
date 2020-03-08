### Getting Started
1. Install the dependencies: `npm install`
2. Install the Serverless CLI: `npm install -g sls`
3. Enable verbose debugging: `export SLS_DEBUG=*`
4. Deploy the package: `sls deploy --stage dev`
5. Sync the S3 data: `sls syncToS3`

### Run the extract function manually
Run `sls invoke local --stage dev --function extractCustomerData`

### Deploy
`sls deploy --stage dev`

### Known Errors
1. Error: Failed to deploy due to existing table
Solution: Delete the table manually from DynamoDB

2. `ServiceException: Lambda was unable to decrypt the environment variables due to an internal service error. `
Solution: Change anything about the IAM permissions in `serverless.yml`, deploy, then change them back (https://github.com/serverless/examples/issues/279#issuecomment-420387109)