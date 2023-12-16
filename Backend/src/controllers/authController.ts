import { Request, Response } from 'express';
import supabase from '../config/supabaseClient';

type User = {
  id: 1,
  email: 'johndoe@example.com',
  username: 'johndoe',
  name: 'John Doe',
  roles: ['user'],
  metadata: {
    preferredLanguage: 'en',
  }
}

exports.signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(401).json({
      error: error.message,
    });
  }

  return res.status(200).json({ user: data || null });
};

exports.signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      });
    }

    return res.status(200).json({
      user: data.user,
      token: data.session?.access_token
    });

  } catch (error: any) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

export default exports;
