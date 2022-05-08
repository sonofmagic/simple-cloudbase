export interface ISimpleJsonConfig {
  ignore?: boolean
  external?: []
}

export type IBuiltinOption = {
  path: string
  name: string
  extra?: ISimpleJsonConfig & {
    [key: string]: any
  }
}
