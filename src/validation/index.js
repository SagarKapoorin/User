import z from 'zod';

const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().min(3),
    gender: z.enum(['Male', 'Female', 'Other']),
    dateOfBirth: z.string().transform((str) => new Date(str)), // eg '1990-09-22'
    country: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export { registerSchema, loginSchema };