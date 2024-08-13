import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string({ required_error: 'Name must be Required' }),
  email: z.string({ required_error: 'Email must be Required' }),
  password: z.string({ required_error: 'Password must be Required' }).optional(),
  phone: z.string({ required_error: 'Phone must be Required' }),
  role: z.string({ required_error: 'Role must be Required' }).optional(),
  address: z.string({ required_error: 'Address must be Required' }),
});

export const userValidations = {
  userValidationSchema,
};