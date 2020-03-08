import * as AWS from "aws-sdk";

const S3 = new AWS.S3();

export class S3Service {
    private bucket;

    constructor(bucketName: string) {
        this.bucket = bucketName;

        console.log(`S3 Service initiated with bucket ${this.bucket}.`);
    }

    /**
     * Returns a single S3 item by it's key
     *
     * @memberof S3Service
     */
    getObject = (key: string): Promise<AWS.S3.GetObjectOutput> => {
        return S3.getObject({
            Key: key,
            Bucket: this.bucket,
        })
        .promise();
    }
}