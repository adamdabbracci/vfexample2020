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
Error: Failed to deploy due to existing table
Solution: Delete the table manually from DynamoDB