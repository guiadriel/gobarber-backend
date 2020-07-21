interface ITemplateVariables {
  [key: string]: string | number;
}

/**
 * @property template: String
 * @property variables: [key: string]<string|number>
 */
export default interface IParceMailTemplateDTO {
  /** String do HTML */
  file: string;
  variables: ITemplateVariables;
}
