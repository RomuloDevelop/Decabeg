import * as React from 'react'

declare module 'screen-module' {
    declare type HrProps = {
      width: number,
      color: string,
      style?: any,
      children?: React.Node
    }

    declare type SubmitButtonProps = {
      onPress: function,
      style?: any,
      text: string
    }
}
