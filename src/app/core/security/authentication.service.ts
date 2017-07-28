/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Assertion } from 'empiria';

import { SessionService } from '../general/session.service';
import { LoggerService } from '../general/logger.service';
import { SecurityDataService } from './security-data.service';
import { Principal } from './principal';
import { SessionToken, Identity, ClaimsList } from './security-types';

@Injectable()
export class AuthenticationService {

  constructor(private session: SessionService,
              private dataService: SecurityDataService,
              private logger: LoggerService) {}

  public async login(userID: string, userPassword: string): Promise<void> {
    Assertion.assertValue(userID, 'userID');
    Assertion.assertValue(userPassword, 'userPassword');

    await this.session.start();

    const sessionToken = await this.dataService.createSession(userID, userPassword)
                                               .catch((e) => this.handleAuthenticationError(e));

    const identity = await this.dataService.getPrincipalIdentity()
                                           .catch((e) => this.handleAuthenticationError(e));

    const claimsList = await this.dataService.getPrincipalClaimsList()
                                             .catch((e) => this.handleAuthenticationError(e));

    const principal = new Principal(sessionToken, identity, claimsList);

    this.session.setPrincipal(principal);
  }

  public async logout(): Promise<boolean> {
    const principal = this.session.getPrincipal();

    if (!principal.isAuthenticated) {
      return Promise.resolve(false);
    }

    try {
      await this.dataService.closeSession();
      return Promise.resolve(true);
    } catch (e) {
      this.logger.error(e);
      return Promise.resolve(true);
    }
  }

  // Private methods

  private handleAuthenticationError(error): Promise<never> {
    if (error.status === 401) {
      return Promise.reject(new Error('No reconozco las credenciales proporcionadas. ' +
                                      `${error.status} ${error.statusText}`));
    } else {
      return Promise.reject(new Error('Tuve un problema al intentar leer información del servidor. ' +
                                      `${error.status} ${error.statusText} ${error.message}`));
    }
  }

}