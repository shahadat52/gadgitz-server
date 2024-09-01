import { z } from 'zod';

const createUserValidationSchema = z.object({
    name: z.string({ required_error: 'Name must be Required' }),
    email: z.string({ required_error: 'Email must be Required' }),
    password: z.string({ required_error: 'Password must be Required' }),
    phone: z.string({}).optional(),
    role: z.string({ required_error: 'Role must be Required' }).optional(),
    address: z.string({}).optional(),
});

export const userValidations = {
    createUserValidationSchema,
};