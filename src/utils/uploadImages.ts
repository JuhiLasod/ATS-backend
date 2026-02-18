import multer, { StorageEngine } from "multer";
import path from "path";
import express from "express";
import CommonUtils from "./common";
import logger from "../logger";
const jwt = require("jsonwebtoken");
const fs = require("fs");

class uploadImages {
  // uploading genre images - multiple images
  static uploadGenreImages() {
    // Set up storage options for multer
    const storage: StorageEngine = multer.diskStorage({
      destination: (
        req: express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ) => {
        const authHeader = req.headers["authorization"];
        const token =
          authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
          issuer: process.env.JWT_ISSUER,
          audience: process.env.JWT_AUDIENCE,
        });

        const userId = decoded.id;
        const userName = decoded.userName;

        const uploadDir = `uploads/`;
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        const personalFolder = path.join(uploadDir, `${userName}_${userId}/`);

        if (!fs.existsSync(personalFolder)) {
          fs.mkdirSync(personalFolder);
        }

        cb(null, personalFolder);
      },

      filename: (
        req: express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
      ) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    // Initialize multer with storage options, allowing for multiple file uploads
    const upload = multer({
      storage,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }).array("files", 10);

    return upload;
  }

  private static ensureDirectoryExists(directory: string) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  public static uploadAndStoreDocs() {
    const storage: StorageEngine = multer.diskStorage({
      destination: (req, file, cb) => {
        try {
          const uploadDir = path.join(
            __dirname,
            "../..",
            "uploads",
            "documents"
          );
          uploadImages.ensureDirectoryExists(uploadDir);
          cb(null, uploadDir);
        } catch (error) {
          cb(error as Error, "");
        }
      },

      filename: (req, file, cb) => {
        const timestamp = Date.now();
        const safeFilename = file.originalname.replace(/\s+/g, "_");
        cb(null, `${timestamp}-${safeFilename}`);
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|xlsx|xls/;
        const extname = allowedTypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
          return cb(null, true);
        } else {
          cb(
            new Error(
              "Invalid file type. Only images and documents are allowed."
            )
          );
        }
      },
    }).single("file");

    return async (req: any, res: any, next: any) => {
      upload(req, res, async (err: any) => {
        if (err) {
          return res.status(400).json({
            dataResponse: CommonUtils.getDataResponse(1),
            data: [],
          });
        }

        const file = req.file;

        if (!file) {
          return res.status(400).json({
            dataResponse: CommonUtils.getDataResponse(1),
            data: [],
          });
        }

        try {
          const filePath = `uploads/documents/${file.filename}`;
          const fileUrl = `${req.protocol}://${req.get("host")}/${filePath}`;

          res.status(200).json({
            dataResponse: CommonUtils.getDataResponse(0),
            data: [
              {
                filename: file.filename,
                originalName: file.originalname,
                path: filePath,
                url: fileUrl,
                size: file.size,
                mimetype: file.mimetype,
                extension: path
                  .extname(file.originalname)
                  .toLowerCase()
                  .replace(".", ""),
                uploadedAt: new Date().toISOString(),
              },
            ],
          });
        } catch (error: any) {
          logger.error("Error processing file upload:", error.message);
          res.status(500).json({
            dataResponse: CommonUtils.getDataResponse(1),
            data: [],
          });
        }
      });
    };
  }
  public static uploadOtherDocuments() {
    const storage: StorageEngine = multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = path.join(
          __dirname,
          "../..",
          "uploads",
          "otherDocuments"
        );
        uploadImages.ensureDirectoryExists(uploadDir);
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const timestamp = Date.now();
        const safeFilename = file.originalname.replace(/\s+/g, "_");
        cb(null, `${timestamp}-${safeFilename}`);
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|xlsx|xls/;
        const extname = allowedTypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
          return cb(null, true);
        } else {
          cb(
            new Error(
              "Invalid file type. Only images and documents are allowed."
            )
          );
        }
      },
    }).array("otherDocument", 10);

    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      upload(req, res, (err: any) => {
        if (err) {
          return res.status(400).json({
            dataResponse: CommonUtils.getDataResponse(1),
            data: [],
          });
        }
        if (
          !req.files ||
          !(req.files instanceof Array) ||
          req.files.length === 0
        ) {
          return res.status(400).json({
            dataResponse: CommonUtils.getDataResponse(1),
            data: [],
          });
        }
        const filePaths = req.files.map(
          (file: any) => `uploads/otherDocuments/${file.filename}`
        );
        return res.status(200).json({
          dataResponse: CommonUtils.getDataResponse(0),
          data: filePaths,
        });
      });
    };
  }
}

export default uploadImages;