// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type OkPacket = {
  affectedRows: number;
  insertId: number;
  error?: string;
  associatedViolence?: Option;
};

// Define the type for the result of an individual associated violence insertion
export interface ViolenceResult {
  error?: Error;
  associatedViolence?: Option;
  affectedRows?: number;
  insertId?: number;
}

// Define the type for the function's return value
export interface InsertDataResult {
  success: boolean;
  message?: string;
  errors?:
    | string
    | undefined
    | Array<{
        associatedViolence: Option | undefined;
        error: string | undefined;
      }>;
  result?: object;
}
