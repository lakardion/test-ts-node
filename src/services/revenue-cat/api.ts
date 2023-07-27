import axios from "axios";
import { createApi, createCustomServiceCall } from "@thinknimble/tn-models-fp";
import { z } from "zod";
import { promotionDurationEnum, subscriberShape } from "./models.js";

const RC_SK = process.env["RC_SK"];
const rcAxios = axios.create({
  baseURL: "https://api.revenuecat.com/v1",
  headers: {
    Authorization: `Bearer ${RC_SK}`,
    "X-Platform": "stripe",
    "Content-Type": "application/json",
  },
});

const grantPromotionalEntitlement = createCustomServiceCall(
  {
    inputShape: {
      appUserId: z.string(),
      entitlementIdentifier: z.string(),
      duration: z.nativeEnum(promotionDurationEnum),
    },
    outputShape: subscriberShape,
  },
  async ({ input, utils, client, slashEndingBaseUri }) => {
    const uri =
      `${slashEndingBaseUri}${input.appUserId}/entitlements/${input.entitlementIdentifier}/promotional` as `${string}/`;
    const { duration } = utils.toApi(input);
    const res = client.post(uri, { duration });
    return utils.fromApi((await res).data);
  }
);

export const subscribersApi = createApi(
  {
    baseUri: "subscribers",
    client: rcAxios,
    disableTrailingSlash: true,
    models: {
      entity: {
        //TODO: Check whether there's the id in the response. (this is required by tn-models-fp)
        id: z.string().uuid(),
        requestDate: z.string().datetime(),
        requestDateMs: z.number(),
        subscriber: z.object(subscriberShape),
      },
    },
  },
  {
    grantPromotionalEntitlement,
  }
);
