import * as DynamoDb from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Customer } from "../models";

// Setup DynamoDB Mapper
const client = new DynamoDb({region: process.env.REGION});
const mapper = new DataMapper({client});


export class CustomerService {

    /**
     * Creates or updates a customer
     *
     * @memberof CustomerService
     */
    // @ts-ignore: JSDoc thinks the ? is from itself and not from typescript
    writeCustomer = async (_customer: Customer): Promise<Customer?> => {

        let result;

        try {
            const customer: Customer = Object.assign(new Customer, _customer);
            
            try {
                result = await mapper.put(customer);
                console.log(`Customer saved successfully:`);
                console.log(_customer);
                return result;
            }
            catch(ex) {
                console.log(`Customer failed to save:`);
                console.log(_customer);
                console.log(ex);
                return null;
            }

            

        }
        catch(ex) {
            console.log(`Customer failed to validate:`);
            console.log(_customer);
            return null;
        }

        
    }
}