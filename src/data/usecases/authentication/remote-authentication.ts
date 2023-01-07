import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>) {
  }

  private validateBody (body: any): AccountModel {
    if (body) {
      return body
    }

    return { accessToken: '' }
  }

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return this.validateBody(response.body)
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
