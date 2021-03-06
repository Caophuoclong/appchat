import * as React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Switch from './Switch';
import SwitchCase from 'react-switch';
import { UKFlag, VietNamFlag } from '../../assets/images';
import SelectLanguage from '../Select';
import FullPageLoading from '../chatBoard/FullPageLoading';
export interface ISignProps {}

const options: Array<{ value: string; label: string }> = [
  {
    value: 'vn',
    label: 'Vietnamese 🇻🇳',
  },
  {
    value: 'en',
    label: 'English 🇺🇸',
  },
];

export default function Sign(props: ISignProps) {
  const [isSignUp, setIsSignUp] = React.useState(true);
  const [language, setLanguage] = React.useState(window.localStorage.getItem('lang') || 'vn');
  const [userNameAndPassowrd, setUserNameAndPassword] = React.useState({
    username: '',
    password: '',
  });
  const [isLoading, setShowLoading] = React.useState(false);
  const handleChangeLanguage: (value: string) => void = (value) => {
    window.localStorage.setItem('lang', value);
    setLanguage(value);
  };
  const handleSetUserNameAndPassword = (value: { username: string; password: string }) => {
    setUserNameAndPassword(value);
  };
  const handleSetShowSigning = (value: boolean) => {
    setShowLoading(value);
  };
  return (
    <div className="flex h-screen">
      {isLoading && <FullPageLoading />}
      <div className="lg:w-1/2 lg:visible invisible"></div>
      <div className="border-2 border-black lg:w-1/2 relative h-full w-full">
        <SelectLanguage value={language} onChange={handleChangeLanguage} options={options} />
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-1/2 w-full">
          <p className="text-center">
            {language === 'en' ? 'Welcome to CyperChat' : 'Chào mừng đến với CyperChat'}
          </p>
          <Switch
            option1={language === 'en' ? 'Sign in' : 'Đăng nhập'}
            value={isSignUp}
            option2={language === 'en' ? 'Sign up' : 'Đăng ký'}
            onChange={() => {
              setIsSignUp(!isSignUp);
            }}
          />
          <div className="my-4"></div>
          {isSignUp ? (
            <SignUp
              language={language}
              setIsSignUp={setIsSignUp}
              handleSetUserNameAndPassword={handleSetUserNameAndPassword}
            />
          ) : (
            <SignIn
              handleSetShowSigning={handleSetShowSigning}
              userNameAndPassowrd={userNameAndPassowrd}
              language={language}
            />
          )}
        </div>
      </div>
    </div>
  );
}
