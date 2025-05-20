
import httpStatus from 'http-status';
import { User } from '@prisma/client';

import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../../utils/prisma';
import { createToken } from '../../utils/createToken';
import config from '../../config';
import AppError from '../../errors/AppError';

const authRegisterInToDB = async (payload: Partial<User>) => {
  const { name, email, password } = payload;
  // console.log(name, email, password);
  // console.log(payload);
  // Optional: Add validation checks here.
  if (!name || !email || !password) {
    throw new AppError(
      httpStatus.NON_AUTHORITATIVE_INFORMATION,
      'Missing required fields'
    );
  }

  const isExistUser = await prisma.user.findFirst({
    where: { email: email },
  });

  // const isExistUser = await prisma.user.findFirst({
  //   where: { email: email },
  // });



  if (isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const hasPassword = await bcrypt.hash(password, 10);
  if (!hasPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'bcrypt solt generate problem');
  }
  const registeredUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hasPassword,
    },
  });

  if (!registeredUser.id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user create problem');
  }
  const jwtPayload = {
    id: registeredUser.id,
    name: registeredUser.name,
    email: registeredUser.email,
    role: registeredUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_scret as string,
    config.jwt.expires_in as string
  );
  return accessToken;
};


const authLoginIntoDB = async (payload: Partial<User>) => {
  if (!payload.email || !payload.password) {
    throw new AppError(
      httpStatus.NON_AUTHORITATIVE_INFORMATION,
      'Missing required fields'
    );
  }
  const isExistUser = await prisma.user.findFirst({
    where: { email: payload.email },
  });

  if (!isExistUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invilide email or password please try agin'
    );
  }

  const checkPassword = await bcrypt.compare(
    payload.password,
    isExistUser?.password
  );

  if (!checkPassword) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invilide email or password please try agin'
    );
  }
  const jwtPayload = {
    id: isExistUser.id,
    name: isExistUser.name,
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_scret as string,
    config.jwt.expires_in as string
  );
  const refeshToken = createToken(
    jwtPayload,
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
  );

  const result = {
    accessToken,
    refeshToken,
  };
  return result;
};


const refeshTokenInToForDb = async (paylood: string) => {
  const decode = jwt.verify(paylood, config.jwt.refresh_token_secret as string);

  const { email, role } = decode as JwtPayload;
  if (!decode) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you ar not authorized');
  }
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'you ar not authorized');
  }
  const jwtPayload = {
    id: isExistUser.id,
    name: isExistUser.name,
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_scret as string,
    config.jwt.expires_in as string
  );
  return {
    accessToken,
  };
};

export const AuthService = {
  authRegisterInToDB,
  authLoginIntoDB,
  refeshTokenInToForDb,
  
};
