import { postLabels } from '../consts/postLabels.ts';
import type { PostResponse } from '../interfaces/addPostTypes.ts';
import { Category } from '../postsConsts.ts';
import { initialPostsParams, type PostsParams } from '../interfaces/getPostsTypes.ts';
import { Input } from '../../../common/components/Input.tsx';
import Select from '../../../common/components/Select.tsx';
import DatePicker from '../../../common/components/DatePicker.tsx';
import Btn from '../../../common/components/Btn.tsx';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  initPostsSearchParams,
  type PostsSearchParams,
  postsSearchParamsSchema,
} from '../shemas/postSearchParamsSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { sortOpts } from '../consts/sortOpts.ts';
import { orderOpts } from '../consts/orderOpts.ts';

interface TableHeaderProps {
  isShowCol: (key: keyof PostResponse) => boolean;
  onChangeShowCol: (key: keyof PostResponse) => void;
  onSearchSubmit: (newParams: PostsParams) => void;
}

const TableHeader = ({ isShowCol, onChangeShowCol, onSearchSubmit }: TableHeaderProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostsSearchParams>({
    resolver: zodResolver(postsSearchParamsSchema),
    defaultValues: initPostsSearchParams,
  });

  const onSubmit: SubmitHandler<PostsSearchParams> = (data) => {
    // 유효성 검사를 통과한 데이터로 검색을 실행합니다.
    const { search, sort, dateRange, category } = data;
    const newParams: PostsParams = {
      ...initialPostsParams,
      search: search ?? undefined,
      category: category ?? undefined,
      sort: sort,
      from: dateRange?.from ? formatISO(dateRange.from) : undefined,
      to: dateRange?.to ? formatISO(dateRange.to) : undefined,
    };

    onSearchSubmit(newParams); // 새로 불러오기
  };

  const handleReset = () => {
    reset();
    onSearchSubmit(initialPostsParams);
  };
  return (
    <form
      id="postsSearchParamsForm"
      className="flex justify-between flex-wrap items-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-start gap-2">
        <Input
          name="search"
          control={control}
          legend="키워드 검색"
          type="text"
          errors={errors.search?.message}
          placeholder="제목 또는 내용 입력"
        />
        <Select
          name="category"
          control={control}
          legend="분류"
          errors={errors.category?.message}
          options={Object.keys(Category).map((e) => ({ key: e, label: e }))}
        />
        <Select
          name="sort"
          control={control}
          legend="정렬 필드"
          errors={errors.sort?.message}
          noDepOpt
          options={sortOpts}
        />
        <Select
          name="order"
          control={control}
          legend="정렬 방향"
          errors={errors.order?.message}
          noDepOpt
          options={orderOpts}
        />
        <DatePicker name="dateRange" control={control} legend="조회 기간" errors={errors.dateRange?.message} />
        <fieldset className="fieldset">
          {<legend className="pl-2 fieldset-legend">컬럼 보기</legend>}
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn mx-1">
              <span className="text-xs">▼</span>
            </div>
            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              {postLabels
                .filter((x) => x.key !== 'id')
                .map((e) => (
                  <li className="flex gap-2" key={`col-${e.key}`}>
                    <label className="label">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={isShowCol(e.key)}
                        onChange={() => onChangeShowCol(e.key)}
                      />
                      {e.label}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        </fieldset>
      </div>
      <div className="flex justify-end gap-2">
        <Btn
          className="mb-2 p-2 flex justify-center items-center gap-2 btn btn-sm btn-neutral"
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
          검색
        </Btn>
      </div>
    </form>
  );
};

export default TableHeader;
