import { registerEnumType } from '@nestjs/graphql';

export enum WorkspaceScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    deletedAt = "deletedAt",
    domainName = "domainName",
    displayName = "displayName",
    logo = "logo"
}


registerEnumType(WorkspaceScalarFieldEnum, { name: 'WorkspaceScalarFieldEnum', description: undefined })
