import { Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // クライアント側で使用するsession（useSessionから取得するオブジェクト）にプロパティを追加します。
  // ここでは`role`を追加しています。
  interface Session {
    user: {
      role?: Role;
    } & DefaultSession['user'];
  }
  interface User {
    role?: string;
  }
}
