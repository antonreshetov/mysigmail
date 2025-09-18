import type { InjectionKey } from 'vue'

interface FormProps {
  labelWidth: string
  labelPosition: 'left' | 'top'
}

export const formKeys: InjectionKey<FormProps> = Symbol('formKeys')
