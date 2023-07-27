import axios from "axios";
import "dotenv/config";
import {
  subscribersApi,
  promotionDurationEnum,
} from "./src/services/revenue-cat/index.js";

const appUserId = "";

const result = await subscribersApi.csc.grantPromotionalEntitlement({
  appUserId,
  duration: promotionDurationEnum.daily,
  entitlementIdentifier: "",
});

console.log(result);
