import * as DynamoDb from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Customer } from "../models";

// Setup DynamoDB Mapper
const client = new DynamoDb({region: process.env.REGION});
const mapper = new DataMapper({client});


export class CustomerService {

    /**
     * Returns a customer by their ID
     *
     * @memberof CustomerService
     */
    getCustomerById = (id: string): Promise<{id: string}>=> {
        const customer: Customer = Object.assign(new Customer, {id: id});
        return mapper.get(customer);
    }

    /**
     * Creates or updates a customer
     *
     * @memberof CustomerService
     */
    writeCustomer = (_customer: Customer): Promise<Customer> => {
        const customer: Customer = Object.assign(new Customer, _customer);
        return mapper.put(customer);
    }
}