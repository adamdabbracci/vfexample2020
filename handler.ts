import { CustomerService } from "./services/customer.service";
import { S3Service } from "./services/s3.service";
import { Customer } from "./models";



const customerService = new CustomerService();
const s3Service = new S3Service(process.env.S3_BUCKET_NAME || `NO_BUCKET_NAME_PROVIDED`);

/**
 * Extracts customer data from S3 and puts it in DynamoDB
 */
module.exports.extractCustomerData = async () => {
    console.log(`Starting extraction process`);

    const data = await s3Service.getObject(`data.json`);
    console.log(data);

    // Confirm the value was returned
    if (!data.Body) {
        console.log(`extractCustomerData: Body not returned:`);
        console.log(data.Body);
        return;
    }

    // Parse it to JSON
    let json;
    try {
        console.log(data.Body.toString());
        json = JSON.parse(data.Body.toString());
        console.log(`extractCustomerData: retrieved data from S3:`);
        console.log(json)
    }
    catch (ex) {
        console.log(`extractCustomerData: failed to parse JSON`);
        console.log(ex);
        return;
    }

    // Iterate through the objects
    await asyncForEach((json), async (customer: Customer) => {
        console.log(`extractCustomerData: Writing Customer : ${customer.id}`);
        await customerService.writeCustomer(customer);
        console.log(`extractCustomerData: Wrote Customer : ${customer.id}`);
        return;
    });


    console.log(`extractCustomerData: complete.`);

    return;
}

// From: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }