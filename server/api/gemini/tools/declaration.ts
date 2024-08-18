import { FunctionDeclarationName } from './functions';


type geminiDeclarationType = {
  name: FunctionDeclarationName,
  description: string,
  parameters: {
    type: string,
    properties: Record<string, any>,
    required: string[]
  }

}



export const getCurrentDateFunctionDeclaration: geminiDeclarationType = {
  name: "getCurrentDateAndTime",
  description: "Get the current date and time of the user",
  parameters: {
    type: "OBJECT",
    properties: {
      format: {
        type: "STRING",
        description: "The format of the date (ignored in this implementation)",
        enum: ["ISO", "UTC", "local"]
      }
    },
    required: []
  }
}

export const getUserInfoFunctionDeclaration: geminiDeclarationType = {
  name: "getUserInfo",
  description: "Get the user's information",
  parameters: {
    type: "OBJECT",
    properties: {
      name: {
        type: "STRING",
        description: "The user's name"
      },
    },
    required: []
  }
}

