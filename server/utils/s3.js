const aws = require("aws-sdk");
const fs = require("fs");
const { s3Url } = require("../config.json");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("At upload - There was no file attached");
        return res.json({ error: "Please attach a file!" });
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "scximgboard",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            next();
            fs.unlink(path, () => {}); // noop, empty function "no operation"
        })
        .catch((err) => {
            // uh oh
            console.log(err);
            res.json({ error: "Something went wrong at upload / amazon" });
        });
};

exports.deleteFromAwS = async (req, res, url, next) => {
    url.map(async (el) => {
        const key = el.url.replace(s3Url, "");
        try {
            await s3
                .deleteObject({
                    Bucket: "scximgboard",
                    Key: key,
                })
                .promise();
            console.log("deleted from aws");
            next();
        } catch (err) {
            console.log("not deleted from aws", err);
            return res.status(500).json({
                success: false,
                error: err,
            });
        }
    });
};
