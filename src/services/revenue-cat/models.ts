import { GetInferredFromRaw } from "@thinknimble/tn-models-fp";
import { z } from "zod";

const storeEnum = {
  appStore: "app_store",
  macAppStore: "mac_app_store",
  playStore: "play_store",
  amazon: "amazon",
  stripe: "stripe",
  promotional: "promotional",
} as const;

export const promotionDurationEnum = {
  daily: "daily",
  threeDay: "three_day",
  weekly: "weekly",
  monthly: "monthly",
  twoMonth: "two_month",
  threeMonth: "three_month",
  sixMonth: "six_month",
  yearly: "yearly",
  lifetime: "lifetime",
} as const;

export const uuidZod = z.string().uuid();

export const productIdZod = uuidZod;
export const entitlementIdZod = uuidZod;

export const entitlementShape = {
  expiresDate: z.string().datetime(),
  gracePeriodExpiresDate: z.string().datetime(),
  purchaseDate: z.string().datetime(),
};
export const ownershipTypeEnum = {
  purchased: "PURCHASED",
  familyShared: "FAMILY_SHARED",
};
export const periodTypeEnum = {
  normal: "normal",
  trial: "trial",
  intro: "intro",
};

const subscriptionShape = {
  expiresDate: z.string().datetime(),
  purchaseDate: z.string().datetime(),
  originalPurchaseDate: z.string().datetime(),
  ownershipType: z.nativeEnum(ownershipTypeEnum),
  periodType: z.nativeEnum(periodTypeEnum),
  store: z.nativeEnum(storeEnum),
  isSandbox: z.boolean(),
  unsubscribeDetectedAt: z.string().datetime(),
  billingIssuesDetectedAt: z.string().datetime(),
  gracePeriodExpiresDate: z.string().datetime(),
  refundedAt: z.string().datetime(),
  autoResumeDate: z.string().datetime(),
};
const nonSubscriptionShape = {
  id: z.string().uuid(),
  purchaseDate: z.string().datetime(),
  store: z.nativeEnum(storeEnum),
  isSandbox: z.boolean(),
};

export const subscriberShape = {
  originalAppUserId: z.string(),
  originalApplicationVersion: z.string().nullable().optional(),
  originalPurchaseDate: z.string().nullable(),
  managementUrl: z.string().url().nullable(),
  firstSeen: z.string().datetime(),
  lastSeen: z.string().datetime(),
  entitlements: z.record(entitlementIdZod, z.object(entitlementShape)),
  subscriptions: z.record(productIdZod, z.object(subscriptionShape)),
  nonSubscriptions: z.record(productIdZod, z.object(nonSubscriptionShape)),

  /**
   * @deprecated they marked this as deprecated
   */
  otherPurchases: z.any().optional(),
  /**
   * This only comes back if we pass a secret key. These are custom attributes added to subscribers. Also there are a list of reserved attributes that are there by default
   * @link https://www.revenuecat.com/docs/subscriber-attributes
   */
  subscriberAttributes: z.record(z.any()).optional(),
};

export type Subscriber = GetInferredFromRaw<typeof subscriberShape>;

const revenueCatPackagesEnum = {
  monthly: "$rc_monthly",
  biyearly: "$rc_six_month",
  annual: "$rc_annual",
} as const;
export type RevenueCatPackageId =
  (typeof revenueCatPackagesEnum)[keyof typeof revenueCatPackagesEnum];

const packageShape = {
  identifier: z.nativeEnum(revenueCatPackagesEnum),
  platformProductIdentifier: z.string(),
};

export type RevenueCatPackage = GetInferredFromRaw<typeof packageShape>;

const offeringShape = {
  description: z.string(),
  identifier: z.string(),
  packages: z.object(packageShape).array(),
};

export const offeringResponseShape = {
  currentOfferingId: z.string(),
  offerings: z.object(offeringShape).array(),
};
