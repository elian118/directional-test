import { Input } from './Input.tsx';
import { useForm } from 'react-hook-form';
import { initLoginParams, type LoginParams, loginParamsSchema } from '../schemas/loginParamsSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import Btn from './Btn.tsx';
import { loginApi } from '../authApi.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { initLoginResponse, type LoginResponse } from '../types/LoginResponse.ts';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage<LoginResponse>('user', initLoginResponse);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginParams>({
    resolver: zodResolver(loginParamsSchema),
    defaultValues: initLoginParams,
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginApi(data);
      setUser(res);
      if (res.token) navigate('/posts');
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
      <h2 className="mb-2 font-bold text-lg flex items-center justify-center">로그인</h2>
      <div>
        <Input
          name="email"
          control={control}
          legend="이메일"
          type="text"
          errors={errors.email?.message}
          placeholder="제목 또는 내용 입력"
        />
        <Input
          name="password"
          control={control}
          legend="비밀번호"
          type="password"
          errors={errors.password?.message}
          placeholder="제목 또는 내용 입력"
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
