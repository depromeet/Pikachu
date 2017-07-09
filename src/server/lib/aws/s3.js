import AWS from 'aws-sdk';
import config from '../../config';

AWS.config.region = config.aws.s3;

// const s3 = new AWS.S3();
