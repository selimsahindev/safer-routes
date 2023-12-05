import { Request, Response } from 'express';
import supabase from '../config/supabaseClient';

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
    const result = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return res.status(200).json({ token: result.data.session?.access_token });

  } catch (error: any) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

export default exports;
