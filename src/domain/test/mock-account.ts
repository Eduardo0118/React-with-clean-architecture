import { AuthenticationParams } from '@/domain/usecases/authentication'
import { faker } from '@faker-js/faker'
import { AccountModel } from '@/domain/models/account-model'

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alpha(20)
})
