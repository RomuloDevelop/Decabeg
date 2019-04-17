import * as React from 'react'

declare module 'screen-module' {
    declare type HrProps = {
      width: number,
      color: string,
      style?: any,
      children?: React.Node
    }
}
