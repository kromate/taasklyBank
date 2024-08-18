export const getCurrentDateAndTime = async () => {
  const date = new Date();
  return date.toISOString();
}

export const getUuserInfo = async () => { 
  return { name: 'John Doe', age: 25, occupation: 'Software Engineer' }
}


export type FunctionDeclarationName = 'getCurrentDateAndTime' | 'getUserInfo' 