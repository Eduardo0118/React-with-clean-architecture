import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alpha(20)
})
