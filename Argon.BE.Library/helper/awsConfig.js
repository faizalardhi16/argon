import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIAVCYJOXRB3Y3G27HQ",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

export default s3;
