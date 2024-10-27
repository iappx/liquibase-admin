import { GraphqlField } from '@/lib/entityRepo/graphql/models/GraphqlField'

export class GraphqlPaginationInfoField extends GraphqlField {
    constructor() {
        super('paginationInfo')
        this.addField(new GraphqlField('total'))
        this.addField(new GraphqlField('limit'))
        this.addField(new GraphqlField('page'))
    }
}
