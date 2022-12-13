import S3 from "aws-sdk/clients/s3";
import { config } from "../config";
import { buildFileName } from "./help";
import { ID } from "./types";

const bucket = new S3({
  region: config.AWS_S3_REGION,
  accessKeyId: config.AWS_S3_ACCESS_KEY,
  secretAccessKey: config.AWS_S3_SECRET_KEY,
});

export const uploadS3 = (file: any, folder: string, id: any) => {
  const { name, data, mimetype } = file;
  const uploadPath =  buildFileName(name, folder, id);
  const params = {
    Bucket: config.AWS_S3_NAME,
    Body: data,
    Key: uploadPath,
    ContentType: mimetype,
  };
  return bucket.upload(params).promise();
};

export const uploadMultipleS3 = async (files: any, folder: string, id: any) => {
  const params = files.map((file: any) => {
    const { name, data, mimetype } = file;
    const uploadPath =  buildFileName(name, folder, id);
    return {
      Bucket: config.AWS_S3_NAME,
      Body: data,
      Key: uploadPath,
      ContentType: mimetype,
    };
  });
  return await Promise.all(
    params.map((param: any) => bucket.upload(param).promise())
  );
};

export const getS3 = (fileKey?: string) => {
  const params:any = {
    Bucket: config.AWS_S3_NAME,
    Key: fileKey,
  };
  return bucket.getObject(params).createReadStream();
};

export const deleteS3 = (fileKey?: string) => {
  const params: any = {
    Bucket: config.AWS_S3_NAME,
    Key: fileKey,
  };
  return bucket.deleteObject(params).promise();
};
