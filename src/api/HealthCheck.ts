/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ApiResponseString } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class HealthCheck<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Health Check
   * @name HealthCheck
   * @request GET:/health-check
   * @secure
   */
  healthCheck = (params: RequestParams = {}) =>
    this.request<ApiResponseString, any>({
      path: `/health-check`,
      method: "GET",
      secure: true,
      ...params,
    });
}
