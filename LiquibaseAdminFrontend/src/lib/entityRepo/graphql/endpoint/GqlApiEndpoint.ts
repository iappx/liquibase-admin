import { ApiEndpoint } from '@i-app/api-entity-repo'

export class GqlApiEndpoint extends ApiEndpoint {
    public async graphQlQuery<T>(query: string, name: string): Promise<T> {
        return this.postReq('?' + name, { query })
    }
}
