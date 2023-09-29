import Text from 'components/Text';
import s from './AuthPage.module.scss';
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import { useState } from 'react';
import { UserRegister } from 'entites/User';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { authValidation } from 'entites/User/validation';

const AuthPage = () => {
  const [user, setUser] = useState<UserRegister>({
    username: '',
    surname: '',
    email: '',
    login: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserRegister>({
    defaultValues: {
      username: '',
      surname: '',
      email: '',
      login: '',
    },
    resolver: yupResolver(authValidation),
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<UserRegister> = (data) => {
    if (!Object.keys(errors).length) {
      rootStore.userStore.createUser(data);
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
            <Input
              defaultValue={''}
              {...register('username')}
              className={s.auth__input}
              placeholder="Enter your name"
            />
            <Text className={s["auth__error-text"]} color="accent" view="p-14">
              {errors.username?.message}
            </Text>
          </div>

          <div className={s['auth__input-wrapper']}>
            <Input
              defaultValue={''}
              {...register('surname')}
              className={s.auth__input}
              placeholder="Enter your surname"
            />
            <Text color="accent" view="p-14">
              {errors.surname?.message}
            </Text>
          </div>
          <div className={s['auth__input-wrapper']}>
            <Input defaultValue={''} {...register('email')} className={s.auth__input} placeholder="Enter your email" />
            <Text color="accent" view="p-14">
              {errors.email?.message}
            </Text>
          </div>
          <div className={s['auth__input-wrapper']}>
            <Input defaultValue={''} {...register('login')} className={s.auth__input} placeholder="Enter your login" />
            <Text color="accent" view="p-14">
              {errors.login?.message}
            </Text>
          </div>
          <Text>
            Already have an account?{' '}
            <Link className={s.auth__link} to="/login">
              Login
            </Link>
          </Text>
          <Button loading={rootStore.userStore.meta === Meta.loading} className={s.auth__btn}>
            Registration
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
