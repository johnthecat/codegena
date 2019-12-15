/* tslint:disable */
import { BehaviorSubject, Subject } from 'rxjs';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@codegena/ng-api-service';
import { ApiSchema } from '@codegena/ng-api-service/lib/providers/api-schema';
import { SERVERS_INFO, ServersInfo } from '@codegena/ng-api-service';

import {
  API_ERROR_HANDLER,
  ApiErrorHandler,
  DISABLE_VALIDATION,
  RESET_API_SUBSCRIBERS,
  VIRTUAL_CONNECTION_STATUS
} from '@codegena/ng-api-service';

// Typings for this API method
import {
  UpdateGroupParameters,
  UpdateGroupResponse,
  UpdateGroupRequest
} from '../typings';
// Schemas
import { schema as domainSchema } from './schema.f494efb9904ca366b64883';

/**
 * Service for angular based on ApiAgent solution.
 * Provides assured request to API method with implicit
 * validation and common errors handling scheme.
 */
@Injectable()
export class UpdateGroupService extends ApiService<
  UpdateGroupResponse,
  UpdateGroupRequest,
  UpdateGroupParameters
> {
  protected get method(): 'PATCH' {
    return 'PATCH';
  }

  /**
   * Path template, example: `/some/path/{id}`.
   */
  protected get pathTemplate(): string {
    return '/group/{groupId}';
  }

  /**
   * Parameters in a query.
   */
  protected get queryParams(): string[] {
    return ['forceSave'];
  }

  /**
   * API servers.
   */
  protected get servers(): string[] {
    return ['http://localhost:3000'];
  }

  /**
   * Complete domain API schema (OAS3) with library
   * of models.
   */
  protected get domainSchema(): any {
    return domainSchema;
  }

  /**
   * JSON Schemas using for validations at requests.
   */
  protected get schema(): ApiSchema {
    return {
      params: {
        properties: {
          groupId: {
            $ref: 'schema.f494efb9904ca366b64883#/components/schemas/Uid'
          },
          forceSave: { type: ['boolean', 'null'], default: null }
        },
        required: ['groupId'],
        type: 'object'
      },
      request: {
        'application/json': {
          allOf: [
            {
              $ref:
                'schema.f494efb9904ca366b64883#/components/schemas/ToDoGroupBlank'
            },
            { required: [] }
          ]
        }
      },
      response: {
        '200': {
          'application/json': {
            $ref: 'schema.f494efb9904ca366b64883#/components/schemas/ToDoGroup'
          }
        },
        '400': {
          'application/json': {
            $ref:
              'schema.f494efb9904ca366b64883#/components/schemas/HttpErrorBadRequest'
          }
        },
        '404': {
          'application/json': {
            $ref:
              'schema.f494efb9904ca366b64883#/components/schemas/HttpErrorNotFound'
          }
        },
        '409': {
          'application/json': {
            $ref:
              'schema.f494efb9904ca366b64883#/components/schemas/HttpErrorConflict'
          }
        },
        '500': {
          'application/json': {
            $ref:
              'schema.f494efb9904ca366b64883#/components/schemas/HttpErrorServer'
          }
        }
      }
    } as any;
  }

  // *** Methods

  constructor(
    protected httpClient: HttpClient,
    @Inject(API_ERROR_HANDLER)
    protected errorHandler: ApiErrorHandler,
    @Inject(SERVERS_INFO)
    protected serversInfo: ServersInfo,
    @Inject(RESET_API_SUBSCRIBERS)
    protected resetApiSubscribers: Subject<void>,
    @Inject(VIRTUAL_CONNECTION_STATUS)
    protected virtualConnectionStatus: BehaviorSubject<boolean>,
    @Optional()
    @Inject(DISABLE_VALIDATION)
    protected disableValidation: boolean
  ) {
    super(
      httpClient,
      errorHandler,
      serversInfo,
      resetApiSubscribers,
      virtualConnectionStatus,
      disableValidation,
      domainSchema
    );
  }
}
