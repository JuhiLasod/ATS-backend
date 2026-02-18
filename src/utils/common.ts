const fs = require("fs");
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { eDurationType, eReturnCodes } from "../enums/commonEnums";
import logger from "../logger";
import ResponseModel from "../models/common/responseModel";
import { TEmailOptions } from "../types/common";
import EncryptUtils from "./encrypt";
import sendMail from "./sendEmail";
const CryptoJS = require("crypto-js");
dayjs.extend(duration);
import { Op, Order } from "sequelize";

class CommonUtils {
  /**
   * Returns a ResponseModel object with a specific return code and description.
   * @param {eReturnCodes} returnCode The return code to be used in the response.
   * @returns {ResponseModel} A ResponseModel object with the specified return code and description.
   */
  static getDataResponse(returnCode: eReturnCodes) {
    const responseModel = new ResponseModel(
      returnCode,
      new Date(),
      "No data found"
    );

    switch (returnCode) {
      case eReturnCodes.R_SUCCESS:
        responseModel.description = "Success";
        break;
      case eReturnCodes.R_NOT_FOUND:
        responseModel.description = "Data not found";
        break;
      case eReturnCodes.R_AUTHENTICATION_FAILED:
        responseModel.description = "Authentication failed";
        break;
      case eReturnCodes.R_DB_ERROR:
        responseModel.description = "Database error";
        break;
      default:
        break;
    }
    return responseModel;
  }

  /**
   * Initializes the email with the appropriate content based on the email purpose.
   * This function is called from the services layer to send an email.
   * @param {TEmailOptions} emailOptions The options for the email to be sent.
   *
   * The email purpose can be one of the following:
   * - SignIn: The email content is set to the SignIn template.
   * - TicketCreated: Email sent when a new ticket is created
   * - TicketAwaitingApproval: Email sent to approver when ticket needs approval
   * - TicketStatusUpdate: Email sent when ticket status changes
   * - TicketApproved: Email sent when ticket is approved
   * - TicketRejected: Email sent when ticket is rejected
   */
  static initializeEmail(emailOptions: TEmailOptions) {
    switch (emailOptions.emailPurpose) {
      case "SignIn":
        // Read the SignIn HTML template from the assets folder
        fs.readFile(
          "assets/html-template/Welcome.html",
          "utf8",
          (err: any, htmlContent: any) => {
            if (err) {
              console.error("Error reading HTML file:", err);
              // Handle error cases here
              return;
            }
            htmlContent = htmlContent
              .replace("@EMAIL@", emailOptions.receiverEmail)
              .replace(
                "@PASSWORD@",
                EncryptUtils.decrypt(emailOptions.password || "")
              );

            // Create the email options object
            let mailOptions = {
              from: process.env.MAIL_FROM_ADDRESS,
              to: emailOptions.receiverEmail,
              subject: "Welcome",
              html: htmlContent,
            };
            // Send the email
            sendMail(mailOptions, "");
          }
        );
        break;

      case "TicketCreated":
        fs.readFile(
          "assets/html-template/TICKET_CREATED_TEMPLATE.html",
          "utf8",
          (err: any, htmlContent: any) => {
            if (err) {
              console.error("Error reading ticket created HTML file:", err);
              logger.error(`Error reading ticket created template: ${err}`);
              return;
            }

            // Replace template placeholders
            htmlContent = htmlContent
              .replace(/@logoUrl@/g, `${process.env.IMAGE_URL_LOGO}`)
              .replace(/@UserName@/g, emailOptions.userName || "User")
              .replace(/@TicketId@/g, emailOptions.ticketId || "N/A")
              .replace(/@TicketSubject@/g, emailOptions.ticketSubject || "N/A")
              .replace(/@TicketCategory@/g, emailOptions.ticketCategory || "N/A")
              .replace(/@CreatedDate@/g, emailOptions.createdDate || "N/A")
              .replace(/@TicketLink@/g, emailOptions.ticketLink || "#")
              .replace(/@TicketType@/g, emailOptions.ticketType || "-")
              .replace(/@UnitName@/g, emailOptions.unitName || "-")
              .replace(/@Priority@/g, emailOptions.priority || "-")

            let mailOptions = {
              from: process.env.MAIL_FROM_ADDRESS,
              to: emailOptions.receiverEmail,
              subject: `Ticket Created - ${emailOptions.ticketId}`,
              html: htmlContent,
            };

            sendMail(mailOptions, "");
          }
        );
        break;

      case "TicketAwaitingApproval":
        fs.readFile(
          "assets/html-template/Ticket_Awaiting_ Approval.html",
          "utf8",
          (err: any, htmlContent: any) => {
            if (err) {
              console.error("Error reading ticket approval HTML file:", err);
              logger.error(`Error reading ticket approval template: ${err}`);
              return;
            }

            htmlContent = htmlContent
              .replace(/@logoUrl@/g, `${process.env.IMAGE_URL_LOGO}`)
              .replace(/@ApproverName@/g, emailOptions.approverName || "Approver")
              .replace(/@CreatedBy@/g, emailOptions.createdBy || "User")
              .replace(/@TicketId@/g, emailOptions.ticketId || "N/A")
              .replace(/@TicketSubject@/g, emailOptions.ticketSubject || "N/A")
              .replace(/@TicketCategory@/g, emailOptions.ticketCategory || "N/A")
              .replace(/@CreatedDate@/g, emailOptions.createdDate || "N/A")
              .replace(/@UserName@/g, emailOptions.userName || "User")
              .replace(/@ApprovalLink@/g, emailOptions.approvalLink || "#")
              .replace(/@TicketType@/g, emailOptions.ticketType || "N/A")
              .replace(/@UnitName@/g, emailOptions.unitName || "N/A")
              .replace(/@Priority@/g, emailOptions.priority || "N/A");

            let mailOptions = {
              from: process.env.MAIL_FROM_ADDRESS,
              to: emailOptions.receiverEmail,
              subject: `Ticket Approval Required - ${emailOptions.ticketId}`,
              html: htmlContent,
            };

            sendMail(mailOptions, "");
          }
        );
        break;

      case "TicketStatusUpdate":
        fs.readFile(
          "assets/html-template/TICKET_STATUS.html",
          "utf8",
          (err: any, htmlContent: any) => {
            if (err) {
              console.error("Error reading ticket status HTML file:", err);
              logger.error(`Error reading ticket status template: ${err}`);
              return;
            }

            htmlContent = htmlContent
              .replace(/@logoUrl@/g, `${process.env.IMAGE_URL_LOGO}`)
              .replace(/@UserName@/g, emailOptions.userName || "User")
              .replace(/@TicketId@/g, emailOptions.ticketId || "N/A")
              .replace(/@TicketSubject@/g, emailOptions.ticketSubject || "N/A")
              .replace(/@CurrentStatus@/g, emailOptions.currentStatus || "N/A")
              .replace(/@statusColor@/g, emailOptions.statusColor || "#007B55")
              .replace(/@UpdatedDate@/g, emailOptions.updatedDate || "N/A")
              .replace(/@StatusMessage@/g, emailOptions.statusMessage || "")
              .replace(/@TicketLink@/g, emailOptions.ticketLink || "#")
              .replace(/@TicketType@/g, emailOptions.ticketType || "N/A")
              .replace(/@UnitName@/g, emailOptions.unitName || "N/A")
              .replace(/@Priority@/g, emailOptions.priority || "N/A");

            let mailOptions = {
              from: process.env.MAIL_FROM_ADDRESS,
              to: emailOptions.receiverEmail,
              subject: `Ticket Status Update - ${emailOptions.ticketId}`,
              html: htmlContent,
            };

            sendMail(mailOptions, "");
          }
        );
        break;

      case "TicketApproved":
      case "TicketRejected":
        fs.readFile(
          "assets/html-template/Approved_ Rejected_ Email.html",
          "utf8",
          (err: any, htmlContent: any) => {
            if (err) {
              console.error("Error reading approval/rejection HTML file:", err);
              logger.error(`Error reading approval/rejection template: ${err}`);
              return;
            }

            const status = emailOptions.emailPurpose === "TicketApproved" ? "Approved" : "Rejected";
            const statusColor = emailOptions.emailPurpose === "TicketApproved" ? "#28a745" : "#dc3545";

            htmlContent = htmlContent
              .replace(/@logoUrl@/g, `${process.env.IMAGE_URL_LOGO}`)
              .replace(/@ApprovalStatus@/g, status)
              .replace(/@UserName@/g, emailOptions.userName || "User")
              .replace(/@TicketId@/g, emailOptions.ticketId || "N/A")
              .replace(/@TicketSubject@/g, emailOptions.ticketSubject || "N/A")
              .replace(/@TicketCategory@/g, emailOptions.ticketCategory || "N/A")
              .replace(/@UpdatedDate@/g, emailOptions.updatedDate || "N/A")
              .replace(/@statusColor@/g, statusColor)
              .replace(/@TicketLink@/g, emailOptions.ticketLink || "#")
              .replace(/@TicketType@/g, emailOptions.ticketType || "-")
              .replace(/@UnitName@/g, emailOptions.unitName || "-")
              .replace(/@Priority@/g, emailOptions.priority || "-")

            let mailOptions = {
              from: process.env.MAIL_FROM_ADDRESS,
              to: emailOptions.receiverEmail,
              subject: `Ticket ${status} - ${emailOptions.ticketId}`,
              html: htmlContent,
            };

            sendMail(mailOptions, "");
          }
        );
        break;

      case "TicketMessage":
        fs.readFile(
          "assets/html-template/chat_conversation.html",
          "utf8",
          (err: any, htmlContent: any) => {
            if (err) {
              console.error("Error reading chat conversation HTML file:", err);
              logger.error(`Error reading chat conversation template: ${err}`);
              return;
            }

            htmlContent = htmlContent
              .replace(/@logoUrl@/g, `${process.env.IMAGE_URL_LOGO}`)
              .replace(/@UserName@/g, emailOptions.userName || "User")
              .replace(/@SenderName@/g, emailOptions.createdBy || "Someone")
              .replace(/@TicketId@/g, emailOptions.ticketId || "N/A")
              .replace(/@MessageContent@/g, emailOptions.statusMessage || "")
              .replace(/@TicketSubject@/g, emailOptions.ticketSubject || "N/A")
              .replace(/@UpdatedDate@/g, emailOptions.updatedDate || "N/A")
              .replace(/@TicketLink@/g, emailOptions.ticketLink || "#")
              // Remove attachment section if not present
              .replace(/@if\(hasAttachments\)@[\s\S]*?@endif@/g, "");

            let mailOptions = {
              from: process.env.MAIL_FROM_ADDRESS,
              to: emailOptions.receiverEmail,
              subject: `New Message on Ticket ${emailOptions.ticketId}`,
              html: htmlContent,
            };

            sendMail(mailOptions, "");
          }
        );
        break;
      case "ConferenceBookingReminder":
        fs.readFile(
          "assets/html-template/ConferenceBookingReminder.html",
          "utf8",
          (err: any, htmlContent: any) => {
            if (err) {
              console.error("Error reading Conference Reminder template:", err);
              return;
            }

            htmlContent = htmlContent
              .replace(/@logoUrl@/g, `${process.env.IMAGE_URL_LOGO}`)
              .replace(/@UserName@/g, emailOptions.userName || "User")
              .replace(/@BookingId@/g, emailOptions.bookingId || "N/A")
              .replace(/@TimeLeft@/g, emailOptions.timeLeft || "10")
              .replace(/@EndTime@/g, emailOptions.endTime || "N/A")
              .replace(/@Message@/g, emailOptions.message || "")
              .replace(/@HallName@/g, emailOptions.hallName || "Conference Hall")
              .replace(/@BookingLink@/g, emailOptions.bookingLink || "#");

            const mailOptions = {
              from: process.env.MAIL_FROM_ADDRESS,
              to: emailOptions.receiverEmail,
              subject: "Conference Booking Reminder",
              html: htmlContent,
            };

            sendMail(mailOptions, "");
          }
        );
        break;

    }
  }

  static async getDuration(
    startDate: any,
    endDate: any,
    durationType: eDurationType,
    exact = false
  ): Promise<any> {
    let code = 400;
    try {
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      if (!start.isValid() || !end.isValid()) {
        throw new Error("Invalid startDate or endDate");
      }

      const diffMs = Math.abs(end.diff(start));
      const dur = dayjs.duration(diffMs);

      let result: any = "";

      const totalDays = Math.floor(dur.asDays());
      const remainingMsAfterDays =
        diffMs - dayjs.duration(totalDays, "days").asMilliseconds();
      const durAfterDays = dayjs.duration(remainingMsAfterDays);

      const totalHours = Math.floor(dur.asHours());
      const remainingMsAfterHours =
        diffMs - dayjs.duration(totalHours, "hours").asMilliseconds();
      const durAfterHours = dayjs.duration(remainingMsAfterHours);

      const totalMinutes = Math.floor(dur.asMinutes());
      const remainingMsAfterMinutes =
        diffMs - dayjs.duration(totalMinutes, "minutes").asMilliseconds();
      const durAfterMinutes = dayjs.duration(remainingMsAfterMinutes);

      const totalSeconds = Math.floor(dur.asSeconds());

      switch (durationType) {
        case eDurationType.R_DAYS:
          if (exact) {
            result = {
              days: totalDays,
              hours: durAfterDays.hours(),
              minutes: durAfterDays.minutes(),
              seconds: durAfterDays.seconds(),
            };
          } else {
            result = { days: totalDays };
          }
          break;

        case eDurationType.R_HOURS:
          if (exact) {
            result = {
              hours: totalHours,
              minutes: durAfterHours.minutes(),
              seconds: durAfterHours.seconds(),
            };
          } else {
            result = { hours: totalHours };
          }
          break;

        case eDurationType.R_MINUTES:
          if (exact) {
            result = {
              minutes: totalMinutes,
              seconds: durAfterMinutes.seconds(),
            };
          } else {
            result = { minutes: totalMinutes };
          }
          break;

        case eDurationType.R_SECONDS:
          result = { seconds: totalSeconds };
          break;

        case eDurationType.R_ALL:
          result = {
            days: totalDays,
            hours: durAfterDays.hours(),
            minutes: durAfterDays.minutes(),
            seconds: durAfterDays.seconds(),
          };
          break;

        default:
          throw new Error("Invalid durationType");
      }

      return { duration: result, code: 200 };
    } catch (error: any) {
      logger.info(`Error Occured in getDuration function in Utils - ${error}`);
      return { message: error.message, code };
    }
  }

  static encrypt(
    message: string,
    passKey: string = process.env.PASSWORD_SECRET_KEY || "MySecretKey123!"
  ) {
    var keyBytes = CryptoJS.PBKDF2(passKey, "Ivan Medvedev", {
      keySize: 48 / 4,
      iterations: 1000,
    });
    var key = new (CryptoJS.lib.WordArray as any).init(keyBytes.words, 32);
    var iv = new (CryptoJS.lib.WordArray as any).init(
      keyBytes.words.splice(32 / 4),
      16
    );
    var data = CryptoJS.enc.Utf16LE.parse(message);
    var encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
    return encrypted.toString();
  }

  /**
   * Decrypts an encrypted message using AES decryption with a given passphrase.
   * @param encryptedMessage - The encrypted message to be decrypted.
   * @param passKey - The passphrase for decryption.
   * @returns The decrypted message as a string.
   */
  static decrypt(
    encryptedMessage: string,
    passKey: string = process.env.PASSWORD_SECRET_KEY || "MySecretKey123!"
  ) {
    var keyBytes = CryptoJS.PBKDF2(passKey, "Ivan Medvedev", {
      keySize: 48 / 4,
      iterations: 1000,
    });
    var key = new (CryptoJS.lib.WordArray as any).init(keyBytes.words, 32);
    var iv = new (CryptoJS.lib.WordArray as any).init(
      keyBytes.words.splice(32 / 4),
      16
    );
    var decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, { iv: iv });

    return decrypted.toString(CryptoJS.enc.Utf16LE);
  }

  static generateRandomPasswordForNewHost(length: number = 8): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  static normalizePagination(filterModel: any) {
    const currentPage =
      filterModel?.currentPage && filterModel.currentPage > 0
        ? filterModel.currentPage
        : 1;

    let pageSize =
      filterModel?.pageSize && filterModel.pageSize > 0
        ? filterModel.pageSize
        : 10;

    const noPagination = filterModel?.pageSize === -1;

    return {
      currentPage,
      pageSize,
      noPagination,
      offset: (currentPage - 1) * pageSize,
    };
  }


  static buildListQueryOptions(
    filterModel: any,
    searchFields: string[] = [],
    extraWhere: any = {},
    attributes?: string[]
  ) {
    const { currentPage = 1, pageSize = 10 } = filterModel;
    const offset = pageSize === -1 ? undefined : (currentPage - 1) * pageSize;
    const limit = pageSize === -1 ? undefined : pageSize;

    let where: any = { ...extraWhere };
    if (filterModel.searchText && searchFields.length > 0) {
      where[Op.or] = searchFields.map((field: string) => ({
        [field]: { [Op.like]: `%${filterModel.searchText}%` },
      }));
    }

    Object.keys(filterModel).forEach((key) => {
      if (
        !["currentPage", "pageSize", "searchText"].includes(key) &&
        filterModel[key] !== undefined &&
        filterModel[key] !== null &&
        filterModel[key] !== ""
      ) {
        where[key] = { [Op.like]: `%${filterModel[key]}%` };
      }
    });

    const order: Order = [["id", "desc"]];

    const queryOptions: any = {
      where,
      offset,
      limit,
      order,
    };

    if (attributes && Array.isArray(attributes) && attributes.length > 0) {
      queryOptions.attributes = attributes;
    }

    return queryOptions;
  }

  static formatFilterModel(
    filterModel: any,
    totalRecords: number,
    extraFields: string[] = []
  ) {
    const formatted: any = {
      currentPage: filterModel.currentPage ?? 1,
      pageSize: filterModel.pageSize ?? 10,
      totalRecords,
      searchText: filterModel.searchText ?? "",
    };
    extraFields.forEach((field) => {
      if (filterModel[field] !== undefined) {
        formatted[field] = filterModel[field];
      }
    });
    return formatted;
  }

  static setResponse(
    dto: any,
    data: any,
    code: number = eReturnCodes.R_SUCCESS
  ) {
    dto.data = data;
    dto.dataResponse = CommonUtils.getDataResponse(code);
  }

  static async upsertModel(
    model: any,
    data: any,
    transaction: any,
    idField: string = "id"
  ) {
    let record;
    if (data[idField]) {
      const [affectedRows] = await model.update(data, {
        where: { [idField]: data[idField] },
        transaction,
      });
      record =
        affectedRows > 0
          ? await model.findByPk(data[idField], { transaction })
          : [];
    } else {
      record = await model.create(data, { transaction });
    }
    return record;
  }

}

export default CommonUtils;
