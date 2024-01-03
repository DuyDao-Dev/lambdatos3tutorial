const { DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3")
const client = new S3Client({});
const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

//the event is the API Gateway event

module.exports.handler = async (event) => {
    console.log(event);

    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully deleted file from S3 bucket" }),
    };

    try {
        const parsedBody = JSON.parse(event.body);
        const imageName = parsedBody.Name;
        //DeleteObjectCommand is the command that will delete the object from S3. Refer to Line 1 for the import statement.
        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: `images/${imageName}`,
        });
        //The client is the S3Client that we created on Line 2.
        const clientResponse = await client.send(command);
        response.body = JSON.stringify({ message: "Successfully delete file from S3 bucket", clientResponse });
    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({ message: "File failed to delete", errorMessage: e });
        response.statusCode = 500;
    }
  
  return response;
};
