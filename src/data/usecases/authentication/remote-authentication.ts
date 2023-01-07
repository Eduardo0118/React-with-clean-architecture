import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

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
