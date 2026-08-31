import { BaseDataSourceOptions } from "typeorm/data-source/BaseDataSourceOptions.js"

export interface MyConnectionOptions extends BaseDataSourceOptions {
  readonly type: "mssql"
}