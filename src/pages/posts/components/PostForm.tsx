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
import { addPostApi, delPostApi, updatePostApi } from '../postsApi.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

const PostForm = () => {
  const { modal, resetModal } = useModal();
  const { data } = modal;
  const { id, userId, createdAt, ...restData } = data;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userIdParam, setUserIdParam] = useState<string>('');
  const [createdAtParam, setCreatedAtParam] = useState<string>('');
  const [inputTags, setInputTags] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormSchemaParams>({
    resolver: zodResolver(postParamsSchema),
    defaultValues: id !== undefined ? restData : initPostParams,
  });

  const findTags = (val: string) => {
    if (!val) return [];

    return val
      .replace(/,\s*/g, ' ') // 컴마와 뒤따르는 공백을 하나의 공백으로 치환
      .replace(/\s{2,}/g, ' ') // 두 칸 이상의 공백을 하나의 공백으로 치환
      .trim()
      .replace(/[^\w\s가-힣]/g, '') // 태그에 허용되는 문자만 남기고 모두 제거
      .split(' ')
      .filter((tag) => tag.length > 0);
  };

  const inputTagsRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 폼 제출 방지 (기본 동작 막기)
      console.log(tags);
      const currentInput = event.currentTarget.value;

      if (currentInput.trim() === '') return;

      const newTags = findTags(currentInput);
      if (newTags.length > 0) setTags([...new Set([...tags, ...newTags])]);

      setInputTags('');
      inputTagsRef.current?.focus();
    }
  }, []);

  const handleReset = () => {
    reset();
    setTags([]);
  };

  const closeModal = () => {
    resetModal(); // 모달 상태 초기화 및 닫기
    setTags([]);
    document.getElementById('closeModalBtn')?.click();
    location.reload();
  };

  const updatePost = async (post: PostCreateRequest, id?: string) => {
    try {
      setIsLoading(true);
      const response = id ? await updatePostApi(id, post) : await addPostApi(post);
      console.log(`등록글: ${response.id}`);
      return response.id;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
    } finally {
      setIsLoading(false);
    }
  };

  const delPost = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await delPostApi(id);
      console.log(`삭제글: ${id}`);
      console.log(`삭제글: ${response}`);
      closeModal();
      return response;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<PostFormSchemaParams> = async (data) => {
    const { title, body, category } = data;
    const newParams: PostCreateRequest = {
      ...initPostParams,
      title,
      body,
      category,
      tags: tags,
    };
    // api 호출
    const postId = await updatePost(newParams, id);
    if (postId !== undefined) closeModal();
  };

  useEffect(() => {
    const { userId, createdAt, tags, ...restData } = data;
    // 모달이 열린 채로 data가 변경될 때 폼 내용 갱신
    reset(restData);
    if (userId) setUserIdParam(userId);
    if (createdAt) setCreatedAtParam(format(createdAt, 'yyyy.MM.dd HH:mm:ss'));
    if (tags) setTags(tags);
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
        <div className="mt-2 p-2 flex flex-row gap-2 items-center">
          {tags.map((tag, idx) => (
            <div
              className="badge badge-sm badge-info cursor-pointer"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              key={`${tag}-${idx}`}
            >
              {tag}
            </div>
          ))}
        </div>
        <Input
          ref={inputTagsRef}
          name="tags"
          control={control}
          legend="태그"
          type="text"
          errors={errors.tags?.message}
          placeholder="해시태그 입력"
          value={inputTags}
          onChange={(e) => setInputTags(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="mt-8 flex flex-row gap-2 justify-end items-center">
          <Btn
            role="button"
            className={`btn btn-sm btn-error ${id ? '' : 'hidden'}`}
            isLoading={isLoading}
            onClick={() => delPost(id)}
          >
            삭제
          </Btn>
          <Btn
            className={`p-2 flex justify-center items-center gap-2 btn btn-sm btn-neutral ${id ? 'hidden' : ''}`}
            role="button"
            isLoading={false}
            onClick={handleReset}
          >
            초기화
          </Btn>
          <Btn
            className="p-2 flex justify-center items-center gap-2 btn btn-sm btn-primary"
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
