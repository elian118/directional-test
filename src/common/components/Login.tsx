import { Input } from './Input.tsx';
import { useForm } from 'react-hook-form';
import {
  initLoginParams,
  type LoginParams,
  loginParamsSchema,
} from '../schemas/loginParamsSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import Btn from './Btn.tsx';
import { loginApi } from '../authApi.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { type LoginResponse } from '../types/LoginResponse.ts';

const Login = () => {
  const [, setUser] = useLocalStorage<LoginResponse | null>('user', null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginParams>({
    resolver: zodResolver(loginParamsSchema),
    defaultValues: initLoginParams,
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await loginApi(data);
      setUser(res);
      if (res.token) {
        location.reload(); // 새로고침 후 Auth Hoc 에게 자동 작동 위임
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      id="login-form"
      className="px-4 py-8 w-80 h-84 flex justify-between flex-col gap-4 bg-slate-700 rounded-md shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="mb-2 font-bold text-lg flex items-center justify-center">
        로그인
      </h2>
      <div>
        <Input
          name="email"
          control={control}
          legend="이메일"
          type="text"
          errors={errors.email?.message}
          placeholder="이메일"
        />
        <Input
          name="password"
          control={control}
          legend="비밀번호"
          type="password"
          errors={errors.password?.message}
          placeholder="비밀번호"
        />
      </div>
      <Btn
        className="mt-4 mb-2 p-2 flex justify-center items-center gap-2 btn btn-sm btn-primary"
        role="submit"
        isLoading={isSubmitting}
      >
        로그인
      </Btn>
    </form>
  );
};

export default Login;
