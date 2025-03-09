export function getCodeWithParams(codeTemplate: string, params: any) {
    let code = codeTemplate;
    for (const paramName in params) {
      const value = params[paramName];
      const placeholder = `{${paramName}}`;
      let replacement = value.toString();
      if (typeof value === 'string') {
        replacement = `'${value}'`;
      }
      code = code.replace(new RegExp(placeholder, 'g'), replacement);
    }
    return code;
  }