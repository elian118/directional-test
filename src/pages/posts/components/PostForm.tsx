import { Input } from '../../../common/components/Input.tsx';
import { Category } from '../postsConsts.ts';
import Select from '../../../common/components/Select.tsx';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type PostFormSchemaParams, postParamsSchema } from '../shemas/postParamsSchema.ts';
import { initPostParams, type PostCreateRequest } from '../interfaces/addPostTypes.ts';
import { useModal } from '../../../common/hooks/useModal.ts';
import Btn from '../../../common/components/Btn.tsx';
import Textarea from '../../../common/components/Textarea.tsx';
import { addPostApi, updatePostApi } from '../postsApi.ts';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const PostForm = () => {
  const { modal, resetModal } = useModal();
  const { data } = modal;
  const { id, userId, createdAt, ...restData } = data;

  const [userIdParam, setUserIdParam] = useState<string>('');
  const [createdAtParam, setCreatedAtParam] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormSchemaParams>({
    resolver: zodResolver(postParamsSchema),
    defaultValues: id !== undefined ? restData : initPostParams,
  });

  const handleReset = () => {
    reset();
  };

  const updatePost = async (post: PostCreateRequest, id?: string) => {
    try {
      const response = id ? await updatePostApi(id, post) : await addPostApi(post);
      console.log(`등록글: ${response.id}`);
      return response.id;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
    }
  };

  const onSubmit: SubmitHandler<PostFormSchemaParams> = async (data) => {
    const { title, body, category, tags } = data;
    const newParams: PostCreateRequest = {
      ...initPostParams,
      title,
      body,
      category,
      tags: tags ?? [],
    };
    // api 호출
    const postId = await updatePost(newParams, id);
    if (postId !== undefined) {
      resetModal(); // 모달 상태 초기화 및 닫기
      document.getElementById('closeModalBtn')?.click();
      location.reload();
    }
  };

  useEffect(() => {
    const { id, userId, createdAt, ...restData } = data;
    // 모달이 열린 채로 data가 변경될 때 폼 내용 갱신
    reset(restData);
    userId && setUserIdParam(userId);
    createdAt && setCreatedAtParam(format(createdAt, 'yyyy.MM.dd HH:mm:ss'));
  }, [data, reset]);

  return (
    <div>
      <form id="post-form" onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{ display: id !== undefined ? 'flex' : 'none' }}
          className="px-2 py-4 flex justify-between flex-wrap gap-4"
        >
          <div className="flex flex-row gap-2 items-center">
            <label className="label text-gray-50 text-xs font-bold">작성자</label>
            <span className="text-gray-300">{userIdParam}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <label className="label text-gray-50 text-xs font-bold">작성일시</label>
            <span className="text-gray-300">{createdAtParam}</span>
          </div>
        </div>
        <Input
          name="title"
          control={control}
          legend="제목"
          type="text"
          errors={errors.title?.message}
          placeholder="제목 입력"
        />
        <Textarea
          name="body"
          control={control}
          legend="내용"
          type="textfield"
          errors={errors.body?.message}
          placeholder="내용 입력"
        />
        <Select
          name="category"
          control={control}
          noDepOpt
          legend="분류"
          errors={errors.category?.message}
          options={Object.keys(Category).map((e) => ({ key: e, label: e }))}
        />
        <Input
          name="tags"
          control={control}
          legend="태그"
          type="text"
          errors={errors.tags?.message}
          placeholder="해시태그 입력"
        />
        <div className="mt-8 flex flex-row gap-2 justify-end items-center">
          <Btn
            className={`mb-2 p-2 flex justify-center items-center gap-2 btn btn-sm btn-neutral ${id ? 'hidden' : ''}`}
            role="button"
            isLoading={false}
            onClick={handleReset}
          >
            초기화
          </Btn>
          <Btn
            className="mb-2 p-2 flex justify-center items-center gap-2 btn btn-sm btn-primary"
            role="submit"
            isLoading={isSubmitting}
          >
            완료
          </Btn>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
