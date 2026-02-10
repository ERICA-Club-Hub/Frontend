import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from './Modal';
import TextArea from '../InputField/TextArea';
import InputField from '../InputField/InputField';
import { cn } from '@/utils/cn';

interface PromptModalProps {
    title: string;
    placeholder?: string;
    inputType?: 'input' | 'textarea';
    validate?: (value: string) => boolean;
    errorMessage?: string;
    asyncOnSubmit: (value: string) => Promise<void>;
    resolve: (value: string | null) => void;
    closeModal: () => void;
}

/**
 * 사용자 입력을 받는 모달
 * @usage 이메일(알림), 피드백
 * @param title - 모달 내용
 * @param placeholder - 입력 필드 플레이스홀더
 * @param inputType - 입력 필드 타입
 * @param validate - 입력 값 검증 함수
 * @param errorMessage - 검증 실패 시 표시할 오류 메시지
 * @param asyncOnSubmit - 제출 시 실행할 비동기 함수. 주로 api 호출이나 후속(재확인용) 모달 호출 로직 포함
 * @param resolve - 모달 결과 반환 함수 (* 호출 시 prop에 포함하지 않음 *)
 * @param closeModal - 모달 종료 함수 (* 호출 시 prop에 포함하지 않음 *)
 * @example
 * ```tsx
 *  const modal = useModal();
 *
 *  const handleClick = async () => {
 *    await modal.push('prompt', PromptModal, {
 *      title: '제출되었습니다!',
 *      placeholder: '이메일을 정확하게 입력해주세요.',
 *      inputType: 'input',
 *      validate: (value: string) => /\S+@\S+\.\S+/.test(value),
 *      errorMessage: '유효한 이메일 주소를 입력해주세요.',
 *
 *      asyncOnSubmit: async (inputValue: string) => {
 *        await submitEmail({ email: inputValue });
 *
 *        await modal.push('alert', AlertModal, {
 *          title: '이메일이 제출되었습니다!',
 *          actionLabel: '확인',
 *          icon: <EmailIcon />,
 *          onAction: () => navigate('/home'),
 *        });
 *   });
 *
 *  return <button onClick={handleClick}>click</button>
 */
export function PromptModal({
    title,
    placeholder = '내용을 입력해주세요.',
    inputType = 'input',
    validate,
    errorMessage,
    asyncOnSubmit,
    resolve,
    closeModal,
}: PromptModalProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // 이메일 검증
        if (validate) {
            const validationResult = validate(inputValue);

            if (!validationResult) {
                setIsValid(false);
                return;
            }
        }

        // 비동기 제출 함수 실행
        if (asyncOnSubmit) {
            try {
                setIsSubmitting(true);
                await asyncOnSubmit(inputValue);
            } catch (err) {
                closeModal();
                console.error(`PromptModal Submission failed:${err}`);
            } finally {
                setIsSubmitting(false);
            }
        }
        resolve(inputValue);
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setInputValue(e.target.value);
        if (!isValid) setIsValid(true);
    };

    return (
        <Modal closeModal={closeModal} hideOnClickOutside>
            <div className="flex flex-col items-center gap-[12px] py-[24px] px-[20px] rounded-[12px] bg-neutral-50">
                <strong className="text-b2 text-neutral-900">{title}</strong>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-[12px]"
                >
                    {inputType === 'textarea' ? (
                        <TextArea
                            value={inputValue}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-[280px] min-h-[87px]"
                        />
                    ) : (
                        <div className="flex flex-col gap-[6px]">
                            <InputField
                                value={inputValue}
                                onChange={handleChange}
                                placeholder={placeholder}
                                isError={!isValid}
                                className={cn('w-[280px] h-[45px]')}
                            />
                            {!isValid && errorMessage && (
                                <p className="text-c1 text-text-error">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={
                            inputValue.length === 0 || !isValid || isSubmitting
                        }
                        className={cn(
                            'w-[280px] h-[37px] rounded-[8px] text-b3 transition-all duration-300 ease-in',
                            (inputValue.length === 0 || isValid) &&
                                'text-neutral-600 bg-neutral-200 cursor-not-allowed',
                            inputValue.length > 0 &&
                                'text-neutral-50 bg-brand cursor-pointer',
                        )}
                    >
                        {inputValue.length > 0 ? '완료' : '취소'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}
