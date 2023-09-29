import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import { UserLogin } from 'entites/User';
import { loginValidation } from 'entites/User/validation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import rootStore from 'store/RootStore';
import { Meta } from 'utils/meta';
import s from './LoginPage.module.scss';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserLogin>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(loginValidation),
    mode: 'onChange',
  });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    if (!hasErrors) {
      rootStore.userStore.loginUser(data);
      reset();
    }
  };

  return (
    <div className={s.auth}>
      <div className={s.auth__wrapper}>
        <Text className={s.auth__title} tag="h1" weight="bold">
          Registration
        </Text>

        <form onSubmit={handleSubmit(onSubmit)} className={s.auth__form}>
          <div className={s['auth__input-wrapper']}>
            <Input defaultValue={''} {...register('login')} className={s.auth__input} placeholder="Enter your login" />
            <Text className={s['auth__error-text']} color="accent" view="p-14">
              {errors.login?.message}
            </Text>
          </div>
          <div className={s['auth__input-wrapper']}>
            <Input
              defaultValue={''}
              {...register('password')}
              className={s.auth__input}
              placeholder="Enter your password"
            />
            <Text className={s['auth__error-text']} color="accent" view="p-14">
              {errors.password?.message}
            </Text>
          </div>
          <Text>
            Don't have account yet?
            <Link className={s.auth__link} to="/auth">
              Registration
            </Link>
          </Text>
          <Button disabled={hasErrors} loading={rootStore.userStore.meta === Meta.loading} className={s.auth__btn}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
